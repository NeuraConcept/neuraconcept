import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Scale, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

const coachingJsonLd = {
  "@type": "Service",
  "serviceType": "AI-powered test series and mock test grading",
  "provider": {
    "@type": "Organization",
    "name": "NeuraConcept",
  },
  "areaServed": "India",
  "audience": {
    "@type": "Audience",
    "audienceType": "Coaching Institutes, Tutoring Centers",
  },
};

const CoachingInstitutes: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: "Faster mock turnaround",
      description:
        "Grade weekly mocks in hours instead of weekends. Students get feedback while the test is still fresh in their minds.",
    },
    {
      icon: Scale,
      title: "Consistent across batches",
      description:
        "The same rubric applies to every student in every batch. No fatigue bias, no inconsistency between morning and evening sections.",
    },
    {
      icon: BarChart3,
      title: "Question-level analytics",
      description:
        "See exactly which questions students struggled with across batches. Identify topic gaps before the next mock — and adjust your teaching plan.",
    },
  ];

  const useCases = [
    {
      title: "JEE / NEET test series",
      description:
        "Grade weekly full-length mocks across all batches and return scored sheets within 24 hours, with consistent rubric-based marking applied to every student.",
    },
    {
      title: "Foundation course mock tests (Class 8–10 pre-board prep)",
      description:
        "Run rubric-based subjective grading that stays consistent across teachers, so a Class 9 student in one batch is held to the same standard as another.",
    },
    {
      title: "Olympiad and scholarship test prep",
      description:
        "Get detailed per-question analytics to identify exactly which concepts need reinforcement before the next round, instead of guessing from raw scores.",
    },
    {
      title: "Multi-center coaching chains",
      description:
        "Standardize grading across all branches with the same rubric — automated answer checking that lets you compare batch performance across cities, fairly.",
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <SEO
        title="Coaching Institutes"
        description="GradeOwl for coaching institutes — automated test series grading, mock test checking, rubric-based marking. Built for JEE/NEET prep centers and multi-batch tutoring chains across India."
        keywords="test series grading tool india, mock test checking automation, ai grading coaching institute, automated answer checking india, JEE NEET mock grading, coaching institute software"
        url="https://neuraconcept.com/coaching-institutes"
        jsonLd={coachingJsonLd}
      />

      <div className="container mx-auto px-6">
        {/* Hero */}
        <section className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-apple-blue font-semibold mb-4">
            For Coaching Institutes
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
            Built for <span className="text-apple-blue">test series and mock test grading</span> at scale.
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-10">
            Coaching institutes run weekly mocks and test series for hundreds of students. GradeOwl is a test series grading tool for India that grades them in a fraction of the time, with consistent rubric-based marking — so students get faster feedback and instructors stop losing weekends to copy-checking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/waitlist"
              className="bg-apple-blue hover:bg-apple-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Join the Waitlist <ArrowRight size={18} />
            </Link>
            <Link
              to="/gradeowl"
              className="border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-apple-blue font-bold px-8 py-4 rounded-lg transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </section>

        {/* Feature cards */}
        <section className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors"
            >
              <feature.icon className="text-apple-blue mb-6" size={40} />
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Use cases */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for the way coaching works
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Mock test checking automation that fits how Indian coaching institutes actually operate — weekly cycles, multiple batches, and exams that need to be returned fast.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12">
            <ul className="space-y-8">
              {useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle className="text-apple-blue shrink-0 mt-1" size={22} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-500">{useCase.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center bg-white border border-gray-200 rounded-3xl p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-3xl mx-auto">
            Ready to grade your next mock in hours, not weekends?
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Join the waitlist for AI grading built for coaching institutes — automated answer checking for India's toughest test series, with consistent grading across batches.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/waitlist"
              className="bg-apple-blue hover:bg-apple-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Join the Waitlist <ArrowRight size={18} />
            </Link>
            <Link
              to="/gradeowl"
              className="border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-apple-blue font-bold px-8 py-4 rounded-lg transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoachingInstitutes;
