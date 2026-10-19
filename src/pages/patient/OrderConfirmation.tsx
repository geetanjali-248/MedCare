import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Truck, ArrowRight, Home } from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import AppLogo from '../../components/AppLogo';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { orders } = useApp();

  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Header title="Order Placed" showBack={false} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 text-center border border-gray-200 shadow-sm space-y-3">
          <div className="flex justify-center mb-1">
            <AppLogo size="sm" />
          </div>
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Order Placed Successfully!</h2>
          <p className="text-xs text-gray-500">
            Thank you for using MedCare. Your medicines have been dispatched from the regional central pharmacy.
          </p>

          <div className="bg-blue-50 text-blue-800 text-xs font-mono font-semibold py-1.5 px-3 rounded-lg inline-block">
            Order ID: {latestOrder?.id || 'ORD-20241014-998'}
          </div>
        </div>

        {/* Order Details Preview */}
        {latestOrder && (
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="font-bold text-gray-900">Delivery Information</span>
              <span className="text-blue-600 font-semibold">{latestOrder.estimatedDelivery}</span>
            </div>

            <div className="space-y-1.5 text-gray-600">
              <p>
                <strong className="text-gray-800">Delivering To: </strong>
                {latestOrder.address}
              </p>
              <p>
                <strong className="text-gray-800">Total Paid: </strong>
                ₹{latestOrder.total} (Including delivery)
              </p>
              <p>
                <strong className="text-gray-800">Items: </strong>
                {latestOrder.items.map((i) => `${i.medicine.name} (x${i.quantity})`).join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* Action CTAs */}
        <div className="space-y-2 pt-2">
          {latestOrder && (
            <button
              onClick={() => navigate(`/order/${latestOrder.id}`)}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow flex items-center justify-center gap-2 transition"
            >
              <Truck size={18} />
              <span>Track Live Order</span>
              <ArrowRight size={18} />
            </button>
          )}

          <button
            onClick={() => navigate('/home')}
            className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition"
          >
            <Home size={16} />
            <span>Return to Home Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
