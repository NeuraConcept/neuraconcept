import React from 'react';
import { Lightbulb, Target, Globe } from 'lucide-react';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';

const Vision: React.FC = () => {
  const { T } = useT();

  const pillars = [
    { icon: Lightbulb, iconColor: "text-gray-900", titleKey: "vision.understanding_title", descKey: "vision.understanding_desc" },
    { icon: Target, iconColor: "text-apple-blue", titleKey: "vision.precision_title", descKey: "vision.precision_desc" },
    { icon: Globe, iconColor: "text-apple-blue", titleKey: "vision.access_title", descKey: "vision.access_desc" },
  ];

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <SEO
        title={T("nav.vision")}
        description={T("vision.seo_desc")}
        url="https://neuraconcept.com/vision"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-10 text-center text-gray-900">
          {T("vision.title_1")}<span className="text-apple-blue">{T("vision.title_2")}</span>
        </h1>

        <div className="prose prose-lg mx-auto mb-20">
          <p className="text-xl text-gray-400 leading-relaxed mb-6">
            {T("vision.para1")}
          </p>
          <p className="text-xl text-gray-400 leading-relaxed">
            {T("vision.para2_1")}<strong className="text-gray-900">{T("vision.para2_bold")}</strong>{T("vision.para2_2")}
          </p>
        </div>

        {/* Vision Hero Image */}
        <div className="mb-20">
          <img
            src="/assets/vision-education.webp"
            alt={T("vision.img_alt")}
            className="rounded-2xl shadow-lg w-full"
            loading="lazy"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <pillar.icon className={pillar.iconColor} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{T(pillar.titleKey)}</h3>
              <p className="text-gray-400">{T(pillar.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vision;
