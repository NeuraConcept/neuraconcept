import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-sm opacity-50 animate-pulse"></div>
            <Cpu className="text-cyan-400 relative z-10" size={28} />
          </div>
          <span className="text-2xl font-bold text-white tracking-tighter">NeuraConcept</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/vision" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Vision</Link>
          <Link to="/technology" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Technology</Link>
          <Link to="/schools" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">For Schools</Link>
          <Link to="/login" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
            Partner Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-6 space-y-4 animate-fade-in">
           <Link to="/vision" className="block text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Vision</Link>
           <Link to="/technology" className="block text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Technology</Link>
           <Link to="/schools" className="block text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>For Schools</Link>
           <Link to="/login" className="block w-full text-center py-3 mt-4 rounded-lg bg-cyan-900/30 text-cyan-400 border border-cyan-500/30" onClick={() => setMobileMenuOpen(false)}>
             Partner Login
           </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
