import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AnalyticsDemo from './components/AnalyticsDemo';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AnalyticsDemo />
        
        {/* CTA Section */}
        <section className="py-24 container mx-auto px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to upgrade the <span className="text-cyan-400">OS of Education?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            We are currently onboarding select coaching centers and schools for our Beta program.
          </p>
          
          <div className="max-w-md mx-auto relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative flex">
               <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900 text-white px-6 py-4 rounded-l-lg border-y border-l border-slate-700 focus:outline-none focus:border-cyan-500"
               />
               <button className="bg-white text-black font-bold px-8 py-4 rounded-r-lg hover:bg-slate-200 transition-colors whitespace-nowrap">
                 Get Access
               </button>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
