import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';

// Auth & Preferences
import Login from './pages/Login';
import PreferencesPage from './pages/PreferencesPage';

// Patient Pages
import PatientHome from './pages/patient/PatientHome';
import DoctorDiscovery from './pages/patient/DoctorDiscovery';
import DoctorProfile from './pages/patient/DoctorProfile';
import BookingConfirmation from './pages/patient/BookingConfirmation';
import Prescriptions from './pages/patient/Prescriptions';
import PrescriptionDetail from './pages/patient/PrescriptionDetail';
import VideoConsultation from './pages/patient/VideoConsultation';
import MedicationReminders from './pages/patient/MedicationReminders';
import AddReminder from './pages/patient/AddReminder';
import MedicineDelivery from './pages/patient/MedicineDelivery';
import Cart from './pages/patient/Cart';
import Checkout from './pages/patient/Checkout';
import OrderConfirmation from './pages/patient/OrderConfirmation';
import OrdersList from './pages/patient/OrdersList';
import OrderTracking from './pages/patient/OrderTracking';
import MedicalHistory from './pages/patient/MedicalHistory';
import ConsultationDetail from './pages/patient/ConsultationDetail';
import AIHealthAssistant from './pages/patient/AIHealthAssistant';
import Profile from './pages/patient/Profile';

// Shared Settings & Info Pages
import Settings from './pages/Settings';
import HelpPage from './pages/HelpPage';
import TermsPage from './pages/TermsPage';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAvailability from './pages/doctor/DoctorAvailability';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorConsultation from './pages/doctor/DoctorConsultation';
import DoctorQualifications from './pages/doctor/DoctorQualifications';

function AppContent() {
  const { preferences } = useApp();

  // Dynamic CSS font scaling applied globally throughout the entire application
  const textSizeClass =
    preferences.textSize === 'small'
      ? 'text-[13px] leading-normal'
      : preferences.textSize === 'large'
      ? 'text-[17px] leading-relaxed'
      : 'text-[15px] leading-normal';

  return (
    <div className={`min-h-screen bg-slate-50 text-gray-900 transition-all ${textSizeClass}`}>
      <Routes>
        {/* Auth & Onboarding */}
        <Route path="/" element={<Login />} />
        <Route path="/preferences" element={<PreferencesPage />} />

        {/* Patient Experience */}
        <Route path="/home" element={<PatientHome />} />
        <Route path="/doctors" element={<DoctorDiscovery />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/booking-confirm" element={<BookingConfirmation />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/prescription/:id" element={<PrescriptionDetail />} />
        <Route path="/video-consultation" element={<VideoConsultation />} />
        <Route path="/reminders" element={<MedicationReminders />} />
        <Route path="/add-reminder" element={<AddReminder />} />
        <Route path="/medicines" element={<MedicineDelivery />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/order/:id" element={<OrderTracking />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/consultation/:id" element={<ConsultationDetail />} />
        <Route path="/ai-assistant" element={<AIHealthAssistant />} />
        <Route path="/profile" element={<Profile />} />

        {/* Settings & Info */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Doctor Experience */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-availability" element={<DoctorAvailability />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-consultation" element={<DoctorConsultation />} />
        <Route path="/doctor-qualifications" element={<DoctorQualifications />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
