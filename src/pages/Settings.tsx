import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Type, 
  User, 
  HelpCircle, 
  FileCheck, 
  LogOut, 
  Check, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck 
} from 'lucide-react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import type { AppLanguage, AppTextSize } from '../types';

export default function Settings() {
  const navigate = useNavigate();
  const { user, preferences, updatePreferences, logout } = useApp();

  const languages: { code: AppLanguage; name: string; native: string }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  ];

  const textSizes: { size: AppTextSize; label: string; sample: string }[] = [
    { size: 'small', label: 'Small', sample: 'Aa (14px)' },
    { size: 'medium', label: 'Medium', sample: 'Aa (16px)' },
    { size: 'large', label: 'Large', sample: 'Aa (18px)' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title={t('settings', preferences.language)} showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Language Selection */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Globe size={18} className="text-blue-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              {t('language', preferences.language)}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {languages.map((lang) => {
              const isSelected = preferences.language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => updatePreferences({ language: lang.code })}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-2xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{lang.native}</span>
                    <span className="text-[11px] text-gray-500">{lang.name}</span>
                  </div>
                  {isSelected && <Check size={16} className="text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Size Selection */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Type size={18} className="text-blue-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              {t('textSize', preferences.language)}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {textSizes.map((item) => {
              const isSelected = preferences.textSize === item.size;
              return (
                <button
                  key={item.size}
                  type="button"
                  onClick={() => updatePreferences({ textSize: item.size })}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-2xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-bold text-sm">{item.sample}</span>
                  <span className="text-[11px]">{t(item.size, preferences.language)}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-gray-600">
            Current application text size: <strong className="capitalize text-gray-900">{preferences.textSize}</strong>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <User size={18} className="text-blue-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              {t('account', preferences.language)}
            </h3>
          </div>

          <div className="space-y-1.5 text-xs">
            <p className="text-gray-700">
              User: <strong className="text-gray-900">{user?.name || 'Demo User'}</strong>
            </p>
            <p className="text-gray-700">
              Role: <strong className="capitalize text-blue-600">{user?.role || 'Patient'}</strong>
            </p>
            <p className="text-gray-700">
              Contact: <span>+91 {user?.phone || '9876543210'}</span>
            </p>
          </div>
        </div>

        {/* Informational Links */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100 text-xs">
          <button
            onClick={() => navigate('/help')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={18} className="text-blue-600" />
              <span className="font-bold text-gray-800">{t('help', preferences.language)} & FAQs</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/terms')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <FileCheck size={18} className="text-blue-600" />
              <span className="font-bold text-gray-800">{t('termsAndConditions', preferences.language)}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-2xl border border-red-200 flex items-center justify-center gap-2 transition"
        >
          <LogOut size={16} />
          <span>{t('logout', preferences.language)}</span>
        </button>
      </div>
    </div>
  );
}
