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

      {/* Narrative Presentation Flow */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Tight-Packing Zero-Space Masonry Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {donors.map((donor, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              className="break-inside-avoid relative overflow-hidden bg-white rounded-2xl border border-slate-200/60 shadow-sm transition-all duration-300 hover:scale-[1.015] hover:border-indigo-400/80 hover:shadow-md cursor-pointer group p-3 flex flex-col gap-3"
            >
              {/* Photo Frame Container (Preserving Natural Image Ratio) */}
              <div className="relative overflow-hidden rounded-xl bg-slate-50">
                <img
                  src={donor.img}
                  alt={donor.name}
                  className="w-full h-auto block object-contain object-top"
                  loading="lazy"
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              
              {/* Clean Minimal Info Tag */}
              <div className="px-2 py-1 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 fill-rose-400" />
                  <p className="text-sm font-bold tracking-tight text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                    {donor.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Accessible Immersive Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/96 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Frame Status Control Strip */}
          <div className="absolute top-0 inset-x-0 p-5 flex justify-between items-center text-slate-400 z-10 bg-slate-950/40 backdrop-blur-sm border-b border-slate-900">
            <div className="text-xs uppercase tracking-widest font-medium text-slate-200 flex items-center gap-2">
              <Heart size={14} className="text-rose-400 fill-rose-400" />
              Donor Focus <span className="text-slate-700 px-1">/</span> {donors[lightbox].name}
            </div>
            <button
              className="text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl p-2 transition-all"
              onClick={() => setLightbox(null)}
            >
              <X size={16} />
            </button>
          </div>

          {/* Left Navigation Command */}
          <button
            className="absolute left-4 z-10 text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 rounded-xl p-3 transition-all"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Core Content Presentation Block */}
          <div className="relative max-h-[75vh] max-w-[85vw] flex flex-col items-center justify-center gap-4">
            <img
              src={donors[lightbox].img}
              alt={donors[lightbox].name}
              className="max-h-[70vh] max-w-[85vw] rounded-xl shadow-2xl border border-slate-800 object-contain"
            />
            <div className="inline-flex items-center gap-2 text-white bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm">
              <Heart size={14} className="text-rose-400 fill-rose-400" />
              <span className="font-bold text-xs sm:text-sm tracking-wide">{donors[lightbox].name}</span>
            </div>
          </div>

          {/* Right Navigation Command */}
          <button
            className="absolute right-4 z-10 text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 rounded-xl p-3 transition-all"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Simple Structural Position Metric */}
          <div className="absolute bottom-6 text-[11px] tracking-widest font-mono text-slate-400 bg-slate-900/40 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-800/80">
            {lightbox + 1} / {donors.length}
          </div>
        </div>
      )}
    </div>
  );
}