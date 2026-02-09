import React from 'react';
import { Outlet } from 'react-router-dom';

const ShopLayout = () => {
  return (
    <div className="shop-layout">
      <Outlet />
    </div>
  );
};

export default ShopLayout;