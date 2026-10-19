import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Languages, Clock, Hospital, ChevronRight, Stethoscope } from 'lucide-react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

export default function DoctorDiscovery() {
  const navigate = useNavigate();
  const { doctors, preferences } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic', 'ENT Specialist'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialization.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title={t('findDoctor', preferences.language)} showBack={true} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by doctor, specialty, or clinic..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>

        {/* Specialization Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {specialties.map((spec) => {
            const isSelected = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>

        {/* Doctors List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Available Specialists ({filteredDoctors.length})</span>
            <span>12-hour schedule</span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-200">
              <Stethoscope size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="font-semibold text-sm">No doctors match your criteria</p>
              <p className="text-xs text-gray-400 mt-1">Try clearing filters or search terms</p>
            </div>
          ) : (
            filteredDoctors.map((doc) => {
              const availableSlotCount = doc.availableSlots.filter((s) => s.available).length;
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:border-blue-200 transition space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-lg">
                        {doc.name.replace('Dr. ', '').charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900">{doc.name}</h3>
                        <p className="text-xs text-blue-600 font-semibold">{doc.specialization}</p>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Hospital size={12} />
                          <span>{doc.hospital}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Stethoscope size={13} className="text-gray-400" />
                      <span>{doc.experience} {t('yearsExperience', preferences.language)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Languages size={13} className="text-gray-400" />
                      <span className="truncate">{doc.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Available 12-hour Time Slots pills */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock size={12} />
                        <span>Available Slots:</span>
                      </span>
                      <span className="text-emerald-600 font-semibold">{availableSlotCount} open</span>
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {doc.availableSlots.slice(0, 4).map((slot) => (
                        <span
                          key={slot.id}
                          className={`text-[10px] font-semibold px-2 py-1 rounded-lg border ${
                            slot.available
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-gray-100 text-gray-400 border-gray-200 line-through'
                          }`}
                        >
                          {slot.time}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">
                      ₹{doc.consultationFee || 500} <span className="text-[10px] text-gray-500 font-normal">/ session</span>
                    </span>
                    <button
                      onClick={() => navigate(`/doctor/${doc.id}`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1 transition"
                    >
                      <span>{t('viewProfile', preferences.language)}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
