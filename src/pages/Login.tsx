import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { demoPatient, demoDoctor } from '../data/sampleData';
import { t } from '../utils/translations';
import AppLogo from '../components/AppLogo';

export default function Login() {
  const navigate = useNavigate();
  const { login, preferences } = useApp();
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your mobile number or username');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Demo auth logic
    if (role === 'patient') {
      login({ ...demoPatient, phone: identifier });
    } else {
      login({ ...demoDoctor, email: identifier });
    }
    // After login, show preferences page first as per user flow
    navigate('/preferences');
  };

  const handleQuickDemoLogin = (demoRole: 'patient' | 'doctor') => {
    if (demoRole === 'patient') {
      login(demoPatient);
    } else {
      login(demoDoctor);
    }
    navigate('/preferences');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-8 max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <AppLogo size="lg" className="drop-shadow-sm" />
        </div>
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
          <span>Rural Health Portal</span>
          <span>•</span>
          <span>గ్రామీణ ఆరోగ్య సేవ</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Simple, accessible healthcare for you and your family
        </p>
      </div>

      {/* Role Toggle Tabs */}
      <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 flex">
        <button
          type="button"
          onClick={() => { setRole('patient'); setError(''); }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            role === 'patient'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User size={18} />
          <span>Patient Login</span>
        </button>
        <button
          type="button"
          onClick={() => { setRole('doctor'); setError(''); }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            role === 'doctor'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Stethoscope size={18} />
          <span>Doctor Login</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {role === 'patient' ? 'Welcome Patient' : 'Doctor Portal Login'}
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Enter your registered details to continue
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              {role === 'patient' ? 'Mobile Number / Username' : 'Doctor ID / Email'}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === 'patient' ? 'e.g. 9876543210' : 'e.g. dr.priya@medcare.org'}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <span>{t('login', preferences.language)}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Logins for evaluation */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5 text-center">
            Or Click For 1-Tap Demo Access
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('patient')}
              className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Demo Patient (Rajesh Kumar)</span>
              </div>
              <CheckCircle2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('doctor')}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <Stethoscope size={16} />
                <span>Demo Doctor (Dr. Priya Sharma)</span>
              </div>
              <CheckCircle2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Security badge */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <ShieldCheck size={16} />
        <span>Safe & confidential prototype • No real passwords stored</span>
      </div>
    </div>
  );
}
