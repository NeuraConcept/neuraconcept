import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Schools from './pages/Schools';
import Vision from './pages/Vision';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
