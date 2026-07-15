import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import davLogo from "../assets/DAV logo.png";

const navLinks = [
  { label: "Home",          to: "/" },
  { label: "Resources",     to: "/resources" },
  { label: "Daily Reads",   to: "/daily-reads" },
  { label: "Crossword",     to: "/crossword" },
  { label: "Book Reviews",  to: "/book-reviews" },
  { label: "Faculty",       to: "/faculty" },
  { label: "Events",        to: "/events" },
  { label: "Donated Books", to: "/donate" },
  { label: "Contact",       to: "/contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src={davLogo} alt="DAV College Logo" className="h-10 w-auto" />
          <span className="text-[#1a1a6e] font-bold text-lg tracking-wide">
            DAV Virtual Library
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`text-sm font-medium transition-colors no-underline
                  ${pathname === to
                    ? "text-[#1a1a6e] font-semibold border-b-2 border-[#1a1a6e] pb-0.5"
                    : "text-gray-600 hover:text-[#1a1a6e]"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <ul className="flex flex-col list-none m-0 p-0">
            {navLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-4 text-sm font-medium no-underline border-b border-gray-50 transition-colors
                    ${pathname === to
                      ? "text-[#1a1a6e] bg-blue-50 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#1a1a6e]"
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
