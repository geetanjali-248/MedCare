import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Doctor, TimeSlot, CartItem, Order, Appointment, MedicationReminder, Prescription, Consultation, Preferences, Medicine, AppLanguage, AppTextSize } from '../types';
import { sampleDoctors, samplePrescriptions, sampleConsultations, sampleReminders, sampleOrders, sampleAppointments } from '../data/sampleData';

interface AppContextType {
  user: User | null;
  preferences: Preferences;
  doctors: Doctor[];
  cart: CartItem[];
  orders: Order[];
  appointments: Appointment[];
  reminders: MedicationReminder[];
  prescriptions: Prescription[];
  consultations: Consultation[];
  notifications: number;
  login: (user: User) => void;
  logout: () => void;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  addToCart: (medicine: Medicine, quantity?: number) => void;
  removeFromCart: (medicineId: string) => void;
  updateCartQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (address: string) => void;
  bookAppointment: (appointment: Appointment) => void;
  cancelAppointment: (appointmentId: string) => void;
  updateDoctorSlots: (doctorId: string, slots: TimeSlot[]) => void;
  addReminder: (reminder: MedicationReminder) => void;
  updateReminder: (reminder: MedicationReminder) => void;
  deleteReminder: (reminderId: string) => void;
  markReminderTaken: (reminderId: string, time: string) => void;
  snoozeReminder: (reminderId: string, time: string) => void;
  addPrescription: (prescription: Prescription) => void;
  addConsultation: (consultation: Consultation) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Load preferences from localStorage
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const saved = localStorage.getItem('medcare-preferences');
    return saved ? JSON.parse(saved) : { language: 'en', textSize: 'medium' };
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('medcare-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('medcare-orders');
    return saved ? JSON.parse(saved) : sampleOrders;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('medcare-appointments');
    return saved ? JSON.parse(saved) : sampleAppointments;
  });

  const [reminders, setReminders] = useState<MedicationReminder[]>(() => {
    const saved = localStorage.getItem('medcare-reminders');
    return saved ? JSON.parse(saved) : sampleReminders;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('medcare-doctors');
    return saved ? JSON.parse(saved) : sampleDoctors;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem('medcare-prescriptions');
    return saved ? JSON.parse(saved) : samplePrescriptions;
  });
  const [consultations, setConsultations] = useState<Consultation[]>(sampleConsultations);
  const [notifications, setNotifications] = useState(3);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('medcare-doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('medcare-prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('medcare-preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (user) localStorage.setItem('medcare-user', JSON.stringify(user));
    else localStorage.removeItem('medcare-user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('medcare-reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('medcare-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('medcare-appointments', JSON.stringify(appointments));
  }, [appointments]);

  const login = (u: User) => setUser(u);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('medcare-user');
  };

  const updatePreferences = (prefs: Partial<Preferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  const addToCart = (medicine: Medicine, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { medicine, quantity }];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => prev.filter(item => item.medicine.id !== medicineId));
  };

  const updateCartQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = (address: string) => {
    const subtotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
    const deliveryCharge = 40;
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: subtotal + deliveryCharge,
      deliveryCharge,
      status: 'placed',
      date: new Date().toISOString().split('T')[0],
      address,
      estimatedDelivery: 'Within 2-3 hours',
      trackingNumber: `TRK-${Math.floor(Math.random() * 100000)}`,
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setNotifications(prev => prev + 1);
  };

  const bookAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
    setNotifications(prev => prev + 1);
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(a => a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a)
    );
  };

  const updateDoctorSlots = (doctorId: string, slots: TimeSlot[]) => {
    setDoctors(prev =>
      prev.map(d => d.id === doctorId ? { ...d, availableSlots: slots } : d)
    );
  };

  const addReminder = (reminder: MedicationReminder) => {
    setReminders(prev => [...prev, reminder]);
  };

  const updateReminder = (reminder: MedicationReminder) => {
    setReminders(prev =>
      prev.map(r => r.id === reminder.id ? reminder : r)
    );
  };

  const deleteReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  const markReminderTaken = (reminderId: string, time: string) => {
    setReminders(prev =>
      prev.map(r =>
        r.id === reminderId
          ? { ...r, taken: { ...r.taken, [time]: true } }
          : r
      )
    );
  };

  const snoozeReminder = (_reminderId: string, _time: string) => {
    // In a real app, this would schedule a notification
    // For demo, we just show a toast/alert
    alert('Reminder snoozed for 10 minutes (simulated)');
  };

  const addPrescription = (prescription: Prescription) => {
    setPrescriptions(prev => [prescription, ...prev]);
  };

  const addConsultation = (consultation: Consultation) => {
    setConsultations(prev => [consultation, ...prev]);
  };

  const clearNotifications = () => setNotifications(0);

  return (
    <AppContext.Provider value={{
      user, preferences, doctors, cart, orders, appointments, reminders,
      prescriptions, consultations, notifications,
      login, logout, updatePreferences, addToCart, removeFromCart,
      updateCartQuantity, clearCart, placeOrder, bookAppointment,
      cancelAppointment, updateDoctorSlots, addReminder, updateReminder, deleteReminder,
      markReminderTaken, snoozeReminder, addPrescription, addConsultation,
      clearNotifications,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
export type { AppLanguage, AppTextSize };
