import React from 'react';
import { Network, Brain, Database, Lock } from 'lucide-react';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';
import KnowledgeGraph from '../components/KnowledgeGraph';

const Technology: React.FC = () => {
  const { T } = useT();

  const techCards = [
    { icon: Database, titleKey: "tech.vector_title", descKey: "tech.vector_desc" },
    { icon: Brain, titleKey: "tech.irt_title", descKey: "tech.irt_desc" },
    { icon: Lock, titleKey: "tech.privacy_title", descKey: "tech.privacy_desc" },
  ];

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <SEO
        title={T("nav.technology")}
        description={T("tech.seo_desc")}
      />
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          <span className="text-apple-blue">{T("tech.title_1")}</span>{T("tech.title_2")}
        </h1>
        <p className="text-xl text-gray-400">
          {T("tech.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors">
          <Network className="text-gray-900 mb-6" size={48} />
          <h3 className="text-2xl font-bold mb-4 text-gray-900">{T("tech.kg_title")}</h3>
          <p className="text-gray-400 leading-relaxed">
            {T("tech.kg_desc")}
          </p>
        </div>
        <div className="h-[500px] md:h-[600px] w-full">
          <KnowledgeGraph />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20 md:flex-row-reverse">
        <div className="order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="AI Processing"
            loading="lazy"
            className="rounded-2xl border border-gray-200 shadow-sm"
          />
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors order-1 md:order-2">
          <Brain className="text-gray-900 mb-6" size={48} />
          <h3 className="text-2xl font-bold mb-4 text-gray-900">{T("tech.cognitive_title")}</h3>
          <p className="text-gray-400 leading-relaxed">
            {T("tech.cognitive_desc")}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {techCards.map((card, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors">
            <card.icon className="text-gray-900 mb-4" size={32} />
            <h4 className="text-lg font-bold mb-2 text-gray-900">{T(card.titleKey)}</h4>
            <p className="text-sm text-gray-400">{T(card.descKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technology;
