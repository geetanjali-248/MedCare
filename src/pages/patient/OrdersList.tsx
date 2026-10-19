import { useNavigate } from 'react-router-dom';
import { Package, Truck, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

export default function OrdersList() {
  const navigate = useNavigate();
  const { orders, preferences } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title={t('orders', preferences.language)} showBack={true} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Order History ({orders.length})</span>
          <span>Doorstep Delivery</span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-gray-500 border border-gray-200">
            <ShoppingBag size={36} className="mx-auto text-gray-300 mb-2" />
            <p className="font-semibold text-sm">No orders placed yet</p>
            <p className="text-xs text-gray-400 mt-1">Order medicines to track delivery updates</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((ord) => {
              const isDelivered = ord.status === 'delivered';
              const isOut = ord.status === 'out-for-delivery';
              return (
                <div
                  key={ord.id}
                  onClick={() => navigate(`/order/${ord.id}`)}
                  className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm space-y-3 hover:border-blue-200 cursor-pointer transition"
                >
                  <div className="flex items-start justify-between border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <Package size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900">{ord.id}</h4>
                        <span className="text-[10px] text-gray-400">{ord.date}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800'
                          : isOut
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {ord.status.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-gray-600">
                    <p className="line-clamp-1">
                      {ord.items.map((i) => `${i.medicine.name} (x${i.quantity})`).join(', ')}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-50">
                    <span className="font-bold text-gray-900">₹{ord.total}</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                      <span>Track Order</span>
                      <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
