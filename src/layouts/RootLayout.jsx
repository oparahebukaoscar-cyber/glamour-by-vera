import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import Toast from '../components/ui/Toast';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Toast />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;