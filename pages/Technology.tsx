import React from 'react';
import { Network, GitBranch, Languages, Layers, Link2 } from 'lucide-react';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';
import KnowledgeGraph from '../components/KnowledgeGraph';

const Technology: React.FC = () => {
  const { T } = useT();

  const techCards = [
    { icon: Languages, titleKey: "tech.vector_title", descKey: "tech.vector_desc" },
    { icon: Layers, titleKey: "tech.irt_title", descKey: "tech.irt_desc" },
    { icon: Link2, titleKey: "tech.privacy_title", descKey: "tech.privacy_desc" },
  ];

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <SEO
        title={T("nav.technology")}
        description={T("tech.seo_desc")}
        url="https://neuraconcept.com/technology"
      />
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          <span className="text-apple-blue">{T("tech.title_1")}</span>{T("tech.title_2")}
        </h1>
        <p className="text-xl text-gray-500">
          {T("tech.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors">
          <Network className="text-gray-900 mb-6" size={48} />
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{T("tech.kg_title")}</h2>
          <p className="text-gray-500 leading-relaxed">
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
            src="/assets/network-graph.webp"
            alt="Curriculum knowledge graph showing concept relationships across subjects"
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            className="rounded-2xl border border-gray-200 shadow-sm"
          />
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors order-1 md:order-2">
          <GitBranch className="text-gray-900 mb-6" size={48} />
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{T("tech.cognitive_title")}</h2>
          <p className="text-gray-500 leading-relaxed">
            {T("tech.cognitive_desc")}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {techCards.map((card, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors">
            <card.icon className="text-gray-900 mb-4" size={32} />
            <h3 className="text-lg font-bold mb-2 text-gray-900">{T(card.titleKey)}</h3>
            <p className="text-sm text-gray-500">{T(card.descKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technology;
