import React from 'react';
import { CartProvider } from '../context/CartContext';

// Wrap app with providers (CartContext proxies zustand store)
import { AuthProvider } from '../providers';
import '../styles/tailwind.css';

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};

export default Providers;