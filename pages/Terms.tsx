import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { ArrowUp } from 'lucide-react';
import { SEO } from '../components/SEO';

const sections = [
  { n: 1, title: 'Introduction' },
  { n: 2, title: 'Definitions' },
  { n: 3, title: 'Service Description' },
  { n: 4, title: 'AI Grading Disclaimer' },
  { n: 5, title: 'Account Registration and Responsibilities' },
  { n: 6, title: 'Subscription and Payment' },
  { n: 7, title: 'Acceptable Use Policy' },
  { n: 8, title: 'Intellectual Property' },
  { n: 9, title: 'Data Handling and Privacy' },
  { n: 10, title: 'Service Availability and Modifications' },
  { n: 11, title: 'Limitation of Liability' },
  { n: 12, title: 'Indemnification' },
  { n: 13, title: 'Termination' },
  { n: 14, title: 'Dispute Resolution' },
  { n: 15, title: 'General Provisions' },
  { n: 16, title: 'Changes to These Terms' },
  { n: 17, title: 'Contact Us' },
];

const Terms: React.FC = () => {
  const { T } = useT();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <SEO
        title={T("footer.terms")}
        description="NeuraConcept Terms of Service - Terms governing your use of GradeOwl."
        keywords="GradeOwl terms, NeuraConcept terms of service, AI grading terms, school subscription terms, India edtech"
        url="https://neuraconcept.com/terms"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900">
          Terms of Service
        </h1>
        <p className="text-center text-gray-500 mb-12">
          <strong>Effective Date:</strong> April 2026 &middot; <strong>Last Updated:</strong> April 2026
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {sections.map((s) => (
              <a
                key={s.n}
                href={`#section-${s.n}`}
                className="text-apple-blue hover:underline text-sm"
              >
                {s.n}. {s.title}
              </a>
            ))}
          </div>
        </div>

        <div className="prose prose-lg">
          {/* Section 1 */}
          <h2 id="section-1" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">1. Introduction</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            These Terms of Service ("Terms") govern your access to and use of GradeOwl, an AI-powered subjective exam grading platform operated by NeuraConcept ("we," "us," or "our"). GradeOwl is designed for Indian schools following CBSE, ICSE, and State Board curricula.
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            By creating an account or using the Service, you agree to be bound by these Terms. If you are using the Service on behalf of a school or educational institution, you represent that you have the authority to bind that institution to these Terms.
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            If you do not agree with these Terms, do not use the Service.
          </p>

          {/* Section 2 */}
          <h2 id="section-2" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">"Service"</strong> means the GradeOwl platform, including the web application, mobile application, API, and all related tools and features provided by NeuraConcept.</li>
            <li><strong className="text-gray-700">"User"</strong> means any teacher, school administrator, or authorized individual who creates an account and uses the Service.</li>
            <li><strong className="text-gray-700">"School"</strong> means the educational institution that subscribes to the Service.</li>
            <li><strong className="text-gray-700">"Content"</strong> means any data, text, images, or other materials uploaded to or generated through the Service, including question papers, answer keys, rubrics, answer sheet photographs, and grading results.</li>
            <li><strong className="text-gray-700">"AI Grading"</strong> means the automated assessment of student answer sheets using artificial intelligence, specifically Google Gemini AI, as part of the Service.</li>
          </ul>

          {/* Section 3 */}
          <h2 id="section-3" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">3. Service Description</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            GradeOwl provides the following capabilities to subscribed schools and their authorized teachers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Exam setup:</strong> Teachers upload question papers and answer keys or rubrics.</li>
            <li><strong className="text-gray-700">Answer sheet processing:</strong> Teachers photograph and upload student handwritten answer sheets.</li>
            <li><strong className="text-gray-700">AI-assisted grading:</strong> The Service uses AI (Google Gemini) to read handwritten answers via OCR and grade them against the provided rubrics.</li>
            <li><strong className="text-gray-700">Review and adjustment:</strong> Teachers review AI-generated grades, make adjustments, and finalize results.</li>
            <li><strong className="text-gray-700">Results management:</strong> Teachers access and manage grading results for their classes.</li>
          </ul>

          {/* Section 4 - AI Disclaimer (emphasized) */}
          <h2 id="section-4" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">4. AI Grading Disclaimer</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-blue-900 font-semibold mb-4">
              GradeOwl's AI grading is assistive, not authoritative. The teacher always has the final say.
            </p>
            <p className="text-gray-600 mb-3">By using the Service, you acknowledge and agree that:</p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li><strong className="text-gray-700">AI grading is a tool, not a replacement for teacher judgment.</strong> AI-generated grades and feedback are suggestions based on the rubric and answer key provided. They may contain errors, inaccuracies, or misinterpretations, particularly with handwritten text.</li>
              <li><strong className="text-gray-700">Teachers are responsible for reviewing and finalizing all grades.</strong> The Service is designed so that teachers review every AI-generated result before it is considered final. NeuraConcept is not responsible for academic outcomes resulting from grades that were not reviewed by a teacher.</li>
              <li><strong className="text-gray-700">AI accuracy depends on input quality.</strong> The quality of AI grading depends on the clarity of the uploaded answer sheet photographs, the specificity of the rubrics provided, and the legibility of student handwriting. Poor input quality may lead to inaccurate results.</li>
              <li><strong className="text-gray-700">AI does not make subjective pedagogical decisions.</strong> Decisions about partial credit, grading leniency, and academic judgment remain entirely with the teacher.</li>
              <li><strong className="text-gray-700">No guarantee of accuracy.</strong> While we strive to improve grading accuracy continuously, we do not guarantee that AI-generated grades will be correct in every case.</li>
            </ol>
          </div>

          {/* Section 5 */}
          <h2 id="section-5" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">5. Account Registration and Responsibilities</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">5.1 Account Creation</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            To use GradeOwl, you must create an account using a valid email address or Google account through Firebase Authentication. You must provide accurate and complete information during registration.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">5.2 Account Security</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Maintaining the confidentiality of your account credentials.</li>
            <li>All activity that occurs under your account.</li>
            <li>Notifying us immediately at support@neuraconcept.com if you suspect unauthorized access to your account.</li>
          </ul>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We are not liable for any loss or damage arising from unauthorized use of your account due to your failure to safeguard your credentials.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">5.3 Teacher Authorization</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Schools are responsible for ensuring that only authorized teachers and staff have access to the Service under the school's subscription. If a teacher leaves the school or their authorization is revoked, the school administrator should notify us to deactivate or transfer the account.
          </p>

          {/* Section 6 */}
          <h2 id="section-6" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">6. Subscription and Payment</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6.1 Subscription Model</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            GradeOwl operates on a per-school subscription basis. Subscription details, pricing, and features included in each plan are communicated at the time of purchase and may be updated from time to time.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6.2 Payment Terms</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Payment terms (amount, billing cycle, payment method) are specified in the subscription agreement between NeuraConcept and the subscribing school.</li>
            <li>All fees are quoted in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
            <li>Subscriptions must be paid in advance for the applicable billing period.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6.3 Refunds</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Refund requests are handled on a case-by-case basis. If you believe you are entitled to a refund, contact us at support@neuraconcept.com within 14 days of the payment date.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6.4 Changes to Pricing</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We may update subscription pricing with reasonable advance notice (at least 30 days). Updated pricing applies to the next billing cycle, not the current one.
          </p>

          {/* Section 7 */}
          <h2 id="section-7" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">7. Acceptable Use Policy</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            You agree to use the Service only for its intended purpose: grading student answer sheets for legitimate educational purposes within your school.
          </p>
          <p className="text-gray-500 mb-2 leading-relaxed"><strong className="text-gray-700">You must NOT:</strong></p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Upload content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable.</li>
            <li>Upload answer sheets or data of students without proper authorization from the school and, where required, consent from parents or guardians.</li>
            <li>Attempt to reverse-engineer, decompile, or extract the source code of the Service or its AI models.</li>
            <li>Use the Service to develop competing products or for any commercial purpose other than your school's internal grading needs.</li>
            <li>Share your account credentials with unauthorized individuals.</li>
            <li>Use automated tools (bots, scrapers) to access the Service, except through our official API if provided.</li>
            <li>Deliberately submit misleading inputs to manipulate or test the AI grading system for purposes unrelated to actual student assessment.</li>
            <li>Use the Service in violation of any applicable law, including but not limited to the Digital Personal Data Protection Act, 2023, and the Information Technology Act, 2000.</li>
          </ul>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate this Acceptable Use Policy.
          </p>

          {/* Section 8 */}
          <h2 id="section-8" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">8. Intellectual Property</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">8.1 Your Content</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            <strong className="text-gray-700">You and your school retain full ownership of all Content you upload to GradeOwl.</strong> This includes question papers, answer keys, rubrics, student answer sheet photographs, and any associated educational materials.
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            By uploading Content, you grant NeuraConcept a limited, non-exclusive license to process, store, and transmit that Content solely for the purpose of providing the Service to you. This license terminates when you delete the Content or your subscription ends (subject to the data retention periods described in our Privacy Policy).
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We do not claim ownership of your Content. We do not use your Content to train AI models. We do not share your Content with other schools or users.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">8.2 Our Intellectual Property</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            The Service, including its design, software, AI models, algorithms, user interface, documentation, and branding (including the names "NeuraConcept" and "GradeOwl"), is owned by NeuraConcept and protected by applicable intellectual property laws.
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Your subscription grants you a limited, non-exclusive, non-transferable right to use the Service during the subscription period. This right does not include any right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Copy, modify, or distribute the Service or its components.</li>
            <li>Use our trademarks or branding without written permission.</li>
            <li>Access the Service's underlying code or AI model weights.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">8.3 Feedback</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            If you provide suggestions, ideas, or feedback about the Service, we may use them to improve the Service without any obligation to compensate you.
          </p>

          {/* Section 9 */}
          <h2 id="section-9" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">9. Data Handling and Privacy</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Our collection, use, and protection of personal data is governed by our{' '}
            <Link to="/privacy" className="text-apple-blue hover:underline">Privacy Policy</Link>,
            which is incorporated into these Terms by reference. Key points:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>All data is stored in India (GCP asia-south1, Mumbai region).</li>
            <li>Student data is processed only for grading purposes.</li>
            <li>We comply with the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025.</li>
            <li>Schools are responsible for obtaining appropriate consent from parents or guardians for the processing of student data through the Service.</li>
            <li>We do not sell, rent, or share personal data with third parties for marketing.</li>
          </ul>
          <p className="text-gray-500 mb-4 leading-relaxed">
            By using the Service, you confirm that you have read and understood our{' '}
            <Link to="/privacy" className="text-apple-blue hover:underline">Privacy Policy</Link>.
          </p>

          {/* Section 10 */}
          <h2 id="section-10" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">10. Service Availability and Modifications</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">10.1 Availability</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We strive to keep GradeOwl available and reliable, but we do not guarantee uninterrupted or error-free access. The Service may be temporarily unavailable due to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Scheduled maintenance (we will provide advance notice where possible)</li>
            <li>Unplanned outages or technical issues</li>
            <li>Factors beyond our control (internet connectivity, third-party service disruptions)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">10.2 Modifications</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We may update, modify, or discontinue features of the Service from time to time. For significant changes that materially affect your use of the Service, we will provide reasonable advance notice.
          </p>

          {/* Section 11 */}
          <h2 id="section-11" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">11. Limitation of Liability</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            <strong className="text-gray-700">To the maximum extent permitted by applicable Indian law:</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-500">
            <li><strong className="text-gray-700">No liability for AI grading errors.</strong> NeuraConcept is not liable for any academic decisions, grade disputes, or consequences arising from AI-generated grades or feedback. Teachers are responsible for reviewing and finalizing all grades before they are communicated to students or used for academic decisions.</li>
            <li><strong className="text-gray-700">No indirect damages.</strong> NeuraConcept shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of revenue, or reputational harm, arising from your use of the Service.</li>
            <li><strong className="text-gray-700">Liability cap.</strong> Our total aggregate liability to you for any claims arising from or related to the Service shall not exceed the amount you (or your school) paid to NeuraConcept for the Service in the 12 months immediately preceding the event giving rise to the claim.</li>
            <li><strong className="text-gray-700">Service provided "as is."</strong> The Service is provided on an "as is" and "as available" basis. We disclaim all warranties, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
            <li><strong className="text-gray-700">Third-party services.</strong> We are not responsible for the availability, accuracy, or performance of third-party services (including Google Cloud Platform, Firebase, or Gemini AI) that the Service depends on.</li>
          </ol>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable Indian law.
          </p>

          {/* Section 12 */}
          <h2 id="section-12" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">12. Indemnification</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            You agree to indemnify and hold harmless NeuraConcept, its founders, employees, and agents from any claims, damages, losses, or expenses (including reasonable legal fees) arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Your violation of these Terms.</li>
            <li>Your use of the Service in a manner not authorized by these Terms.</li>
            <li>Your violation of any applicable law or regulation.</li>
            <li>Any dispute between you and a student, parent, or school arising from grades or results generated through the Service.</li>
            <li>Content you upload that infringes the intellectual property or privacy rights of any third party.</li>
          </ul>

          {/* Section 13 */}
          <h2 id="section-13" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">13. Termination</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">13.1 Termination by You</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            You may stop using the Service at any time. To formally cancel your subscription, contact us at support@neuraconcept.com. Cancellation takes effect at the end of the current billing period.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">13.2 Termination by Us</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">We may suspend or terminate your access to the Service if:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>You breach these Terms.</li>
            <li>Your school's subscription expires or payment is overdue.</li>
            <li>We are required to do so by law.</li>
            <li>We discontinue the Service (with reasonable advance notice).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">13.3 Effect of Termination</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">Upon termination:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Your right to access the Service ends immediately (or at the end of the billing period, as applicable).</li>
            <li>We will retain your data in accordance with our Privacy Policy and applicable law.</li>
            <li>You may request export or deletion of your data by contacting privacy@neuraconcept.com. We will process such requests within 30 days.</li>
          </ul>

          {/* Section 14 */}
          <h2 id="section-14" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">14. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">14.1 Governing Law</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of India.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">14.2 Dispute Resolution Process</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            In the event of any dispute arising from or relating to these Terms or the Service:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-500">
            <li><strong className="text-gray-700">Informal resolution:</strong> You agree to first contact us at support@neuraconcept.com and attempt to resolve the dispute informally within 30 days.</li>
            <li><strong className="text-gray-700">Mediation:</strong> If informal resolution fails, the parties agree to attempt mediation before pursuing litigation.</li>
            <li><strong className="text-gray-700">Jurisdiction:</strong> Any disputes that cannot be resolved through mediation shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.</li>
          </ol>

          {/* Section 15 */}
          <h2 id="section-15" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">15. General Provisions</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">15.1 Entire Agreement</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            These Terms, together with the Privacy Policy and any subscription agreement, constitute the entire agreement between you and NeuraConcept regarding the Service.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">15.2 Severability</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions remain in full force and effect.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">15.3 No Waiver</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or our right to enforce it later.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">15.4 Assignment</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            You may not assign or transfer your rights under these Terms without our written consent. We may assign our rights and obligations under these Terms in connection with a merger, acquisition, or sale of assets.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">15.5 Force Majeure</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            NeuraConcept shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including natural disasters, government actions, internet or infrastructure failures, or pandemics.
          </p>

          {/* Section 16 */}
          <h2 id="section-16" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">16. Changes to These Terms</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">We may update these Terms from time to time. When we make changes:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>We will update the "Last Updated" date at the top of this page.</li>
            <li>For material changes, we will notify registered users via email at least 15 days before the changes take effect.</li>
            <li>Continued use of the Service after changes take effect constitutes acceptance of the updated Terms. If you do not agree with the updated Terms, you must stop using the Service.</li>
          </ul>

          {/* Section 17 */}
          <h2 id="section-17" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">17. Contact Us</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">For questions about these Terms:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">General support:</strong> support@neuraconcept.com</li>
            <li><strong className="text-gray-700">Privacy inquiries:</strong> privacy@neuraconcept.com</li>
            <li><strong className="text-gray-700">Website:</strong> neuraconcept.com</li>
          </ul>

          <hr className="my-12 border-gray-200" />
          <p className="text-gray-500 text-sm">
            NeuraConcept<br />
            Bangalore, Karnataka, India
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-apple-blue hover:bg-apple-blue-dark text-white shadow-lg flex items-center justify-center transition-opacity z-50 ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Terms;
