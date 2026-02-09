import { NavLink } from "react-router-dom";

export default function MobileMenu() {
  return (
    <div className="md:hidden fixed bottom-0 w-full bg-cream border-t border-cocoa/10 py-3 flex justify-around">
      <NavLink to="/shopping" className="text-center vintage-link">Shop</NavLink>
      <NavLink to="/booking" className="text-center vintage-link">Book</NavLink>
      <NavLink to="/cart" className="text-center vintage-link">Cart</NavLink>
    </div>
  );
}