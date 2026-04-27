import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Is AI grading accurate enough to replace manual checking for Indian board exams?",
    answer: "GradeOwl is built as a teacher's assistant, not a replacement. The AI applies your approved rubric consistently to every student and flags edge cases for review. Teachers approve every grade before it's finalized, so you stay in full control of outcomes while the AI handles the rote scoring.",
  },
  {
    question: "How does AI grading work for CBSE answer sheets?",
    answer: "You upload the question paper, the answer key (or a rubric you approve), and student answer sheets. GradeOwl's vision AI reads handwritten answers in Hindi or English, matches each response against the rubric, and produces marks plus per-question feedback. You review and approve before publishing results.",
  },
  {
    question: "What's the difference between CBSE and ICSE grading in GradeOwl?",
    answer: "Both boards use rubric-based subjective evaluation, but the marking schemes differ. CBSE leans toward point-wise allocation, while ICSE leans toward competency descriptors. GradeOwl supports both: upload the rubric your board uses, and the AI applies it consistently across all students.",
  },
  {
    question: "Can GradeOwl reduce teacher burnout from copy checking?",
    answer: "That's the point. Teachers in Indian schools commonly spend 8 to 12 hours a week checking copies, often on weekends. GradeOwl is designed to give that time back by automating the rote scoring, so teachers can spend the hours that remain on high-value feedback for students who need it most.",
  },
  {
    question: "How do I switch from manual grading to AI-assisted grading?",
    answer: "Start with a single exam. Upload the question paper and answer key, let GradeOwl draft a rubric, edit it to match your school's standards, then upload student sheets. You'll know within one exam cycle whether the workflow fits your classroom, with no commitment beyond that.",
  },
  {
    question: "Does GradeOwl read handwritten Hindi answer sheets?",
    answer: "Yes. GradeOwl uses a combination of Gemini Vision and Sarvam (Indic-language OCR) to read handwritten Hindi, English, and mixed-language answers. Photo quality matters, so clear lighting and a flat sheet produce the best results.",
  },
  {
    question: "Is GradeOwl available for coaching institutes and test-series checkers?",
    answer: "Yes. The same workflow that grades school exams handles weekly mocks and test-series papers. Coaching institutes use GradeOwl to return graded mocks to students faster and surface question-level analytics across batches.",
  },
  {
    question: "How do I ensure consistent and fair grading across many students?",
    answer: "GradeOwl applies the same rubric to every student, with no fatigue, no ordering effects, and no unconscious bias from knowing whose paper it is. Similar answers are clustered together so you can review and adjust marks for whole groups at once, ensuring uniform marking.",
  },
  {
    question: "What does GradeOwl pricing look like for schools?",
    answer: "Currently free during early access. When paid plans launch, pricing will be per-school (not per-teacher), scaled to school size. Schools that join now lock in preferential rates when paid tiers begin.",
  },
  {
    question: "How is student data protected?",
    answer: "All data is stored on Google Cloud's Mumbai (asia-south1) region, within India. We comply with the Digital Personal Data Protection Act, 2023. Student answer sheets are processed only for grading and never used for advertising, training third-party AI models, or shared with marketing partners. Full details in the Privacy Policy.",
  },
];

const faqJsonLd: Record<string, unknown> = {
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

const Faq: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <SEO
        title="FAQ"
        description="Common questions about GradeOwl AI grading for Indian schools — accuracy vs manual checking, CBSE/ICSE support, teacher workload, pricing, and student data protection."
        keywords="GradeOwl FAQ, AI grading FAQ, ai grading cbse, manual vs ai grading india, teacher burnout india, automated answer checking india, rubric based grading"
        url="https://neuraconcept.com/faq"
        jsonLd={faqJsonLd}
      />

      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Frequently Asked <span className="text-apple-blue">Questions</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Honest answers about how GradeOwl helps Indian teachers grade subjective exams faster, without giving up control.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              id={`faq-${i + 1}`}
              className="bg-white p-8 rounded-2xl border border-gray-200 mb-6 scroll-mt-24"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <HelpCircle className="text-apple-blue" size={20} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug">
                    {faq.question}
                  </h2>
                  <p className="text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Join the early-access waitlist or write to us directly. We respond to every email.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/waitlist"
              className="bg-apple-blue hover:bg-apple-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Join the Waitlist <ArrowRight size={20} />
            </Link>
            <a
              href="mailto:dip@neuraconcept.com?subject=GradeOwl%20Question&body=Hi%20Dip%2C%0A%0A"
              className="border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-apple-blue font-bold px-8 py-4 rounded-lg transition-colors inline-block"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
