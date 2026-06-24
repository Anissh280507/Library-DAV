import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home",         to: "/" },
  { label: "Resources",    to: "/resources" },
  { label: "Faculty",      to: "/faculty" },
  { label: "Events",       to: "/events" },
  { label: "New Arrivals", to: "/new-arrivals" },
];

const supportLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "E-Books",    to: "/resources" },
  { label: "E-Magazines",to: "/resources" },
  { label: "E-Newspapers",to: "/resources" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a3adb] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h3 className="font-bold text-base mb-3">DAV Virtual Library</h3>
          <p className="text-blue-200 text-sm leading-relaxed">
            Empowering students with digital resources and learning opportunities at DAV Public School, Airoli.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-base mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="hover:text-white transition-colors no-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold text-base mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            {supportLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="hover:text-white transition-colors no-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-base mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li className="flex items-center gap-2">
              <Mail size={14} className="flex-shrink-0" />
              <a href="mailto:librarydavpsairoli@gmail.com" className="hover:text-white transition-colors no-underline break-all">
                librarydavpsairoli@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="flex-shrink-0" />
              <a href="tel:02247778582" className="hover:text-white transition-colors no-underline">
                022-47778582
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="flex-shrink-0 mt-0.5" />
              <Link to="/contact" className="hover:text-white transition-colors no-underline leading-relaxed">
                DAV Public School, Airoli, Navi Mumbai – 400708
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-500/40 py-4 text-center text-xs text-blue-300">
        © 2024 DAV School Virtual Library. All rights reserved.
      </div>
    </footer>
  );
}
