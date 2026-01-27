import React from 'react';
import { Lightbulb, Target, Globe } from 'lucide-react';

const Vision: React.FC = () => {
  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-10 text-center">
          Our Vision for <span className="text-cyan-400">Learning</span>
        </h1>
        
        <div className="prose prose-invert prose-lg mx-auto mb-20">
          <p className="text-xl text-slate-300 leading-relaxed mb-6">
            We believe that the current "factory model" of education—batches of students moving through standardized content at a fixed pace—is broken. Every student has a unique mental model of the world, unique gaps in understanding, and a unique path to mastery.
          </p>
          <p className="text-xl text-slate-300 leading-relaxed">
            NeuraConcept is building the infrastructure for <strong className="text-white">Personalized Education at Scale</strong>. By mapping the world's knowledge and understanding how each mind traverses it, we aim to unlock the full potential of every learner.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-slate-900/20 rounded-xl border border-slate-800/50">
            <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="text-yellow-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Understanding {'>'} Memorization</h3>
            <p className="text-slate-400">We prioritize deep conceptual linkage over rote recall. True learning happens when dots connect.</p>
          </div>
          <div className="text-center p-6 bg-slate-900/20 rounded-xl border border-slate-800/50">
            <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="text-red-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Precision Guidance</h3>
            <p className="text-slate-400">No more wasted time studying what you already know. We guide you to the exact frontier of your knowledge.</p>
          </div>
          <div className="text-center p-6 bg-slate-900/20 rounded-xl border border-slate-800/50">
            <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Universal Access</h3>
            <p className="text-slate-400">Quality personal tutoring is a luxury. We are using AI to democratize 1-on-1 mentorship for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
