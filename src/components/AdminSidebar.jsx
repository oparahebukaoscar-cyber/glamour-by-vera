import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-10">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </nav>
    </div>
  );
}
