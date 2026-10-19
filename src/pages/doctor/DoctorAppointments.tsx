import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, Video, ChevronRight, CheckCircle2 } from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';

export default function DoctorAppointments() {
  const navigate = useNavigate();
  const { appointments } = useApp();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filtered = appointments.filter((a) => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Patient Appointments" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Filter Pills */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 rounded-xl transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({appointments.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`flex-1 py-2 rounded-xl transition ${
              filter === 'upcoming'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-2 rounded-xl transition ${
              filter === 'completed'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm space-y-3 hover:border-blue-200 transition text-xs"
            >
              <div className="flex items-start justify-between border-b border-gray-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{apt.patientName || 'Rajesh Kumar'}</h4>
                    <p className="text-gray-500 text-[11px]">Appointment #{apt.id}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    apt.status === 'upcoming'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {apt.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-blue-600" />
                  <span>{apt.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-blue-600" />
                  <span>{apt.time} (12-hr)</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl text-gray-700">
                <strong className="text-gray-900">Reason: </strong>
                {apt.notes || 'Seasonal flu & persistent fever checkup'}
              </div>

              <div className="pt-1 flex items-center justify-end">
                <button
                  onClick={() => navigate(`/doctor-consultation?appointmentId=${apt.id}`)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow transition"
                >
                  <Video size={14} />
                  <span>Open Consultation</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
