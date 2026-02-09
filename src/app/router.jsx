import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "../layouts/RootLayout";
import ShopLayout from "../layouts/ShopLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import Category from "../pages/shop/Category";
import ProductDetails from "../pages/shop/ProductDetails";
import Cart from "../pages/shop/Cart";
import Checkout from "../pages/shop/Checkout";
import Payment from "../pages/shop/Payment";
import OrderSuccess from "../pages/shop/OrderSuccess";
import Booking from "../pages/booking/Booking";
import BookingSuccess from "../pages/booking/BookingSuccess";
import Login from "../pages/auth/Login";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminSignup from "../pages/auth/AdminSignup";
import Dashboard from "../app/admin/dashboard/page";
import Products from "../app/admin/products/page";
import ShoppingPage from "../app/shopping/page";
import Appointments from "../pages/admin/Appointments";
import Orders from "../pages/admin/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "shop",
        element: <ShopLayout />,
        children: [
          // redirect the /shop index to /shopping
          { index: true, element: <Navigate to="/shopping" replace /> },
          { path: ":category", element: <Category /> },
          { path: ":category/:id", element: <ProductDetails /> },
        ],
      },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "checkout/success", element: <OrderSuccess /> },
      { path: "payment", element: <Payment /> },
      { path: "booking", element: <Booking /> },
      { path: "booking/success", element: <BookingSuccess /> },
      { path: "login", element: <Login /> },
      { path: "shopping", element: <ShoppingPage /> },
      { path: "admin/login", element: <AdminLogin /> },
      { path: "admin/signup", element: <AdminSignup /> },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "products", element: <Products /> },
          { path: "appointments", element: <Appointments /> },
          { path: "orders", element: <Orders /> },
        ],
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
  },
});

export default router;