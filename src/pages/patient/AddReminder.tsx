import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Clock, 
  Pill, 
  Volume2, 
  Play, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import { notificationSounds } from '../../data/sampleData';
import type { MedicationReminder } from '../../types';

export default function AddReminder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addReminder, updateReminder } = useApp();

  const state = location.state as { 
    medicineName?: string; 
    dosage?: string; 
    beforeFood?: boolean; 
    editReminder?: MedicationReminder;
  } | null;

  const editItem = state?.editReminder;

  const [medicineName, setMedicineName] = useState(editItem?.medicineName || state?.medicineName || '');
  const [dosage, setDosage] = useState(editItem?.dosage || state?.dosage || '1 tablet');
  const [beforeFoodOption, setBeforeFoodOption] = useState<'before' | 'after' | 'none'>(
    editItem ? (editItem.beforeFood ? 'before' : 'after') : state?.beforeFood !== undefined ? (state.beforeFood ? 'before' : 'after') : 'after'
  );
  const [times, setTimes] = useState<string[]>(editItem?.times || ['08:00 AM']);
  const [newTimeInput, setNewTimeInput] = useState('08:00 PM');
  const [selectedSound, setSelectedSound] = useState(editItem?.soundId || 'default');
  const [error, setError] = useState('');
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Synthesize clean audio chime using Web Audio API
  const playSoundPreview = (soundId: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      setIsPlayingSound(true);

      if (soundId === 'gentle') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.3); // E5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (soundId === 'urgent') {
        osc.frequency.setValueAtTime(880, now); // A5
        osc.frequency.setValueAtTime(987.77, now + 0.15); // B5
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else {
        // Default chime
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2); // A5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      }

      setTimeout(() => setIsPlayingSound(false), 800);
    } catch {
      alert(`Playing sound preview: ${soundId}`);
      setIsPlayingSound(false);
    }
  };

  const handleAddTime = () => {
    if (!newTimeInput) return;
    if (times.includes(newTimeInput)) {
      setError('Time already added in reminder schedule');
      return;
    }
    setTimes([...times, newTimeInput]);
    setError('');
  };

  const handleRemoveTime = (timeToRemove: string) => {
    if (times.length <= 1) {
      setError('Reminder must have at least one scheduled time');
      return;
    }
    setTimes(times.filter((t) => t !== timeToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) {
      setError('Please enter medicine name');
      return;
    }
    if (!dosage.trim()) {
      setError('Please specify dosage (e.g., 1 tablet, 5 ml)');
      return;
    }
    if (times.length === 0) {
      setError('Please add at least one reminder time');
      return;
    }

    if (editItem) {
      updateReminder({
        ...editItem,
        medicineName: medicineName.trim(),
        dosage: dosage.trim(),
        beforeFood: beforeFoodOption === 'before',
        times,
        soundId: selectedSound,
      });
    } else {
      const newRem: MedicationReminder = {
        id: `rem-${Date.now()}`,
        medicineName: medicineName.trim(),
        dosage: dosage.trim(),
        beforeFood: beforeFoodOption === 'before',
        times,
        taken: times.reduce((acc, t) => ({ ...acc, [t]: false }), {}),
        soundId: selectedSound,
      };
      addReminder(newRem);
    }

    navigate('/reminders');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title={editItem ? 'Edit Reminder' : 'Add Medication Reminder'} showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
              {error}
            </div>
          )}

          {/* 1. Medicine Name */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
              <Pill size={15} className="text-blue-600" />
              <span>Medicine Name *</span>
            </label>
            <input
              type="text"
              value={medicineName}
              onChange={(e) => { setMedicineName(e.target.value); setError(''); }}
              placeholder="e.g. Paracetamol 500mg, Metformin"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            {/* Quick Suggestions for fast demo entry */}
            <div className="flex gap-1.5 overflow-x-auto pt-2 scrollbar-none text-[10px]">
              {['Paracetamol 500mg', 'Cetirizine 10mg', 'Metformin 500mg', 'Amlodipine 5mg', 'Vitamin C'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMedicineName(m)}
                  className="px-2 py-1 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg whitespace-nowrap transition"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dosage */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Dosage Specification *
            </label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => { setDosage(e.target.value); setError(''); }}
              placeholder="e.g. 1 tablet, 5 ml, 2 drops, 1 sachet"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          {/* 3. Food Instructions */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Food Instructions
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBeforeFoodOption('before')}
                className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition ${
                  beforeFoodOption === 'before'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Before Food
              </button>
              <button
                type="button"
                onClick={() => setBeforeFoodOption('after')}
                className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition ${
                  beforeFoodOption === 'after'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-2xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                After Food
              </button>
              <button
                type="button"
                onClick={() => setBeforeFoodOption('none')}
                className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition ${
                  beforeFoodOption === 'none'
                    ? 'bg-blue-100 text-blue-900 border-blue-300 shadow-2xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                No Specific
              </button>
            </div>
          </div>

          {/* 4. Multiple Times Per Day */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-blue-600" />
                <span>Scheduled Times (Multi-time per day) *</span>
              </span>
              <span className="text-[10px] text-gray-400">12-hr format</span>
            </label>

            {/* List of times currently added */}
            <div className="space-y-1.5 mb-2.5">
              {times.map((time) => (
                <div
                  key={time}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-gray-200 text-xs"
                >
                  <span className="font-bold text-gray-800 flex items-center gap-1.5">
                    <Clock size={13} className="text-blue-600" />
                    <span>{time}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTime(time)}
                    className="p-1 text-gray-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add time input row */}
            <div className="flex gap-2">
              <select
                value={newTimeInput}
                onChange={(e) => setNewTimeInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="06:00 AM">06:00 AM (Early Morning)</option>
                <option value="08:00 AM">08:00 AM (Breakfast)</option>
                <option value="10:00 AM">10:00 AM (Morning)</option>
                <option value="01:00 PM">01:00 PM (Lunch)</option>
                <option value="02:00 PM">02:00 PM (Afternoon)</option>
                <option value="05:00 PM">05:00 PM (Evening)</option>
                <option value="08:00 PM">08:00 PM (Dinner)</option>
                <option value="10:00 PM">10:00 PM (Bedtime)</option>
              </select>
              <button
                type="button"
                onClick={handleAddTime}
                className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 flex items-center gap-1 transition"
              >
                <Plus size={14} />
                <span>Add Slot</span>
              </button>
            </div>
          </div>

          {/* 5. Notification Sound Selection & Sound Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <Volume2 size={15} className="text-blue-600" />
                <span>Notification Alert Sound</span>
              </label>
              <button
                type="button"
                onClick={() => playSoundPreview(selectedSound)}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-blue-50 transition"
              >
                <Play size={11} className={isPlayingSound ? 'animate-spin' : ''} />
                <span>{isPlayingSound ? 'Playing...' : 'Preview Sound'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {notificationSounds.map((snd) => (
                <button
                  key={snd.id}
                  type="button"
                  onClick={() => {
                    setSelectedSound(snd.id);
                    playSoundPreview(snd.id);
                  }}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                    selectedSound === snd.id
                      ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{snd.name}</span>
                  {selectedSound === snd.id && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Save & Cancel */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-xs transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
            >
              <Check size={16} />
              <span>{editItem ? 'Update Reminder' : 'Save Reminder'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
