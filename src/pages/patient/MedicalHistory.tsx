import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Calendar, 
  User, 
  FileText, 
  ChevronRight, 
  Clock, 
  Activity 
} from 'lucide-react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

export default function MedicalHistory() {
  const navigate = useNavigate();
  const { consultations, preferences } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | '30days' | '6months'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const now = Date.now();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const sixMonthsMs = 180 * 24 * 60 * 60 * 1000;

  const filteredConsultations = consultations.filter((c) => {
    const consultDate = new Date(c.date).getTime();
    const diff = now - consultDate;

    let matchesFilter = true;
    if (activeFilter === '30days') matchesFilter = diff <= thirtyDaysMs;
    if (activeFilter === '6months') matchesFilter = diff <= sixMonthsMs;

    const matchesSearch =
      c.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title={t('medicalHistory', preferences.language)} showBack={true} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by doctor, diagnosis, or symptom..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
        </div>

        {/* Filters: All, Last 30 Days, Last 6 Months */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('allConsultations', preferences.language)}
          </button>
          <button
            onClick={() => setActiveFilter('30days')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeFilter === '30days'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('last30Days', preferences.language)}
          </button>
          <button
            onClick={() => setActiveFilter('6months')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeFilter === '6months'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('last6Months', preferences.language)}
          </button>
        </div>

        {/* Consultations List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Consultation Records ({filteredConsultations.length})</span>
            <span>Historical Clinical Notes</span>
          </div>

          {filteredConsultations.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-500 border border-gray-200">
              <Activity size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="font-semibold text-sm">No consultation records match filter</p>
              <p className="text-xs text-gray-400 mt-1">Try switching to 'All Consultations'</p>
            </div>
          ) : (
            filteredConsultations.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm space-y-3 hover:border-blue-200 transition"
              >
                <div className="flex items-start justify-between border-b border-gray-100 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      <User size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{c.doctorName}</h4>
                      <p className="text-xs text-blue-600 font-medium">{c.specialization}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded-lg">
                    <Calendar size={12} />
                    <span>{c.date}</span>
                  </span>
                </div>

                {/* Reason & Symptoms Preview */}
                <div className="text-xs space-y-1">
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Reason: </strong>
                    {c.reason}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    Symptoms: {c.symptoms.join(', ')}
                  </p>
                </div>

                {/* Action button */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    {c.prescriptionId ? 'Prescription Issued' : 'Advice Provided'}
                  </span>
                  <button
                    onClick={() => navigate(`/consultation/${c.id}`)}
                    className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center gap-1 transition"
                  >
                    <span>{t('viewDetails', preferences.language)}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
