import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Languages, 
  Hospital, 
  Award, 
  Clock, 
  Video, 
  UserCheck, 
  CheckCircle,
  CalendarDays,
  ShieldCheck
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';
import type { AppointmentType, TimeSlot } from '../../types';

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { doctors, user, bookAppointment, preferences } = useApp();

  const doctor = doctors.find((d) => d.id === id) || doctors[0];

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(
    doctor.availableSlots.find((s) => s.available) || null
  );
  const [consultType, setConsultType] = useState<AppointmentType>('video');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  // 3 selectable dates (today, tomorrow, day after)
  const availableDates = [
    { label: 'Today', date: todayStr },
    { label: 'Tomorrow', date: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
    { label: 'In 2 Days', date: new Date(Date.now() + 172800000).toISOString().split('T')[0] },
  ];

  const handleBooking = () => {
    if (!selectedSlot) {
      setError('Please select an available time slot');
      return;
    }

    const newAppointment = {
      id: `apt-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      doctorImage: doctor.image,
      patientId: user?.id || 'patient-1',
      patientName: user?.name || 'Rajesh Kumar',
      date: selectedDate,
      time: selectedSlot.time,
      status: 'upcoming' as const,
      type: consultType,
      notes: reason || 'General medical consultation',
    };

    bookAppointment(newAppointment);

    navigate('/booking-confirm', {
      state: { appointment: newAppointment, doctor },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Doctor Profile" showBack={true} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Doctor Summary Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-3xl flex items-center justify-center font-bold text-2xl shadow-inner">
              {doctor.name.replace('Dr. ', '').charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">{doctor.name}</h2>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  <span>{doctor.rating}</span>
                </div>
              </div>
              <p className="text-xs text-blue-600 font-semibold">{doctor.specialization}</p>
              <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                <Hospital size={12} />
                <span>{doctor.hospital}</span>
              </p>
            </div>
          </div>

          {/* Badges Bar */}
          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-gray-100">
            <div className="p-2 bg-slate-50 rounded-xl">
              <span className="block text-xs font-bold text-gray-900">{doctor.experience}+ Yrs</span>
              <span className="text-[10px] text-gray-400">Experience</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <span className="block text-xs font-bold text-gray-900">₹{doctor.consultationFee || 500}</span>
              <span className="text-[10px] text-gray-400">Fee</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <span className="block text-xs font-bold text-emerald-600">Verified</span>
              <span className="text-[10px] text-gray-400">Govt Reg.</span>
            </div>
          </div>
        </div>

        {/* Qualifications & Languages */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-start gap-2.5">
            <Award size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900">Qualifications</p>
              <p className="text-xs text-gray-600">{doctor.qualifications}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Languages size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900">Languages Spoken</p>
              <p className="text-xs text-gray-600">{doctor.languages.join(', ')}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-900 mb-1">About Doctor</p>
            <p className="text-xs text-gray-600 leading-relaxed">{doctor.about}</p>
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <CalendarDays size={18} className="text-blue-600" />
            <span>Select Date & 12-Hour Time Slot</span>
          </h3>

          {/* Date Selector */}
          <div className="grid grid-cols-3 gap-2">
            {availableDates.map((d) => (
              <button
                key={d.date}
                type="button"
                onClick={() => setSelectedDate(d.date)}
                className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition ${
                  selectedDate === d.date
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span>{d.label}</span>
                <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                  {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </button>
            ))}
          </div>

          {/* 12-Hour Available Slots */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Clock size={14} className="text-gray-400" />
              <span>Available Slots ({doctor.availableSlots.length})</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {doctor.availableSlots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => { setSelectedSlot(slot); setError(''); }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition ${
                      !slot.available
                        ? 'bg-gray-100 text-gray-300 border-gray-100 line-through cursor-not-allowed'
                        : isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow'
                        : 'bg-white text-gray-800 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consultation Type Selector */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Consultation Mode</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConsultType('video')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition ${
                  consultType === 'video'
                    ? 'bg-blue-50/80 border-blue-600 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${consultType === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Video size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold">Video Call</p>
                  <p className="text-[10px] text-gray-500">From home</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setConsultType('in-person')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition ${
                  consultType === 'in-person'
                    ? 'bg-blue-50/80 border-blue-600 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${consultType === 'in-person' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <UserCheck size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold">In-Clinic</p>
                  <p className="text-[10px] text-gray-500">Visit clinic</p>
                </div>
              </button>
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Primary Concern / Health Issue (Optional)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Mild fever, persistent cough, regular BP checkup"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 font-medium">{error}</p>
          )}

          {/* Confirmation CTA */}
          <button
            type="button"
            onClick={handleBooking}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            <span>{t('bookAppointment', preferences.language)} • ₹{doctor.consultationFee || 500}</span>
          </button>

          <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck size={14} />
            <span>Simulated instant booking • Free cancellation anytime</span>
          </p>
        </div>
      </div>
    </div>
  );
}
