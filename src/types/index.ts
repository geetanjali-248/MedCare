export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor';
  avatar?: string;
  specialization?: string; // For doctors
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  address?: string;
}

export interface TimeSlot {
  id: string;
  time: string; // e.g. '10:00 AM', '02:30 PM'
  available: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number; // in years
  languages: string[];
  rating: number;
  availableSlots: TimeSlot[];
  image: string;
  hospital: string;
  qualifications: string;
  about: string;
  consultationFee?: number;
}

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';
export type AppointmentType = 'video' | 'in-person';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName?: string;
  doctorSpecialization?: string;
  doctorImage?: string;
  patientId: string;
  patientName?: string;
  date: string; // ISO date or 'YYYY-MM-DD'
  time: string; // '10:00 AM'
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  requiresPrescription: boolean;
  image?: string;
  dosage?: string;
  manufacturer?: string;
  inStock?: boolean;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export type OrderStatus = 'placed' | 'processing' | 'out-for-delivery' | 'delivered';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryCharge: number;
  status: OrderStatus;
  date: string;
  address: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  beforeFood: boolean;
  instructions?: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  reason: string;
  medicines: PrescriptionMedicine[];
  status: 'current' | 'past';
  notes?: string;
  hospital?: string;
}

export interface MedicationReminder {
  id: string;
  medicineName: string;
  times: string[]; // e.g. ['08:00 AM', '08:00 PM']
  dosage: string;
  beforeFood: boolean;
  taken: Record<string, boolean>; // key: time slot (e.g. '08:00 AM'), value: boolean
  soundId?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
}

export interface Consultation {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  reason: string;
  symptoms: string[];
  clinicalNotes: string;
  advice: string;
  followUp?: string;
  prescriptionId?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

export type AppLanguage = 'en' | 'te' | 'hi';
export type AppTextSize = 'small' | 'medium' | 'large';

export interface Preferences {
  language: AppLanguage;
  textSize: AppTextSize;
}
