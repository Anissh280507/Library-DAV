import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
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
  const { dark, toggle } = useTheme();

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/82">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
        {/* Logo + Name */}
        <Link to="/" className="group flex items-center gap-3 no-underline">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition group-hover:shadow-md dark:bg-white/95">
            <img src={davLogo} alt="DAV College Logo" className="h-8 w-auto" />
          </span>
          <span className="text-[#15155f] font-black text-base sm:text-lg tracking-normal dark:text-white">
            DAV Virtual Library
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1.5 list-none m-0 p-1 rounded-full border border-slate-200/70 bg-slate-50/70 shadow-inner dark:border-white/10 dark:bg-white/5">
          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`rounded-full px-3 py-2 text-xs font-bold transition-all no-underline
                  ${pathname === to
                    ? "bg-white text-[#15155f] shadow-sm ring-1 ring-slate-200/80 dark:bg-white/12 dark:text-white dark:ring-white/10"
                    : "text-slate-600 hover:bg-white/75 hover:text-[#15155f] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="p-2.5 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors soft-focus dark:text-slate-300 dark:hover:bg-white/10"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            title={dark ? "Light theme" : "Dark theme"}
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            className="md:hidden p-2.5 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors soft-focus dark:text-slate-300 dark:hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white/95 border-t border-slate-100 shadow-xl backdrop-blur-xl animate-fade-up dark:border-white/10 dark:bg-slate-950/95">
          <ul className="flex flex-col list-none m-0 p-2">
            {navLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-bold no-underline transition-colors
                    ${pathname === to
                      ? "text-[#15155f] bg-blue-50 dark:bg-white/10 dark:text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#15155f] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
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
