import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  Activity, 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Pill, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import AppLogo from '../../components/AppLogo';
import type { PrescriptionMedicine, Prescription, Consultation } from '../../types';

export default function DoctorConsultation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, appointments, addPrescription, addConsultation } = useApp();

  const appointmentId = searchParams.get('appointmentId');
  const appointment = appointments.find((a) => a.id === appointmentId) || appointments[0];

  // Video call controls state
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callActive, setCallActive] = useState(true);

  // Patient Clinical History State
  const patientName = appointment?.patientName || 'Rajesh Kumar';
  const patientVitals = {
    bp: '120/80 mmHg',
    pulse: '74 bpm',
    spo2: '98%',
    temp: '99.1°F',
    allergies: 'No known drug allergies (NKDA)',
    history: 'Hypertension controlled on Amlodipine 5mg',
  };

  // Clinical Notes
  const [clinicalNotes, setClinicalNotes] = useState(
    'Patient presents with 2 days history of moderate pyrexia, rhinorrhea, and mild sore throat. O/E: Pharynx congested, lungs clear bilaterally. Vitals stable. Advised viral fever symptomatic management.'
  );
  const [advice, setAdvice] = useState(
    'Drink 3-4 liters of boiled lukewarm water daily. Complete 5-day course of prescribed antipyretic. Rest for 3 days.'
  );
  const [followUp, setFollowUp] = useState('5 days');

  // Dynamic Prescription Creator
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    {
      name: 'Paracetamol 500mg',
      dosage: '1 tablet',
      frequency: 'Twice daily',
      duration: '5 days',
      beforeFood: false,
      instructions: 'Take after food with full glass of water',
    },
    {
      name: 'Cetirizine 10mg',
      dosage: '1 tablet',
      frequency: 'Once daily at bedtime',
      duration: '5 days',
      beforeFood: false,
      instructions: 'After dinner',
    },
  ]);

  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('1 tablet');
  const [newMedFreq, setNewMedFreq] = useState('Twice daily');
  const [newMedDuration, setNewMedDuration] = useState('5 days');
  const [newMedBeforeFood, setNewMedBeforeFood] = useState(false);

  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  const handleAddMedicine = () => {
    if (!newMedName.trim()) return;
    setMedicines([
      ...medicines,
      {
        name: newMedName.trim(),
        dosage: newMedDosage,
        frequency: newMedFreq,
        duration: newMedDuration,
        beforeFood: newMedBeforeFood,
        instructions: newMedBeforeFood ? 'Before food' : 'After food',
      },
    ]);
    setNewMedName('');
  };

  const handleRemoveMedicine = (idx: number) => {
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  const handleSavePrescription = () => {
    const prescId = `presc-${Date.now()}`;
    const todayStr = new Date().toISOString().split('T')[0];

    const newPrescription: Prescription = {
      id: prescId,
      doctorName: user?.name || 'Dr. Priya Sharma',
      specialization: user?.specialization || 'General Physician',
      date: todayStr,
      reason: appointment?.notes || 'Seasonal Fever & Body Pain',
      medicines,
      status: 'current',
      hospital: 'Apollo Telehealth Services',
      notes: advice,
    };

    const newConsultation: Consultation = {
      id: `consult-${Date.now()}`,
      doctorName: user?.name || 'Dr. Priya Sharma',
      specialization: user?.specialization || 'General Physician',
      date: todayStr,
      reason: appointment?.notes || 'Seasonal Fever & Body Pain',
      symptoms: ['Fever (100.8°F)', 'Body aches', 'Congested throat'],
      clinicalNotes,
      advice,
      followUp,
      prescriptionId: prescId,
    };

    addPrescription(newPrescription);
    addConsultation(newConsultation);

    setIsSavedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Clinical Consultation & Rx" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Success Modal / Banner */}
        {isSavedSuccess && (
          <div className="bg-emerald-600 text-white rounded-3xl p-5 shadow-lg space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={24} className="text-emerald-200" />
              <h3 className="font-bold text-base">Prescription Published!</h3>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Official digital prescription has been signed and saved. Patient <strong>{patientName}</strong> can now immediately view, download, and order these medicines in their portal.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => navigate('/prescriptions')}
                className="flex-1 py-2 bg-white text-emerald-800 text-xs font-bold rounded-xl shadow hover:bg-emerald-50 transition"
              >
                View Patient Prescription
              </button>
              <button
                onClick={() => navigate('/doctor-dashboard')}
                className="flex-1 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* 1. Patient Clinical History Review */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-start justify-between border-b border-gray-100 pb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                <User size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">{patientName}</h3>
                <p className="text-[11px] text-gray-500">Age: 35 • Male • Blood: B+</p>
              </div>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
              Kukatpally Unit
            </span>
          </div>

          {/* Vitals Summary */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-50 rounded-xl border border-gray-100">
              <span className="text-[9px] text-gray-400 block font-bold">BP</span>
              <strong className="text-gray-900 text-[11px]">{patientVitals.bp}</strong>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-gray-100">
              <span className="text-[9px] text-gray-400 block font-bold">Pulse</span>
              <strong className="text-gray-900 text-[11px]">{patientVitals.pulse}</strong>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-gray-100">
              <span className="text-[9px] text-gray-400 block font-bold">SpO2</span>
              <strong className="text-emerald-600 text-[11px]">{patientVitals.spo2}</strong>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-gray-100">
              <span className="text-[9px] text-gray-400 block font-bold">Temp</span>
              <strong className="text-amber-600 text-[11px]">{patientVitals.temp}</strong>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-gray-600 space-y-0.5">
            <p><strong>Past Medical History: </strong>{patientVitals.history}</p>
            <p><strong>Allergies: </strong>{patientVitals.allergies}</p>
          </div>
        </div>

        {/* 2. Mock Video Consultation Interface */}
        <div className="bg-slate-900 rounded-3xl p-4 text-white shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 px-1.5 py-0.5 rounded-lg">
                <AppLogo size="xs" />
              </div>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Simulated Video Session</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">06:14</span>
          </div>

          {/* Video Placeholder */}
          <div className="relative aspect-16/9 bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-700">
            {callActive ? (
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-600/30 text-white rounded-full flex items-center justify-center mx-auto text-2xl mb-1.5 border border-blue-500/50">
                  🧑
                </div>
                <p className="text-xs font-bold text-white">{patientName}</p>
                <p className="text-[10px] text-emerald-400">Patient Video Feed Active</p>
              </div>
            ) : (
              <div className="text-center text-slate-400 text-xs">
                <PhoneOff size={24} className="mx-auto text-red-500 mb-1" />
                <span>Call Disconnected</span>
              </div>
            )}

            {/* Doctor Pip */}
            <div className="absolute bottom-2 right-2 w-20 h-14 bg-slate-700 rounded-xl border border-slate-600 flex items-center justify-center text-[9px] text-slate-300">
              👩‍⚕️ Dr. Priya
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-2.5 rounded-full ${isMicOn ? 'bg-slate-700 text-white' : 'bg-red-500 text-white'}`}
            >
              {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-2.5 rounded-full ${isVideoOn ? 'bg-slate-700 text-white' : 'bg-red-500 text-white'}`}
            >
              {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
            </button>
            <button
              onClick={() => setCallActive(!callActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                callActive ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
              }`}
            >
              <PhoneOff size={14} />
              <span>{callActive ? 'End Call' : 'Reconnect'}</span>
            </button>
          </div>
        </div>

        {/* 3. Doctor's Consultation Notes Input */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-2 text-xs">
          <label className="font-bold text-gray-900 flex items-center gap-1.5">
            <FileText size={16} className="text-blue-600" />
            <span>Clinical Notes & Diagnostic Assessment</span>
          </label>
          <textarea
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            rows={3}
            className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
            placeholder="Record symptoms, observations, and preliminary diagnosis..."
          />
        </div>

        {/* 4. Create Prescription Form */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5 text-blue-700">
              <Pill size={16} />
              <span>Create Official Digital Prescription (℞)</span>
            </h3>
            <span className="text-[10px] text-gray-400">{medicines.length} items</span>
          </div>

          {/* List of currently added drugs */}
          <div className="space-y-2">
            {medicines.map((m, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-gray-200 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-gray-900">{idx + 1}. {m.name}</p>
                  <p className="text-[10px] text-gray-500">
                    {m.dosage} • {m.frequency} • {m.duration} ({m.beforeFood ? 'Before Food' : 'After Food'})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(idx)}
                  className="p-1.5 text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Add Medicine sub-form */}
          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-2.5">
            <p className="font-bold text-blue-900 text-xs">Add Medication Item</p>

            <input
              type="text"
              value={newMedName}
              onChange={(e) => setNewMedName(e.target.value)}
              placeholder="Medicine Name (e.g. Azithromycin 500mg)"
              className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newMedDosage}
                onChange={(e) => setNewMedDosage(e.target.value)}
                placeholder="Dosage (e.g. 1 tablet)"
                className="p-2 bg-white border border-gray-200 rounded-xl text-xs"
              />
              <select
                value={newMedFreq}
                onChange={(e) => setNewMedFreq(e.target.value)}
                className="p-2 bg-white border border-gray-200 rounded-xl text-xs"
              >
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="Once at bedtime">Once at bedtime</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 items-center">
              <select
                value={newMedDuration}
                onChange={(e) => setNewMedDuration(e.target.value)}
                className="p-2 bg-white border border-gray-200 rounded-xl text-xs"
              >
                <option value="3 days">3 days</option>
                <option value="5 days">5 days</option>
                <option value="7 days">7 days</option>
                <option value="15 days">15 days</option>
                <option value="30 days">30 days</option>
              </select>

              <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMedBeforeFood}
                  onChange={(e) => setNewMedBeforeFood(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span>Take Before Food</span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleAddMedicine}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
            >
              <Plus size={14} />
              <span>Add Drug to Prescription</span>
            </button>
          </div>

          {/* Advice & Followup */}
          <div className="space-y-2">
            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Lifestyle & Dietary Advice
              </label>
              <input
                type="text"
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Drink fluids, complete course, avoid cold drinks"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Scheduled Follow-up
              </label>
              <input
                type="text"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 5 days, 1 week, or SOS if fever spikes"
              />
            </div>
          </div>

          {/* Save Prescription Action Button */}
          <button
            type="button"
            onClick={handleSavePrescription}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md flex items-center justify-center gap-2 transition"
          >
            <ShieldCheck size={18} />
            <span>Sign & Publish Digital Prescription</span>
          </button>
        </div>
      </div>
    </div>
  );
}
