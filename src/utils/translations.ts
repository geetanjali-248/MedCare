import type { AppLanguage } from '../types';

const translations: Record<string, Record<AppLanguage, string>> = {
  // Navigation
  home: { en: 'Home', te: 'హోమ్', hi: 'होम' },
  health: { en: 'Health', te: 'ఆరోగ్యం', hi: 'स्वास्थ्य' },
  medicines: { en: 'Medicines', te: 'మందులు', hi: 'दवाइयाँ' },
  orders: { en: 'Orders', te: 'ఆర్డర్లు', hi: 'ऑर्डर' },
  reminders: { en: 'Reminders', te: 'రిమైండర్లు', hi: 'रिमाइंडर' },
  settings: { en: 'Settings', te: 'సెట్టింగ్స్', hi: 'सेटिंग्स' },
  profile: { en: 'Profile', te: 'ప్రొఫైల్', hi: 'प्रोफ़ाइल' },
  login: { en: 'Login', te: 'లాగిన్', hi: 'लॉगिन' },
  logout: { en: 'Log Out', te: 'లాగ్ అవుట్', hi: 'लॉग आउट' },
  
  // Search
  search: { en: 'Search', te: 'వెతకండి', hi: 'खोजें' },
  searchMedicines: { en: 'Search Medicines', te: 'మందులు వెతకండి', hi: 'दवाइयाँ खोजें' },
  searchDoctors: { en: 'Search Doctors', te: 'డాక్టర్లను వెతకండి', hi: 'डॉक्टर खोजें' },
  
  // Doctor related
  findDoctor: { en: 'Find & Consult a Doctor', te: 'డాక్టర్‌ను కనుగొని సంప్రదించండి', hi: 'डॉक्टर खोजें और परामर्श लें' },
  bookAppointment: { en: 'Book Appointment', te: 'అపాయింట్‌మెంట్ బుక్ చేయండి', hi: 'अपॉइंटमेंट बुक करें' },
  viewProfile: { en: 'View Profile', te: 'ప్రొఫైల్ చూడండి', hi: 'प्रोफ़ाइल देखें' },
  yearsExperience: { en: 'years experience', te: 'సంవత్సరాల అనుభవం', hi: 'वर्ष का अनुभव' },
  availableSlots: { en: 'Available Slots', te: 'అందుబాటులో ఉన్న స్లాట్లు', hi: 'उपलब्ध स्लॉट' },
  bookingConfirmed: { en: 'Booking Confirmed!', te: 'బుకింగ్ నిర్ధారించబడింది!', hi: 'बुकिंग कन्फ़र्म!' },
  
  // Home screen
  aiHealthAssistant: { en: 'Talk to AI Health Assistant', te: 'AI ఆరోగ్య సహాయకునితో మాట్లాడండి', hi: 'AI स्वास्थ्य सहायक से बात करें' },
  emergencyCare: { en: 'Emergency Care', te: 'అత్యవసర సంరక్షణ', hi: 'आपातकालीन देखभाल' },
  todayConsultation: { en: "Today's Consultation", te: 'ఈరోజు సంప్రదింపు', hi: 'आज का परामर्श' },
  joinVideoConsultation: { en: 'Join Video Consultation', te: 'వీడియో సంప్రదింపులో చేరండి', hi: 'वीडियो परामर्श में शामिल हों' },
  todayReminders: { en: "Today's Medicine Reminders", te: 'ఈరోజు మందుల రిమైండర్లు', hi: 'आज की दवा रिमाइंडर' },
  orderTracking: { en: 'Track Your Order', te: 'మీ ఆర్డర్ ట్రాక్ చేయండి', hi: 'अपना ऑर्डर ट्रैक करें' },
  medicineDelivery: { en: 'Medicine Delivery', te: 'మందుల డెలివరీ', hi: 'दवा डिलीवरी' },
  uploadPrescription: { en: 'Upload Prescription', te: 'ప్రిస్క్రిప్షన్ అప్‌లోడ్ చేయండి', hi: 'प्रिस्क्रिप्शन अपलोड करें' },
  cart: { en: 'Cart', te: 'కార్ట్', hi: 'कार्ट' },
  
  // Medicines
  addToCart: { en: 'Add to Cart', te: 'కార్ట్‌కి జోడించండి', hi: 'कार्ट में डालें' },
  checkout: { en: 'Checkout', te: 'చెక్ అవుట్', hi: 'चेकआउट' },
  orderPlaced: { en: 'Order Placed', te: 'ఆర్డర్ ఇచ్చారు', hi: 'ऑर्डर दिया गया' },
  processing: { en: 'Processing', te: 'ప్రాసెసింగ్', hi: 'प्रोसेसिंग' },
  outForDelivery: { en: 'Out for Delivery', te: 'డెలివరీకి బయలుదేరింది', hi: 'डिलीवरी के लिए निकला' },
  delivered: { en: 'Delivered', te: 'డెలివరీ అయింది', hi: 'डिलीवर हो गया' },
  
  // Prescriptions
  prescriptions: { en: 'Prescriptions', te: 'ప్రిస్క్రిప్షన్లు', hi: 'प्रिस्क्रिप्शन' },
  total: { en: 'Total', te: 'మొత్తం', hi: 'कुल' },
  current: { en: 'Current', te: 'ప్రస్తుత', hi: 'वर्तमान' },
  past: { en: 'Past', te: 'గత', hi: 'पिछला' },
  all: { en: 'All', te: 'అన్ని', hi: 'सभी' },
  orderMedicines: { en: 'Order Medicines', te: 'మందులు ఆర్డర్ చేయండి', hi: 'दवाइयाँ ऑर्डर करें' },
  setReminder: { en: 'Set Reminder', te: 'రిమైండర్ సెట్ చేయండి', hi: 'रिमाइंडर सेट करें' },
  
  // Reminders
  markAsTaken: { en: 'Mark as Taken', te: 'తీసుకున్నట్టు గుర్తించండి', hi: 'ली गई के रूप में चिह्नित करें' },
  remindIn10: { en: 'Remind in 10 min', te: '10 నిమిషాల్లో గుర్తు చేయండి', hi: '10 मिनट में याद दिलाएं' },
  todayProgress: { en: "Today's Progress", te: 'ఈరోజు పురోగతి', hi: 'आज की प्रगति' },
  beforeFood: { en: 'Before Food', te: 'భోజనానికి ముందు', hi: 'खाने से पहले' },
  afterFood: { en: 'After Food', te: 'భోజనం తర్వాత', hi: 'खाने के बाद' },
  addReminder: { en: 'Add Reminder', te: 'రిమైండర్ జోడించండి', hi: 'रिमाइंडर जोड़ें' },
  medicineName: { en: 'Medicine Name', te: 'మందు పేరు', hi: 'दवा का नाम' },
  dosage: { en: 'Dosage', te: 'మోతాదు', hi: 'खुराक' },
  reminderTime: { en: 'Reminder Time', te: 'రిమైండర్ సమయం', hi: 'रिमाइंडर समय' },
  
  // Medical History
  medicalHistory: { en: 'Medical History', te: 'వైద్య చరిత్ర', hi: 'चिकित्सा इतिहास' },
  allConsultations: { en: 'All Consultations', te: 'అన్ని సంప్రదింపులు', hi: 'सभी परामर्श' },
  last30Days: { en: 'Last 30 Days', te: 'చివరి 30 రోజులు', hi: 'पिछले 30 दिन' },
  last6Months: { en: 'Last 6 Months', te: 'చివరి 6 నెలలు', hi: 'पिछले 6 महीने' },
  viewDetails: { en: 'View Details', te: 'వివరాలు చూడండి', hi: 'विवरण देखें' },
  symptoms: { en: 'Symptoms', te: 'లక్షణాలు', hi: 'लक्षण' },
  clinicalNotes: { en: 'Clinical Notes', te: 'క్లినికల్ నోట్స్', hi: 'नैदानिक नोट्स' },
  adviceFollowUp: { en: 'Advice & Follow-up', te: 'సలహా & ఫాలో-అప్', hi: 'सलाह और फॉलो-अप' },
  
  // Video Consultation
  videoConsultation: { en: 'Video Consultation', te: 'వీడియో సంప్రదింపు', hi: 'वीडियो परामर्श' },
  simulatedCall: { en: 'This is a simulated video call', te: 'ఇది అనుకరణ వీడియో కాల్', hi: 'यह एक सिमुलेटेड वीडियो कॉल है' },
  endCall: { en: 'End Call', te: 'కాల్ ముగించు', hi: 'कॉल समाप्त करें' },
  
  // Profile
  personalInfo: { en: 'Personal Information', te: 'వ్యక్తిగత సమాచారం', hi: 'व्यक्तिगत जानकारी' },
  myAppointments: { en: 'My Appointments', te: 'నా అపాయింట్‌మెంట్‌లు', hi: 'मेरी अपॉइंटमेंट' },
  myPrescriptions: { en: 'My Prescriptions', te: 'నా ప్రిస్క్రిప్షన్లు', hi: 'मेरे प्रिस्क्रिप्शन' },
  myOrders: { en: 'My Orders', te: 'నా ఆర్డర్లు', hi: 'मेरे ऑर्डर' },
  
  // Settings
  textSize: { en: 'Text Size', te: 'అక్షరాల పరిమాణం', hi: 'टेक्स्ट का आकार' },
  language: { en: 'Language', te: 'భాష', hi: 'भाषा' },
  account: { en: 'Account', te: 'ఖాతా', hi: 'खाता' },
  help: { en: 'Help', te: 'సహాయం', hi: 'सहायता' },
  termsAndConditions: { en: 'Terms & Conditions', te: 'నిబంధనలు & షరతులు', hi: 'नियम और शर्तें' },
  small: { en: 'Small', te: 'చిన్న', hi: 'छोटा' },
  medium: { en: 'Medium', te: 'మధ్యస్థ', hi: 'मध्यम' },
  large: { en: 'Large', te: 'పెద్ద', hi: 'बड़ा' },
  english: { en: 'English', te: 'ఆంగ్లం', hi: 'अंग्रेज़ी' },
  telugu: { en: 'Telugu', te: 'తెలుగు', hi: 'तेलुगू' },
  hindi: { en: 'Hindi', te: 'హిందీ', hi: 'हिंदी' },
  
  // Actions
  save: { en: 'Save', te: 'సేవ్ చేయండి', hi: 'सेव करें' },
  cancel: { en: 'Cancel', te: 'రద్దు చేయండి', hi: 'रद्द करें' },
  continue_btn: { en: 'Continue', te: 'కొనసాగించు', hi: 'जारी रखें' },
  confirm: { en: 'Confirm', te: 'నిర్ధారించు', hi: 'पुष्टि करें' },
  delete_btn: { en: 'Delete', te: 'తొలగించు', hi: 'हटाएं' },
  edit: { en: 'Edit', te: 'సవరించు', hi: 'संपादित करें' },
  back: { en: 'Back', te: 'వెనుకకు', hi: 'वापस' },
  
  // Preferences
  selectLanguage: { en: 'Select Language', te: 'భాష ఎంచుకోండి', hi: 'भाषा चुनें' },
  selectTextSize: { en: 'Select Text Size', te: 'అక్షరాల పరిమాణం ఎంచుకోండి', hi: 'टेक्स्ट का आकार चुनें' },
  preferences: { en: 'Preferences', te: 'ప్రాధాన్యతలు', hi: 'प्राथमिकताएं' },
  
  // Doctor dashboard
  doctorDashboard: { en: 'Doctor Dashboard', te: 'డాక్టర్ డాష్‌బోర్డ్', hi: 'डॉक्टर डैशबोर्ड' },
  manageAvailability: { en: 'Manage Availability', te: 'లభ్యత నిర్వహించు', hi: 'उपलब्धता प्रबंधित करें' },
  patientInfo: { en: 'Patient Information', te: 'రోగి సమాచారం', hi: 'मरीज़ की जानकारी' },
  consultationNotes: { en: 'Consultation Notes', te: 'సంప్రదింపు నోట్స్', hi: 'परामर्श नोट्स' },
  createPrescription: { en: 'Create Prescription', te: 'ప్రిస్క్రిప్షన్ సృష్టించు', hi: 'प्रिस्क्रिप्शन बनाएं' },
  uploadQualifications: { en: 'Upload Qualifications', te: 'అర్హతలు అప్‌లోడ్ చేయండి', hi: 'योग्यता अपलोड करें' },
  
  // Misc
  notifications: { en: 'Notifications', te: 'నోటిఫికేషన్లు', hi: 'सूचनाएं' },
  location: { en: 'Location', te: 'లొకేషన్', hi: 'स्थान' },
  noResults: { en: 'No results found', te: 'ఫలితాలు దొరకలేదు', hi: 'कोई परिणाम नहीं मिला' },
  loading: { en: 'Loading...', te: 'లోడ్ అవుతోంది...', hi: 'लोड हो रहा है...' },
  welcome: { en: 'Welcome', te: 'స్వాగతం', hi: 'स्वागत है' },
  emergencyCall: { en: 'Call 108 for Emergency', te: 'అత్యవసరం కోసం 108 కు కాల్ చేయండి', hi: 'आपातकाल के लिए 108 पर कॉल करें' },
  deliveryCharge: { en: 'Delivery Charge', te: 'డెలివరీ ఛార్జ్', hi: 'डिलीवरी शुल्क' },
  estimatedDelivery: { en: 'Estimated Delivery', te: 'అంచనా డెలివరీ', hi: 'अनुमानित डिलीवरी' },
  paymentSimulated: { en: 'Payment Simulated', te: 'చెల్లింపు అనుకరణ', hi: 'भुगतान सिमुलेटेड' },
  disclaimer: { en: 'Medical Disclaimer: This AI assistant provides general health information only. It does not diagnose conditions, prescribe medicines, or replace professional medical advice. Always consult a qualified healthcare provider.', te: 'వైద్య నిరాకరణ: ఈ AI సహాయకుడు సాధారణ ఆరోగ్య సమాచారాన్ని మాత్రమే అందిస్తుంది. ఇది వ్యాధులను నిర్ధారించదు, మందులను సూచించదు, లేదా వృత్తిపరమైన వైద్య సలహాను భర్తీ చేయదు.', hi: 'चिकित्सा अस्वीकरण: यह AI सहायक केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है। यह रोगों का निदान नहीं करता, दवाइयाँ नहीं लिखता, या पेशेवर चिकित्सा सलाह की जगह नहीं लेता।' },
  typeHealthQuestion: { en: 'Type your health question...', te: 'మీ ఆరోగ్య ప్రశ్న టైప్ చేయండి...', hi: 'अपना स्वास्थ्य प्रश्न टाइप करें...' },
};

export function t(key: string, language: AppLanguage = 'en'): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[language] || entry['en'] || key;
}

export default translations;
