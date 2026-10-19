import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Upload, 
  Check, 
  Filter, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useApp } from '../../contexts/AppContext';
import { sampleMedicines, medicineCategories } from '../../data/sampleData';
import { t } from '../../utils/translations';
import type { Medicine } from '../../types';

export default function MedicineDelivery() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cart, addToCart, updateCartQuantity, preferences } = useApp();

  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'otc' | 'rx'>('all');

  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category')!);
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search')!);
    }
  }, [searchParams]);

  const filteredMedicines = sampleMedicines.filter((med) => {
    const matchesCategory =
      selectedCategory === 'All' || med.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRx =
      prescriptionFilter === 'all'
        ? true
        : prescriptionFilter === 'rx'
        ? med.requiresPrescription
        : !med.requiresPrescription;

    return matchesCategory && matchesSearch && matchesRx;
  });

  const getCartQuantity = (medicineId: string) => {
    const found = cart.find((item) => item.medicine.id === medicineId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title={t('medicines', preferences.language)} showBack={true} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Search Bar & Cart Shortcut */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines, syrups, bandages..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
          </div>

          <button
            onClick={() => navigate('/cart')}
            className="relative p-2.5 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
            title="View Cart"
          >
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Upload Prescription CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
              Got a Prescription?
            </span>
            <h3 className="font-bold text-sm mt-1">Upload Slip for Quick Dispense</h3>
            <p className="text-[11px] text-emerald-100">Our pharmacists will prepare your order</p>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="px-3.5 py-2 bg-white text-emerald-700 text-xs font-bold rounded-xl shadow hover:bg-emerald-50 active:scale-95 transition flex items-center gap-1.5"
          >
            <Upload size={14} />
            <span>Upload</span>
          </button>
        </div>

        {/* Category Pills Bar */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-gray-700">Browse Categories</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            {medicineCategories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prescription vs Over-the-counter filter */}
        <div className="flex gap-2 text-[11px]">
          <button
            onClick={() => setPrescriptionFilter('all')}
            className={`px-2.5 py-1 rounded-lg border font-medium ${
              prescriptionFilter === 'all' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setPrescriptionFilter('otc')}
            className={`px-2.5 py-1 rounded-lg border font-medium ${
              prescriptionFilter === 'otc' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            OTC Medicines
          </button>
          <button
            onClick={() => setPrescriptionFilter('rx')}
            className={`px-2.5 py-1 rounded-lg border font-medium ${
              prescriptionFilter === 'rx' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            Rx Required
          </button>
        </div>

        {/* Medicines Catalog Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Showing {filteredMedicines.length} Medicines</span>
            <span>All prices in INR (₹)</span>
          </div>

          {filteredMedicines.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-500 border border-gray-200">
              <AlertCircle size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="font-semibold text-sm">No medicines found</p>
              <p className="text-xs text-gray-400 mt-1">Try another category or search term</p>
            </div>
          ) : (
            filteredMedicines.map((med) => {
              const qtyInCart = getCartQuantity(med.id);
              return (
                <div
                  key={med.id}
                  className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex items-center justify-between gap-3 hover:border-blue-200 transition"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {med.category}
                      </span>
                      {med.requiresPrescription && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-50 text-red-700">
                          Rx Required
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-gray-900">{med.name}</h4>
                    <p className="text-xs text-gray-500">{med.description}</p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-sm font-extrabold text-gray-900">₹{med.price}</span>
                      <span className="text-[10px] text-gray-400">({med.dosage || '1 unit'})</span>
                    </div>
                  </div>

                  {/* Add to Cart / Quantity controls */}
                  <div className="shrink-0">
                    {qtyInCart === 0 ? (
                      <button
                        onClick={() => addToCart(med, 1)}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1 active:scale-95 transition"
                      >
                        <Plus size={14} />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-xl p-1">
                        <button
                          onClick={() => updateCartQuantity(med.id, qtyInCart - 1)}
                          className="w-7 h-7 bg-white text-blue-700 hover:bg-blue-100 rounded-lg flex items-center justify-center font-bold text-xs shadow-2xs"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-blue-900">
                          {qtyInCart}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(med.id, qtyInCart + 1)}
                          className="w-7 h-7 bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex items-center justify-center font-bold text-xs shadow-2xs"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    )}
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
