import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Plus, Trash2, CheckCircle2, ArrowLeft, Calendar } from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import type { TimeSlot } from '../../types';

export default function DoctorAvailability() {
  const navigate = useNavigate();
  const { doctors, updateDoctorSlots } = useApp();

  const currentDoctor = doctors.find((d) => d.id === 'doc-1') || doctors[0];

  const [slots, setSlots] = useState<TimeSlot[]>(currentDoctor.availableSlots);
  const [newTime, setNewTime] = useState('05:00 PM');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggleSlot = (slotId: string) => {
    setSlots(
      slots.map((s) => (s.id === slotId ? { ...s, available: !s.available } : s))
    );
  };

  const handleRemoveSlot = (slotId: string) => {
    setSlots(slots.filter((s) => s.id !== slotId));
  };

  const handleAddSlot = () => {
    if (!newTime) return;
    if (slots.some((s) => s.time === newTime)) {
      alert('This slot already exists');
      return;
    }
    const newSlot: TimeSlot = {
      id: `s-${Date.now()}`,
      time: newTime,
      available: true,
    };
    setSlots([...slots, newSlot]);
  };

  const handleSave = () => {
    updateDoctorSlots(currentDoctor.id, slots);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      navigate('/doctor-dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Manage Availability" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Banner */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-2">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Clock size={16} className="text-blue-600" />
            <span>Consultation Schedule & 12-Hour Slots</span>
          </h2>
          <p className="text-xs text-gray-500">
            Define the hours when rural patients can book live video tele-consultations with you.
          </p>
        </div>

        {saveSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Availability updated successfully! Returning to dashboard...</span>
          </div>
        )}

        {/* Existing Slots */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 text-xs font-bold text-gray-800">
            <span>Current Configured Slots ({slots.length})</span>
            <span className="text-[10px] text-gray-400">Click to toggle active</span>
          </div>

          <div className="space-y-2">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition ${
                  slot.available
                    ? 'bg-blue-50/60 border-blue-200 text-blue-900 font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-400 line-through'
                }`}
              >
                <div
                  onClick={() => handleToggleSlot(slot.id)}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <Clock size={14} className={slot.available ? 'text-blue-600' : 'text-gray-400'} />
                  <span>{slot.time}</span>
                  <span className="text-[10px] font-normal no-underline ml-1">
                    ({slot.available ? 'Available' : 'Booked / Off'})
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveSlot(slot.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white transition"
                  title="Remove Slot"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Slot Form */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-gray-800">Add New 12-Hour Slot</h3>
          <div className="flex gap-2">
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="flex-1 p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="09:30 AM">09:30 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="02:30 PM">02:30 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="04:30 PM">04:30 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="05:30 PM">05:30 PM</option>
              <option value="06:00 PM">06:00 PM</option>
            </select>
            <button
              onClick={handleAddSlot}
              className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-xl border border-blue-200 flex items-center gap-1 transition"
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Save CTA */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 size={16} />
          <span>Save Updated Availability</span>
        </button>
      </div>
    </div>
  );
}
