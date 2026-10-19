import { FileCheck, ShieldAlert, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Terms & Conditions" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Prototype Header Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-3xl flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-sm">Prototype Demonstration Terms</h2>
            <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
              This application is an educational prototype and user interface simulation created for research and student demonstration purposes.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4 text-xs text-gray-700 leading-relaxed">
          <section className="space-y-1">
            <h3 className="font-bold text-gray-900 text-sm">1. Prototype Purpose</h3>
            <p>
              MedCare is a conceptual prototype demonstrating how telehealth, digital prescriptions, medicine logistics, and bilingual accessibility can improve healthcare delivery in rural communities in India.
            </p>
          </section>

          <section className="space-y-1 pt-2 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">2. Demo Accounts & Sample Data</h3>
            <p>
              All doctors, patient profiles, consultations, medications, appointment slots, and order records displayed within this application are entirely fictional and for demonstration purposes only.
            </p>
          </section>

          <section className="space-y-1 pt-2 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">3. Simulated Payments & Logistics</h3>
            <p>
              All checkout flows, payment transactions (UPI, COD, Card), order IDs, and vertical delivery tracking timelines are simulated locally in state. No actual financial charges are incurred, and no real physical goods are dispatched.
            </p>
          </section>

          <section className="space-y-1 pt-2 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">4. Medical & AI Disclaimer</h3>
            <p>
              The AI Health Assistant and consultation simulators do not provide medical diagnosis, clinical treatment plans, or emergency intervention. Always seek the advice of a qualified physician or healthcare provider for any medical condition.
            </p>
          </section>

          <section className="space-y-1 pt-2 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">5. Privacy & Storage</h3>
            <p>
              User preferences (language and font scale) and temporary demo reminders are stored strictly in your browser's local storage (`localStorage`). No personal medical information is transmitted to external cloud servers or third parties.
            </p>
          </section>

          <section className="space-y-1 pt-2 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">6. Service Limitations</h3>
            <p>
              There is no warranty or guarantee of actual clinical, pharmaceutical, or logistical fulfillment. This system is for evaluation, accessibility review, and design verification only.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
