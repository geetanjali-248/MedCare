import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, Video, User, MapPin, ArrowRight, Home } from 'lucide-react';
import Header from '../../components/Header';
import type { Appointment, Doctor } from '../../types';
import AppLogo from '../../components/AppLogo';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { appointment?: Appointment; doctor?: Doctor } | null;
  const appointment = state?.appointment;
  const doctor = state?.doctor;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Header title="Confirmation" showBack={false} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Success Splash Card */}
        <div className="bg-white rounded-3xl p-6 text-center border border-gray-200 shadow-sm space-y-3">
          <div className="flex justify-center mb-1">
            <AppLogo size="sm" />
          </div>
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Appointment Confirmed!</h2>
          <p className="text-xs text-gray-500">
            Your appointment has been registered and confirmed. A notification was sent to your registered number.
          </p>

          <div className="bg-blue-50 text-blue-800 text-xs font-mono font-semibold py-1.5 px-3 rounded-lg inline-block">
            Booking ID: {appointment?.id || `APT-${Date.now()}`}
          </div>
        </div>

        {/* Appointment Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
            Appointment Details
          </h3>

          <div className="flex items-center gap-2.5 text-gray-700">
            <User size={16} className="text-blue-600" />
            <div>
              <span className="font-semibold">{appointment?.doctorName || doctor?.name || 'Dr. Priya Sharma'}</span>
              <span className="text-gray-400 block text-[11px]">{appointment?.doctorSpecialization || doctor?.specialization}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-gray-700">
            <Calendar size={16} className="text-blue-600" />
            <span>Date: <strong>{appointment?.date || 'Today'}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-700">
            <Clock size={16} className="text-blue-600" />
            <span>Time: <strong>{appointment?.time || '10:00 AM'}</strong> (12-hour format)</span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-700">
            <Video size={16} className="text-blue-600" />
            <span>Type: <strong className="capitalize">{appointment?.type || 'Video Consultation'}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-700">
            <MapPin size={16} className="text-blue-600" />
            <span>Facility: {doctor?.hospital || 'Apollo Hospital, Hyderabad'}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-bold">Important Instructions:</p>
          <ul className="list-disc pl-4 space-y-1 text-amber-800 text-[11px]">
            <li>Please be ready 5 minutes prior to your scheduled slot.</li>
            <li>Keep any existing prescription reports or symptom details handy.</li>
            <li>After the call, digital prescription will be added to your profile immediately.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {appointment?.type === 'video' && (
            <button
              onClick={() => navigate('/video-consultation')}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow flex items-center justify-center gap-2 transition"
            >
              <Video size={18} />
              <span>Join Mock Video Call Now</span>
              <ArrowRight size={18} />
            </button>
          )}

          <button
            onClick={() => navigate('/home')}
            className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <Home size={16} />
            <span>Return to Patient Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
