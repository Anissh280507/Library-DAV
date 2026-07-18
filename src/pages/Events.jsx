import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles, BookOpen } from "lucide-react";

// --- Asset Imports ---
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

const EVENTS_DATA = [
  {
    title: "Harry Potter's Birthday Celebration",
    subtitle: "CHAPTER 01 / LITERARY MAGIC",
    date: "July 31, 2026",
    sectionBg: "bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-transparent border-amber-100/70",
    accentBg: "bg-amber-100/80 text-amber-800 border-amber-200",
    infoCardBg: "bg-white/90 border-amber-200/60 shadow-amber-900/[0.02]",
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    description: "Bringing the wizarding world to life. Students stepped through a transformed library space complete with sorting ceremonies, high-stakes book trivia, and live readings of timeless passages. The initiative successfully merged fantastical pop-culture appreciation with primary school literacy engagement.",
    images: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11]
  },
  {
    title: "National Reading Month Initiatives",
    subtitle: "CHAPTER 02 / CONTINUOUS LITERACY",
    date: "June 2026",
    sectionBg: "bg-gradient-to-br from-emerald-50/50 via-teal-50/20 to-transparent border-emerald-100/70",
    accentBg: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
    infoCardBg: "bg-white/90 border-emerald-200/60 shadow-emerald-900/[0.02]",
    icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
    description: "A data-driven tracking initiative aimed at expanding book interaction metrics. Featuring daily speed-reading challenges, storytelling hours, and open student assemblies, the program cultivated measurable compound reading habits across the entire student demographic.",
    images: [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21]
  }
];

export default function Events() {
  const [lightbox, setLightbox] = useState(null); // { eventIndex, imageIndex } or null

  const prev = () => {
    setLightbox((prevObj) => {
      if (!prevObj) return null;
      const total = EVENTS_DATA[prevObj.eventIndex].images.length;
      return { ...prevObj, imageIndex: (prevObj.imageIndex - 1 + total) % total };
    });
  };

  const next = () => {
    setLightbox((prevObj) => {
      if (!prevObj) return null;
      const total = EVENTS_DATA[prevObj.eventIndex].images.length;
      return { ...prevObj, imageIndex: (prevObj.imageIndex + 1) % total };
    });
  };

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
      
      {/* Editorial Minimalist Header */}
      <header className="pt-20 pb-12 px-6 border-b border-slate-100 max-w-7xl mx-auto">
        <div className="text-left">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-indigo-600 mb-2">
            DAV Library Chronicles
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Events Portfolio
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl font-light leading-relaxed">
            An elegant visual record documenting library culture, interactive storytelling programs, and community milestones.
          </p>
        </div>
      </header>

      {/* Main Narrative Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-20">
        {EVENTS_DATA.map((event, eventIdx) => {
          const isEven = eventIdx % 2 === 0;

          return (
            <section 
              key={eventIdx} 
              className={`flex flex-col lg:flex-row gap-10 items-start p-6 md:p-10 rounded-3xl border shadow-sm ${event.sectionBg} ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Event Text Info Frame */}
              <div className="w-full lg:w-[32%] lg:sticky lg:top-8 z-10">
                <div className={`p-7 rounded-2xl border backdrop-blur-md shadow-sm ${event.infoCardBg}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md border uppercase ${event.accentBg} flex items-center gap-1.5`}>
                      {event.icon}
                      {event.subtitle.split(" / ")[1]}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                    {event.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.images.length} Photos</span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Seamless Zero-Space Gap Gallery */}
              <div className="w-full lg:w-[68%]">
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                  {event.images.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      onClick={() => setLightbox({ eventIndex: eventIdx, imageIndex: imgIdx })}
                      className="break-inside-avoid relative overflow-hidden rounded-xl bg-white cursor-pointer border border-slate-200/40 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-indigo-400 group"
                    >
                      <img
                        src={src}
                        alt={`${event.title} frame ${imgIdx + 1}`}
                        className="w-full h-auto object-contain block"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none animate-fadeIn"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Frame Status Bar */}
          <div className="absolute top-0 inset-x-0 p-5 flex justify-between items-center text-slate-400 z-10 bg-slate-950/40 backdrop-blur-sm border-b border-slate-900">
            <div className="text-xs uppercase tracking-widest font-medium text-slate-200">
              {EVENTS_DATA[lightbox.eventIndex].title} <span className="text-slate-700 px-2">/</span> Frame {lightbox.imageIndex + 1}
            </div>
            <button
              className="text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl p-2 transition-all"
              onClick={() => setLightbox(null)}
            >
              <X size={16} />
            </button>
          </div>

          {/* Controls */}
          <button
            className="absolute left-4 z-10 text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 rounded-xl p-3 transition-all"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="relative max-h-[75vh] max-w-[85vw] flex items-center justify-center">
            <img
              src={EVENTS_DATA[lightbox.eventIndex].images[lightbox.imageIndex]}
              alt="Immersive landscape item visualization"
              className="max-h-[75vh] max-w-[85vw] rounded-xl shadow-2xl object-contain animate-scaleUp"
            />
          </div>

          <button
            className="absolute right-4 z-10 text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 rounded-xl p-3 transition-all"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Simple Minimal Numeric Counter */}
          <div className="absolute bottom-6 text-[11px] tracking-widest font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            {lightbox.imageIndex + 1} / {EVENTS_DATA[lightbox.eventIndex].images.length}
          </div>
        </div>
      )}
    </div>
  );
}