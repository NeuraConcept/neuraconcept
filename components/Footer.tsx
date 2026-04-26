import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';

const Footer: React.FC = () => {
  const { T } = useT();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-16 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-xl font-bold text-gray-900 tracking-tight">Neura<span className="text-gray-900">Concept</span></span>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              {T("footer.tagline")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">{T("footer.product")}</h4>
            <ul className="space-y-3">
              <li><Link to="/gradeowl" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.gradeowl")}</Link></li>
              <li><Link to="/technology" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.technology")}</Link></li>
              <li><Link to="/schools" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.schools")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">{T("footer.company")}</h4>
            <ul className="space-y-3">
              <li><Link to="/vision" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.vision")}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.about")}</Link></li>
              <li><a href="mailto:dip@neuraconcept.com" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.contact")}</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">{T("footer.connect")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://chat.whatsapp.com/HgeTpYJgkksAZYYOxwYMDj" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">
                  {T("footer.whatsapp")}
                </a>
              </li>
              <li><Link to="/waitlist" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.waitlist")}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">{T("footer.legal")}</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.privacy")}</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-apple-blue text-sm transition-colors">{T("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} {T("footer.copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
