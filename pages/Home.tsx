import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AnalyticsDemo from '../components/AnalyticsDemo';

const Home: React.FC = () => {
  const { T } = useT();

  return (
    <>
      <SEO
        title="Home"
        description={T("home.seo_desc")}
      />
      <Hero />
      <Features />
      <AnalyticsDemo />

      {/* Social Proof / Board Support Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{T("home.boards_heading")}</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-medium">{T("home.board_cbse")}</div>
          <div className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-medium">{T("home.board_icse")}</div>
          <div className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-medium">{T("home.board_karnataka")}</div>
          <div className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-medium">{T("home.board_all")}</div>
        </div>
      </section>

      {/* Teacher Quote */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <blockquote className="text-2xl text-gray-600 italic mb-6">
            {T("home.quote")}
          </blockquote>
          <p className="text-gray-400 font-medium">{T("home.quote_attr")}</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {T("home.cta_heading_1")}<span className="text-apple-blue">{T("home.cta_heading_2")}</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          {T("home.cta_subheading")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/waitlist" className="bg-apple-blue text-white font-semibold px-8 py-4 rounded-xl hover:bg-apple-blue-dark shadow-lg shadow-apple-blue/20 inline-flex items-center gap-2 justify-center transition-colors">
            {T("home.cta_waitlist")} <ArrowRight size={20} />
          </Link>
          <a href="https://chat.whatsapp.com/HgeTpYJgkksAZYYOxwYMDj" target="_blank" rel="noopener noreferrer" className="border border-emerald-600 text-emerald-700 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 inline-flex items-center gap-2 justify-center transition-colors">
            <MessageCircle size={20} /> {T("home.cta_whatsapp")}
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
