import { NavLink } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import useCart from "../../hooks/useCart";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-[#F5EFE0]/70 border-b border-white/30 sticky top-0 z-50 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      
      {/* Container */}
      <div className="max-w-300 mx-auto px-8 h-18 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center">
          <NavLink
            to="/"
            className="font-heading text-lg text-[#3E2C23] tracking-wider"
            style={{ letterSpacing: "0.08em" }}
          >
            Glamour by Vera
          </NavLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[#3E2C23] transition-all duration-300 ${
                isActive
                  ? "underline decoration-[#D4AF37] underline-offset-8"
                  : "hover:opacity-75"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shopping"
            className={({ isActive }) =>
              `text-[#3E2C23] transition-all duration-300 ${
                isActive
                  ? "underline decoration-[#D4AF37] underline-offset-8"
                  : "hover:opacity-75"
              }`
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/booking"
            className={({ isActive }) =>
              `text-[#3E2C23] transition-all duration-300 ${
                isActive
                  ? "underline decoration-[#D4AF37] underline-offset-8"
                  : "hover:opacity-75"
              }`
            }
          >
            Booking
          </NavLink>
        </div>

        {/* Desktop Icons */}
        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center gap-4 text-[1.1rem]">
            
            {/* Search */}
            <NavLink
              to="/search"
              aria-label="Search"
              className="p-2 rounded-full hover:bg-white/40 hover:backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <Search size={18} />
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              aria-label="Cart"
              className="relative p-2 rounded-full hover:bg-white/40 hover:backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart size={18} />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#3E2C23] text-[#F5EFE0]">
                  {totalItems}
                </span>
              )}
            </NavLink>

            {/* Account */}
            <NavLink
              to="/account"
              aria-label="Account"
              className="p-2 rounded-full hover:bg-white/40 hover:backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <User size={18} />
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/40 hover:backdrop-blur-sm hover:scale-105 transition-all duration-300"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F5EFE0]/80 border-t border-white/30 shadow-lg rounded-b-2xl backdrop-blur-md">
          
          <div className="max-w-300 mx-auto px-8 py-4 flex flex-col gap-2">
            
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="text-[#3E2C23] py-2 transition-all duration-300 hover:opacity-80"
            >
              Home
            </NavLink>

            <NavLink
              to="/shopping"
              onClick={() => setMobileOpen(false)}
              className="text-[#3E2C23] py-2 transition-all duration-300 hover:opacity-80"
            >
              Shop
            </NavLink>

            <NavLink
              to="/booking"
              onClick={() => setMobileOpen(false)}
              className="text-[#3E2C23] py-2 transition-all duration-300 hover:opacity-80"
            >
              Booking
            </NavLink>

            {/* Mobile Icons */}
            <div className="flex items-center gap-4 pt-3">
              
              <NavLink
                to="/search"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full hover:bg-white/40 hover:backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <Search size={18} />
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="relative p-2 rounded-full hover:bg-white/40 hover:backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <ShoppingCart size={18} />

                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#3E2C23] text-[#F5EFE0]">
                    {totalItems}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/account"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full hover:bg-white/40 hover:backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <User size={18} />
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
