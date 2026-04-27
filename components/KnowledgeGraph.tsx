import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphNode, GraphLink, NodeType } from '../types';

const INITIAL_NODES: GraphNode[] = [
  // Biology Domain
  { id: 'Bio', label: 'Biology', type: NodeType.SUBJECT, val: 30 },
  { id: 'Photosynthesis', label: 'Photosynthesis', type: NodeType.CONCEPT, val: 26 },
  
  // Chemistry Gaps (Root Cause)
  { id: 'Chem', label: 'Chemistry', type: NodeType.SUBJECT, val: 30 },
  { id: 'Reactions', label: 'Chemical Reactions', type: NodeType.CONCEPT, val: 22 },
  { id: 'Molecules', label: 'Atoms & Molecules', type: NodeType.TOPIC, val: 20 },
  
  // Physics Gaps (Root Cause)
  { id: 'Phys', label: 'Physics', type: NodeType.SUBJECT, val: 30 },
  { id: 'Energy', label: 'Energy Conversion', type: NodeType.CONCEPT, val: 22 },

  // Supporting Nodes
  { id: 'Sunlight', label: 'Sunlight', type: NodeType.CONCEPT, val: 16 },
  { id: 'Glucose', label: 'Glucose', type: NodeType.CONCEPT, val: 16 },
  
  // The Trap
  { id: 'SoilMyth', label: 'Myth: Soil is Food', type: NodeType.MISCONCEPTION, val: 18 },
  
  // Resources
  { id: 'ChemVid', label: 'Basics of Reactions', type: NodeType.RESOURCE, val: 14 },
];

const INITIAL_LINKS: GraphLink[] = [
  // Hierarchy
  { source: 'Photosynthesis', target: 'Bio', relation: 'PART_OF' },
  { source: 'Reactions', target: 'Chem', relation: 'PART_OF' },
  { source: 'Molecules', target: 'Chem', relation: 'PART_OF' },
  { source: 'Energy', target: 'Phys', relation: 'PART_OF' },
  { source: 'Reactions', target: 'Molecules', relation: 'PART_OF' },

  // The "Mental Model" Dependencies (Cross-Disciplinary)
  { source: 'Photosynthesis', target: 'Reactions', relation: 'REQUIRES' }, // Bio needs Chem
  { source: 'Photosynthesis', target: 'Energy', relation: 'REQUIRES' },    // Bio needs Phys
  
  // Standard Dependencies
  { source: 'Photosynthesis', target: 'Sunlight', relation: 'RELATED_TO' },
  { source: 'Glucose', target: 'Photosynthesis', relation: 'RELATED_TO' }, // Produced by
  
  // Misconception
  { source: 'Photosynthesis', target: 'SoilMyth', relation: 'HAS_MISCONCEPTION' },
  
  // Remediation
  { source: 'ChemVid', target: 'Reactions', relation: 'EXPLAINS' },
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

    // Arrow Marker
    defs.append("marker")
      .attr("id", "arrow-head")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 50) // Increased offset to clear rectangular node
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#64748b")
      .attr("opacity", 0.6);

    const simulation = d3.forceSimulation(INITIAL_NODES)
      .force("link", d3.forceLink(INITIAL_LINKS).id((d: any) => d.id).distance(150)) // Increased distance
      .force("charge", d3.forceManyBody().strength(-500)) // Stronger repulsion
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(60)); // Larger collision radius for rectangles

    const link = svg.append("g")
      .selectAll("line")
      .data(INITIAL_LINKS)
      .join("line")
      .attr("stroke", (d) => {
        if (d.relation === 'REQUIRES') return "#ef4444"; // Red for critical path
        if (d.relation === 'HAS_MISCONCEPTION') return "#fbbf24"; // Amber
        if (d.relation === 'ASSESSES') return "#a855f7"; // Purple-500
        if (d.relation === 'EXPLAINS') return "#f97316"; // Orange-500
        if (d.relation === 'TRAPS') return "#f87171"; // Red-400
        return "#64748b"; // Slate 500 (PART_OF, RELATED_TO)
      })
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => d.relation === 'REQUIRES' ? 2 : 1.5)
      .attr("marker-end", "url(#arrow-head)")
      .attr("stroke-dasharray", (d) => (d.relation === 'HAS_MISCONCEPTION' || d.relation === 'TRAPS') ? "4,4" : "none");

    const node = svg.append("g")
      .selectAll("g")
      .data(INITIAL_NODES)
      .join("g")
      .call(drag(simulation) as any);

    // Node Rectangles
    node.append("rect")
      .attr("width", 100)
      .attr("height", 40)
      .attr("x", -50)
      .attr("y", -20)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", (d) => {
        switch(d.type) {
          case NodeType.SUBJECT: return "#bbdefb"; // Blue 100
          case NodeType.TOPIC: return "#e1bee7"; // Purple 100
          case NodeType.CONCEPT: return "#c8e6c9"; // Green 100
          case NodeType.SKILL: return "#fff9c4"; // Yellow 100
          case NodeType.MISCONCEPTION: return "#ffcdd2"; // Red 100
          case NodeType.RESOURCE: return "#ffe0b2"; // Orange 100
          case NodeType.QUESTION: return "#eeeeee"; // Grey 200
          default: return "#cbd5e1";
        }
      })
      .attr("stroke", (d) => {
         // Keep stroke darker for contrast
         switch(d.type) {
          case NodeType.SUBJECT: return "#0d47a1"; // Blue 900
          case NodeType.TOPIC: return "#4a148c"; // Purple 900
          case NodeType.CONCEPT: return "#1b5e20"; // Green 900
          case NodeType.SKILL: return "#f57f17"; // Yellow 700? Using Orange for now as per schema implies darker stroke
          case NodeType.MISCONCEPTION: return "#b71c1c"; // Red 900
          case NodeType.RESOURCE: return "#e65100"; // Orange 900
          case NodeType.QUESTION: return "#212121"; // Grey 900
          default: return "#fff";
        }
      })
      .attr("stroke-width", 1.5)
      .attr("filter", "url(#glow)")
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget)
          .transition().duration(200)
          .attr("width", 110)
          .attr("height", 44)
          .attr("x", -55)
          .attr("y", -22);
      })
      .on("mouseout", (event, d) => {
        setHoveredNode(null);
        d3.select(event.currentTarget)
          .transition().duration(200)
          .attr("width", 100)
          .attr("height", 40)
          .attr("x", -50)
          .attr("y", -20);
      });

    // Labels
    node.append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#1e293b") // Dark text for light backgrounds
      .attr("font-size", "10px")
      .attr("font-weight", "600")
      .attr("font-family", "Inter, sans-serif")
      .style("pointer-events", "none")
      .call(wrap, 90); // Wrap function to handle long text

    function wrap(text: any, width: number) {
      text.each(function(this: SVGTextElement) {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line: string[] = [];
        let lineNumber = 0;
        const lineHeight = 1.1; // ems
        const y = text.attr("y");
        const dy = 0;
        let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if ((tspan.node()?.getComputedTextLength() || 0) > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
        // Re-center logically based on line count
        const totalHeight = lineNumber * lineHeight; 
        text.selectAll("tspan").attr("dy", (d, i) => {
            return (i * lineHeight - totalHeight / 2 + 0.3) + "em"; // 0.3 adjustment for visual center
        })
      });
    }

    // Link Labels
    const linkLabel = svg.append("g")
      .selectAll("text")
      .data(INITIAL_LINKS)
      .join("text")
      .text((d) => d.relation)
      .attr("font-size", "8px")
      .attr("fill", "#94a3b8")
      .attr("font-family", "Fira Code, monospace")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .style("text-shadow", "0 1px 2px rgba(0,0,0,1)")
      .attr("dy", -4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

      linkLabel
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);
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
        <h3 className="text-cyan-400 font-mono text-sm tracking-wider uppercase mb-1">Live Mental Model</h3>
        <h2 className="text-2xl font-bold text-white tracking-tight">Concept Dependencies</h2>
        <p className="text-gray-300 text-xs mt-2 max-w-[250px]">
          Showing how <span className="text-green-300">Biology</span> builds upon <span className="text-purple-300">Chemistry</span> & <span className="text-blue-300">Physics</span>.
        </p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10 glass-panel p-3 rounded-lg text-xs space-y-2 pointer-events-none">
        <div className="flex items-center gap-2"><div className="w-4 h-2 rounded bg-[#bbdefb] border border-blue-900"></div> Subject</div>
        <div className="flex items-center gap-2"><div className="w-4 h-2 rounded bg-[#e1bee7] border border-purple-900"></div> Topic</div>
        <div className="flex items-center gap-2"><div className="w-4 h-2 rounded bg-[#c8e6c9] border border-green-900"></div> Concept</div>
        <div className="flex items-center gap-2"><div className="w-4 h-2 rounded bg-[#fff9c4] border border-yellow-700"></div> Skill</div>
        <div className="flex items-center gap-2"><div className="w-4 h-2 rounded bg-[#ffcdd2] border border-red-900"></div> Misconception</div>
        <div className="flex items-center gap-2"><div className="w-4 h-2 rounded bg-[#ffe0b2] border border-orange-900"></div> Resource</div>
        <div className="flex items-center gap-2"><div className="w-4 h-2 rounded bg-[#eeeeee] border border-gray-900"></div> Question</div>
      </div>

      <svg ref={svgRef} className="w-full h-full"></svg>
      
      {hoveredNode && (
        <div className="absolute top-4 right-4 z-20 glass-panel p-4 rounded-xl border border-white/10 animate-fade-in max-w-xs">
          <h3 className="font-bold text-lg text-white mb-1">{hoveredNode.label}</h3>
          <span className={`text-xs px-2 py-1 rounded-full text-black font-semibold bg-white/80`}>
            {hoveredNode.type}
          </span>
          <p className="text-gray-200 text-sm mt-3 leading-relaxed">
            {hoveredNode.type === NodeType.MISCONCEPTION 
              ? "A specific wrong mental model that students often hold." 
              : hoveredNode.type === NodeType.QUESTION
              ? "An evaluation item connecting concepts and testing for misconceptions."
              : "A node in the learning path."}
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
