import React from 'react';
import { Network, Brain, Database, Lock } from 'lucide-react';
import KnowledgeGraph from '../components/KnowledgeGraph';

const Technology: React.FC = () => {
  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-cyan-400">Neuro-Symbolic</span> AI
        </h1>
        <p className="text-xl text-slate-400">
          Our technology combines the interpretive power of symbolic AI with the learning capabilities of neural networks to create a comprehensive Knowledge Graph of student understanding.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
          <Network className="text-violet-400 mb-6" size={48} />
          <h3 className="text-2xl font-bold mb-4">Knowledge Graphs</h3>
          <p className="text-slate-400 leading-relaxed">
            Unlike traditional LMS which treats content as flat files, we map every concept, formula, and rule into an interconnected graph. This allows us to understand prerequisites, dependencies, and related concepts automatically.
          </p>
        </div>
        <div className="h-[500px] md:h-[600px] w-full">
          <KnowledgeGraph />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20 md:flex-row-reverse">
        <div className="order-2 md:order-1">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="AI Processing" 
            className="rounded-2xl border border-slate-800 opacity-80 shadow-2xl shadow-violet-900/20"
          />
        </div>
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 order-1 md:order-2">
          <Brain className="text-cyan-400 mb-6" size={48} />
          <h3 className="text-2xl font-bold mb-4">Cognitive Modeling</h3>
          <p className="text-slate-400 leading-relaxed">
            We build a "Digital Twin" of the student's mind. By tracking how they answer questions, where they hesitate, and what mistakes they make, we update the probability of them understanding specific nodes in the knowledge graph.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-colors">
          <Database className="text-slate-300 mb-4" size={32} />
          <h4 className="text-lg font-bold mb-2">Vector Search</h4>
          <p className="text-sm text-slate-400">Semantic retrieval of content that best addresses specific student misconceptions.</p>
        </div>
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-colors">
          <Brain className="text-slate-300 mb-4" size={32} />
          <h4 className="text-lg font-bold mb-2">IRT Analysis</h4>
          <p className="text-sm text-slate-400">Item Response Theory ensures questions are calibrated to the student's true ability level.</p>
        </div>
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-colors">
          <Lock className="text-slate-300 mb-4" size={32} />
          <h4 className="text-lg font-bold mb-2">Privacy First</h4>
          <p className="text-sm text-slate-400">Student data is encrypted and anonymized. We train on patterns, not personal identities.</p>
        </div>
      </div>
    </div>
  );
};

export default Technology;
