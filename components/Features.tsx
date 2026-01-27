import React from 'react';
import { Brain, Youtube, Smartphone, Zap, ScanLine, Share2 } from 'lucide-react';
import { FeatureItem } from '../types';

const features: FeatureItem[] = [
  {
    title: "Mental Model Engine",
    description: "We don't just track scores. We map a vast network of interconnected concepts to identify exactly why a student is failing Calculus (hint: it might be Algebra).",
    icon: Brain,
    color: "text-fuchsia-400"
  },
  {
    title: "Youtube Layering",
    description: "We curate the world's best free content and overlay Active Recall quizzes. High quality, low cost, maximum retention.",
    icon: Youtube,
    color: "text-red-500"
  },
  {
    title: "Reels-Style Discovery",
    description: "Capture 'dead time' with vertical, swipeable micro-learning. Spark curiosity during bus rides with 60-second concept hooks.",
    icon: Smartphone,
    color: "text-cyan-400"
  },
  {
    title: "AI Auto-Grading",
    description: "The 'Trojan Horse' for adoption. Teachers save hours grading via OCR, while we digitize the data to feed the Mental Model.",
    icon: ScanLine,
    color: "text-emerald-400"
  },
  {
    title: "Spaced Repetition",
    description: "The algorithm predicts memory decay. We schedule reviews exactly when a student is about to forget, ensuring long-term retention.",
    icon: Zap,
    color: "text-amber-400"
  },
  {
    title: "Concept Navigation",
    description: "Break free from linear textbook chapters. Navigate learning by atomic concepts and their relationships.",
    icon: Share2,
    color: "text-indigo-400"
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-violet-900/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6">
            Beyond Rote Learning
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Standard LMSs are flat lists. <span className="text-cyan-400 font-semibold">NeuraConcept</span> is a multi-dimensional web of understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="group glass-panel p-8 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2 border border-white/5 hover:border-cyan-500/30"
            >
              <div className={`p-3 rounded-lg bg-slate-900/50 w-fit mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
