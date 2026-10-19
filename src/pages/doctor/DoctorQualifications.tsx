import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Upload, CheckCircle2, ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';

export default function DoctorQualifications() {
  const navigate = useNavigate();
  const { user } = useApp();

  const [regNumber, setRegNumber] = useState('TSMC/2012/84291');
  const [council, setCouncil] = useState('Telangana State Medical Council');
  const [degrees, setDegrees] = useState('MBBS, MD (General Medicine)');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'MBBS_Degree_Certificate.pdf',
    'State_Medical_Council_License_2024.pdf',
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles([...uploadedFiles, e.target.files[0].name]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      navigate('/doctor-dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Doctor Credentials" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Verification Status Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-2xl">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="font-bold text-xs text-emerald-900">National Health Authority Verified</h3>
            <p className="text-[11px] text-emerald-700">Digital Telehealth Practitioner ID #DTP-84291</p>
          </div>
        </div>

        {isSuccess && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-bold flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Credentials saved successfully! Returning to dashboard...</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-800 mb-1">
              Medical Registration Number
            </label>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">
              State Medical Council
            </label>
            <input
              type="text"
              value={council}
              onChange={(e) => setCouncil(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">
              Degrees & Medical Specialization
            </label>
            <input
              type="text"
              value={degrees}
              onChange={(e) => setDegrees(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Certificate Documents */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="block font-bold text-gray-800 flex items-center justify-between">
              <span>Verified Certificates & Licenses</span>
              <span className="text-[10px] text-emerald-600 font-bold">Simulated Upload</span>
            </label>

            <div className="space-y-1.5">
              {uploadedFiles.map((f, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 border border-gray-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={15} className="text-blue-600" />
                    <span className="font-semibold text-gray-800">{f}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    Verified
                  </span>
                </div>
              ))}
            </div>

            <label className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-2xl p-3 text-center block cursor-pointer bg-slate-50 transition">
              <Upload size={18} className="mx-auto text-blue-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-700 block">Upload New Certificate / Degree</span>
              <span className="text-[9px] text-gray-400">PDF or JPG (Simulated local preview)</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 size={16} />
            <span>Update & Save Credentials</span>
          </button>
        </form>
      </div>
    </div>
  );
}
