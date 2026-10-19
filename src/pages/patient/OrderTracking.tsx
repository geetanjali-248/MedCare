import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  Package, 
  MapPin, 
  HelpCircle, 
  PhoneCall, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';

export default function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders } = useApp();

  const [activeTab, setActiveTab] = useState<'tracking' | 'details'>('tracking');
  const [showHelpModal, setShowHelpModal] = useState(false);

  const order = orders.find((o) => o.id === id) || orders[0];

  const stages = [
    { key: 'placed', label: 'Order Placed', desc: 'Prescription verified & confirmed by pharmacy' },
    { key: 'processing', label: 'Shopping / Processing', desc: 'Medicines packed securely with tamper seal' },
    { key: 'out-for-delivery', label: 'Out for Delivery', desc: 'Rural delivery partner en route with cold-storage bag' },
    { key: 'delivered', label: 'Delivered', desc: 'Package handed over at registered address' },
  ];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'processing':
        return 1;
      case 'out-for-delivery':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 2;
    }
  };

  const currentStageIndex = getStageIndex(order?.status || 'out-for-delivery');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header title="Track Medicine Order" showBack={true} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Order Reference Banner */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-gray-500">ID: {order?.id}</span>
            <button
              onClick={() => setShowHelpModal(true)}
              className="text-blue-600 font-bold flex items-center gap-1 hover:underline text-xs"
            >
              <HelpCircle size={15} />
              <span>Need Help?</span>
            </button>
          </div>
          <h2 className="text-base font-bold text-gray-900">
            {order?.status === 'delivered' ? 'Package Delivered' : 'Estimated Delivery Today'}
          </h2>
          <p className="text-xs text-blue-600 font-semibold">{order?.estimatedDelivery || 'Within 2-3 hours'}</p>
        </div>

        {/* Tab Toggle: Tracking vs Order Details */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'tracking'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Delivery Timeline
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'details'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Order Details ({order?.items.length || 0})
          </button>
        </div>

        {activeTab === 'tracking' ? (
          /* Vertical Timeline */
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400">
              Live Delivery Progress
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
              {stages.map((stg, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stg.key} className="relative flex items-start gap-4">
                    {/* Step Icon / Dot */}
                    <div
                      className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-blue-600 font-extrabold'
                              : isPassed
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                        >
                          {stg.label}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        {stg.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Partner Card */}
            <div className="p-3 bg-slate-50 border border-gray-100 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  🚚
                </div>
                <div>
                  <p className="font-bold text-gray-900">Ravi Varma (MedCare Courier)</p>
                  <p className="text-[10px] text-gray-500">Tracking: {order?.trackingNumber || 'TRK-98765'}</p>
                </div>
              </div>
              <button
                onClick={() => alert('Calling delivery partner (simulated): +91 98480 22338')}
                className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
                title="Call Partner"
              >
                <PhoneCall size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Order Details Tab */
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
              Itemized Medicines
            </h3>

            <div className="space-y-3">
              {order?.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-gray-100"
                >
                  <div>
                    <p className="font-bold text-gray-900">{item.medicine.name}</p>
                    <p className="text-[10px] text-gray-400">Qty: {item.quantity} • ₹{item.medicine.price} each</p>
                  </div>
                  <span className="font-bold text-gray-900">
                    ₹{item.medicine.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="pt-2 border-t border-gray-100 space-y-1">
              <p className="font-bold text-gray-800 flex items-center gap-1.5">
                <MapPin size={14} className="text-blue-600" />
                <span>Destination Address:</span>
              </p>
              <p className="text-gray-600 text-[11px] leading-relaxed pl-5">
                {order?.address}
              </p>
            </div>

            {/* Cost Breakdown */}
            <div className="pt-2 border-t border-gray-100 space-y-1 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{(order?.total || 40) - (order?.deliveryCharge || 40)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>₹{order?.deliveryCharge || 40}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-sm pt-1 border-t border-gray-100">
                <span>Total Amount Paid</span>
                <span className="text-blue-600">₹{order?.total}</span>
              </div>
            </div>
          </div>
        )}

        {/* Help Modal */}
        {showHelpModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-3 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle size={26} />
              </div>
              <h3 className="font-bold text-base text-gray-900">Need Help With Your Order?</h3>
              <p className="text-xs text-gray-500">
                For order delays, incorrect medicines, or address adjustments, our support desk is available 24/7.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-gray-700 text-left space-y-1">
                <p><strong>Support Toll-Free:</strong> 1800-425-6332</p>
                <p><strong>WhatsApp Support:</strong> +91 94400 12345</p>
                <p><strong>Order Ref:</strong> {order?.id}</p>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Close Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
