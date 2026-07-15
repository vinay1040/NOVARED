import { useState } from "react";
import { Link } from "react-router-dom";
import { Droplet, ChevronDown } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-stone-50 border-b border-stone-200 relative">
      <Link to="/" className="flex items-center gap-2">
        <Droplet className="text-red-800 fill-red-800" size={22} />
        <span className="text-xl font-bold text-red-800">BloodNet</span>
      </Link>

      <div className="hidden md:flex gap-8 text-sm font-medium text-stone-700">
        <Link to="/" className="text-red-800 border-b-2 border-red-800 pb-1">Dashboard</Link>
        <Link to="/education" className="hover:text-red-800 transition">Education</Link>
        <Link to="/camps" className="hover:text-red-800 transition">Camps</Link>
        <Link to="/hospitals" className="hover:text-red-800 transition">Hospitals</Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/request"
          className="text-sm font-medium text-red-800 hover:underline"
        >
          Request Blood
        </Link>

        {/* Dropdown trigger */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="flex items-center gap-1 bg-red-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-red-900 transition-all hover:shadow-md"
          >
            Login / Register
            <ChevronDown size={16} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-50">
              <Link to="/login?role=donor" className="block px-4 py-3 text-sm text-stone-700 hover:bg-red-50 hover:text-red-800 transition">
                🩸 Donor Login
              </Link>
              <Link to="/login?role=patient" className="block px-4 py-3 text-sm text-stone-700 hover:bg-red-50 hover:text-red-800 transition border-t border-stone-100">
                🏥 Patient Login
              </Link>
              <Link to="/login?role=bloodbank" className="block px-4 py-3 text-sm text-stone-700 hover:bg-red-50 hover:text-red-800 transition border-t border-stone-100">
                🏢 Blood Bank / Partner Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;