import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';

const locales = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिंदी', short: 'हि' },
  { code: 'kn', label: 'ಕನ್ನಡ', short: 'ಕ' },
] as const;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { T, setLocale, locale } = useT();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (code: string) => {
    setLocale(code);
    localStorage.setItem('locale', code);
    setLangOpen(false);
  };

  const currentLocale = useMemo(() => locales.find(l => l.code === locale) || locales[0], [locale]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Neura<span className="text-apple-blue">Concept</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/vision" className="text-gray-500 hover:text-apple-blue text-sm font-medium transition-colors">{T("nav.vision")}</Link>
          <Link to="/technology" className="text-gray-500 hover:text-apple-blue text-sm font-medium transition-colors">{T("nav.technology")}</Link>
          <Link to="/gradeowl" className="text-gray-500 hover:text-apple-blue text-sm font-medium transition-colors">{T("nav.gradeowl")}</Link>
          <Link to="/schools" className="text-gray-500 hover:text-apple-blue text-sm font-medium transition-colors">{T("nav.schools")}</Link>
          <Link to="/login" className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors">{T("nav.login")}</Link>

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-apple-blue transition-colors border border-gray-200 rounded-lg px-3 py-1.5"
            >
              {currentLocale.short}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-fade-in">
                {locales.map(l => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      locale === l.code
                        ? 'text-apple-blue font-semibold bg-blue-50/50'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/waitlist" className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            {T("nav.waitlist")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-6 space-y-4 animate-fade-in">
           <Link to="/vision" className="block text-gray-600 hover:text-apple-blue font-medium" onClick={() => setMobileMenuOpen(false)}>{T("nav.vision")}</Link>
           <Link to="/technology" className="block text-gray-600 hover:text-apple-blue font-medium" onClick={() => setMobileMenuOpen(false)}>{T("nav.technology")}</Link>
           <Link to="/gradeowl" className="block text-gray-600 hover:text-apple-blue font-medium" onClick={() => setMobileMenuOpen(false)}>{T("nav.gradeowl")}</Link>
           <Link to="/schools" className="block text-gray-600 hover:text-apple-blue font-medium" onClick={() => setMobileMenuOpen(false)}>{T("nav.schools")}</Link>
           <Link to="/login" className="block text-gray-400 hover:text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>{T("nav.login")}</Link>

           {/* Mobile Language Selector */}
           <div className="flex gap-2">
             {locales.map(l => (
               <button
                 key={l.code}
                 onClick={() => switchLocale(l.code)}
                 className={`flex-1 text-center py-2 rounded-lg text-sm font-medium transition-colors ${
                   locale === l.code
                     ? 'bg-apple-blue text-white'
                     : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                 }`}
               >
                 {l.label}
               </button>
             ))}
           </div>

           <Link to="/waitlist" className="block w-full text-center py-3 mt-4 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800" onClick={() => setMobileMenuOpen(false)}>
             {T("nav.waitlist")}
           </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
