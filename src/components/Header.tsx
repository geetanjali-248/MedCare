import { ArrowLeft, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import AppLogo from './AppLogo';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  showBrandTitle?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
}

export default function Header({
  title,
  showBack = false,
  showLogo = true,
  showBrandTitle = false,
  showNotifications = true,
  showProfile = true,
}: HeaderProps) {
  const navigate = useNavigate();
  const { user, notifications, clearNotifications } = useApp();

  const handleLogoClick = () => {
    if (user?.role === 'doctor') {
      navigate('/doctor-dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 px-3.5 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 active:bg-gray-200 text-gray-700 shrink-0 transition"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {showLogo && (
          <div className="shrink-0 flex items-center">
            <AppLogo size="sm" showTitle={showBrandTitle} onClick={handleLogoClick} />
          </div>
        )}

        {showLogo && title && (
          <div className="h-4 w-px bg-gray-200 shrink-0 hidden xs:block" />
        )}

        {title && (
          <h1 className="text-xs sm:text-sm font-bold text-gray-800 truncate tracking-tight">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {showNotifications && (
          <button
            onClick={() => {
              clearNotifications();
              alert('Notifications cleared');
            }}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative transition"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute 1 top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </button>
        )}

        {showProfile && (
          <button
            onClick={() => navigate(user?.role === 'doctor' ? '/doctor-dashboard' : '/profile')}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
            aria-label="User Profile"
          >
            <User size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
