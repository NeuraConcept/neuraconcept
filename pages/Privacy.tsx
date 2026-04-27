import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { ArrowUp } from 'lucide-react';
import { SEO } from '../components/SEO';

const sections = [
  { n: 1, title: 'Introduction' },
  { n: 2, title: 'Who This Policy Applies To' },
  { n: 3, title: 'Data We Collect' },
  { n: 4, title: 'How We Use Your Data' },
  { n: 5, title: "Children's Data Protection" },
  { n: 6, title: 'How We Share Your Data' },
  { n: 7, title: 'Data Storage and Security' },
  { n: 8, title: 'Data Retention and Deletion' },
  { n: 9, title: 'Your Rights Under the DPDPA' },
  { n: 10, title: 'Cookies and Tracking Technologies' },
  { n: 11, title: 'Changes to This Privacy Policy' },
  { n: 12, title: 'Grievance Redressal' },
  { n: 13, title: 'Contact Us' },
];

const Privacy: React.FC = () => {
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
        title={T("nav.privacy")}
        description="NeuraConcept Privacy Policy - How we collect, use, store, and protect your personal data."
        keywords="GradeOwl privacy, NeuraConcept privacy policy, DPDPA, student data protection, Indian schools, AI grading privacy"
        url="https://neuraconcept.com/privacy"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900">
          Privacy Policy
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
            NeuraConcept ("we," "us," or "our") operates GradeOwl, an AI-powered subjective exam grading platform for Indian schools. This Privacy Policy explains how we collect, use, store, and protect personal data when you use our website (neuraconcept.com), mobile application, and related services (collectively, the "Service").
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            This policy is designed to comply with the Digital Personal Data Protection Act, 2023 (DPDPA) and the Digital Personal Data Protection Rules, 2025 (DPDP Rules) of India. In this policy, "Data Principal" refers to the individual whose personal data is being processed (teachers, administrators, students, or parents/guardians), and "Data Fiduciary" refers to NeuraConcept.
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            By using GradeOwl, you acknowledge that you have read and understood this Privacy Policy.
          </p>

          {/* Section 2 */}
          <h2 id="section-2" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">2. Who This Policy Applies To</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">GradeOwl is used by:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Teachers and School Administrators</strong> who create accounts, upload question papers, answer keys, and student answer sheets for AI-assisted grading.</li>
            <li><strong className="text-gray-700">Schools</strong> that subscribe to the Service on behalf of their staff.</li>
            <li><strong className="text-gray-700">Students</strong> whose answer sheets (handwritten pages photographed by teachers) are uploaded and graded through the platform. Students do not directly create accounts or interact with the Service.</li>
            <li><strong className="text-gray-700">Parents and Guardians</strong> of students, who have rights over their children's data under Indian law.</li>
          </ul>

          {/* Section 3 */}
          <h2 id="section-3" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">3. Data We Collect</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">3.1 Teacher and Administrator Data</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">When teachers or administrators register and use GradeOwl, we collect:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Account information:</strong> Full name, email address, WhatsApp number</li>
            <li><strong className="text-gray-700">School information:</strong> School name, board affiliation (CBSE, ICSE, State Board)</li>
            <li><strong className="text-gray-700">Authentication data:</strong> Information from Firebase Authentication (Google Sign-In or email/password credentials). We do not store passwords directly; authentication is handled by Google Firebase.</li>
            <li><strong className="text-gray-700">Usage data:</strong> Features used, grading sessions created, timestamps of activity</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">3.2 Student Data</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">When teachers upload student answer sheets for grading, the following student data is processed:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Identity information:</strong> Student name, roll number, class/section</li>
            <li><strong className="text-gray-700">School information:</strong> School name (associated with the teacher's account)</li>
            <li><strong className="text-gray-700">Academic content:</strong> Photographs of handwritten answer sheets, AI-generated grades and scores, rubric-based feedback</li>
          </ul>
          <p className="text-gray-500 mb-4 leading-relaxed">
            <strong className="text-gray-700">Important:</strong> Students do not create accounts on GradeOwl. Student data is uploaded by their teachers as part of the exam grading workflow. Students are minors (typically classes 6 through 12, ages approximately 11 to 18).
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">3.3 Automatically Collected Data</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">When you access the Service, we may automatically collect:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Device information:</strong> Device type, operating system, browser type</li>
            <li><strong className="text-gray-700">Log data:</strong> IP address, access times, pages viewed</li>
            <li><strong className="text-gray-700">Crash and performance data:</strong> Error logs to improve service reliability</li>
          </ul>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We do not use tracking cookies for advertising. Any cookies used are strictly functional (session management, authentication tokens).
          </p>

          {/* Section 4 */}
          <h2 id="section-4" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">4. How We Use Your Data</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">We use the data we collect for the following purposes:</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-900 font-semibold">Purpose</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-900 font-semibold">Data Used</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-900 font-semibold">Legal Basis (DPDPA)</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Providing the grading service</td>
                  <td className="border border-gray-200 px-4 py-2">Answer sheet images, student names, roll numbers, grades</td>
                  <td className="border border-gray-200 px-4 py-2">Consent (via school/teacher)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Account creation and authentication</td>
                  <td className="border border-gray-200 px-4 py-2">Teacher name, email, WhatsApp number</td>
                  <td className="border border-gray-200 px-4 py-2">Consent</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Communicating service updates</td>
                  <td className="border border-gray-200 px-4 py-2">Email, WhatsApp number</td>
                  <td className="border border-gray-200 px-4 py-2">Consent</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Improving AI grading accuracy</td>
                  <td className="border border-gray-200 px-4 py-2">Anonymized and aggregated grading patterns</td>
                  <td className="border border-gray-200 px-4 py-2">Legitimate use (service improvement)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Technical support and troubleshooting</td>
                  <td className="border border-gray-200 px-4 py-2">Usage logs, device info, error reports</td>
                  <td className="border border-gray-200 px-4 py-2">Legitimate use (service delivery)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Billing and subscription management</td>
                  <td className="border border-gray-200 px-4 py-2">School name, administrator contact details</td>
                  <td className="border border-gray-200 px-4 py-2">Contractual necessity</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Complying with legal obligations</td>
                  <td className="border border-gray-200 px-4 py-2">As required by applicable law</td>
                  <td className="border border-gray-200 px-4 py-2">Legal obligation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-500 mb-2 leading-relaxed"><strong className="text-gray-700">What we do NOT do with your data:</strong></p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>We do not sell personal data to third parties.</li>
            <li>We do not use student data for advertising or marketing.</li>
            <li>We do not engage in behavioral tracking, profiling, or targeted advertising directed at students, in compliance with Section 9 of the DPDPA.</li>
            <li>We do not use student answer sheets or grades for any purpose other than providing the grading service to the teacher and school that uploaded them.</li>
          </ul>

          {/* Section 5 */}
          <h2 id="section-5" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">5. Children's Data Protection</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Since GradeOwl processes data of students who are minors (under 18 years of age), we take the following measures in compliance with Section 9 of the DPDPA:
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">5.1 Consent Through Schools</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Student data is uploaded to GradeOwl by teachers employed by schools that have subscribed to the Service. Schools act as intermediaries responsible for obtaining appropriate consent or authorization from parents or guardians for the processing of student data as part of the school's educational activities.
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            When a school subscribes to GradeOwl, we require the school to confirm that it has obtained the necessary parental or guardian consent (or has the authority under its institutional policies) to use AI-assisted grading tools for its students.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">5.2 No Tracking or Profiling of Children</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">In strict compliance with the DPDPA, we:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Do not track or monitor student behavior</li>
            <li>Do not build student profiles for any purpose beyond the specific grading session</li>
            <li>Do not serve advertisements of any kind to students</li>
            <li>Do not process student data in any way that could have a detrimental effect on a child's well-being</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">5.3 Minimal Data Collection</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We collect only the student data necessary to perform grading: name, roll number, and answer sheet images. We do not collect student contact information, biometric data, or any data beyond what is needed for the grading service.
          </p>

          {/* Section 6 */}
          <h2 id="section-6" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">6. How We Share Your Data</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">We share personal data only in the following circumstances:</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6.1 Third-Party Service Providers</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">We use the following third-party services to operate GradeOwl:</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-900 font-semibold">Provider</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-900 font-semibold">Service</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-900 font-semibold">Data Shared</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-900 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Google Cloud Platform (GCP)</td>
                  <td className="border border-gray-200 px-4 py-2">Cloud infrastructure, data storage, compute</td>
                  <td className="border border-gray-200 px-4 py-2">All service data (encrypted)</td>
                  <td className="border border-gray-200 px-4 py-2">asia-south1 (Mumbai, India)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Google Cloud SQL</td>
                  <td className="border border-gray-200 px-4 py-2">Database hosting (PostgreSQL)</td>
                  <td className="border border-gray-200 px-4 py-2">Structured data (accounts, grades)</td>
                  <td className="border border-gray-200 px-4 py-2">asia-south1 (Mumbai, India)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Google Cloud Storage (GCS)</td>
                  <td className="border border-gray-200 px-4 py-2">File storage</td>
                  <td className="border border-gray-200 px-4 py-2">Answer sheet images</td>
                  <td className="border border-gray-200 px-4 py-2">asia-south1 (Mumbai, India)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Google Gemini AI</td>
                  <td className="border border-gray-200 px-4 py-2">AI-powered grading and OCR</td>
                  <td className="border border-gray-200 px-4 py-2">Answer sheet images, question papers, rubrics</td>
                  <td className="border border-gray-200 px-4 py-2">Google's API infrastructure</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Firebase Authentication</td>
                  <td className="border border-gray-200 px-4 py-2">User login and identity</td>
                  <td className="border border-gray-200 px-4 py-2">Email, authentication tokens</td>
                  <td className="border border-gray-200 px-4 py-2">Google infrastructure</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 mb-4 leading-relaxed">
            All third-party providers are bound by data processing agreements and are required to process data only as instructed by us, in accordance with DPDPA requirements for data processors.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6.2 AI Processing Disclosure</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            GradeOwl uses Google Gemini AI to read handwritten answer sheets (OCR) and grade them against rubrics provided by teachers. When answer sheet images are sent to the Gemini API for processing:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>The data is used solely for the purpose of generating grading results.</li>
            <li>We do not opt in to any programs that allow Google to use this data for training AI models.</li>
            <li>Grading results are returned to the teacher through the GradeOwl platform.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6.3 Other Disclosures</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">We may disclose personal data if required to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Comply with applicable laws, regulations, or legal processes in India</li>
            <li>Respond to lawful requests from government authorities</li>
            <li>Protect the rights, safety, or property of NeuraConcept, our users, or the public</li>
          </ul>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We do not share personal data with advertisers, data brokers, or any party for marketing purposes.
          </p>

          {/* Section 7 */}
          <h2 id="section-7" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">7. Data Storage and Security</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">7.1 Data Location</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            All data is stored on Google Cloud Platform infrastructure located in the <strong className="text-gray-700">asia-south1 (Mumbai, India)</strong> region. This means your data is stored within India.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">7.2 Security Measures</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We implement appropriate technical and organizational security measures, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Encryption in transit:</strong> All data transmitted between your device and our servers is encrypted using TLS/HTTPS.</li>
            <li><strong className="text-gray-700">Encryption at rest:</strong> Data stored in Cloud SQL and Cloud Storage is encrypted at rest using Google-managed encryption keys.</li>
            <li><strong className="text-gray-700">Access controls:</strong> Role-based access controls limit who within our team can access personal data.</li>
            <li><strong className="text-gray-700">Authentication security:</strong> Passwords are never stored by us; authentication is handled through Firebase with industry-standard security practices. Backend sessions use short-lived JWT tokens (15-minute expiry) with secure refresh token rotation.</li>
            <li><strong className="text-gray-700">Infrastructure security:</strong> Our services run on Google Cloud Run with managed security patching and monitoring.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">7.3 Data Breach Response</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">In the event of a personal data breach, we will:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Notify the Data Protection Board of India and affected Data Principals without unreasonable delay, as required under the DPDPA and DPDP Rules.</li>
            <li>Provide a clear description of the breach, its likely impact, and the steps we are taking to address it.</li>
            <li>Submit a detailed report to the Board within 72 hours of becoming aware of the breach.</li>
          </ul>

          {/* Section 8 */}
          <h2 id="section-8" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">8. Data Retention and Deletion</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">8.1 Retention Periods</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We retain personal data only for as long as necessary to fulfill the purposes described in this policy:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Teacher accounts:</strong> Data is retained for the duration of the school's active subscription and for a reasonable period afterward (up to 12 months) to allow for reactivation. After this period, data is deleted upon request or automatically.</li>
            <li><strong className="text-gray-700">Student answer sheets and grades:</strong> Retained for the duration of the school's active subscription to allow teachers to review past results. Schools and teachers can request deletion of specific student data at any time.</li>
            <li><strong className="text-gray-700">Usage logs and technical data:</strong> Retained for up to 12 months for service improvement and debugging purposes.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">8.2 Your Right to Deletion</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Under the DPDPA, you have the right to request erasure of your personal data. Upon receiving a valid deletion request:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>We will delete or anonymize the relevant personal data within 30 days.</li>
            <li>We will notify you at least 48 hours before completing the deletion.</li>
            <li>We will also ensure deletion is carried out by any data processors who have received the data.</li>
            <li>Certain data may be retained if required by law.</li>
          </ul>
          <p className="text-gray-500 mb-4 leading-relaxed">
            To request deletion, contact us at <strong className="text-gray-700">privacy@neuraconcept.com</strong>.
          </p>

          {/* Section 9 */}
          <h2 id="section-9" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">9. Your Rights Under the DPDPA</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            As a Data Principal under the Digital Personal Data Protection Act, 2023, you have the following rights:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-500">
            <li><strong className="text-gray-700">Right to Access:</strong> You can request a summary of the personal data we process about you and the identities of third parties with whom it has been shared.</li>
            <li><strong className="text-gray-700">Right to Correction:</strong> You can request that we correct inaccurate or incomplete personal data.</li>
            <li><strong className="text-gray-700">Right to Erasure:</strong> You can request deletion of your personal data, subject to legal retention requirements.</li>
            <li><strong className="text-gray-700">Right to Withdraw Consent:</strong> You can withdraw your consent to data processing at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before the withdrawal.</li>
            <li><strong className="text-gray-700">Right to Grievance Redressal:</strong> You have the right to an accessible means of registering grievances with us. We will respond to grievances within 30 days (and in any case within 90 days as required by law).</li>
            <li><strong className="text-gray-700">Right to Nominate:</strong> You can nominate another individual to exercise your data rights on your behalf in the event of your death or incapacity.</li>
          </ol>
          <p className="text-gray-500 mb-4 leading-relaxed">
            <strong className="text-gray-700">For students (minors):</strong> Parents or lawful guardians may exercise these rights on behalf of their children. Schools may also facilitate requests on behalf of parents.
          </p>
          <p className="text-gray-500 mb-4 leading-relaxed">
            To exercise any of these rights, contact us at <strong className="text-gray-700">privacy@neuraconcept.com</strong>.
          </p>

          {/* Section 10 */}
          <h2 id="section-10" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">10. Cookies and Tracking Technologies</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            GradeOwl uses only essential cookies and local storage necessary for the functioning of the Service:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Authentication tokens:</strong> To keep you logged in securely during your session.</li>
            <li><strong className="text-gray-700">Session cookies:</strong> To maintain your active session state.</li>
          </ul>
          <p className="text-gray-500 mb-4 leading-relaxed">We do not use:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>Advertising or marketing cookies</li>
            <li>Third-party tracking pixels</li>
            <li>Analytics cookies that track individual user behavior across websites</li>
          </ul>

          {/* Section 11 */}
          <h2 id="section-11" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">11. Changes to This Privacy Policy</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make changes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>We will update the "Last Updated" date at the top of this page.</li>
            <li>For significant changes, we will notify registered users via email or an in-app notification.</li>
            <li>Continued use of the Service after changes take effect constitutes acceptance of the updated policy.</li>
          </ul>

          {/* Section 12 */}
          <h2 id="section-12" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">12. Grievance Redressal</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            If you have any concerns about how your personal data is being processed, you may contact our Grievance Officer:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
            <p className="text-gray-700 mb-1"><strong>Grievance Officer:</strong> Dip Turkar</p>
            <p className="text-gray-700 mb-1"><strong>Email:</strong> privacy@neuraconcept.com</p>
            <p className="text-gray-700"><strong>Address:</strong> NeuraConcept, Bangalore, Karnataka, India</p>
          </div>
          <p className="text-gray-500 mb-4 leading-relaxed">
            We will acknowledge your grievance within 7 days and resolve it within 30 days of receipt. If you are not satisfied with our response, you may file a complaint with the Data Protection Board of India as established under the DPDPA.
          </p>

          {/* Section 13 */}
          <h2 id="section-13" className="text-2xl font-bold mt-12 mb-4 text-gray-900 scroll-mt-24">13. Contact Us</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">For any questions or concerns about this Privacy Policy:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li><strong className="text-gray-700">Privacy inquiries:</strong> privacy@neuraconcept.com</li>
            <li><strong className="text-gray-700">General support:</strong> support@neuraconcept.com</li>
            <li><strong className="text-gray-700">Website:</strong> neuraconcept.com</li>
          </ul>

          <p className="text-gray-500 mt-4 leading-relaxed">
            Also see our <Link to="/terms" className="text-apple-blue hover:underline">Terms of Service</Link>.
          </p>

          <hr className="my-12 border-gray-200" />
          <p className="text-gray-400 text-sm">
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

export default Privacy;
