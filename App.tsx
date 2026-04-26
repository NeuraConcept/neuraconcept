import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Talkr, useT } from 'talkr';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Schools from './pages/Schools';
import Vision from './pages/Vision';
import Login from './pages/Login';
import GradeOwl from './pages/GradeOwl';
import Waitlist from './pages/Waitlist';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import en from './i18n/en.json';
import hi from './i18n/hi.json';
import kn from './i18n/kn.json';

const HtmlLangUpdater: React.FC = () => {
  const { locale } = useT();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
};

const App: React.FC = () => {
  const savedLocale = (typeof window !== 'undefined' && localStorage.getItem('locale')) || 'en';

  return (
    <Talkr languages={{ en, hi, kn }} defaultLanguage={savedLocale}>
      <Router>
        <HtmlLangUpdater />
        <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/login" element={<Login />} />
              <Route path="/gradeowl" element={<GradeOwl />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Talkr>
  );
};

export default App;
