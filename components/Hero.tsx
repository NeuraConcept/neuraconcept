import React from 'react';
import { Link } from 'react-router-dom';
import KnowledgeGraph from './KnowledgeGraph';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <header className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              V 1.0 Beta Live
            </div>  */}

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Neural Network</span> <br />
              of Learning.
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Education isn't linear. It's a network. We map the hidden dependencies between thousands of concepts to identify the 
              <span className="text-white font-semibold"> root cause </span> 
              of every student's struggle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/schools" className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  Request Demo <ArrowRight size={20} />
                </span>
              </Link>
              
              <Link to="/technology" className="px-8 py-4 glass-panel text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-center">
                Explore The Graph <ChevronRight size={20} className="text-slate-400" />
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 pt-8 font-mono">
              <div>POWERED BY</div>
              <div className="h-px bg-slate-800 w-12"></div>
              <div className="flex gap-4">
                <span>Large Language Models</span>|
                <span>NEO4J</span>|
                <span>REACT</span>
              </div>
            </div>
          </div>

          {/* Right Content (Graph) */}
          <div className="lg:w-1/2 w-full perspective-1000">
             <div className="transform transition-transform hover:rotate-y-2 duration-500">
               <KnowledgeGraph />
             </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
