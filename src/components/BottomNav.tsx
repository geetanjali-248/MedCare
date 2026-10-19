import { Home, Heart, Pill, Package, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const navItems = [
  { path: '/home', icon: Home, labelKey: 'home' },
  { path: '/medical-history', icon: Heart, labelKey: 'health' },
  { path: '/medicines', icon: Pill, labelKey: 'medicines' },
  { path: '/orders', icon: Package, labelKey: 'orders' },
  { path: '/reminders', icon: Bell, labelKey: 'reminders' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { preferences } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg min-w-[60px] transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{t(item.labelKey, preferences.language)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
