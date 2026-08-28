import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Search, RotateCcw, X } from 'lucide-react';
import { useT } from 'talkr';

type ConceptNode = { n: string; t: number; g: number; d: number; x: number; y: number; s: string; c: string };
type PrerequisiteEdge = { s: number; t: number; c: number; k: 0 | 1; r: string };
type GraphAsset = {
  v: number;
  m: { sourceConcepts: number; sourceHardEdges: number; renderedEdges: number; renderedHardEdges: number; danglingEdges: number; topics: string[]; gradeZones: { grade: number; path: string; labelX: number; labelY: number }[] };
  n: ConceptNode[];
  e: PrerequisiteEdge[];
};
type Trace = { nodes: Map<number, number>; edges: Set<number> };

const VIEWBOX = { width: 1200, height: 760 };
const TOPIC_COLOURS = ['#67e8f9', '#a78bfa', '#fbbf24', '#fb7185', '#34d399', '#60a5fa', '#f472b6', '#c084fc', '#fb923c', '#2dd4bf', '#facc15', '#818cf8'];
const GRADE_ZONE_COLOURS: Record<number, string> = { 6: '#7dd3fc', 7: '#86efac', 8: '#fdba74' };
const topicColour = (node: ConceptNode) => TOPIC_COLOURS[node.t % TOPIC_COLOURS.length] ?? '#67e8f9';

// Concept names run up to 92 chars; the in-graph label only needs to identify which dot is
// which while the chain is on screen — the full name already appears in the detail panel.
// Capping it here keeps every label on the fixed stage regardless of viewport width.
const graphLabel = (name: string) => (name.length > 26 ? `${name.slice(0, 25).trimEnd()}…` : name);

// Fixed on-canvas positions for a focused prerequisite chain (depth 0 = selected, 1-2 = hops
// upstream). Selection always lays the chain out here instead of the nodes' real force-layout
// positions, so the trace never inherits the ambient graph's crowding and reads the same way
// (and fits the same camera transform) no matter which node was clicked.
const STAGE: { x: number; y: number }[] = [
  { x: 300, y: 260 },
  { x: 560, y: 420 },
  { x: 820, y: 580 },
];

const buildTrace = (start: number, graph: GraphAsset, prerequisitesByDependent: Map<number, number[]>): Trace => {
  const nodes = new Map<number, number>();
  const edges = new Set<number>();
  nodes.set(start, 0);
  let dependent = start;
  for (let depth = 1; depth <= 2; depth += 1) {
    const edgeIndex = prerequisitesByDependent.get(dependent)?.[0];
    if (edgeIndex === undefined) break;
    const edge = graph.e[edgeIndex];
    edges.add(edgeIndex);
    if (nodes.has(edge.t)) break;
    nodes.set(edge.t, depth);
    dependent = edge.t;
  }
  return { nodes, edges };
};

const KnowledgeGraph: React.FC = () => {
  const { T } = useT();
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [graph, setGraph] = useState<GraphAsset | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [activeEdge, setActiveEdge] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [transform, setTransform] = useState('translate(0,0) scale(1)');
  const suppressEdgeHoverRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/concept-graph.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load graph: ${response.status}`);
        return response.json() as Promise<GraphAsset>;
      })
      .then((asset) => { if (!cancelled) setGraph(asset); })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return undefined;
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.6, 4])
      .on('zoom', (event) => setTransform(event.transform.toString()));
    zoomRef.current = zoom;
    svg.call(zoom);
    return () => {
      svg.on('.zoom', null);
      zoomRef.current = null;
    };
  }, [graph]);

  const prerequisitesByDependent = useMemo(() => {
    const index = new Map<number, number[]>();
    if (!graph) return index;
    graph.e.forEach((edge, edgeIndex) => {
      if (edge.k !== 1) return;
      const values = index.get(edge.s) ?? [];
      values.push(edgeIndex);
      index.set(edge.s, values);
    });
    index.forEach((edges) => edges.sort((a, b) => graph.e[b].c - graph.e[a].c || graph.e[a].t - graph.e[b].t));
    return index;
  }, [graph]);

  const degree = useMemo(() => {
    const values = new Map<number, number>();
    graph?.e.forEach((edge) => {
      if (edge.k !== 1) return;
      values.set(edge.s, (values.get(edge.s) ?? 0) + 1);
      values.set(edge.t, (values.get(edge.t) ?? 0) + 1);
    });
    return values;
  }, [graph]);

  const trace = useMemo<Trace>(() => {
    if (selectedNode === null || !graph) return { nodes: new Map(), edges: new Set() };
    return buildTrace(selectedNode, graph, prerequisitesByDependent);
  }, [graph, prerequisitesByDependent, selectedNode]);

  const traceStage = useMemo(() => {
    const positions = new Map<number, { x: number; y: number }>();
    trace.nodes.forEach((depth, nodeIndex) => positions.set(nodeIndex, STAGE[Math.min(depth, STAGE.length - 1)]));
    return positions;
  }, [trace]);

  const nodeRadius = useMemo(() => {
    const map = new Map<number, number>();
    graph?.n.forEach((node, index) => {
      map.set(index, 4.2 + Math.min(3.8, Math.sqrt(degree.get(index) ?? 0) * 0.52) + Math.min(1.5, node.d * 0.15));
    });
    return map;
  }, [graph, degree]);

  // Trace nodes render at a minimum radius (bigger than most base radii) so the fixed stage
  // reads clearly at its zoom level; edges trim to this same radius so an arrowhead lands in
  // the open gap beside a node's circle instead of underneath it, where it would be invisible.
  const renderRadius = useCallback((nodeIndex: number) => {
    const base = nodeRadius.get(nodeIndex) ?? 4.2;
    return trace.nodes.has(nodeIndex) ? Math.max(base, 7.5) : base;
  }, [nodeRadius, trace]);

  const focusNode = useCallback((nodeIndex: number) => {
    if (!graph || !svgRef.current || !zoomRef.current) return;
    const depth = Math.max(...buildTrace(nodeIndex, graph, prerequisitesByDependent).nodes.values());
    const stagePoints = STAGE.slice(0, depth + 1);
    const midX = (Math.min(...stagePoints.map((p) => p.x)) + Math.max(...stagePoints.map((p) => p.x))) / 2;
    const midY = (Math.min(...stagePoints.map((p) => p.y)) + Math.max(...stagePoints.map((p) => p.y))) / 2;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    const scale = depth === 0 ? (desktop ? 2.3 : 2.1) : depth === 1 ? (desktop ? 1.85 : 1.5) : (desktop ? 1.5 : 1.05);
    const nextTransform = d3.zoomIdentity
      .translate(desktop ? VIEWBOX.width * 0.34 : VIEWBOX.width / 2, VIEWBOX.height * 0.48)
      .scale(scale)
      .translate(-midX, -midY);
    const selection = d3.select(svgRef.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) selection.call(zoomRef.current.transform, nextTransform);
    else selection.transition().duration(420).call(zoomRef.current.transform, nextTransform);
  }, [graph, prerequisitesByDependent]);

  const selectNode = useCallback((nodeIndex: number, suppressInitialEdgeHover = false) => {
    suppressEdgeHoverRef.current = suppressInitialEdgeHover;
    setSelectedNode(nodeIndex);
    setActiveEdge(null);
    setSearch(graph?.n[nodeIndex]?.n ?? '');
    setSearchOpen(false);
    focusNode(nodeIndex);
  }, [focusNode, graph]);

  const resetGraph = useCallback(() => {
    setSelectedNode(null);
    setActiveEdge(null);
    setSearch('');
    setSearchOpen(false);
    if (svgRef.current && zoomRef.current) d3.select(svgRef.current).transition().duration(260).call(zoomRef.current.transform, d3.zoomIdentity);
  }, []);

  const searchResults = useMemo(() => {
    if (!graph || !search.trim()) return [];
    const query = search.trim().toLocaleLowerCase();
    return graph.n.map((node, index) => ({ node, index })).filter(({ node }) => node.n.toLocaleLowerCase().includes(query)).slice(0, 7);
  }, [graph, search]);

  const primaryEdge = selectedNode === null ? null : prerequisitesByDependent.get(selectedNode)?.[0] ?? null;
  const displayedEdge = activeEdge ?? primaryEdge;
  const selected = selectedNode === null ? null : graph?.n[selectedNode] ?? null;

  if (loadError) return <div className="min-h-[520px] rounded-2xl bg-[#08111f] p-8 text-sm text-gray-300">{T('tech.graph_unavailable')}</div>;
  if (!graph) return <div className="min-h-[520px] animate-pulse rounded-2xl bg-[#08111f]" aria-label={T('tech.graph_loading')} />;

  const detailPanel = (
    <div className="rounded-2xl border border-cyan-200/20 bg-slate-950/90 p-4 shadow-[0_20px_56px_-22px_rgba(8,145,178,0.78)] backdrop-blur-xl">
      {selected ? <>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
          {trace.nodes.size > 1 ? T('tech.graph_two_hop') : T('tech.graph_foundational')}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-tight text-white">{selected.n}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{selected.s}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-300">
          <span>{T('tech.graph_grade')} {selected.g}</span><span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: topicColour(selected) }} aria-hidden="true" />
            {graph.m.topics[selected.t]}
          </span>
          {selected.c && <><span>·</span><span>{selected.c}</span></>}
        </div>
        {primaryEdge === null ? <p className="mt-4 text-sm font-semibold text-amber-200">{T('tech.graph_foundational')}</p> : (
          <p className="mt-4 border-l-2 border-amber-300 pl-3 text-sm leading-relaxed text-slate-100">
            <span className="font-semibold text-amber-200">{T('tech.graph_primary_prerequisite')}:</span>{' '}
            {graph.n[graph.e[primaryEdge].t].n}
          </p>
        )}
      </> : <>
        <p className="text-sm font-bold text-white">{T('tech.graph_edge_hero')}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{T('tech.graph_help')}</p>
        <div className="mt-4 border-t border-white/10 pt-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200">{T('tech.graph_legend')}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
            {graph.m.topics.map((topic, topicIndex) => (
              <span key={topic} className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: TOPIC_COLOURS[topicIndex % TOPIC_COLOURS.length] }} aria-hidden="true" />
                {topic}
              </span>
            ))}
          </div>
        </div>
      </>}
      {displayedEdge !== null && (
        <div className="mt-4 rounded-xl border border-cyan-200/25 bg-cyan-300/10 p-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100">{T('tech.graph_edge_reason')}</p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-white">{graph.e[displayedEdge].r}</p>
        </div>
      )}
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#08111f] text-white shadow-[0_28px_90px_-36px_rgba(8,145,178,0.86)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(8,145,178,0.2),transparent_32%),radial-gradient(circle_at_76%_76%,rgba(109,40,217,0.18),transparent_35%)]" />
      <div className="relative z-30 flex flex-col gap-4 p-5 sm:p-7 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div className="max-w-xl">
            <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">{T('tech.graph_kicker')}</p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{T('tech.graph_title')}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{T('tech.graph_subtitle')}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-200 lg:ml-6 lg:justify-end">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{graph.m.sourceConcepts} {T('tech.graph_concepts')}</span>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5">{graph.m.sourceHardEdges.toLocaleString()} {T('tech.graph_edges')}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{T('tech.graph_scope')}</span>
          </div>
        </div>
      </div>
      <div className="relative min-h-[570px] overflow-hidden sm:min-h-[660px] lg:min-h-[760px]">
        <div className="absolute left-5 top-4 z-30 flex w-[calc(100%-2.5rem)] flex-col gap-2 sm:left-7 sm:top-6 sm:w-[25rem]">
          <label className="sr-only" htmlFor="concept-search">{T('tech.graph_search_label')}</label>
          <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/15 bg-slate-950/80 px-3 shadow-inner shadow-black/20 backdrop-blur-md focus-within:border-cyan-300/60">
            <Search aria-hidden="true" size={17} className="shrink-0 text-cyan-200" />
            <input id="concept-search" value={search} onFocus={() => setSearchOpen(true)} onChange={(event) => { setSearch(event.target.value); setSearchOpen(true); }} onKeyDown={(event) => {
              if (event.key === 'Enter' && searchResults[0]) selectNode(searchResults[0].index, true);
              if (event.key === 'Escape') setSearch('');
            }} placeholder={T('tech.graph_search_placeholder')} className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-300" role="combobox" aria-expanded={searchResults.length > 0} aria-controls="concept-search-results" autoComplete="off" />
            {search && <button type="button" onClick={() => { setSearch(''); setSearchOpen(false); }} className="rounded p-1 text-slate-300 hover:bg-white/10 hover:text-white" aria-label={T('tech.graph_clear_search')}><X size={15} /></button>}
          </div>
          {searchOpen && search && <div id="concept-search-results" className="absolute top-[46px] z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/95 p-1 shadow-2xl backdrop-blur">
            {searchResults.length > 0 ? searchResults.map(({ node, index }) => <button key={index} type="button" onClick={() => selectNode(index, true)} className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-cyan-300/10"><span className="truncate">{node.n}</span><span className="shrink-0 text-xs text-slate-400">{T('tech.graph_grade')} {node.g}</span></button>) : <p className="px-3 py-2 text-sm text-slate-300">{T('tech.graph_no_results')}</p>}
          </div>}
        </div>
        <svg ref={svgRef} viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} className="absolute inset-0 h-full w-full touch-none" role="img" aria-label={T('tech.graph_aria_label')} onPointerMove={() => { suppressEdgeHoverRef.current = false; }} onClick={(event) => { if (event.target === event.currentTarget) resetGraph(); }}>
        <defs>
          <filter id="concept-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="cloud-blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="20" /></filter>
          <marker id="prerequisite-arrow" viewBox="0 -4.2 8.5 8.5" refX="8" refY="0" markerWidth="7.5" markerHeight="7.5" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0,-3.6L8,0L0,3.6Z" fill="#f8fafc" /></marker>
        </defs>
        <g transform={transform}>
          <g aria-hidden="true">{graph.m.gradeZones.map((zone) => (
            <g key={zone.grade} className="transition-opacity duration-300" opacity={selectedNode === null ? 1 : 0.35}>
              <path d={zone.path} fill={GRADE_ZONE_COLOURS[zone.grade] ?? '#67e8f9'} opacity={0.6} filter="url(#cloud-blur)" style={{ mixBlendMode: 'screen' }} />
              <text x={zone.labelX} y={zone.labelY} textAnchor="middle" fill={GRADE_ZONE_COLOURS[zone.grade] ?? '#67e8f9'} opacity={0.75} fontSize={13} fontWeight={700} className="font-mono uppercase tracking-[0.16em]">
                {T('tech.graph_grade')} {zone.grade}
              </text>
            </g>
          ))}</g>
          <g aria-hidden="true">{graph.e.map((edge, edgeIndex) => {
            const source = graph.n[edge.s]; const target = graph.n[edge.t]; const inTrace = trace.edges.has(edgeIndex); const isActive = activeEdge === edgeIndex;
            const sourceStage = traceStage.get(edge.s); const targetStage = traceStage.get(edge.t);
            const sx = sourceStage?.x ?? source.x; const sy = sourceStage?.y ?? source.y;
            const tx = targetStage?.x ?? target.x; const ty = targetStage?.y ?? target.y;
            const showMarker = inTrace || isActive;
            // A marker at the raw endpoint would land on the node's own centre and render
            // underneath its opaque circle (nodes paint after edges), so trim the visible line
            // back to each node's boundary whenever an arrowhead needs somewhere to sit.
            let lineSx = sx, lineSy = sy, lineTx = tx, lineTy = ty;
            if (showMarker) {
              const dx = tx - sx; const dy = ty - sy; const length = Math.hypot(dx, dy) || 1;
              const ux = dx / length; const uy = dy / length;
              lineSx = sx + ux * renderRadius(edge.s); lineSy = sy + uy * renderRadius(edge.s);
              lineTx = tx - ux * renderRadius(edge.t); lineTy = ty - uy * renderRadius(edge.t);
            }
            const opacity = selectedNode === null ? (edge.k ? 0.42 : 0.08) : (inTrace ? 1 : 0.025);
            const activateEdge = (event: React.PointerEvent<SVGElement> | React.MouseEvent<SVGElement>) => { event.stopPropagation(); setActiveEdge(edgeIndex); };
            const previewEdge = () => { if (!suppressEdgeHoverRef.current) setActiveEdge(edgeIndex); };
            return <g key={edgeIndex} className="transition-opacity duration-300">
              {inTrace && <line x1={lineSx} y1={lineSy} x2={lineTx} y2={lineTy} stroke="#22d3ee" strokeWidth={10} opacity={0.34} filter="url(#concept-glow)" className="transition-all duration-300" />}
              <line x1={lineSx} y1={lineSy} x2={lineTx} y2={lineTy} stroke={isActive || inTrace ? '#f8fafc' : edge.k ? '#38bdf8' : '#64748b'} strokeWidth={isActive || inTrace ? 2.6 : edge.k ? 1.3 : 0.7} strokeDasharray={edge.k ? undefined : '2 4'} opacity={isActive ? 1 : opacity} markerStart={showMarker ? 'url(#prerequisite-arrow)' : undefined} className="transition-all duration-300" />
              <line x1={sx} y1={sy} x2={tx} y2={ty} stroke="transparent" strokeWidth={16} className="cursor-pointer" onPointerEnter={previewEdge} onPointerLeave={() => setActiveEdge(null)} onClick={activateEdge} />
              <circle cx={(sx + tx) / 2} cy={(sy + ty) / 2} r={9} fill="transparent" className="cursor-pointer" onPointerEnter={previewEdge} onPointerLeave={() => setActiveEdge(null)} onClick={activateEdge} />
            </g>;
          })}</g>
          <g>{graph.n.map((node, nodeIndex) => {
            const depth = trace.nodes.get(nodeIndex); const isTraceNode = depth !== undefined; const isSelected = selectedNode === nodeIndex;
            const stagePos = traceStage.get(nodeIndex);
            const posX = stagePos?.x ?? node.x; const posY = stagePos?.y ?? node.y;
            const radius = renderRadius(nodeIndex);
            const opacity = selectedNode === null ? 0.56 + Math.min(0.24, (degree.get(nodeIndex) ?? 0) * 0.018) : isTraceNode ? 1 : 0.055;
            const colour = isSelected ? '#f8fafc' : depth === 1 ? '#fbbf24' : depth === 2 ? '#c4b5fd' : topicColour(node);
            const labelOnLeft = isSelected;
            const labelX = labelOnLeft ? -radius - 14 : radius + 14;
            const labelY = radius + 22;
            const labelSize = isSelected ? 15 : 14;
            return <g key={nodeIndex} transform={`translate(${posX},${posY})`} className="cursor-pointer transition-all duration-300 ease-out" onClick={(event) => { event.stopPropagation(); selectNode(nodeIndex); }}>
              <circle r={radius + (isTraceNode ? 9 : 3)} fill={colour} opacity={isTraceNode ? 0.32 : opacity * 0.12} filter={isTraceNode ? 'url(#concept-glow)' : undefined} className="transition-opacity duration-300" />
              <circle r={radius + (isSelected ? 2.5 : 0)} fill={colour} opacity={opacity} stroke={isSelected ? '#67e8f9' : '#ffffff'} strokeWidth={isSelected ? 2.2 : 0.55} filter={isTraceNode ? 'url(#concept-glow)' : undefined} className="transition-opacity duration-300" />
              {isTraceNode && <text x={labelX} y={labelY} textAnchor={labelOnLeft ? 'end' : 'start'} fill="#f8fafc" fontSize={labelSize} fontWeight={isSelected ? 800 : 700} className="pointer-events-none [paint-order:stroke] stroke-[#08111f] stroke-[5px]">{graphLabel(node.n)}</text>}
            </g>;
          })}</g>
        </g>
      </svg>
        <div className={`pointer-events-none absolute z-20 hidden w-[22rem] lg:block ${selected ? 'right-7 top-7' : 'bottom-7 left-7'}`}>
          {detailPanel}
        </div>
        <div className="pointer-events-auto absolute bottom-5 right-5 z-30 flex gap-2 sm:bottom-7 sm:right-7">{selectedNode !== null && <button type="button" onClick={resetGraph} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-slate-950/85 px-3 text-xs font-semibold text-white shadow-lg backdrop-blur hover:border-cyan-300/60"><X size={15} />{T('tech.graph_clear')}</button>}<button type="button" onClick={resetGraph} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-slate-950/85 px-3 text-xs font-semibold text-white shadow-lg backdrop-blur hover:border-cyan-300/60"><RotateCcw size={15} />{T('tech.graph_reset')}</button></div>
      </div>
      <div className="relative z-30 border-t border-white/10 p-5 lg:hidden">
        {detailPanel}
      </div>
      <p className="sr-only" aria-live="polite">{selected ? `${selected.n}. ${trace.nodes.size > 1 ? T('tech.graph_two_hop') : T('tech.graph_foundational')}` : ''}</p>
    </section>
  );
};

export default KnowledgeGraph;
