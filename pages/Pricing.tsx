import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const Pricing: React.FC = () => {
  const { T } = useT();

  const tiers = [
    {
      nameKey: "pricing.starter_name",
      bestForKey: "pricing.starter_best_for",
      features: [
        "pricing.starter_f1",
        "pricing.starter_f2",
        "pricing.starter_f3",
        "pricing.starter_f4",
        "pricing.starter_f5",
        "pricing.starter_f6",
      ],
      highlighted: false,
    },
    {
      nameKey: "pricing.school_name",
      bestForKey: "pricing.school_best_for",
      badgeKey: "pricing.school_badge",
      includesKey: "pricing.school_includes",
      features: [
        "pricing.school_f1",
        "pricing.school_f2",
        "pricing.school_f3",
        "pricing.school_f4",
        "pricing.school_f5",
      ],
      highlighted: true,
    },
    {
      nameKey: "pricing.district_name",
      bestForKey: "pricing.district_best_for",
      includesKey: "pricing.district_includes",
      features: [
        "pricing.district_f1",
        "pricing.district_f2",
        "pricing.district_f3",
        "pricing.district_f4",
        "pricing.district_f5",
      ],
      highlighted: false,
    },
  ];

  const faqs = [
    { qKey: "pricing.faq1_q", aKey: "pricing.faq1_a" },
    { qKey: "pricing.faq2_q", aKey: "pricing.faq2_a" },
    { qKey: "pricing.faq3_q", aKey: "pricing.faq3_a" },
    { qKey: "pricing.faq4_q", aKey: "pricing.faq4_a" },
  ];

  return (
    <div className="pt-24 pb-20">
      <SEO
        title={T("nav.pricing")}
        description={T("pricing.seo_desc")}
        keywords={T("pricing.seo_keywords")}
        url="https://neuraconcept.com/pricing"
      />

      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            {T("pricing.title_1")}<span className="text-apple-blue">{T("pricing.title_2")}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {T("pricing.subtitle")}
          </p>
        </div>
      </section>

      {/* Early Access Banner */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apple-blue/10 text-apple-blue text-sm font-medium mb-6">
            <Sparkles size={16} />
            {T("pricing.early_badge")}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {T("pricing.early_heading")}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            {T("pricing.early_desc")}
          </p>
          <Link
            to="/waitlist"
            className="bg-apple-blue hover:bg-apple-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            {T("pricing.early_cta")} <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`bg-white p-8 rounded-2xl border shadow-sm relative ${
                tier.highlighted
                  ? 'border-apple-blue border-2 shadow-md'
                  : 'border-gray-200'
              }`}
            >
              {tier.badgeKey && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-apple-blue text-white text-xs font-bold px-4 py-1 rounded-full">
                    {T(tier.badgeKey)}
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{T(tier.nameKey)}</h3>
              <p className="text-gray-400 mb-6">{T(tier.bestForKey)}</p>
              <div className="text-3xl font-bold text-gray-900 mb-6">{T("pricing.contact_us")}</div>
              {tier.includesKey && (
                <p className="text-sm text-gray-500 font-medium mb-4">{T(tier.includesKey)}</p>
              )}
              <div className="space-y-3">
                {tier.features.map((featureKey, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle className="text-apple-blue shrink-0 mt-0.5" size={18} />
                    <p className="text-gray-500">{T(featureKey)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/waitlist"
                  className={`w-full font-bold px-6 py-3 rounded-lg transition-colors inline-block text-center ${
                    tier.highlighted
                      ? 'bg-apple-blue hover:bg-apple-blue-dark text-white'
                      : 'border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-apple-blue'
                  }`}
                >
                  {T("pricing.early_cta")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{T("pricing.faq_heading")}</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{T(faq.qKey)}</h3>
                <p className="text-gray-400">{T(faq.aKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {T("pricing.bottom_heading")}
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          {T("pricing.bottom_subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/waitlist"
            className="bg-apple-blue hover:bg-apple-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            {T("pricing.early_cta")} <ArrowRight size={20} />
          </Link>
          <a
            href="mailto:dip@neuraconcept.com?subject=GradeOwl%20Demo%20Request&body=Hi%20Dip%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20GradeOwl%20pricing%20and%20would%20like%20to%20schedule%20a%20demo%20for%20my%20school.%0A%0APlease%20let%20me%20know%20availability.%0A%0ABest%2C%0A"
            className="border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-apple-blue font-bold px-8 py-4 rounded-lg transition-colors inline-block"
          >
            {T("pricing.bottom_demo")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
