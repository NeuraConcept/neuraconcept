import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';
import { ArrowRight, Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  const { T } = useT();

  return (
    <div className="pt-24 pb-20">
      <SEO
        title={T("notFound.title")}
        description={T("notFound.seo_desc")}
      />

      <section className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-200">
            <Compass className="text-apple-blue" size={36} />
          </div>
          <p className="text-apple-blue font-medium tracking-wider uppercase text-sm mb-4">404</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            {T("notFound.title")}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-xl mx-auto mb-10">
            {T("notFound.message")}
          </p>
          <Link
            to="/"
            className="bg-apple-blue hover:bg-apple-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            {T("notFound.cta")} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
