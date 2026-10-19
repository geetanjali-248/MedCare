import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  PhoneOff, 
  Activity, 
  Heart, 
  Thermometer, 
  FileText, 
  ShoppingCart, 
  MapPin, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import AppLogo from '../../components/AppLogo';

export default function VideoConsultation() {
  const navigate = useNavigate();
  const { user, prescriptions } = useApp();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'vitals'>('vitals');

  const doctorName = 'Dr. Priya Sharma';
  const doctorSpecialization = 'Senior General Physician';

  const handleEndCall = () => {
    setCallEnded(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between max-w-lg mx-auto">
      {/* Consultation Header */}
      <div className="bg-slate-800/90 backdrop-blur px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-2 py-1 rounded-xl">
            <AppLogo size="xs" />
          </div>
          <div className="h-5 w-px bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
              DR
            </div>
            <div>
              <h2 className="text-xs font-bold text-white leading-tight">{doctorName}</h2>
              <p className="text-[10px] text-blue-400">{doctorSpecialization}</p>
            </div>
          </div>
        </div>

        {/* Live Call Duration / Simulated Status */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-bold text-emerald-400">08:42</span>
        </div>
      </div>

      {/* Main Video Call Area */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        {/* Simulated Call Disclaimer Pill */}
        <div className="bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 rounded-xl text-center text-xs text-amber-300 flex items-center justify-center gap-1.5">
          <AlertCircle size={14} className="shrink-0" />
          <span>Interactive Prototype • Simulated Video Tele-consultation</span>
        </div>

        {!callEnded ? (
          <>
            {/* Large Video Call Viewport */}
            <div className="relative w-full aspect-4/3 bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center">
              {/* Doctor Mock Stream */}
              <div className="text-center p-6 space-y-3">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-slate-700 animate-pulse">
                  👩‍⚕️
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{doctorName}</h3>
                  <p className="text-xs text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span>Live Audio/Video Stream Active</span>
                  </p>
                </div>
              </div>

              {/* Patient Self-View (Picture-in-Picture) */}
              <div className="absolute bottom-3 right-3 w-28 h-20 bg-slate-700 rounded-2xl border-2 border-slate-600 overflow-hidden shadow-lg flex items-center justify-center">
                {isVideoOn ? (
                  <div className="text-center">
                    <span className="text-lg">🧑</span>
                    <span className="block text-[9px] text-slate-300 font-medium">You (Patient)</span>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 text-[10px]">
                    <VideoOff size={16} className="mx-auto mb-0.5" />
                    <span>Cam Off</span>
                  </div>
                )}
              </div>

              {/* Doctor Speaking Indicator */}
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur px-2.5 py-1 rounded-full text-[10px] text-white flex items-center gap-1.5">
                <Volume2 size={12} className="text-blue-400" />
                <span>Doctor is speaking...</span>
              </div>
            </div>

            {/* Interactive Call Controls Bar */}
            <div className="flex items-center justify-center gap-4 py-2">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition shadow-lg ${
                  isMicOn ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-red-500/80 text-white'
                }`}
                title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition shadow-lg ${
                  isVideoOn ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-red-500/80 text-white'
                }`}
                title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>

              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition shadow-lg ${
                  isSpeakerOn ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-red-500/80 text-white'
                }`}
                title="Toggle Speaker"
              >
                {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>

              <button
                onClick={handleEndCall}
                className="w-14 h-12 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full flex items-center justify-center transition shadow-xl font-bold"
                title="End Consultation"
              >
                <PhoneOff size={22} />
              </button>
            </div>

            {/* Clinical Profile & Notes Tabs */}
            <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700 space-y-3">
              <div className="flex border-b border-slate-700 pb-2 text-xs font-semibold gap-4">
                <button
                  onClick={() => setActiveTab('vitals')}
                  className={`pb-1 transition ${activeTab === 'vitals' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'}`}
                >
                  Patient Clinical Profile
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-1 transition ${activeTab === 'notes' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'}`}
                >
                  Live Clinical Notes
                </button>
              </div>

              {activeTab === 'vitals' ? (
                <div className="space-y-3 text-xs">
                  {/* Vitals Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-slate-700/60 p-2.5 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block">BP</span>
                      <strong className="text-white text-xs">120/80</strong>
                    </div>
                    <div className="bg-slate-700/60 p-2.5 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                      <strong className="text-white text-xs">74 bpm</strong>
                    </div>
                    <div className="bg-slate-700/60 p-2.5 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block">SpO2</span>
                      <strong className="text-emerald-400 text-xs">98%</strong>
                    </div>
                    <div className="bg-slate-700/60 p-2.5 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block">Temp</span>
                      <strong className="text-amber-300 text-xs">99.1°F</strong>
                    </div>
                  </div>

                  {/* Primary complaint */}
                  <div className="p-3 bg-slate-700/40 rounded-xl border border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Chief Complaint
                    </span>
                    <p className="text-slate-200">
                      Moderate fever with body ache and throat irritation since 2 days. No breathing difficulty.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-slate-300">
                  <p className="p-3 bg-slate-700/40 rounded-xl border border-slate-700 leading-relaxed">
                    "Patient examined over video link. Pharynx mildly erythematous. Advised paracetamol 500mg, oral hydration, and vitamin C. Digital prescription signed."
                  </p>
                  <p className="text-[10px] text-slate-400">Dr. Priya Sharma • Real-time clinical transcription</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Post-Call Summary & Next Steps Screen */
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Consultation Completed</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your session with {doctorName} ended successfully. Duration: 12m 45s.
              </p>
            </div>

            {/* Next Steps Card */}
            <div className="bg-slate-700/60 p-4 rounded-2xl text-left space-y-3 text-xs">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-blue-400">
                Recommended Next Steps:
              </h4>

              <div
                onClick={() => navigate('/prescriptions')}
                className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-600 rounded-xl flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={18} className="text-blue-400" />
                  <div>
                    <strong className="block text-white">View Signed Digital Prescription</strong>
                    <span className="text-[10px] text-slate-400">Includes 3 medicines & dosage advice</span>
                  </div>
                </div>
                <span className="text-blue-400 text-xs font-bold">View →</span>
              </div>

              <div
                onClick={() => navigate('/medicines')}
                className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-600 rounded-xl flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingCart size={18} className="text-emerald-400" />
                  <div>
                    <strong className="block text-white">Get Prescribed Medicines</strong>
                    <span className="text-[10px] text-slate-400">Free delivery to registered rural address</span>
                  </div>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Order →</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                <MapPin size={14} className="text-slate-500" />
                <span>Delivery Address: {user?.address || 'Kukatpally, Hyderabad'}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/home')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition"
            >
              Return to Patient Home
            </button>
          </div>
        )}
      </div>

      {/* Safety Bottom Bar */}
      <div className="p-3 bg-slate-800/80 border-t border-slate-700 text-center text-[10px] text-slate-400">
        Simulated Tele-health Session • End-to-end Encrypted Prototype
      </div>
    </div>
  );
}
