import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Pill, ShoppingCart, Bell, ShieldCheck } from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import AppLogo from '../../components/AppLogo';

export default function PrescriptionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { prescriptions, addToCart, user } = useApp();

  const prescription = prescriptions.find((p) => p.id === id) || prescriptions[0];

  const handleOrderAll = () => {
    prescription.medicines.forEach((med, idx) => {
      addToCart({
        id: `presc-${prescription.id}-${idx}`,
        name: med.name,
        price: 50,
        category: 'Prescription Rx',
        description: `${med.dosage} • ${med.frequency}`,
        requiresPrescription: true,
      }, 1);
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Digital Prescription" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Prescription Paper Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-md space-y-4 relative overflow-hidden">
          {/* Header Seal */}
          <div className="flex items-start justify-between border-b-2 border-blue-600 pb-4">
            <div>
              <AppLogo size="sm" className="mb-1" />
              <p className="text-[11px] text-gray-500 mt-0.5">{prescription.hospital || 'Apollo Telehealth Services'}</p>
              <p className="text-[10px] text-gray-400">Govt Reg. License #TEL-2024-9842</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-serif font-black text-blue-700">℞</span>
              <p className="text-[10px] text-gray-400">Ref: {prescription.id}</p>
            </div>
          </div>

          {/* Doctor & Patient Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-gray-100">
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-semibold">Attending Doctor</p>
              <p className="font-bold text-gray-900 mt-0.5">{prescription.doctorName}</p>
              <p className="text-blue-600 text-[11px]">{prescription.specialization}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-semibold">Patient Name</p>
              <p className="font-bold text-gray-900 mt-0.5">{user?.name || 'Rajesh Kumar'}</p>
              <p className="text-gray-500 text-[11px]">Age: {user?.age || 35} Yrs • Male</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-semibold">Consultation Date</p>
              <p className="font-medium text-gray-800 flex items-center gap-1 mt-0.5">
                <Calendar size={12} />
                <span>{prescription.date}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-semibold">Clinical Reason</p>
              <p className="font-medium text-gray-800 mt-0.5">{prescription.reason}</p>
            </div>
          </div>

          {/* Rx Medications List */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-blue-700">
              <Pill size={14} />
              <span>Prescribed Drugs & Schedule</span>
            </h4>
            <div className="space-y-2.5">
              {prescription.medicines.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">{idx + 1}. {m.name}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${m.beforeFood ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {m.beforeFood ? 'Before Food' : 'After Food'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                    <span>Dosage: <strong>{m.dosage}</strong></span>
                    <span>Duration: {m.duration}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 bg-slate-50 px-2 py-1 rounded">
                    Instructions: {m.instructions || `${m.frequency} with warm water`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice */}
          {prescription.notes && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
              <span className="font-bold block mb-1">Dietary & Lifestyle Advice:</span>
              <p className="text-[11px] leading-relaxed">{prescription.notes}</p>
            </div>
          )}

          {/* Signoff & Digital Signature */}
          <div className="pt-4 border-t border-gray-200 flex items-end justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <ShieldCheck size={14} />
              <span>Digitally Signed & Validated</span>
            </div>
            <div className="text-right">
              <div className="font-serif italic font-bold text-xs text-gray-700 underline decoration-blue-500">
                {prescription.doctorName}
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">Authorized Signatory</p>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleOrderAll}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow flex items-center justify-center gap-2 transition"
          >
            <ShoppingCart size={18} />
            <span>Order All Prescribed Medicines Now</span>
          </button>

          <button
            onClick={() => navigate('/reminders')}
            className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <Bell size={16} className="text-blue-600" />
            <span>Manage Daily Medication Reminders</span>
          </button>
        </div>
      </div>
    </div>
  );
}
