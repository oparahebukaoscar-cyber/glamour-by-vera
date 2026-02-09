import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import supabase from '../../services/supabaseClient';

export default function Payment() {
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [processing, setProcessing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastSubtitle, setToastSubtitle] = useState('');

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    try {
      setProcessing(true);
      const stored = localStorage.getItem('checkoutForm');
      const customer = stored ? JSON.parse(stored) : { name: '', email: '' };

      // get session user id if present
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id || null;


      // Insert order matching expected table schema
      const { data: orderData, error: orderErr } = await supabase
        .from('orders')
        .insert([
          {
            customer_id: userId,
            customer_name: customer.name || null,
            customer_email: customer.email || null,
            customer_phone: customer.phone || null,
            total_price: total,
            status: 'confirmed',
          },
        ])
        .select();

      if (orderErr) throw orderErr;
      const order = Array.isArray(orderData) ? orderData[0] : orderData;

      if (order?.id && items.length) {
        const orderItems = items.map((it) => ({
          order_id: order.id,
          product_id: it.id,
          quantity: it.qty ?? it.quantity ?? 1,
          price: it.price ?? it.unit_price ?? 0,
        }));
        await supabase.from('order_items').insert(orderItems);
      }

      // Post-order actions (preserve existing logic)
      clearCart();
      localStorage.removeItem('checkoutForm');

      // Show success toast then redirect after 2s
      setToastSubtitle('Thank you for shopping with Glamour by Vera.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        navigate('/');
      }, 2000);
    } catch (err) {
      setProcessing(false);
      // eslint-disable-next-line no-console
      console.error('Order creation error:', err);
      alert('There was an error creating your order. Please try again.');
    }
  };

  const navigate = useNavigate();

  return (
    <section className="vintage-hero min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="vintage-heading text-4xl mb-8 text-center">Payment</h1>

        <div className="vintage-card mb-8">
          <h2 className="vintage-heading text-2xl mb-4">Select Payment Method</h2>
          <p className="mb-4 text-deepBrown">Total Amount: <strong>₦{total.toFixed(2)}</strong></p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              {/* Bank Transfer Option */}
              <label className={`block cursor-pointer p-4 rounded-lg border ${selectedMethod === 'bank' ? 'ring-2 ring-opacity-50' : 'border-transparent'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={selectedMethod === 'bank'}
                  onChange={() => setSelectedMethod('bank')}
                  className="sr-only"
                />
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="vintage-heading text-lg">Bank Transfer</div>
                      <div className="text-deepBrown">Zenith Bank — Vera Collections</div>
                    </div>
                    <div className="text-deepBrown font-semibold">Pay Now</div>
                  </div>
                  <div className="mt-3 text-sm text-deepBrown">
                    Account Number: <strong>0123456789</strong>
                  </div>
                  <div className="mt-2 text-sm text-deepBrown">Use your order number as the transfer reference. Orders are processed after payment confirmation.</div>
                </div>
              </label>

              {/* Payment on Delivery Option */}
              <label className={`block cursor-pointer p-4 rounded-lg border ${selectedMethod === 'cod' ? 'ring-2 ring-opacity-50' : 'border-transparent'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedMethod === 'cod'}
                  onChange={() => setSelectedMethod('cod')}
                  className="sr-only"
                />
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="vintage-heading text-lg">Payment on Delivery</div>
                      <div className="text-deepBrown">Pay the courier when your order arrives</div>
                    </div>
                    <div className="text-deepBrown font-semibold">No up-front payment</div>
                  </div>
                  <div className="mt-3 text-sm text-deepBrown">Available within Lagos and selected areas only. Orders may be subject to eligibility.</div>
                </div>
              </label>
            </div>

            <div>
                <button type="submit" className="vintage-btn w-full" disabled={processing}>
                  {processing ? 'Processing...' : 'Confirm Order'}
                </button>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-deepBrown mb-4">After confirming, you'll receive instructions for bank transfer if selected.</p>
          <Link to="/checkout" className="vintage-link">← Back to Checkout</Link>
        </div>
        {toastVisible && (
          <div className="fixed right-4 bottom-6 z-50">
            <div className="bg-white text-black rounded-xl shadow-lg p-4 max-w-sm">
              <div className="font-semibold">Order Confirmed 🎉</div>
              <div className="text-sm text-deepBrown mt-1">{toastSubtitle}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}