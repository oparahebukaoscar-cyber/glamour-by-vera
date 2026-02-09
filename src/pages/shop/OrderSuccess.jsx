import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-rose-400 min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl text-rose-500 mb-6">Order Confirmed</h1>
        <p className="text-rose-400 mb-8">Thank you — your order was placed successfully.</p>
        <Link to="/shop" className="inline-block bg-rose-600 text-white px-6 py-3 rounded-full">Continue Shopping</Link>
      </div>
    </section>
  );
}
