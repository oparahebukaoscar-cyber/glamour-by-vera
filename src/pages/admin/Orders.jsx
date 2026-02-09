import { useCallback, useEffect, useState } from 'react';
import supabase from '../../services/supabaseClient';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(
          'id, customer_id, customer_name, customer_email, customer_phone, total_price, status, created_at'
        )
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setOrders(data || []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchOrders error', err);
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchOrders();

    let subscription = null;
    try {
      if (supabase.channel) {
        subscription = supabase
          .channel('public:orders')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'orders' },
            () => {
              if (mounted) fetchOrders();
            }
          )
          .subscribe();
      } else if (typeof supabase.from === 'function') {
        subscription = supabase
          .from('orders')
          .on('*', () => {
            if (mounted) fetchOrders();
          })
          .subscribe();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Orders realtime subscription failed', err);
    }

    return () => {
      mounted = false;
      try {
        if (!subscription) return;
        if (subscription.unsubscribe) subscription.unsubscribe();
        if (supabase.removeChannel && subscription) {
          supabase.removeChannel(subscription);
        }
      } catch (err) {
        // ignore
      }
    };
  }, [fetchOrders]);

  const handleDelete = async (orderId) => {
    if (!orderId || deletingId) return;
    const confirmed = window.confirm('Remove this order? This cannot be undone.');
    if (!confirmed) return;

    setDeletingId(orderId);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (deleteError) throw deleteError;
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('deleteOrder error', err);
      setError(err.message || 'Failed to remove order');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="py-24 px-6 text-cocoa bg-champagne min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl mb-6">Orders</h1>

        {loading && <div>Loading orders...</div>}
        {!loading && error && <div>Error loading orders: {error}</div>}
        {!loading && !error && orders.length === 0 && <div>No orders found.</div>}

        {!loading && !error && orders.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border-collapse">
              <thead className="bg-amber-50 text-left">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-sm font-semibold">Customer</th>
                  <th className="px-4 py-3 text-sm font-semibold">Contact</th>
                  <th className="px-4 py-3 text-sm font-semibold">Total</th>
                  <th className="px-4 py-3 text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-sm font-semibold">Created</th>
                  <th className="px-4 py-3 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-amber-100">
                    <td className="px-4 py-3 text-sm break-all">{order.id}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">
                        {order.customer_name || 'Guest'}
                      </div>
                      {order.customer_id && (
                        <div className="text-xs text-cocoa/70 break-all">
                          {order.customer_id}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>{order.customer_email || '-'}</div>
                      <div className="text-xs text-cocoa/70">
                        {order.customer_phone || '-'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      ₦{Number(order.total_price || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm capitalize">
                      {order.status || 'pending'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        type="button"
                        onClick={() => handleDelete(order.id)}
                        disabled={deletingId === order.id}
                        className="px-3 py-1 rounded bg-rose-100 text-rose-700 text-xs font-semibold hover:bg-rose-200 disabled:opacity-60"
                      >
                        {deletingId === order.id ? 'Removing...' : 'Remove'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}