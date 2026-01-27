import React, { useState } from 'react';
import { Cpu, ArrowRight, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 mb-4">
              <Cpu className="text-cyan-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to your dashboard</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="name@school.edu"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-400">Password</label>
                <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account? <Link to="/schools" className="text-white hover:text-cyan-400 font-medium">Contact Sales</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
