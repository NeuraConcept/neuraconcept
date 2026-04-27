import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useT } from 'talkr';

const Hero: React.FC = () => {
  const { T } = useT();

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative pt-32 pb-20 overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apple-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-apple-blue"></span>
              </span>
              {T("hero.badge")}
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
              {T("hero.title_1")}<span className="text-apple-blue">{T("hero.title_2")}</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              {T("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/waitlist"
                className="bg-apple-blue text-white font-semibold px-8 py-4 rounded-xl hover:bg-apple-blue-dark shadow-lg shadow-apple-blue/20 inline-flex items-center justify-center gap-2 transition-colors"
              >
                {T("hero.cta")} <ArrowRight size={20} />
              </Link>

              <button
                onClick={scrollToHowItWorks}
                className="border border-gray-200 text-gray-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-center"
              >
                {T("hero.cta_secondary")}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 pt-4">
              <span>{T("hero.tag_classrooms")}</span>
              <span className="text-gray-200">&bull;</span>
              <span>{T("hero.tag_handwritten")}</span>
              <span className="text-gray-200">&bull;</span>
              <span>{T("hero.tag_boards")}</span>
            </div>
          </div>

          {/* Right Visual — Hero Illustration */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative">
              <img
                src="/assets/hero-teacher.webp"
                alt={T("hero.img_alt")}
                className="rounded-2xl shadow-xl shadow-gray-200/50 w-full max-w-lg"
                width={1200}
                height={670}
                fetchPriority="high"
                decoding="async"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-2xl -z-10 rotate-12"></div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gray-100 rounded-xl -z-10 -rotate-6"></div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
