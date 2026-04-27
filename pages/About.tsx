import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';
import {
  CheckCircle, Brain, Sparkles,
  Linkedin, Mail, MapPin, Building2, ArrowRight
} from 'lucide-react';

const About: React.FC = () => {
  const { T } = useT();

  const products = [
    {
      icon: CheckCircle,
      iconColor: "text-apple-blue",
      titleKey: "about.product_gradeowl_title",
      descKey: "about.product_gradeowl_desc",
      link: "/gradeowl",
      linkKey: "about.product_learn_more",
    },
    {
      icon: Brain,
      iconColor: "text-gray-900",
      titleKey: "about.product_kg_title",
      descKey: "about.product_kg_desc",
      link: "/technology",
      linkKey: "about.product_learn_more",
    },
    {
      icon: Sparkles,
      iconColor: "text-gray-900",
      titleKey: "about.product_personalized_title",
      descKey: "about.product_personalized_desc",
      link: null,
      badge: "about.product_coming_soon",
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <SEO
        title={T("nav.about")}
        description={T("about.seo_desc")}
        keywords={T("about.seo_keywords")}
        url="https://neuraconcept.com/about"
      />

      {/* Header */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            {T("about.title_1")}<span className="text-apple-blue">{T("about.title_2")}</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {T("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              <div className="flex-shrink-0">
                <img
                  src="/assets/dip-turkar.jpg"
                  alt={T("about.founder_img_alt")}
                  className="w-36 h-36 rounded-full object-cover shadow-lg"
                  width={206}
                  height={206}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{T("about.founder_name")}</h2>
                <p className="text-apple-blue font-medium mb-1">{T("about.founder_role")}</p>
                <div className="flex items-center justify-center md:justify-start gap-1 text-gray-500 text-sm mb-4">
                  <MapPin size={14} />
                  <span>{T("about.founder_location")}</span>
                </div>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {T("about.founder_bio")}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a
                    href="https://linkedin.com/in/Dip707"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-apple-blue transition-colors"
                    aria-label={T("about.linkedin_label")}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:dip@neuraconcept.com"
                    className="text-gray-500 hover:text-apple-blue transition-colors"
                    aria-label={T("about.email_label")}
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center border border-gray-200">
                <Building2 className="text-apple-blue" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{T("about.company_name")}</h2>
                <p className="text-gray-500 text-sm">{T("about.company_status")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">{T("about.company_location_label")}</p>
                <p className="text-gray-900 font-medium">{T("about.company_location")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{T("about.company_contact_label")}</p>
                <a href="mailto:dip@neuraconcept.com" className="text-apple-blue font-medium hover:underline">
                  dip@neuraconcept.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            {T("about.building_title")}
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            {T("about.building_subtitle")}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors flex flex-col"
              >
                <div className="bg-gray-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                  <product.icon className={product.iconColor} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{T(product.titleKey)}</h3>
                <p className="text-gray-500 leading-relaxed flex-grow">{T(product.descKey)}</p>
                {product.link ? (
                  <Link
                    to={product.link}
                    className="inline-flex items-center gap-1 text-apple-blue text-sm font-medium mt-4 hover:underline"
                  >
                    {T(product.linkKey)}
                    <ArrowRight size={14} />
                  </Link>
                ) : product.badge ? (
                  <span className="inline-flex items-center self-start mt-4 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                    {T(product.badge)}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
