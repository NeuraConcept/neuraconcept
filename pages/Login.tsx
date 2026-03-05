import React, { useState } from 'react';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from 'talkr';
import { SEO } from '../components/SEO';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { T } = useT();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center px-6">
      <SEO
        title={T("nav.login")}
        description={T("login.seo_desc")}
      />
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{T("login.title")}</h2>
          <p className="text-gray-400">{T("login.subtitle")}</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">{T("login.email")}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-colors"
                placeholder={T("login.email_placeholder")}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-600">{T("login.password")}</label>
              <a href="#" className="text-xs text-apple-blue hover:text-apple-blue-dark">{T("login.forgot")}</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="w-full bg-apple-blue hover:bg-apple-blue-dark text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            {T("login.submit")} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          {T("login.no_account")} <Link to="/schools" className="text-apple-blue hover:text-apple-blue-dark font-medium">{T("login.contact_sales")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
