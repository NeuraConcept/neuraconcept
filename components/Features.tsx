import React from 'react';
import { Sparkles, ScanLine, ClipboardCheck, Layers } from 'lucide-react';
import { useT } from 'talkr';

const featureKeys = [
  { titleKey: "features.rubric_title", descKey: "features.rubric_desc", icon: Sparkles },
  { titleKey: "features.studentid_title", descKey: "features.studentid_desc", icon: ScanLine },
  { titleKey: "features.grading_title", descKey: "features.grading_desc", icon: ClipboardCheck },
  { titleKey: "features.cluster_title", descKey: "features.cluster_desc", icon: Layers },
];

const Features: React.FC = () => {
  const { T } = useT();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {T("features.heading")}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {T("features.subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {featureKeys.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-md hover:border-blue-500 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-gray-50 w-fit mb-6 text-gray-900 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {T(feature.titleKey)}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {T(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
