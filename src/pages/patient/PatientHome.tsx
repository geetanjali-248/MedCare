import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Video, 
  PhoneCall, 
  Bot, 
  Calendar, 
  Pill, 
  Upload, 
  ShoppingCart, 
  Package, 
  Check, 
  ChevronRight, 
  Clock, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import FloatingAIButton from '../../components/FloatingAIButton';
import { useApp } from '../../contexts/AppContext';
import { medicineCategories } from '../../data/sampleData';
import { t } from '../../utils/translations';

export default function PatientHome() {
  const navigate = useNavigate();
  const { user, preferences, appointments, reminders, orders, markReminderTaken, cart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Today's scheduled consultation
  const today = new Date().toISOString().split('T')[0];
  const todayAppointment = appointments.find(
    (apt) => (apt.date === today || apt.id === 'apt-1') && apt.status === 'upcoming'
  );

  // Reminder stats
  const totalReminders = reminders.reduce((acc, r) => acc + r.times.length, 0);
  const completedReminders = reminders.reduce(
    (acc, r) => acc + r.times.filter((t) => r.taken?.[t]).length,
    0
  );

  // Latest active order
  const latestOrder = orders.length > 0 ? orders[0] : null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/medicines');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Top App Header */}
      <Header showLogo={true} showBrandTitle={true} showNotifications={true} showProfile={true} />

      {/* Location Sub-header */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-blue-600" />
          <span className="font-medium text-gray-800">
            {user?.address ? user.address.split(',')[1]?.trim() || 'Kukatpally, Hyderabad' : 'Kukatpally, Hyderabad'}
          </span>
          <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">Rural Care Unit</span>
        </div>
        <span className="text-gray-400">
          {t('welcome', preferences.language)}, <strong className="text-gray-700">{user?.name || 'Rajesh'}</strong>
        </span>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Search Medicines Field */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchMedicines', preferences.language)}
            className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <Search size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
          <button
            type="submit"
            className="absolute right-2 top-2 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
          >
            Go
          </button>
        </form>

        {/* Emergency Care Card */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl">
              <PhoneCall size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-red-700/60 px-2 py-0.5 rounded">
                  24/7 Helpline
                </span>
              </div>
              <h3 className="font-bold text-base mt-0.5">{t('emergencyCare', preferences.language)}</h3>
              <p className="text-xs text-red-100">{t('emergencyCall', preferences.language)}</p>
            </div>
          </div>
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="px-3.5 py-2 bg-white text-red-600 font-bold text-xs rounded-xl shadow hover:bg-red-50 active:scale-95 transition"
          >
            Call 108
          </button>
        </div>

        {/* Today's Scheduled Consultation Banner */}
        {todayAppointment && (
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-4 text-white shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Video size={12} />
                <span>{t('todayConsultation', preferences.language)}</span>
              </span>
              <span className="text-xs bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-semibold">
                {todayAppointment.time}
              </span>
            </div>
            <h4 className="font-bold text-base">{todayAppointment.doctorName || 'Dr. Priya Sharma'}</h4>
            <p className="text-xs text-blue-200">{todayAppointment.doctorSpecialization || 'General Physician'}</p>
            
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-blue-100">
                <Clock size={14} />
                <span>Doctor is online & ready</span>
              </div>
              <button
                onClick={() => navigate('/video-consultation')}
                className="px-4 py-2 bg-white text-blue-700 font-bold text-xs rounded-xl shadow-lg hover:bg-blue-50 active:scale-95 transition flex items-center gap-1.5"
              >
                <Video size={14} />
                <span>{t('joinVideoConsultation', preferences.language)}</span>
              </button>
            </div>
          </div>
        )}

        {/* Dual Action Grid: AI Assistant & Find Doctor */}
        <div className="grid grid-cols-2 gap-3">
          {/* Talk to AI Health Assistant */}
          <div
            onClick={() => navigate('/ai-assistant')}
            className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:border-blue-300 hover:shadow-md cursor-pointer transition flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2.5">
                <Bot size={22} />
              </div>
              <h3 className="font-bold text-sm text-gray-800 leading-snug">
                {t('aiHealthAssistant', preferences.language)}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">
                Ask about symptoms, fever, cold & safe home remedies
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600">
              <span>Start Chat</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Find & Consult a Doctor */}
          <div
            onClick={() => navigate('/doctors')}
            className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-md cursor-pointer transition flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5">
                <Calendar size={22} />
              </div>
              <h3 className="font-bold text-sm text-gray-800 leading-snug">
                {t('findDoctor', preferences.language)}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">
                Consult experienced doctors online in 12-hr slots
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <span>Find Doctors</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* Today's Medicine Reminders Widget */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-sm text-gray-900">{t('todayReminders', preferences.language)}</h3>
              <p className="text-xs text-gray-500">
                {completedReminders} of {totalReminders} doses completed today
              </p>
            </div>
            <button
              onClick={() => navigate('/reminders')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3.5">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalReminders > 0 ? (completedReminders / totalReminders) * 100 : 0}%` }}
            />
          </div>

          {/* Quick list of up to 2 items */}
          <div className="space-y-2">
            {reminders.slice(0, 2).map((rem) => {
              const firstTime = rem.times[0];
              const isTaken = rem.taken?.[firstTime];
              return (
                <div
                  key={rem.id}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${isTaken ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                      <Pill size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{rem.medicineName}</p>
                      <p className="text-[11px] text-gray-500">{rem.dosage} • {firstTime}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => markReminderTaken(rem.id, firstTime)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                      isTaken
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isTaken ? (
                      <>
                        <Check size={14} />
                        <span>Taken</span>
                      </>
                    ) : (
                      <span>Mark Taken</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Tracking Shortcut */}
        {latestOrder && (
          <div
            onClick={() => navigate(`/order/${latestOrder.id}`)}
            className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-200 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package size={18} className="text-blue-600" />
                <span className="text-xs font-bold text-gray-900">{t('orderTracking', preferences.language)}</span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                {latestOrder.status.replace('-', ' ')}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{latestOrder.items.length} items • ₹{latestOrder.total}</span>
              <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                <span>Track</span>
                <ChevronRight size={14} />
              </span>
            </div>
          </div>
        )}

        {/* Medicine Delivery Section */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-gray-900">{t('medicineDelivery', preferences.language)}</h3>
              <p className="text-xs text-gray-500">Genuine medicines delivered to your doorstep</p>
            </div>
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              title="View Cart"
            >
              <ShoppingCart size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Actions inside Delivery Section */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate('/medicines')}
              className="p-3 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 rounded-xl text-left flex items-center gap-2.5 transition"
            >
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <Search size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Search Drugs</p>
                <p className="text-[10px] text-gray-500">Browse 500+ items</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="p-3 bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 rounded-xl text-left flex items-center gap-2.5 transition"
            >
              <div className="p-2 bg-emerald-600 text-white rounded-lg">
                <Upload size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">{t('uploadPrescription', preferences.language)}</p>
                <p className="text-[10px] text-gray-500">Fast pharmacy order</p>
              </div>
            </button>
          </div>

          {/* Category Chips */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-gray-700 mb-2">Popular Categories</p>
            <div className="grid grid-cols-3 gap-2">
              {medicineCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => navigate(`/medicines?category=${encodeURIComponent(cat.name)}`)}
                  className="p-2.5 rounded-xl border border-gray-100 bg-slate-50 hover:bg-white hover:border-blue-300 text-center transition flex flex-col items-center justify-center gap-1 shadow-2xs"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-[11px] font-semibold text-gray-800 line-clamp-1">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency 108 Simulated Calling Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert size={36} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Emergency 108 Dispatch</h3>
            <p className="text-xs text-gray-600">
              Connecting to Andhra Pradesh & Telangana Emergency Health Helpline (108). In a real emergency, this calls local ambulance services.
            </p>
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
              Dialing 108 • Location GPS Tagged: Kukatpally, Hyderabad
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close Simulator
              </button>
              <button
                onClick={() => {
                  alert('Emergency call connected (simulated). Ambulance dispatched to registered location.');
                  setShowEmergencyModal(false);
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold"
              >
                Simulate Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Button */}
      <FloatingAIButton />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
