import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Calendar, 
  User, 
  Pill, 
  Bell, 
  ShoppingCart, 
  ChevronRight, 
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';
import type { Prescription } from '../../types';

export default function Prescriptions() {
  const navigate = useNavigate();
  const { prescriptions, addToCart, preferences } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'current' | 'past'>('current');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCount = prescriptions.filter((p) => p.status === 'current').length;
  const pastCount = prescriptions.filter((p) => p.status === 'past').length;

  const filteredPrescriptions = prescriptions.filter((p) => {
    const matchesTab = activeTab === 'all' || p.status === activeTab;
    const matchesSearch =
      p.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.medicines.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleOrderAllMedicines = (prescription: Prescription) => {
    // Add each medicine to cart as a mock item
    prescription.medicines.forEach((med, idx) => {
      addToCart({
        id: `presc-med-${prescription.id}-${idx}`,
        name: med.name,
        price: 45,
        category: 'Prescription Rx',
        description: `${med.dosage} • ${med.frequency}`,
        requiresPrescription: true,
      }, 1);
    });
    navigate('/cart');
  };

  const handleSetReminder = (medicineName: string, dosage: string, beforeFood: boolean) => {
    navigate('/add-reminder', {
      state: { medicineName, dosage, beforeFood },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title={t('prescriptions', preferences.language)} showBack={true} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Prototype Watermark Notice */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-2 text-xs text-blue-800">
          <Info size={16} className="text-blue-600 shrink-0" />
          <span>Official digital demo prescriptions verified by licensed rural tele-consultants.</span>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor, medicine, or reason..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('total', preferences.language)} ({prescriptions.length})
          </button>
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'current'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('current', preferences.language)} ({currentCount})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'past'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('past', preferences.language)} ({pastCount})
          </button>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-500 border border-gray-200">
              <FileText size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="font-semibold text-sm">No prescriptions found</p>
              <p className="text-xs text-gray-400 mt-1">Check past tabs or search query</p>
            </div>
          ) : (
            filteredPrescriptions.map((presc) => (
              <div
                key={presc.id}
                className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4 hover:border-blue-200 transition"
              >
                {/* Header with status badge */}
                <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      Rx
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{presc.doctorName}</h3>
                      <p className="text-xs text-gray-500">{presc.specialization}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      presc.status === 'current'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {presc.status}
                  </span>
                </div>

                {/* Consultation Details */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <Calendar size={13} className="text-gray-400" />
                    <span>{presc.date}</span>
                  </div>
                  <div className="text-gray-700 truncate">
                    <span className="text-gray-400">Diagnosis: </span>
                    <strong className="text-gray-900">{presc.reason}</strong>
                  </div>
                </div>

                {/* Medicines List */}
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                    <Pill size={14} className="text-blue-600" />
                    <span>Prescribed Medications ({presc.medicines.length})</span>
                  </p>
                  <div className="space-y-2">
                    {presc.medicines.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-gray-900">{m.name}</p>
                          <p className="text-[11px] text-gray-500">
                            {m.dosage} • {m.frequency} • {m.duration}
                          </p>
                          <span
                            className={`inline-block text-[10px] font-semibold mt-0.5 px-1.5 py-0.2 rounded ${
                              m.beforeFood
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {m.beforeFood ? 'Before Food' : 'After Food'}
                          </span>
                        </div>

                        {/* Set Reminder Button for this medicine */}
                        <button
                          onClick={() => handleSetReminder(m.name, m.dosage, m.beforeFood)}
                          className="px-2.5 py-1.5 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 text-[11px] font-semibold rounded-lg flex items-center gap-1 shadow-2xs"
                          title="Add Reminder"
                        >
                          <Bell size={12} />
                          <span>Remind</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doctor's Advice / Notes */}
                {presc.notes && (
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-blue-900">
                    <span className="font-semibold block mb-0.5">Doctor's Advice:</span>
                    <span>{presc.notes}</span>
                  </div>
                )}

                {/* Action CTAs */}
                <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/prescription/${presc.id}`)}
                    className="flex-1 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <FileText size={14} />
                    <span>View Slip</span>
                  </button>

                  <button
                    onClick={() => handleOrderAllMedicines(presc)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 shadow"
                  >
                    <ShoppingCart size={14} />
                    <span>{t('orderMedicines', preferences.language)}</span>
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
