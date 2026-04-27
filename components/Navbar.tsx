import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useT } from 'talkr';

const locales = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिंदी', short: 'हि' },
  { code: 'kn', label: 'ಕನ್ನಡ', short: 'ಕ' },
] as const;

const linkGroups = [
  {
    headingKey: 'nav.group_product',
    links: [
      { to: '/gradeowl', labelKey: 'nav.gradeowl' },
      { to: '/technology', labelKey: 'nav.technology' },
      { to: '/schools', labelKey: 'nav.schools' },
      { to: '/coaching-institutes', labelKey: 'footer.coaching_institutes' },
    ],
  },
  {
    headingKey: 'nav.group_company',
    links: [
      { to: '/about', labelKey: 'nav.about' },
      { to: '/vision', labelKey: 'nav.vision' },
      { to: '/pricing', labelKey: 'nav.pricing' },
      { to: '/faq', labelKey: 'footer.faq' },
    ],
  },
  {
    headingKey: 'nav.group_legal',
    links: [
      { to: '/privacy', labelKey: 'footer.privacy' },
      { to: '/terms', labelKey: 'footer.terms' },
    ],
  },
] as const;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const { T, setLocale, locale } = useT();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Body scroll lock + ESC handler when drawer open
  useEffect(() => {
    if (!drawerOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    // Move focus into the drawer for keyboard users
    drawerRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Click-outside for language dropdown
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

  const currentLocale = useMemo(
    () => locales.find(l => l.code === locale) || locales[0],
    [locale]
  );

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Neura<span className="text-apple-blue">Concept</span>
            </span>
          </Link>

          {/* Right side: Lang + CTA + Burger (all always visible) */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Language dropdown — always visible so Hindi/Kannada users
                don't need to open the drawer to switch locale */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-apple-blue transition-colors border border-gray-200 rounded-lg px-3 py-1.5"
                aria-label={T('nav.language')}
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                {currentLocale.short}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-fade-in"
                >
                  {locales.map(l => (
                    <button
                      key={l.code}
                      role="menuitem"
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

            {/* Waitlist CTA — always visible above sm breakpoint
                (the conversion goal; mobile has CTA inside the drawer instead) */}
            <Link
              to="/waitlist"
              className="hidden sm:inline-flex bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              {T('nav.waitlist')}
            </Link>

            {/* Hamburger — always visible */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-gray-700 hover:text-apple-blue transition-colors rounded-lg"
              aria-label={T('nav.menu_open')}
              aria-expanded={drawerOpen}
              aria-controls="primary-drawer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />

      {/* Drawer */}
      <aside
        id="primary-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={T('nav.menu_open')}
        className={`fixed right-0 top-0 h-full w-full sm:max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto outline-none ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md">
          <Link
            to="/"
            onClick={() => setDrawerOpen(false)}
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            Neura<span className="text-apple-blue">Concept</span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-gray-700 hover:text-apple-blue transition-colors rounded-lg"
            aria-label={T('nav.menu_close')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 pb-12 space-y-10">
          {linkGroups.map(group => (
            <div key={group.headingKey}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {T(group.headingKey)}
              </h3>
              <ul className="space-y-3">
                {group.links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="block text-lg text-gray-900 hover:text-apple-blue transition-colors"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {T(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <Link
              to="/login"
              onClick={() => setDrawerOpen(false)}
              className="block text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {T('nav.login')}
            </Link>

            {/* Waitlist CTA inside drawer — primary surface on mobile where the
                top-bar CTA is hidden. Also useful on desktop for users who
                opened the drawer to navigate. */}
            <Link
              to="/waitlist"
              onClick={() => setDrawerOpen(false)}
              className="block text-center w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {T('nav.waitlist')}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
