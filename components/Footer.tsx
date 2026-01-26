import React from 'react';
import { Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Cpu className="text-cyan-400" size={24} />
            <span className="text-xl font-bold text-white tracking-tighter">NeuroGraph</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} NeuroGraph EdTech. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy</a>
             <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Terms</a>
             <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
