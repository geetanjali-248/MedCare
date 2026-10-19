import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Upload, 
  FileText, 
  CheckCircle, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, user } = useApp();

  const [uploadedFileName, setUploadedFileName] = useState<string | null>('Rx_Prescription_DrPriya.pdf');
  const [prescriptionNote, setPrescriptionNote] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  const deliveryCharge = subtotal > 500 || cart.length === 0 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleRemovePrescription = () => {
    setUploadedFileName(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="My Cart & Prescription" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-gray-500 border border-gray-200 space-y-3">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart size={32} />
            </div>
            <h3 className="font-bold text-base text-gray-800">Your Cart is Empty</h3>
            <p className="text-xs text-gray-400">
              Browse our pharmacy catalog or upload your prescription to get medicines delivered.
            </p>
            <button
              onClick={() => navigate('/medicines')}
              className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition"
            >
              Browse Medicines
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 text-xs font-bold text-gray-800">
                <span>Items in Cart ({cart.length})</span>
                <span className="text-blue-600">Standard Pack</span>
              </div>

              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.medicine.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-gray-100 text-xs"
                  >
                    <div className="flex-1 pr-2">
                      <h4 className="font-bold text-gray-900">{item.medicine.name}</h4>
                      <p className="text-[11px] text-gray-500">{item.medicine.category}</p>
                      <span className="font-extrabold text-blue-700">₹{item.medicine.price}</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1 shadow-2xs">
                        <button
                          onClick={() => updateCartQuantity(item.medicine.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.medicine.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.medicine.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescription Upload Simulator */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <FileText size={15} className="text-blue-600" />
                <span>Doctor's Prescription (Optional / Rx Items)</span>
              </h3>

              {uploadedFileName ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-emerald-900 truncate">{uploadedFileName}</p>
                      <p className="text-[10px] text-emerald-700">Verified doctor digital slip attached</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <label className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer px-2 py-1">
                      Replace
                      <input type="file" onChange={handleSimulatedUpload} className="hidden" />
                    </label>
                    <button
                      onClick={handleRemovePrescription}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-2xl p-4 text-center space-y-1 transition bg-slate-50">
                  <Upload size={22} className="mx-auto text-blue-600 mb-1" />
                  <p className="text-xs font-bold text-gray-800">Upload Doctor Prescription</p>
                  <p className="text-[10px] text-gray-400">PDF, JPG, or PNG (Simulated local preview)</p>
                  <label className="inline-block mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-700">
                    Choose File
                    <input type="file" onChange={handleSimulatedUpload} className="hidden" />
                  </label>
                </div>
              )}
            </div>

            {/* Estimated Delivery Banner */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-2.5 text-xs text-blue-900">
              <Truck size={18} className="text-blue-600 shrink-0" />
              <div>
                <span className="font-bold">Estimated Delivery: Today within 2-3 hours</span>
                <p className="text-[11px] text-blue-700">
                  To: {user?.address ? user.address.split(',')[0] + ', Kukatpally' : 'Kukatpally, Hyderabad'}
                </p>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-2 text-xs">
              <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
                Order Bill Summary
              </h3>

              <div className="flex items-center justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Delivery Charges</span>
                {deliveryCharge === 0 ? (
                  <span className="font-bold text-emerald-600">FREE</span>
                ) : (
                  <span className="font-semibold text-gray-900">₹{deliveryCharge}</span>
                )}
              </div>

              {subtotal < 500 && (
                <p className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded-lg">
                  Add items worth ₹{500 - subtotal} more for FREE delivery!
                </p>
              )}

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm font-extrabold text-gray-900">
                <span>Total Amount</span>
                <span className="text-blue-700 text-base">₹{total}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition"
            >
              <span>Proceed to Checkout (₹{total})</span>
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
