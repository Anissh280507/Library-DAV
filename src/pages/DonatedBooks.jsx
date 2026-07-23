import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// --- Asset Imports ---
import imgGatha      from "../assets/Donate Books/Gatha.jpeg";
import imgParna      from "../assets/Donate Books/Parna.jpeg";
import imgPrisha     from "../assets/Donate Books/Prisha Choudhary.jpeg";
import imgRutvi      from "../assets/Donate Books/Rutvi.jpeg";
import imgShlok      from "../assets/Donate Books/Shlok More.jpeg";
import imgSpandan    from "../assets/Donate Books/Spandan Lalge.jpeg";
import imgTrisha     from "../assets/Donate Books/Trisha.jpeg";
import imgVihan      from "../assets/Donate Books/vihan Cheulkar.jpeg";

const donors = [
  { name: "Gatha",               img: imgGatha },
  { name: "Parna",               img: imgParna },
  { name: "Prisha Choudhary",   img: imgPrisha },
  { name: "Rutvi",               img: imgRutvi },
  { name: "Shlok More",         img: imgShlok },
  { name: "Spandan Lalge",      img: imgSpandan },
  { name: "Trisha",              img: imgTrisha },
  { name: "Vihan Cheulkar",     img: imgVihan },
];

export default function DonatedBooks() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox(i => (i - 1 + donors.length) % donors.length);
  const next = () => setLightbox(i => (i + 1) % donors.length);

  // Keyboard accessibility for Lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans">
      
      {/* Premium Blue Graphic Header */}
      <header className="relative bg-gradient-to-r from-slate-950 via-[#1a1a6e] to-indigo-950 pt-24 pb-20 px-6 text-center overflow-hidden">
        {/* Subtle abstract ambient layer */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-indigo-500/20 to-transparent blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          
          {/* Community Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-rose-300 mb-4">
            <Heart size={14} className="fill-rose-400 stroke-rose-400" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/90">Community Contributions</span>
          </div>

          {/* Corrected & Fixed High-Contrast Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-sm select-none">
            Generous Hearts.
          </h1>

          {/* Center-Aligned Statement Description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light leading-relaxed text-center">
            A visual appreciation wall honoring the brilliant students and families who donated books to enrich our collective community space.
          </p>

          {/* Floating Stats */}
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 text-white backdrop-blur-sm rounded-2xl shadow-lg mt-8">
            <span className="text-2xl font-black text-indigo-300">{donors.length}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Total Contributions</span>
          </div>
        </div>
      </header>

