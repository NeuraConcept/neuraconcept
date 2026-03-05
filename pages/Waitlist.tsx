import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';
import { MessageCircle, Users, ArrowRight, CheckCircle, Phone, School, BookOpen, User } from 'lucide-react';

const Waitlist: React.FC = () => {
  const { T } = useT();
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    phone: '',
    board: '',
    subjects: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success state
    // TODO: Connect to backend or Google Sheets API
    setSubmitted(true);
  };

  const benefits = ["waitlist.benefit_1", "waitlist.benefit_2", "waitlist.benefit_3"];

  return (
    <div className="pt-24 pb-20">
      <SEO
        title={T("nav.waitlist")}
        description={T("waitlist.seo_desc")}
        keywords={T("waitlist.seo_keywords")}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {T("waitlist.title_1")}<span className="text-apple-blue">{T("waitlist.title_2")}</span>{T("waitlist.title_3")}
          </h1>
          <p className="text-lg text-gray-400">
            {T("waitlist.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Left: WhatsApp CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6">
                <MessageCircle className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{T("waitlist.whatsapp_title")}</h2>
              <p className="text-gray-500 mb-6">
                {T("waitlist.whatsapp_desc")}
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((key, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="text-emerald-600 flex-shrink-0" size={18} />
                    <span>{T(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="https://chat.whatsapp.com/HgeTpYJgkksAZYYOxwYMDj"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-emerald-700 inline-flex items-center justify-center gap-2 w-full"
            >
              <MessageCircle size={20} />
              {T("waitlist.whatsapp_cta")}
            </a>
            <p className="text-sm text-gray-400 text-center mt-3">
              <Users size={14} className="inline mr-1" />
              {T("waitlist.teachers_count")}
            </p>
          </div>

          {/* Right: Signup Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-apple-blue" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{T("waitlist.success_title")}</h2>
                <p className="text-gray-400 mb-6">{T("waitlist.success_desc")}</p>
                <a
                  href="https://chat.whatsapp.com/HgeTpYJgkksAZYYOxwYMDj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  {T("waitlist.success_cta")}
                </a>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{T("waitlist.form_title")}</h2>
                <p className="text-gray-400 mb-6">{T("waitlist.form_subtitle")}</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      <User size={14} className="inline mr-1" />
                      {T("waitlist.name_label")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      placeholder={T("waitlist.name_placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      <School size={14} className="inline mr-1" />
                      {T("waitlist.school_label")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.school}
                      onChange={(e) => setFormData({...formData, school: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      placeholder={T("waitlist.school_placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      <Phone size={14} className="inline mr-1" />
                      {T("waitlist.phone_label")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      placeholder={T("waitlist.phone_placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      <BookOpen size={14} className="inline mr-1" />
                      {T("waitlist.board_label")}
                    </label>
                    <select
                      required
                      value={formData.board}
                      onChange={(e) => setFormData({...formData, board: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent bg-white"
                    >
                      <option value="">{T("waitlist.board_default")}</option>
                      <option value="CBSE">{T("waitlist.board_cbse")}</option>
                      <option value="ICSE">{T("waitlist.board_icse")}</option>
                      <option value="Karnataka">{T("waitlist.board_karnataka")}</option>
                      <option value="Other State">{T("waitlist.board_other_state")}</option>
                      <option value="Other">{T("waitlist.board_other")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">{T("waitlist.subjects_label")}</label>
                    <input
                      type="text"
                      value={formData.subjects}
                      onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      placeholder={T("waitlist.subjects_placeholder")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-apple-blue text-white font-semibold py-3.5 rounded-xl hover:bg-apple-blue-dark transition-colors flex items-center justify-center gap-2"
                  >
                    {T("waitlist.submit")} <ArrowRight size={18} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
