import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  CheckCircle2, 
  FilePlus, 
  Upload, 
  Settings as SettingsIcon, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import AppLogo from '../../components/AppLogo';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { user, appointments, doctors, logout } = useApp();

  const [isAvailableToday, setIsAvailableToday] = useState(true);

  // Doctor info
  const currentDoctor = doctors.find((d) => d.id === 'doc-1') || doctors[0];

  // Appointments for this doctor
  const docAppointments = appointments.filter(
    (a) => a.doctorId === currentDoctor.id || a.doctorName?.includes('Priya')
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Doctor Header */}
      <Header title="Doctor Clinical Portal" showLogo={true} showBrandTitle={true} showProfile={false} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Doctor Profile Banner */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-2xl border border-white/20">
                👩‍⚕️
              </div>
              <div>
                <h2 className="font-bold text-base text-white">{currentDoctor.name}</h2>
                <p className="text-xs text-blue-200">{currentDoctor.specialization}</p>
                <p className="text-[10px] text-blue-300 mt-0.5">{currentDoctor.hospital}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] font-bold uppercase bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-0.5 rounded-full">
                Licensed
              </span>
              <div className="bg-white/10 px-2.5 py-1 rounded-lg">
                <AppLogo size="xs" showTitle={true} titleClassName="text-white text-[10px]" />
              </div>
            </div>
          </div>

          {/* Availability Status Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isAvailableToday ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-xs font-semibold text-blue-100">
                Status: {isAvailableToday ? 'Online & Accepting Patients' : 'Offline / On Leave'}
              </span>
            </div>
            <button
              onClick={() => setIsAvailableToday(!isAvailableToday)}
              className="px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-[10px] font-bold text-white transition"
            >
              Toggle
            </button>
          </div>
        </div>

        {/* Quick Management Actions Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => navigate('/doctor-availability')}
            className="p-4 bg-white hover:bg-blue-50/50 border border-gray-200 rounded-2xl shadow-sm text-left space-y-1.5 transition"
          >
            <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
              <Clock size={18} />
            </div>
            <h4 className="font-bold text-gray-900">Manage Availability</h4>
            <p className="text-[11px] text-gray-500">Edit 12-hour slots ({currentDoctor.availableSlots.length} active)</p>
          </button>

          <button
            onClick={() => navigate('/doctor-qualifications')}
            className="p-4 bg-white hover:bg-emerald-50/50 border border-gray-200 rounded-2xl shadow-sm text-left space-y-1.5 transition"
          >
            <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
              <Upload size={18} />
            </div>
            <h4 className="font-bold text-gray-900">Qualifications</h4>
            <p className="text-[11px] text-gray-500">Medical council license & degrees</p>
          </button>
        </div>

        {/* Today's Consultations Queue */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-gray-800">
              <Calendar size={16} className="text-blue-600" />
              <span>Today's Consultation Queue ({docAppointments.length})</span>
            </div>
            <button
              onClick={() => navigate('/doctor-appointments')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {docAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-3 bg-slate-50 border border-gray-100 rounded-2xl flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{apt.patientName || 'Rajesh Kumar'}</h4>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-semibold capitalize">
                      {apt.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {apt.time} • Reason: {apt.notes || 'Seasonal Fever Checkup'}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/doctor-consultation?appointmentId=${apt.id}`)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1 transition"
                >
                  <Video size={13} />
                  <span>Start</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Profile & Settings Links */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100 text-xs">
          <button
            onClick={() => navigate('/settings')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <SettingsIcon size={18} className="text-blue-600" />
              <span className="font-bold text-gray-800">Language, Text Size & Settings</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/help')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-blue-600" />
              <span className="font-bold text-gray-800">Doctor Guidelines & Help</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-red-50 text-red-600 font-bold transition"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} />
              <span>Log Out Doctor Session</span>
            </div>
            <ChevronRight size={16} className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
