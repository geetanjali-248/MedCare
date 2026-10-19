import type { Doctor, Medicine, Prescription, Consultation, MedicationReminder, Order, Appointment, User } from '../types';

export const demoPatient: User = {
  id: 'patient-1',
  name: 'Rajesh Kumar',
  email: 'rajesh@demo.com',
  phone: '9876543210',
  role: 'patient',
  age: 35,
  gender: 'Male',
  bloodGroup: 'B+',
  address: '12-5-32, Kukatpally, Hyderabad, Telangana 500072',
};

export const demoDoctor: User = {
  id: 'doctor-1',
  name: 'Dr. Priya Sharma',
  email: 'priya@demo.com',
  phone: '9876543211',
  role: 'doctor',
  specialization: 'General Physician',
};

export const sampleDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    specialization: 'General Physician',
    experience: 12,
    languages: ['English', 'Hindi', 'Telugu'],
    rating: 4.8,
    availableSlots: [
      { id: 's1', time: '10:00 AM', available: true },
      { id: 's2', time: '10:30 AM', available: true },
      { id: 's3', time: '11:00 AM', available: false },
      { id: 's4', time: '02:00 PM', available: true },
      { id: 's5', time: '03:30 PM', available: true },
      { id: 's6', time: '04:00 PM', available: true },
    ],
    image: '',
    hospital: 'Apollo Hospital, Hyderabad',
    qualifications: 'MBBS, MD (General Medicine)',
    about: 'Experienced general physician with expertise in preventive medicine, diabetes management, and chronic disease care. Fluent in English, Hindi, and Telugu.',
    consultationFee: 500,
  },
  {
    id: 'doc-2',
    name: 'Dr. Arun Reddy',
    specialization: 'Cardiologist',
    experience: 18,
    languages: ['English', 'Telugu'],
    rating: 4.9,
    availableSlots: [
      { id: 's7', time: '09:00 AM', available: true },
      { id: 's8', time: '09:30 AM', available: true },
      { id: 's9', time: '11:30 AM', available: true },
      { id: 's10', time: '01:00 PM', available: true },
    ],
    image: '',
    hospital: 'KIMS Hospital, Secunderabad',
    qualifications: 'MBBS, MD, DM (Cardiology)',
    about: 'Senior cardiologist specializing in interventional cardiology, heart failure management, and preventive cardiac care.',
    consultationFee: 800,
  },
  {
    id: 'doc-3',
    name: 'Dr. Lakshmi Devi',
    specialization: 'Dermatologist',
    experience: 8,
    languages: ['English', 'Hindi', 'Telugu'],
    rating: 4.7,
    availableSlots: [
      { id: 's11', time: '10:00 AM', available: true },
      { id: 's12', time: '11:00 AM', available: true },
      { id: 's13', time: '03:00 PM', available: true },
    ],
    image: '',
    hospital: 'Yashoda Hospital, Somajiguda',
    qualifications: 'MBBS, MD (Dermatology)',
    about: 'Specialist in skin disorders, cosmetic dermatology, and hair-related conditions.',
    consultationFee: 600,
  },
  {
    id: 'doc-4',
    name: 'Dr. Srinivas Rao',
    specialization: 'Pediatrician',
    experience: 15,
    languages: ['English', 'Telugu'],
    rating: 4.6,
    availableSlots: [
      { id: 's14', time: '09:00 AM', available: true },
      { id: 's15', time: '10:30 AM', available: true },
      { id: 's16', time: '02:30 PM', available: true },
      { id: 's17', time: '04:30 PM', available: true },
    ],
    image: '',
    hospital: 'Rainbow Children\'s Hospital, Banjara Hills',
    qualifications: 'MBBS, DCH, MD (Pediatrics)',
    about: 'Compassionate pediatrician with expertise in childhood illnesses, vaccinations, and developmental assessments.',
    consultationFee: 700,
  },
  {
    id: 'doc-5',
    name: 'Dr. Kavitha Nair',
    specialization: 'Orthopedic',
    experience: 10,
    languages: ['English', 'Hindi'],
    rating: 4.5,
    availableSlots: [
      { id: 's18', time: '10:00 AM', available: true },
      { id: 's19', time: '12:00 PM', available: true },
      { id: 's20', time: '03:00 PM', available: true },
    ],
    image: '',
    hospital: 'Continental Hospital, Gachibowli',
    qualifications: 'MBBS, MS (Orthopedics)',
    about: 'Orthopedic surgeon specializing in joint replacements, sports injuries, and fracture management.',
    consultationFee: 750,
  },
  {
    id: 'doc-6',
    name: 'Dr. Mohammed Fazil',
    specialization: 'ENT Specialist',
    experience: 7,
    languages: ['English', 'Hindi', 'Telugu'],
    rating: 4.4,
    availableSlots: [
      { id: 's21', time: '09:30 AM', available: true },
      { id: 's22', time: '11:00 AM', available: true },
      { id: 's23', time: '02:00 PM', available: true },
      { id: 's24', time: '04:00 PM', available: true },
    ],
    image: '',
    hospital: 'Care Hospital, Nampally',
    qualifications: 'MBBS, MS (ENT)',
    about: 'ENT specialist with expertise in sinus problems, hearing disorders, and throat infections.',
    consultationFee: 550,
  },
];

export const sampleMedicines: Medicine[] = [
  // Fever category
  { id: 'med-1', name: 'Paracetamol 500mg', price: 35, category: 'Fever', description: 'Effective for fever and mild pain relief', requiresPrescription: false, dosage: '1 tablet', manufacturer: 'Cipla', inStock: true },
  { id: 'med-2', name: 'Ibuprofen 400mg', price: 55, category: 'Fever', description: 'Anti-inflammatory and pain reliever', requiresPrescription: false, dosage: '1 tablet', manufacturer: 'Sun Pharma', inStock: true },
  { id: 'med-3', name: 'Aspirin 75mg', price: 25, category: 'Fever', description: 'Used for pain, fever, and inflammation', requiresPrescription: false, dosage: '1 tablet', manufacturer: 'Bayer', inStock: true },
  // Cough & Cold
  { id: 'med-4', name: 'Cetirizine 10mg', price: 30, category: 'Cough & Cold', description: 'Antihistamine for allergy relief', requiresPrescription: false, dosage: '1 tablet', manufacturer: 'Dr. Reddy\'s', inStock: true },
  { id: 'med-5', name: 'Cough Syrup 100ml', price: 85, category: 'Cough & Cold', description: 'Relief from cough and throat irritation', requiresPrescription: false, dosage: '5ml', manufacturer: 'Dabur', inStock: true },
  { id: 'med-6', name: 'Nasal Drops 15ml', price: 45, category: 'Cough & Cold', description: 'Relieves nasal congestion', requiresPrescription: false, dosage: '2 drops', manufacturer: 'Cipla', inStock: true },
  // Diabetes
  { id: 'med-7', name: 'Metformin 500mg', price: 120, category: 'Diabetes', description: 'Controls blood sugar levels', requiresPrescription: true, dosage: '1 tablet', manufacturer: 'USV', inStock: true },
  { id: 'med-8', name: 'Glimepiride 2mg', price: 95, category: 'Diabetes', description: 'Stimulates insulin production', requiresPrescription: true, dosage: '1 tablet', manufacturer: 'Sanofi', inStock: true },
  // BP
  { id: 'med-9', name: 'Amlodipine 5mg', price: 65, category: 'BP', description: 'Calcium channel blocker for BP control', requiresPrescription: true, dosage: '1 tablet', manufacturer: 'Pfizer', inStock: true },
  { id: 'med-10', name: 'Losartan 50mg', price: 80, category: 'BP', description: 'ARB medication for hypertension', requiresPrescription: true, dosage: '1 tablet', manufacturer: 'MSD', inStock: true },
  // Vitamins
  { id: 'med-11', name: 'Vitamin C 500mg', price: 150, category: 'Vitamins & Tonics', description: 'Boosts immunity', requiresPrescription: false, dosage: '1 tablet', manufacturer: 'Abbott', inStock: true },
  { id: 'med-12', name: 'Vitamin D3 60K IU', price: 120, category: 'Vitamins & Tonics', description: 'For bone health and immunity', requiresPrescription: false, dosage: '1 sachet weekly', manufacturer: 'USV', inStock: true },
  { id: 'med-13', name: 'Multivitamin Tablets', price: 280, category: 'Vitamins & Tonics', description: 'Daily multivitamin supplement', requiresPrescription: false, dosage: '1 tablet', manufacturer: 'Himalaya', inStock: true },
  // First Aid
  { id: 'med-14', name: 'Adhesive Bandages (Pack)', price: 40, category: 'First Aid', description: 'Sterile adhesive bandages for minor wounds', requiresPrescription: false, dosage: 'As needed', manufacturer: 'Band-Aid', inStock: true },
  { id: 'med-15', name: 'Antiseptic Solution 100ml', price: 60, category: 'First Aid', description: 'For cleaning wounds and preventing infection', requiresPrescription: false, dosage: 'Apply as needed', manufacturer: 'Dettol', inStock: true },
  { id: 'med-16', name: 'Cotton Roll 100g', price: 35, category: 'First Aid', description: 'Absorbent cotton for medical use', requiresPrescription: false, dosage: 'As needed', manufacturer: 'Softouch', inStock: true },
];

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const samplePrescriptions: Prescription[] = [
  {
    id: 'presc-1',
    doctorName: 'Dr. Priya Sharma',
    specialization: 'General Physician',
    date: today,
    reason: 'Seasonal Fever & Body Pain',
    status: 'current',
    hospital: 'Apollo Hospital, Hyderabad',
    notes: 'Take rest for 3 days. Drink plenty of fluids. Follow up after 5 days if symptoms persist.',
    medicines: [
      { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days', beforeFood: false, instructions: 'After food with water' },
      { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily at night', duration: '5 days', beforeFood: false, instructions: 'After dinner' },
      { name: 'Vitamin C 500mg', dosage: '1 tablet', frequency: 'Once daily', duration: '15 days', beforeFood: false, instructions: 'After breakfast' },
    ],
  },
  {
    id: 'presc-2',
    doctorName: 'Dr. Arun Reddy',
    specialization: 'Cardiologist',
    date: thirtyDaysAgo,
    reason: 'Routine Heart Checkup',
    status: 'current',
    hospital: 'KIMS Hospital, Secunderabad',
    notes: 'Blood pressure slightly elevated. Continue medication. Reduce salt intake. Exercise daily for 30 minutes.',
    medicines: [
      { name: 'Amlodipine 5mg', dosage: '1 tablet', frequency: 'Once daily morning', duration: '30 days', beforeFood: true, instructions: 'Before breakfast' },
      { name: 'Aspirin 75mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days', beforeFood: false, instructions: 'After lunch' },
    ],
  },
  {
    id: 'presc-3',
    doctorName: 'Dr. Lakshmi Devi',
    specialization: 'Dermatologist',
    date: sixMonthsAgo,
    reason: 'Skin Allergy',
    status: 'past',
    hospital: 'Yashoda Hospital, Somajiguda',
    notes: 'Allergic dermatitis. Avoid exposure to direct sunlight. Use sunscreen SPF 50+.',
    medicines: [
      { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily at night', duration: '10 days', beforeFood: false },
      { name: 'Calamine Lotion', dosage: 'Apply thin layer', frequency: 'Twice daily', duration: '14 days', beforeFood: false },
    ],
  },
];

export const sampleConsultations: Consultation[] = [
  {
    id: 'consult-1',
    doctorName: 'Dr. Priya Sharma',
    specialization: 'General Physician',
    date: today,
    reason: 'Seasonal Fever & Body Pain',
    symptoms: ['Fever (101°F)', 'Body aches', 'Mild headache', 'Runny nose'],
    clinicalNotes: 'Patient presents with acute viral fever. No signs of bacterial infection. Throat mildly congested. Lungs clear. Advised symptomatic treatment and rest.',
    advice: 'Rest for 3 days. Drink 3-4 liters of water daily. Eat light, easily digestible food. Avoid cold beverages.',
    followUp: '5 days',
    prescriptionId: 'presc-1',
  },
  {
    id: 'consult-2',
    doctorName: 'Dr. Arun Reddy',
    specialization: 'Cardiologist',
    date: thirtyDaysAgo,
    reason: 'Routine Heart Checkup',
    symptoms: ['Mild chest discomfort', 'Occasional breathlessness during exercise'],
    clinicalNotes: 'ECG normal. BP 140/90 mmHg. Mild LVH noted on echo. No significant valve abnormalities. Continue antihypertensive medication.',
    advice: 'Regular exercise (walking 30 min/day). Low-salt diet. Monthly BP monitoring. Avoid smoking and alcohol.',
    followUp: '30 days',
    prescriptionId: 'presc-2',
  },
  {
    id: 'consult-3',
    doctorName: 'Dr. Lakshmi Devi',
    specialization: 'Dermatologist',
    date: sixMonthsAgo,
    reason: 'Skin Allergy',
    symptoms: ['Red patches on arms', 'Itching', 'Mild swelling'],
    clinicalNotes: 'Contact dermatitis likely caused by new detergent. No signs of fungal infection. Patch test recommended if recurrence.',
    advice: 'Switch to hypoallergenic detergent. Apply prescribed lotion. Wear cotton clothing. Avoid hot water baths.',
    prescriptionId: 'presc-3',
  },
  {
    id: 'consult-4',
    doctorName: 'Dr. Srinivas Rao',
    specialization: 'Pediatrician',
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reason: 'Child Vaccination',
    symptoms: ['Routine vaccination visit'],
    clinicalNotes: 'Child growth and development normal. All milestones met. Administered DPT booster. No adverse reactions observed in 30-minute observation period.',
    advice: 'Mild fever may occur within 24 hours - give Paracetamol drops if needed. Next vaccination due in 6 months.',
  },
];

export const sampleReminders: MedicationReminder[] = [
  {
    id: 'rem-1',
    medicineName: 'Paracetamol 500mg',
    times: ['08:00 AM', '08:00 PM'],
    dosage: '1 tablet',
    beforeFood: false,
    taken: { '08:00 AM': false, '08:00 PM': false },
    soundId: 'default',
  },
  {
    id: 'rem-2',
    medicineName: 'Cetirizine 10mg',
    times: ['10:00 PM'],
    dosage: '1 tablet',
    beforeFood: false,
    taken: { '10:00 PM': false },
    soundId: 'default',
  },
  {
    id: 'rem-3',
    medicineName: 'Amlodipine 5mg',
    times: ['07:00 AM'],
    dosage: '1 tablet',
    beforeFood: true,
    taken: { '07:00 AM': false },
    soundId: 'gentle',
  },
  {
    id: 'rem-4',
    medicineName: 'Vitamin C 500mg',
    times: ['09:00 AM'],
    dosage: '1 tablet',
    beforeFood: false,
    taken: { '09:00 AM': false },
    soundId: 'default',
  },
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-20241014-001',
    items: [
      { medicine: sampleMedicines[0], quantity: 2 },
      { medicine: sampleMedicines[3], quantity: 1 },
      { medicine: sampleMedicines[10], quantity: 1 },
    ],
    total: 250,
    deliveryCharge: 40,
    status: 'out-for-delivery',
    date: today,
    address: '12-5-32, Kukatpally, Hyderabad, Telangana 500072',
    estimatedDelivery: 'Today by 6:00 PM',
    trackingNumber: 'TRK-98765',
  },
  {
    id: 'ORD-20241010-002',
    items: [
      { medicine: sampleMedicines[6], quantity: 1 },
      { medicine: sampleMedicines[8], quantity: 1 },
    ],
    total: 185,
    deliveryCharge: 40,
    status: 'delivered',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    address: '12-5-32, Kukatpally, Hyderabad, Telangana 500072',
    estimatedDelivery: 'Delivered',
    trackingNumber: 'TRK-98432',
  },
];

export const sampleAppointments: Appointment[] = [
  {
    id: 'apt-1',
    doctorId: 'doc-1',
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialization: 'General Physician',
    patientId: 'patient-1',
    patientName: 'Rajesh Kumar',
    date: today,
    time: '10:00 AM',
    status: 'upcoming',
    type: 'video',
  },
  {
    id: 'apt-2',
    doctorId: 'doc-2',
    doctorName: 'Dr. Arun Reddy',
    doctorSpecialization: 'Cardiologist',
    patientId: 'patient-1',
    patientName: 'Rajesh Kumar',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '11:30 AM',
    status: 'upcoming',
    type: 'in-person',
  },
];

export const aiResponses: Record<string, string> = {
  headache: 'Headaches can be caused by stress, dehydration, lack of sleep, or eye strain. Try resting in a quiet, dark room. Stay hydrated and consider over-the-counter pain relief like Paracetamol. If headaches are severe, frequent, or accompanied by vision changes, please consult a doctor.',
  fever: 'Fever is your body\'s natural response to infection. Rest well, drink plenty of fluids, and take Paracetamol if temperature exceeds 100.4°F (38°C). If fever persists for more than 3 days, or exceeds 103°F, seek immediate medical attention.',
  cough: 'A cough can be due to cold, allergies, or respiratory infection. Stay hydrated, use honey with warm water for relief, and avoid irritants. If cough persists beyond 2 weeks, produces blood, or is accompanied by difficulty breathing, consult a doctor immediately.',
  cold: 'Common cold usually resolves in 7-10 days. Rest well, drink warm fluids, gargle with salt water, and use steam inhalation. Over-the-counter decongestants may help. See a doctor if symptoms worsen or you develop high fever.',
  stomach: 'Stomach issues can range from indigestion to gastritis. Eat light, bland foods. Avoid spicy, oily, and processed foods. Stay hydrated. If you experience severe pain, vomiting blood, or symptoms lasting more than 48 hours, seek medical help.',
  diabetes: 'Managing diabetes involves regular blood sugar monitoring, balanced diet, regular exercise, and taking prescribed medications. Keep track of your HbA1c levels. Regular eye, kidney, and foot checkups are important. Please consult your doctor for personalized management.',
  'blood pressure': 'High blood pressure can be managed with regular exercise, reducing salt intake, maintaining healthy weight, and taking prescribed medication. Monitor your BP regularly. If you experience severe headache, chest pain, or vision problems, seek emergency care.',
  anxiety: 'Anxiety is common and manageable. Try deep breathing exercises, regular physical activity, and adequate sleep. Limit caffeine and alcohol. Talk to someone you trust. If anxiety significantly affects your daily life, please consult a mental health professional.',
  back_pain: 'Back pain often improves with rest, gentle stretching, and good posture. Apply hot or cold compress. Avoid heavy lifting. If pain radiates down your legs, causes numbness, or persists beyond 2 weeks, consult an orthopedic specialist.',
  skin: 'Skin issues vary widely. Keep the affected area clean and dry. Avoid scratching. Use mild, fragrance-free products. For persistent rashes, unusual moles, or skin changes, consult a dermatologist for proper diagnosis.',
  default: 'Thank you for sharing your concern. Based on general health guidelines, I recommend maintaining a healthy lifestyle with balanced nutrition, regular exercise, adequate sleep, and stress management. For a personalized assessment, I recommend consulting with a qualified healthcare professional. Would you like me to help you find a suitable doctor?',
};

export const medicineCategories = [
  { name: 'Fever', icon: '🌡️', color: 'bg-red-50 text-red-600' },
  { name: 'Cough & Cold', icon: '🤧', color: 'bg-blue-50 text-blue-600' },
  { name: 'Diabetes', icon: '💉', color: 'bg-purple-50 text-purple-600' },
  { name: 'BP', icon: '❤️', color: 'bg-pink-50 text-pink-600' },
  { name: 'Vitamins & Tonics', icon: '💊', color: 'bg-green-50 text-green-600' },
  { name: 'First Aid', icon: '🩹', color: 'bg-yellow-50 text-yellow-600' },
];

export const notificationSounds = [
  { id: 'default', name: 'Default' },
  { id: 'gentle', name: 'Gentle Chime' },
  { id: 'urgent', name: 'Urgent Alert' },
  { id: 'melody', name: 'Soft Melody' },
];
