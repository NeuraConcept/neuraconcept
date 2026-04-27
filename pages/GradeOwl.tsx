import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';
import {
  Camera, FileText, Brain, CheckCircle, Users,
  ArrowRight, Smartphone, Clock, Shield,
  MessageCircle, ChevronRight, Star, Zap
} from 'lucide-react';

const GradeOwl: React.FC = () => {
  const { T } = useT();

  const steps = [
    { icon: FileText, iconColor: "text-apple-blue", titleKey: "gradeowl.step1_title", descKey: "gradeowl.step1_desc" },
    { icon: Brain, iconColor: "text-gray-900", titleKey: "gradeowl.step2_title", descKey: "gradeowl.step2_desc" },
    { icon: Camera, iconColor: "text-gray-900", titleKey: "gradeowl.step3_title", descKey: "gradeowl.step3_desc" },
    { icon: CheckCircle, iconColor: "text-gray-900", titleKey: "gradeowl.step4_title", descKey: "gradeowl.step4_desc" },
    { icon: Users, iconColor: "text-gray-900", titleKey: "gradeowl.step5_title", descKey: "gradeowl.step5_desc" },
  ];

  const worksWithCards = [
    { icon: FileText, iconColor: "text-apple-blue", titleKey: "gradeowl.handwritten_title", descKey: "gradeowl.handwritten_desc" },
    { icon: Star, iconColor: "text-gray-900", titleKey: "gradeowl.boards_title", descKey: "gradeowl.boards_desc" },
    { icon: Smartphone, iconColor: "text-gray-900", titleKey: "gradeowl.phone_title", descKey: "gradeowl.phone_desc" },
  ];

  const faqs = [
    { qKey: "gradeowl.faq1_q", aKey: "gradeowl.faq1_a" },
    { qKey: "gradeowl.faq2_q", aKey: "gradeowl.faq2_a" },
    { qKey: "gradeowl.faq3_q", aKey: "gradeowl.faq3_a" },
    { qKey: "gradeowl.faq4_q", aKey: "gradeowl.faq4_a" },
    { qKey: "gradeowl.faq5_q", aKey: "gradeowl.faq5_a" },
    { qKey: "gradeowl.faq6_q", aKey: "gradeowl.faq6_a" },
  ];

  return (
    <div className="pt-24 pb-20">
      <SEO
        title="GradeOwl"
        description={T("gradeowl.seo_desc")}
        keywords={T("gradeowl.seo_keywords")}
        url="https://neuraconcept.com/gradeowl"
      />

      {/* Hero */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-8">
            <Zap size={16} />
            {T("gradeowl.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {T("gradeowl.title_1")}<br />
            <span className="text-apple-blue">{T("gradeowl.title_2")}</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            {T("gradeowl.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/waitlist" className="bg-apple-blue text-white font-semibold px-8 py-4 rounded-xl hover:bg-apple-blue-dark shadow-lg shadow-apple-blue/20 inline-flex items-center justify-center gap-2">
              {T("gradeowl.cta_access")} <ArrowRight size={20} />
            </Link>
            <a href="#walkthrough" className="border border-gray-200 text-gray-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 inline-flex items-center justify-center gap-2">
              {T("gradeowl.cta_walkthrough")} <ChevronRight size={20} />
            </a>
          </div>
        </div>

        {/* Product Hero Image */}
        <div className="max-w-4xl mx-auto mt-16">
          <img
            src="/assets/gradeowl-hero.webp"
            alt={T("gradeowl.img_alt")}
            className="rounded-2xl shadow-lg w-full"
            width={1200}
            height={670}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* Step-by-step Walkthrough */}
      <section id="walkthrough" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            {T("gradeowl.walkthrough_heading")}
          </h2>
          <p className="text-gray-500 text-lg text-center max-w-2xl mx-auto mb-16">
            {T("gradeowl.walkthrough_subheading")}
          </p>

          <div className="max-w-3xl mx-auto space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">{i + 1}</div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className={step.iconColor} size={24} />
                    <h3 className="text-xl font-bold text-gray-900">{T(step.titleKey)}</h3>
                  </div>
                  <p className="text-gray-500">{T(step.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works With Section */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{T("gradeowl.works_heading")}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {worksWithCards.map((card, i) => (
            <div key={i} className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <card.icon className={card.iconColor} size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{T(card.titleKey)}</h3>
              <p className="text-gray-500 text-sm">{T(card.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{T("gradeowl.faq_heading")}</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{T(faq.qKey)}</h3>
                <p className="text-gray-500">{T(faq.aKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {T("gradeowl.bottom_heading")}
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
          {T("gradeowl.bottom_subtitle")}
        </p>
        <Link to="/waitlist" className="bg-apple-blue text-white font-semibold px-8 py-4 rounded-xl hover:bg-apple-blue-dark shadow-lg shadow-apple-blue/20 inline-flex items-center gap-2">
          {T("gradeowl.bottom_cta")} <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
};

export default GradeOwl;
