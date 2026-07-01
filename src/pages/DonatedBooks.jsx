import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Asset imports mapping exactly to your image directory
//import imgAbhidnaya from "../assets/Donate Books/Abhidnaya Salunkhe.jpeg";
//import imgGaarvi     from "../assets/Donate Books/Gaarvi.jpeg";
import imgGatha      from "../assets/Donate Books/Gatha.jpeg";
import imgParna      from "../assets/Donate Books/Parna.jpeg";
import imgPrisha     from "../assets/Donate Books/Prisha Choudhary.jpeg";
//import imgPriyansh   from "../assets/Donate Books/Priyansh Mastud.jpeg";
import imgRutvi      from "../assets/Donate Books/Rutvi.jpeg";
import imgShlok      from "../assets/Donate Books/Shlok More.jpeg";
import imgSpandan    from "../assets/Donate Books/Spandan Lalge.jpeg";
import imgTrisha     from "../assets/Donate Books/Trisha.jpeg";
import imgVihan      from "../assets/Donate Books/vihan Cheulkar.jpeg";

const donors = [
  //{ name: "Abhidnaya Salunkhe", img: imgAbhidnaya },
 // { name: "Gaarvi",             img: imgGaarvi },
  { name: "Gatha",              img: imgGatha },
  { name: "Parna",              img: imgParna },
  { name: "Prisha Choudhary",   img: imgPrisha },
  //{ name: "Priyansh Mastud",    img: imgPriyansh },
  { name: "Rutvi",              img: imgRutvi },
  { name: "Shlok More",         img: imgShlok },
  { name: "Spandan Lalge",      img: imgSpandan },
  { name: "Trisha",             img: imgTrisha },
  { name: "Vihan Cheulkar",     img: imgVihan },
];

export default function DonatedBooks() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox(i => (i - 1 + donors.length) % donors.length);
  const next = () => setLightbox(i => (i + 1) % donors.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#1a1a6e] px-8 py-12 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <Heart size={24} className="text-red-400 fill-red-400" />
          <span className="text-white/70 text-sm font-medium uppercase tracking-widest">Community Contributions</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
          Donated Books
        </h1>
        <p className="text-blue-200 mt-2 text-sm md:text-base max-w-xl mx-auto md:mx-0">
          Books generously contributed by our community. A heartfelt thank you to all the generous students and families who donated books to enrich our library collection.
        </p>
      </div>

      {/* Stats Board */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex gap-8 justify-center">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#1a1a6e]">{donors.length}</p>
            <p className="text-xs text-gray-500 mt-1">Generous Donors</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#1a1a6e]">❤️</p>
            <p className="text-xs text-gray-500 mt-1">With Love</p>
          </div>
        </div>
      </div>

      {/* Grid Layout Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Responsive configurations tailored below:
          - grid-cols-1: Mobile (1 card per row)
          - sm:grid-cols-2: Tablet (2 cards per row)
          - lg:grid-cols-4: Desktop (4 cards per row)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donors.map((donor, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
              onClick={() => setLightbox(i)}
            >
              {/* Image Box */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                <img
                  src={donor.img}
                  alt={donor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Donor Name Footer */}
              <div className="px-5 py-4 flex items-center gap-2.5 mt-auto bg-white">
                <Heart size={14} className="text-red-400 fill-red-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-gray-800 tracking-tight leading-snug">
                  {donor.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 bg-gradient-to-br from-[#1a1a6e]/5 to-[#1a3adb]/5 rounded-2xl border border-[#1a1a6e]/10 p-8 text-center">
        
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" 
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          
          <button 
            className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors" 
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={28} />
          </button>

          <div className="flex flex-col items-center gap-4 max-w-[90vw]" onClick={e => e.stopPropagation()}>
            <img
              src={donors[lightbox].img}
              alt={donors[lightbox].name}
              className="max-h-[75vh] max-w-full rounded-xl shadow-2xl object-contain border border-white/10"
            />
            <div className="flex items-center gap-2 text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart size={16} className="text-red-400 fill-red-400" />
              <span className="font-semibold text-sm tracking-wide">{donors[lightbox].name}</span>
            </div>
          </div>

          <button 
            className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors" 
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={28} />
          </button>
          
          <div className="absolute bottom-6 text-white/50 text-xs tracking-wider">
            {lightbox + 1} / {donors.length}
          </div>
        </div>
      )}
    </div>
  );
}