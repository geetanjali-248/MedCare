import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, PhoneCall, MessageCircle } from 'lucide-react';
import Header from '../components/Header';

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I book a doctor appointment?',
      a: 'Go to "Find & Consult a Doctor" from the Home page. Search for a specialist by name or disease category. Tap "View Profile", choose an available 12-hour time slot (e.g. 10:00 AM), select Video or In-Clinic consultation, and tap "Book Appointment".',
    },
    {
      q: 'How do video consultations work?',
      a: 'On the scheduled appointment time, tap "Join Video Consultation" on your Home dashboard or appointment list. You will be connected to your doctor in a simulated video call where you can discuss your health issues, check vitals, and receive a signed digital prescription.',
    },
    {
      q: 'How do I add and manage medication reminders?',
      a: 'Tap the Reminders tab on the bottom bar, then tap the prominent "+" button. Enter your medicine name, choose daily times (you can add multiple times for morning and evening), dosage (e.g. 1 tablet), food instructions, and test the notification sound. Tap "Save Reminder". As you take medicines, tap "Mark as Taken" to update your daily progress.',
    },
    {
      q: 'How do I order prescribed medicines?',
      a: 'You can order directly from any prescription by tapping "Order Medicines", or browse the "Medicines" tab. Add items to your cart, review the delivery address, and proceed to simulated checkout. Free delivery is available for orders above ₹500.',
    },
    {
      q: 'How can I track my medicine delivery?',
      a: 'Go to the "Orders" tab or tap "Track Your Order" on the Home page. Tap your order to view the live 4-stage delivery timeline (Order Placed → Processing → Out for Delivery → Delivered) along with courier contact info.',
    },
    {
      q: 'How do I change the language or text size?',
      a: 'Go to Profile → Settings. Here you can switch between English, Telugu (తెలుగు), and Hindi (हिंदी). You can also choose Small, Medium, or Large text size to make the app easier to read.',
    },
    {
      q: 'What should I do in a medical emergency?',
      a: 'Tap the red "Call 108" Emergency Care banner at the top of the Home page to immediately connect with local ambulance and emergency dispatch services.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Help & User Guide" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Intro Banner */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white rounded-3xl p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen size={20} />
            <h2 className="text-base font-bold">MedCare Rural Help Center</h2>
          </div>
          <p className="text-xs text-blue-100 leading-relaxed">
            Find simple answers on how to use MedCare for your family's health checkups, medicine deliveries, and daily reminders.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 mb-2">
            Frequently Asked Questions
          </h3>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-100 overflow-hidden bg-slate-50 transition"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-gray-900 gap-2"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} className="shrink-0 text-blue-600" /> : <ChevronDown size={16} className="shrink-0 text-gray-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-200/50 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Helpline Support */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-2xl">
              <PhoneCall size={18} />
            </div>
            <div>
              <p className="font-bold text-gray-900">Need Live Agent Help?</p>
              <p className="text-[11px] text-gray-500">Toll-free rural health support: 1800-425-6332</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
