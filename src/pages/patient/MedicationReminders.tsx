import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Plus, 
  Check, 
  Clock, 
  Pill, 
  RotateCcw, 
  Trash2, 
  Edit3, 
  Volume2, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

export default function MedicationReminders() {
  const navigate = useNavigate();
  const { reminders, markReminderTaken, snoozeReminder, deleteReminder, preferences } = useApp();
  const [filterMode, setFilterMode] = useState<'today' | 'all'>('today');

  // Compute daily progress
  const totalDoses = reminders.reduce((sum, r) => sum + r.times.length, 0);
  const completedDoses = reminders.reduce((sum, r) => {
    return sum + r.times.filter((time) => r.taken?.[time]).length;
  }, 0);

  const progressPercent = totalDoses > 0 ? Math.round((completedDoses / totalDoses) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <Header title={t('reminders', preferences.language)} showBack={true} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Daily Medication Progress Card */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white rounded-3xl p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              {t('todayProgress', preferences.language)}
            </span>
            <span className="text-sm font-bold text-blue-200">
              {completedDoses} / {totalDoses} Doses
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold">{progressPercent}%</div>
              <p className="text-xs text-blue-100 mt-0.5">
                {progressPercent === 100
                  ? 'Great job! All medicines taken today.'
                  : `${totalDoses - completedDoses} pending dosage(s) remaining`}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white flex items-center justify-center font-bold text-xs">
              ✓
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Header & Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterMode('today')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterMode === 'today'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Today's Schedule
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterMode === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All Meds ({reminders.length})
            </button>
          </div>

          {/* Prominent Add Reminder '+' button */}
          <button
            onClick={() => navigate('/add-reminder')}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition"
            title="Add Medication Reminder"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Reminder</span>
          </button>
        </div>

        {/* Reminders List */}
        <div className="space-y-3">
          {reminders.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-500 border border-gray-200">
              <Bell size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="font-semibold text-sm">No medication reminders set</p>
              <p className="text-xs text-gray-400 mt-1">Tap "+ Add Reminder" to create one</p>
            </div>
          ) : (
            reminders.map((rem) => (
              <div
                key={rem.id}
                className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm space-y-3 hover:border-blue-200 transition"
              >
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Pill size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{rem.medicineName}</h4>
                      <p className="text-xs text-gray-500">
                        Dosage: <strong className="text-gray-700">{rem.dosage}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Edit & Delete actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => navigate('/add-reminder', { state: { editReminder: rem } })}
                      className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition"
                      title="Edit Reminder"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete reminder for ${rem.medicineName}?`)) {
                          deleteReminder(rem.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition"
                      title="Delete Reminder"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Scheduled Times & Taken Actions */}
                <div className="space-y-2 pt-1 border-t border-gray-100">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>Scheduled Slots:</span>
                    </span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded ${
                        rem.beforeFood ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {rem.beforeFood ? 'Before Food' : 'After Food'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {rem.times.map((timeSlot) => {
                      const isTaken = rem.taken?.[timeSlot];
                      return (
                        <div
                          key={timeSlot}
                          className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
                            isTaken
                              ? 'bg-emerald-50/70 border-emerald-200'
                              : 'bg-slate-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock size={14} className={isTaken ? 'text-emerald-600' : 'text-gray-400'} />
                            <span className="text-xs font-bold text-gray-800">{timeSlot}</span>
                            {isTaken && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                                Completed
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {!isTaken && (
                              <button
                                onClick={() => snoozeReminder(rem.id, timeSlot)}
                                className="px-2.5 py-1 text-[11px] font-semibold text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg border border-gray-200 transition"
                                title="Snooze 10m"
                              >
                                Snooze 10m
                              </button>
                            )}

                            <button
                              onClick={() => markReminderTaken(rem.id, timeSlot)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                                isTaken
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                              }`}
                            >
                              <Check size={14} />
                              <span>{isTaken ? 'Taken' : 'Mark Taken'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notification tone preview badge */}
                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Volume2 size={12} />
                    <span>Alert Sound: {rem.soundId || 'Default Chime'}</span>
                  </span>
                  <span>Visual Alert Active</span>
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
