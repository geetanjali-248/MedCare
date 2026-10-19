import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, FileText, Activity, ShieldCheck, ArrowRight, Pill } from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';

export default function ConsultationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { consultations } = useApp();

  const consultation = consultations.find((c) => c.id === id) || consultations[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Consultation Details" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Doctor & Date Header Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-lg">
                <User size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">{consultation.doctorName}</h3>
                <p className="text-xs text-blue-600 font-semibold">{consultation.specialization}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Telehealth Case ID: {consultation.id}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-800 flex items-center gap-1 justify-end">
                <Calendar size={13} className="text-blue-600" />
                <span>{consultation.date}</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Clinical Breakdown */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4 text-xs">
          {/* Reason */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-gray-400 mb-1">
              Chief Reason
            </h4>
            <p className="text-sm font-bold text-gray-900">{consultation.reason}</p>
          </div>

          {/* Symptoms Recorded */}
          <div className="pt-3 border-t border-gray-100">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-gray-400 mb-2 flex items-center gap-1">
              <Activity size={14} className="text-blue-600" />
              <span>Symptoms Recorded at Visit</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {consultation.symptoms.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-blue-50 text-blue-800 rounded-xl font-medium border border-blue-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Doctor's Clinical Notes */}
          <div className="pt-3 border-t border-gray-100">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-gray-400 mb-1.5 flex items-center gap-1">
              <FileText size={14} className="text-blue-600" />
              <span>Doctor's Clinical Notes</span>
            </h4>
            <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed font-sans">
              "{consultation.clinicalNotes}"
            </div>
          </div>

          {/* Advice & Follow-up */}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-gray-400 mb-1">
              Medical Advice & Follow-up
            </h4>
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-emerald-900">
              <p className="font-medium">{consultation.advice}</p>
              {consultation.followUp && (
                <p className="mt-1 font-bold text-emerald-800 text-[11px]">
                  Scheduled Follow-up: In {consultation.followUp}
                </p>
              )}
            </div>
          </div>

          {/* Prescription Link Card */}
          {consultation.prescriptionId && (
            <div className="pt-3 border-t border-gray-100">
              <div
                onClick={() => navigate(`/prescription/${consultation.prescriptionId}`)}
                className="p-3.5 bg-blue-50 hover:bg-blue-100/70 border border-blue-200 rounded-2xl flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-2.5">
                  <Pill size={18} className="text-blue-600" />
                  <div>
                    <strong className="block text-blue-900 text-xs">Linked Prescription Available</strong>
                    <span className="text-[10px] text-blue-700">View signed digital slip and order medications</span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-blue-600" />
              </div>
            </div>
          )}
        </div>

        {/* Return Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-2xl text-xs transition"
        >
          Back to Medical History
        </button>
      </div>
    </div>
  );
}
