import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphNode, GraphLink, NodeType } from '../types';

const INITIAL_NODES: GraphNode[] = [
  { id: 'Physics', label: 'Physics', type: NodeType.SUBJECT, val: 20 },
  { id: 'Math', label: 'Math', type: NodeType.SUBJECT, val: 20 },
  { id: 'LawsOfMotion', label: 'Laws of Motion', type: NodeType.TOPIC, val: 15 },
  { id: 'Vectors', label: 'Vectors', type: NodeType.TOPIC, val: 15 },
  { id: 'Newton2', label: "Newton's 2nd Law", type: NodeType.CONCEPT, val: 10 },
  { id: 'NormalForce', label: 'Normal Force', type: NodeType.CONCEPT, val: 10 },
  { id: 'Friction', label: 'Friction', type: NodeType.CONCEPT, val: 12 },
  { id: 'VectorRes', label: 'Vector Resolution', type: NodeType.SKILL, val: 8 },
  { id: 'Trig', label: 'Trigonometry', type: NodeType.SKILL, val: 8 },
  { id: 'Misc1', label: 'Mass affects speed', type: NodeType.MISCONCEPTION, val: 6 },
];

const INITIAL_LINKS: GraphLink[] = [
  { source: 'LawsOfMotion', target: 'Physics', relation: 'PART_OF' },
  { source: 'Newton2', target: 'LawsOfMotion', relation: 'PART_OF' },
  { source: 'NormalForce', target: 'LawsOfMotion', relation: 'PART_OF' },
  { source: 'Friction', target: 'LawsOfMotion', relation: 'PART_OF' },
  { source: 'Vectors', target: 'Math', relation: 'PART_OF' },
  { source: 'VectorRes', target: 'Vectors', relation: 'PART_OF' },
  { source: 'Friction', target: 'NormalForce', relation: 'REQUIRES' },
  { source: 'Friction', target: 'Newton2', relation: 'REQUIRES' },
  { source: 'NormalForce', target: 'VectorRes', relation: 'REQUIRES' },
  { source: 'VectorRes', target: 'Trig', relation: 'REQUIRES' },
  { source: 'Friction', target: 'Misc1', relation: 'HAS_MISCONCEPTION' },
];

const KnowledgeGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) return;

    const width = wrapperRef.current.clientWidth;
    const height = wrapperRef.current.clientHeight;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Define Gradients and Filters
    const defs = svg.append("defs");
    
    // Glow filter
    const filter = defs.append("filter")
      .attr("id", "glow");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const simulation = d3.forceSimulation(INITIAL_NODES)
      .force("link", d3.forceLink(INITIAL_LINKS).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.val + 5));

    const link = svg.append("g")
      .selectAll("line")
      .data(INITIAL_LINKS)
      .join("line")
      .attr("stroke", (d) => {
        if (d.relation === 'REQUIRES') return "#ef4444"; // Red for critical path
        if (d.relation === 'HAS_MISCONCEPTION') return "#fbbf24"; // Amber
        return "#334155"; // Slate 700
      })
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => d.relation === 'REQUIRES' ? 2 : 1)
      .attr("stroke-dasharray", (d) => d.relation === 'HAS_MISCONCEPTION' ? "4,4" : "none");

    const node = svg.append("g")
      .selectAll("g")
      .data(INITIAL_NODES)
      .join("g")
      .call(drag(simulation) as any);

    // Node Circles
    node.append("circle")
      .attr("r", (d) => d.val)
      .attr("fill", (d) => {
        switch(d.type) {
          case NodeType.SUBJECT: return "#0ea5e9"; // Sky 500
          case NodeType.TOPIC: return "#8b5cf6"; // Violet 500
          case NodeType.CONCEPT: return "#22d3ee"; // Cyan 400
          case NodeType.SKILL: return "#10b981"; // Emerald 500
          case NodeType.MISCONCEPTION: return "#f43f5e"; // Rose 500
          default: return "#94a3b8";
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("filter", "url(#glow)")
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget).transition().duration(200).attr("r", d.val * 1.3);
      })
      .on("mouseout", (event, d) => {
        setHoveredNode(null);
        d3.select(event.currentTarget).transition().duration(200).attr("r", d.val);
      });

    // Labels
    node.append("text")
      .text((d) => d.label)
      .attr("x", (d) => d.val + 5)
      .attr("y", 4)
      .attr("fill", "#e2e8f0")
      .attr("font-size", "10px")
      .attr("font-family", "Fira Code, monospace")
      .style("pointer-events", "none")
      .style("text-shadow", "0 1px 3px rgba(0,0,0,0.8)");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] glass-panel rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)]" ref={wrapperRef}>
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-cyan-400 font-mono text-sm tracking-wider uppercase mb-1">Live Engine</h3>
        <h2 className="text-2xl font-bold text-white tracking-tight">The Knowledge Graph</h2>
        <p className="text-slate-400 text-xs mt-2 max-w-[200px]">
          Visualizing dependencies: <span className="text-red-400">Red lines</span> indicate critical prerequisites.
        </p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10 glass-panel p-3 rounded-lg text-xs space-y-2 pointer-events-none">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500"></span> Subject</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400"></span> Concept</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Skill</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Misconception</div>
      </div>

      <svg ref={svgRef} className="w-full h-full"></svg>
      
      {hoveredNode && (
        <div className="absolute top-4 right-4 z-20 glass-panel p-4 rounded-xl border border-white/10 animate-fade-in max-w-xs">
          <h4 className="font-bold text-lg text-white mb-1">{hoveredNode.label}</h4>
          <span className={`text-xs px-2 py-1 rounded-full text-black font-semibold 
            ${hoveredNode.type === NodeType.MISCONCEPTION ? 'bg-rose-400' : 'bg-cyan-400'}`}>
            {hoveredNode.type}
          </span>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            {hoveredNode.type === NodeType.MISCONCEPTION 
              ? "A common cognitive trap. The system identifies questions designed to trigger this specific error." 
              : "A discrete node in the learning path. Mastery of this node unlocks advanced dependent concepts."}
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
