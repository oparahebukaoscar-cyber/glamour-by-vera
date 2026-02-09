import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import styles from './Cart.module.css';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  const total = getTotal();

  return (
    <section className={`${styles.page} min-h-screen`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`${styles.heading} mb-8`}>Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center">
            <p className="mb-8">Your cart is currently empty.</p>
            <Link to="/shop" className="px-6 py-3 bg-black text-white rounded-full font-medium hover:brightness-110 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.id} className={`${styles.card}`}>
                  <img src={item.image} alt={item.title} className={styles.productImage} />
                  <div className={styles.details}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', margin: 0 }}>{item.title}</h3>
                    <p style={{ color: '#6a584b', marginTop: 6 }}>₦{item.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.qtyButton}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.qtyButton}>+</button>
                  </div>

                  <button onClick={() => removeItem(item.id)} className="text-muted">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className={`${styles.summary} mb-8`}>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total: ₦{total.toFixed(2)}</span>
                <button onClick={clearCart} className="text-muted">
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="text-center">
              <Link to="/checkout" className={styles.checkoutBtn}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}