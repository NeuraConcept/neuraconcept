import React from 'react';
import { Clock, Scale, BarChart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';

const Schools: React.FC = () => {
  const { T } = useT();

  const valueProps = [
    { icon: Clock, iconColor: "text-apple-blue", titleKey: "schools.time_title", descKey: "schools.time_desc" },
    { icon: Scale, iconColor: "text-gray-900", titleKey: "schools.fair_title", descKey: "schools.fair_desc" },
    { icon: BarChart, iconColor: "text-apple-blue", titleKey: "schools.analytics_title", descKey: "schools.analytics_desc" },
  ];

  const loveItems = [
    "schools.love_1", "schools.love_2", "schools.love_3",
    "schools.love_4", "schools.love_5", "schools.love_6",
  ];

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <SEO
        title={T("nav.schools")}
        description={T("schools.seo_desc")}
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          {T("schools.title_1")}<span className="text-apple-blue">{T("schools.title_2")}</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          {T("schools.subtitle")}
        </p>
      </div>

      {/* Classroom Hero Image */}
      <div className="mb-16">
        <img
          src="/assets/schools-classroom.png"
          alt={T("schools.img_alt")}
          className="rounded-2xl shadow-lg w-full"
          loading="lazy"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {valueProps.map((prop, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors">
            <prop.icon className={`${prop.iconColor} mb-6`} size={40} />
            <h3 className="text-xl font-bold mb-4 text-gray-900">{T(prop.titleKey)}</h3>
            <p className="text-gray-400">{T(prop.descKey)}</p>
          </div>
        ))}
      </div>

      <section className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">{T("schools.love_heading")}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {loveItems.map((key, i) => (
            <div key={i} className="flex items-start gap-4">
              <CheckCircle className="text-apple-blue shrink-0 mt-1" size={20} />
              <p className="text-gray-500 text-lg">{T(key)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/waitlist"
            className="bg-apple-blue hover:bg-apple-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-colors inline-block"
          >
            {T("schools.cta_access")}
          </Link>
          <a
            href="mailto:dip@turkar.co?subject=GradeOwl%20Demo%20Request&body=Hi%20Dip%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20GradeOwl%20and%20would%20like%20to%20schedule%20a%20demo%20for%20my%20school.%0A%0APlease%20let%20me%20know%20availability.%0A%0ABest%2C%0A"
            className="border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-apple-blue font-bold px-8 py-4 rounded-lg transition-colors inline-block"
          >
            {T("schools.cta_demo")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Schools;
