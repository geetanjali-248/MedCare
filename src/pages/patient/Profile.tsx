import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  MapPin, 
  Droplet, 
  Calendar, 
  FileText, 
  Heart, 
  Bell, 
  Package, 
  Settings as SettingsIcon, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Shield,
  FileCheck
} from 'lucide-react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, preferences } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { label: t('myAppointments', preferences.language), icon: Calendar, path: '/home' },
    { label: t('myPrescriptions', preferences.language), icon: FileText, path: '/prescriptions' },
    { label: t('medicalHistory', preferences.language), icon: Heart, path: '/medical-history' },
    { label: t('reminders', preferences.language), icon: Bell, path: '/reminders' },
    { label: t('myOrders', preferences.language), icon: Package, path: '/orders' },
    { label: t('settings', preferences.language), icon: SettingsIcon, path: '/settings' },
    { label: t('help', preferences.language), icon: HelpCircle, path: '/help' },
    { label: t('termsAndConditions', preferences.language), icon: FileCheck, path: '/terms' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title={t('profile', preferences.language)} showBack={true} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              {user?.name?.charAt(0) || 'R'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900">{user?.name || 'Rajesh Kumar'}</h2>
                <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {user?.role || 'Patient'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                <Phone size={12} />
                <span>+91 {user?.phone || '9876543210'}</span>
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <Droplet size={12} className="text-red-500" />
                <span>Blood Group: <strong>{user?.bloodGroup || 'B+'}</strong> • Age: {user?.age || 35} Yrs</span>
              </p>
            </div>
          </div>

          {/* Registered Address */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100 text-xs text-gray-700 space-y-1">
            <span className="font-semibold text-gray-500 text-[10px] uppercase flex items-center gap-1">
              <MapPin size={12} className="text-blue-600" />
              <span>Registered Health Center Location</span>
            </span>
            <p className="font-medium text-gray-900 pl-4">
              {user?.address || '12-5-32, Kukatpally, Hyderabad, Telangana 500072'}
            </p>
          </div>
        </div>

        {/* Quick Menu List */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-50 text-blue-600">
                  <item.icon size={18} />
                </div>
                <span className="text-xs font-bold text-gray-800">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          ))}
        </div>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-2xl border border-red-200 flex items-center justify-center gap-2 transition"
        >
          <LogOut size={16} />
          <span>{t('logout', preferences.language)}</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
