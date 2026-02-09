import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function Checkout() {
  const { items, getTotal, updateQuantity, removeItem } = useCartStore();
  const total = getTotal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save checkout details and navigate to payment
    localStorage.setItem('checkoutForm', JSON.stringify(formData));
    navigate('/payment');
  };

  return (
    <section className="min-h-screen" style={{ background: '#F5EFE0' }}>
      <div className="max-w-300 mx-auto px-6 lg:px-12 py-12">
        <h1 className="font-heading text-4xl text-deepBrown mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-deepBrown mb-6">Your cart is currently empty.</p>
                <Link to="/shopping" className="inline-block bg-black text-white rounded-full px-6 py-3">Continue Shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />

                    <div className="flex-1">
                      <h3 className="font-heading text-lg text-deepBrown" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h3>
                      <p className="text-sm text-muted mt-1">₦{item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 bg-[#f7f2ea] rounded-lg px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 text-deepBrown">−</button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 text-deepBrown">+</button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">₦{(item.price * item.quantity).toFixed(2)}</div>
                        <button onClick={() => removeItem(item.id)} className="text-sm text-muted mt-1">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Order Summary + Form */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
              <h2 className="font-heading text-2xl text-deepBrown mb-4">Order Summary</h2>
              <div className="space-y-3 text-deepBrown mb-4">
                {items.slice(0, 5).map((it) => (
                  <div key={it.id} className="flex justify-between text-sm">
                    <span>{it.title} x{it.quantity}</span>
                    <span className="font-medium">₦{(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm text-deepBrown mb-2">
                  <span>Subtotal</span>
                  <span>₦{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-deepBrown mb-4">
                  <span>Shipping</span>
                  <span>₦0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-deepBrown">
                  <span>Total</span>
                  <span>₦{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-heading text-xl text-deepBrown mb-4">Customer Details</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block mb-1 text-deepBrown text-sm">Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-lg px-3 py-2" style={{ background: '#F5EFE0', border: '1px solid transparent', outlineColor: '#6a584b' }} />
                </div>

                <div>
                  <label className="block mb-1 text-deepBrown text-sm">Email</label>
                  <input name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-lg px-3 py-2" style={{ background: '#F5EFE0', border: '1px solid transparent' }} />
                </div>

                <div>
                  <label className="block mb-1 text-deepBrown text-sm">Address</label>
                  <input name="address" value={formData.address} onChange={handleChange} required className="w-full rounded-lg px-3 py-2" style={{ background: '#F5EFE0', border: '1px solid transparent' }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-deepBrown text-sm">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} required className="w-full rounded-lg px-3 py-2" style={{ background: '#F5EFE0', border: '1px solid transparent' }} />
                  </div>
                  <div>
                    <label className="block mb-1 text-deepBrown text-sm">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-lg px-3 py-2" style={{ background: '#F5EFE0', border: '1px solid transparent' }} />
                  </div>
                </div>

                <button type="submit" className="w-full bg-black text-white rounded-full py-3 hover:bg-deepBrown transition-colors">Continue to Payment</button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/cart" className="text-deepBrown underline">← Back to Cart</Link>
        </div>
      </div>
    </section>
  );
}