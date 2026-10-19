import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, user, placeOrder, orders } = useApp();

  const [address, setAddress] = useState(
    user?.address || '12-5-32, Kukatpally, Hyderabad, Telangana 500072'
  );
  const [deliverySlot, setDeliverySlot] = useState('Today (2-3 Hours)');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [upiId, setUpiId] = useState('rajesh@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  const deliveryCharge = subtotal > 500 || cart.length === 0 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      placeOrder(address);
      setIsProcessing(false);
      navigate('/order-confirmation');
    }, 800);
  };

  if (cart.length === 0) {
    navigate('/medicines');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Checkout & Delivery" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Safe Sandbox Warning */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Demo Mode Notice</span>
            <span>Simulated checkout only. No real payment or card details are ever collected.</span>
          </div>
        </div>

        {/* 1. Delivery Address */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
            <MapPin size={16} className="text-blue-600" />
            <span>Delivery Address</span>
          </h3>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
            placeholder="Enter complete postal address with village/town and pincode"
          />
          <p className="text-[10px] text-gray-400">
            Registered Patient: {user?.name || 'Rajesh Kumar'} ({user?.phone || '9876543210'})
          </p>
        </div>

        {/* 2. Delivery Preferences */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
            <Truck size={16} className="text-blue-600" />
            <span>Delivery Preferences</span>
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDeliverySlot('Today (2-3 Hours)')}
              className={`p-3 rounded-2xl border text-left transition ${
                deliverySlot.includes('2-3 Hours')
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <p className="font-bold">Standard Delivery</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Today (2-3 Hours)</p>
            </button>

            <button
              type="button"
              onClick={() => setDeliverySlot('Tomorrow Morning (8-11 AM)')}
              className={`p-3 rounded-2xl border text-left transition ${
                deliverySlot.includes('Tomorrow')
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <p className="font-bold">Morning Slot</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Tomorrow (8-11 AM)</p>
            </button>
          </div>
        </div>

        {/* 3. Simulated Payment Methods */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
            <CreditCard size={16} className="text-blue-600" />
            <span>Simulated Payment (Safe Demo)</span>
          </h3>

          <div className="space-y-2 text-xs">
            {/* Cash on Delivery */}
            <button
              type="button"
              onClick={() => setPaymentMethod('cod')}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                paymentMethod === 'cod'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <div>
                <p className="font-bold">Cash on Delivery (COD)</p>
                <p className="text-[10px] text-gray-500">Pay cash upon home delivery to rural agent</p>
              </div>
              {paymentMethod === 'cod' && <CheckCircle2 size={16} className="text-blue-600" />}
            </button>

            {/* UPI */}
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                paymentMethod === 'upi'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <div>
                <p className="font-bold">UPI / QR (Google Pay, PhonePe, Paytm)</p>
                <p className="text-[10px] text-gray-500">Demo instant transfer verification</p>
              </div>
              {paymentMethod === 'upi' && <CheckCircle2 size={16} className="text-blue-600" />}
            </button>

            {/* Card / Netbanking */}
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                paymentMethod === 'card'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <div>
                <p className="font-bold">Card / Net Banking (Demo)</p>
                <p className="text-[10px] text-gray-500">Simulated gateway approval</p>
              </div>
              {paymentMethod === 'card' && <CheckCircle2 size={16} className="text-blue-600" />}
            </button>
          </div>
        </div>

        {/* Order Total & Pay Button */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-sm font-bold text-gray-900">
            <span>Payable Amount</span>
            <span className="text-lg text-blue-600">₹{total}</span>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleConfirmOrder}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Simulating Order Placement...</span>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Confirm & Place Order (₹{total})</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
