import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Type, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import type { AppLanguage, AppTextSize } from '../types';
import { t } from '../utils/translations';
import AppLogo from '../components/AppLogo';

export default function PreferencesPage() {
  const navigate = useNavigate();
  const { user, preferences, updatePreferences } = useApp();

  const [selectedLang, setSelectedLang] = useState<AppLanguage>(preferences.language || 'en');
  const [selectedSize, setSelectedSize] = useState<AppTextSize>(preferences.textSize || 'medium');

  const languages: { code: AppLanguage; name: string; native: string; desc: string }[] = [
    { code: 'en', name: 'English', native: 'English', desc: 'Default language' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', desc: 'ఆంధ్రప్రదేశ్ & తెలంగాణ' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी', desc: 'राष्ट्रभाषा' },
  ];

  const textSizes: { size: AppTextSize; label: string; sample: string; css: string }[] = [
    { size: 'small', label: 'Small', sample: 'Aa (14px)', css: 'text-sm' },
    { size: 'medium', label: 'Medium', sample: 'Aa (16px)', css: 'text-base' },
    { size: 'large', label: 'Large', sample: 'Aa (18px)', css: 'text-lg' },
  ];

  const handleContinue = () => {
    updatePreferences({ language: selectedLang, textSize: selectedSize });
    if (user?.role === 'doctor') {
      navigate('/doctor-dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between max-w-md mx-auto p-4 sm:p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="pt-2 text-center">
          <div className="flex items-center justify-center mb-2">
            <AppLogo size="md" className="drop-shadow-xs" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-1">
            {t('preferences', selectedLang)}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Choose your comfortable language and text size
          </p>
        </div>

        {/* Language Selection */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Globe size={18} className="text-blue-600" />
            <h2 className="text-sm font-bold text-gray-800">
              {t('selectLanguage', selectedLang)}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {languages.map((lang) => {
              const isSelected = selectedLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLang(lang.code)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-base">{lang.native}</span>
                      <span className="text-xs text-gray-500">({lang.name})</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{lang.desc}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Size Selection */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Type size={18} className="text-blue-600" />
            <h2 className="text-sm font-bold text-gray-800">
              {t('selectTextSize', selectedLang)}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {textSizes.map((item) => {
              const isSelected = selectedSize === item.size;
              return (
                <button
                  key={item.size}
                  type="button"
                  onClick={() => setSelectedSize(item.size)}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className={`font-bold ${item.css}`}>{item.sample}</span>
                  <span className="text-xs font-medium">{t(item.size, selectedLang)}</span>
                </button>
              );
            })}
          </div>

          {/* Live Preview Box */}
          <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Preview / ప్రివ్యూ / पूर्वावलोकन
            </p>
            <p
              className={`font-medium text-gray-800 transition-all ${
                selectedSize === 'small' ? 'text-xs' : selectedSize === 'large' ? 'text-lg' : 'text-sm'
              }`}
            >
              {selectedLang === 'te'
                ? 'మెడ్‌కేర్ ద్వారా మీ ఆరోగ్యాన్ని సురక్షితంగా ఉంచుకోండి.'
                : selectedLang === 'hi'
                ? 'मेडकेयर के साथ अपने स्वास्थ्य को सुरक्षित रखें।'
                : 'MedCare brings qualified doctors and medicines directly to your village.'}
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-6 pb-2">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 shadow-lg transition"
        >
          <span>{t('continue_btn', selectedLang)}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
