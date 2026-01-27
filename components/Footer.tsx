import React from 'react';
import { Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Cpu className="text-cyan-400" size={24} />
            <span className="text-xl font-bold text-white tracking-tighter">NeuraConcept</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} NeuraConcept EdTech. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
             {/* <span className="text-slate-600 cursor-not-allowed text-sm">Privacy</span>
             <span className="text-slate-600 cursor-not-allowed text-sm">Terms</span>
             <span className="text-slate-600 cursor-not-allowed text-sm">Contact</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
