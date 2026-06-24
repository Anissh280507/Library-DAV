import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Import all event images
import e1  from "../assets/Events/1.jpeg";
import e2  from "../assets/Events/2.jpeg";
import e3  from "../assets/Events/3.jpeg";
import e4  from "../assets/Events/4.jpeg";
import e5  from "../assets/Events/5.jpeg";
import e6  from "../assets/Events/6.jpeg";
import e7  from "../assets/Events/7.jpeg";
import e8  from "../assets/Events/8.jpeg";
import e9  from "../assets/Events/9.jpeg";
import e10 from "../assets/Events/10.jpeg";
import e11 from "../assets/Events/11.jpeg";
import s1  from "../assets/Events/Screenshot 2026-06-17 211602.png";
import s2  from "../assets/Events/Screenshot 2026-06-17 211610.png";
import s3  from "../assets/Events/Screenshot 2026-06-17 211617.png";
import s4  from "../assets/Events/Screenshot 2026-06-17 211625.png";
import s5  from "../assets/Events/Screenshot 2026-06-17 211638.png";
import s6  from "../assets/Events/Screenshot 2026-06-17 211647.png";
import s7  from "../assets/Events/Screenshot 2026-06-17 211656.png";
import s8  from "../assets/Events/Screenshot 2026-06-17 211706.png";
import s9  from "../assets/Events/Screenshot 2026-06-17 211725.png";
import s10 from "../assets/Events/Screenshot 2026-06-17 211732.png";
import s11 from "../assets/Events/Screenshot 2026-06-17 211742.png";
import s12 from "../assets/Events/Screenshot 2026-06-17 211747.png";
import s13 from "../assets/Events/Screenshot 2026-06-17 211754.png";
import s14 from "../assets/Events/Screenshot 2026-06-17 211801.png";
import s15 from "../assets/Events/Screenshot 2026-06-17 211808.png";
import s16 from "../assets/Events/Screenshot 2026-06-17 211816.png";
import s17 from "../assets/Events/Screenshot 2026-06-17 211822.png";
import s18 from "../assets/Events/Screenshot 2026-06-17 211831.png";
import s19 from "../assets/Events/Screenshot 2026-06-17 211838.png";
import s20 from "../assets/Events/Screenshot 2026-06-17 211844.png";
import s21 from "../assets/Events/Screenshot 2026-06-17 211858.png";

const images = [
  s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21,
  e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11,
  s1, s2, s3, s4, s5, s6, s7, s8, s9, s10,
];

export default function Events() {
  const [lightbox, setLightbox] = useState(null); // index or null

  const prev = () => setLightbox((i) => (i + 3 + images.length) % images.length);
  const next = () => setLightbox((i) => (i + 1) % images.length);

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightbox(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a1a6e] px-8 py-12">
        <span className="inline-block mb-3 bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
          Gallery
        </span>
        <h1
          className="text-3xl md:text-4xl font-extrabold text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
        >
          Events & Activities
        </h1>
        <p className="text-blue-200 mt-1 text-sm md:text-base">
          Moments from DAV Library's literary events, celebrations & more
        </p>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Mobile: 2-col simple grid | Tablet: 3-col | Desktop: masonry-like 4-col */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl cursor-pointer group relative
                ${i % 7 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
                ${i % 11 === 5 ? "sm:col-span-2" : ""}
              `}
              style={{ aspectRatio: (i % 7 === 0) ? "1/1" : (i % 3 === 0 ? "4/3" : "3/4") }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={src}
                alt={`Event ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1a1a6e]/0 group-hover:bg-[#1a1a6e]/40 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
          onKeyDown={handleKey}
          tabIndex={0}
          role="dialog"
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image */}
          <img
            src={images[lightbox]}
            alt={`Event ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[85vw] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 text-white/60 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
