import { useState, useEffect, useRef } from "react";
import heroImg        from "../assets/hero.png";
import nishaPeshinImg from "../assets/Hero/Nisha Pashin.jpeg";
import bookCoverImg   from "../assets/Hero/Let them FLy.jpg";
import bookBackImg    from "../assets/Hero/Let them FLy Back page.jpeg";
import presidentImg   from "../assets/Hero/President.png";
import principalImg   from "../assets/Hero/Principal.jpg";
import schoolImg      from "../assets/Hero/school.jpeg";

const stats = [
  { value: "1K+", label: "Digital Resources" },
  { value: "25+", label: "Faculty Members" },
  { value: "3K+", label: "Active Users" },
  { value: "10+", label: "Events Yearly" },
];

// Helper hook to trigger animations when scrolled into view
function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (([e]) => { 
        if (e.isIntersecting) { 
          setVisible(true); 
          obs.disconnect(); 
        } 
      }),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// Animated Counter Component
function AnimatedStat({ value, label, trigger }) {
  const [count, setCount] = useState(0);

  // Extract pure numeric target and prefix/suffix formatting (e.g. "1K+", "25+", "3000")
  const numericMatch = value.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const prefix = value.substring(0, value.indexOf(numericMatch ? numericMatch[0] : ""));
  const suffix = value.substring((value.indexOf(numericMatch ? numericMatch[0] : "") + (numericMatch ? numericMatch[0].length : 0)));

  useEffect(() => {
    if (!trigger || target === 0) return;

    let start = 0;
    const duration = 2000; // Animation duration in milliseconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Easing function (easeOutQuad) for smooth slow-down near target
      const progress = frame / totalFrames;
      const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 2)));

      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [trigger, target]);

  return (
    <div className="flex-1 flex flex-col items-center text-center py-6 px-6 transform transition-all duration-700 ease-out">
      <p className="text-3xl md:text-4xl font-black text-[#15155f] tracking-tight">
        {prefix}{count}{suffix}
      </p>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 mt-2">
        {label}
      </p>
    </div>
  );
}

function SectionTitle({ title, hexColor, visible }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 pt-12 transition-all duration-1000 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="inline-block bg-white border border-gray-200 shadow-md rounded-2xl p-6 md:p-8 min-w-[280px] sm:min-w-[340px]">
        <h2 
          className="text-3xl md:text-4xl font-black uppercase tracking-wide mb-3 block"
          style={{ color: hexColor }}
        >
          {title}
        </h2>
        <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: hexColor }} />
      </div>
    </div>
  );
}

export default function Hero() {
  const [isLoading, setIsLoading]         = useState(true);
  const [fadePreloader, setFadePreloader] = useState(false);

  const [statsRef, statsVisible]   = useInView();
  const [nishaRef, nishaVisible]   = useInView();

  useEffect(() => {
    const triggerExit = () => { setFadePreloader(true); setTimeout(() => setIsLoading(false), 500); };
    const t = setTimeout(triggerExit, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Injecting CSS Keyframes dynamically for the 360 degree book spin */}
      <style>{`
        @keyframes spin3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .animate-book-spin {
          animation: spin3d 12s linear infinite;
        }
        .animate-book-spin:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Static Hero Banner */}
      <section
        className="relative w-full h-[75vh] min-h-[560px] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/42 to-slate-950/68" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/95 to-transparent" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center gap-6 animate-fade-up">
          <span className="rounded-full border border-white/25 bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-50 backdrop-blur-xl">
            DAV Public School Airoli
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45)" }}>
            Welcome to DAV Airoli Virtual Library
          </h1>
          <p className="text-base md:text-xl font-medium text-blue-50/90 max-w-xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            Scroll Less Read More Grow Better
          </p>
        </div>
      </section>

      {/* Animated Stats Bar */}
      <div ref={statsRef} className="relative z-10 w-full bg-white border-b border-slate-100">
        <div className={`max-w-5xl mx-auto -mt-14 px-6 pb-10 flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-slate-200/70 rounded-[24px] border border-slate-200/70 bg-white/92 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl transition-all duration-1000 transform ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {stats.map(({ value, label }) => (
            <AnimatedStat key={label} value={value} label={label} trigger={statsVisible} />
          ))}
        </div>
      </div>

      {/* Our Mentor (Nisha Peshin) */}
      <section ref={nishaRef} className="w-full bg-[#fcf8f2] pb-16 md:pb-24 border-b border-gray-200/50 overflow-hidden">
        <div className={`max-w-7xl mx-auto px-6 pt-12 transition-all duration-1000 transform ${nishaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-block bg-white border border-gray-200 shadow-md rounded-2xl p-6 md:p-8 min-w-[280px] sm:min-w-[340px]">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3 block" style={{ color: "#b23b3b" }}>
              Our Mentor
            </h2>
            <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: "#b23b3b" }} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className={`relative flex-shrink-0 transition-all duration-1000 ease-out ${nishaVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}>
              <div className="absolute -inset-4 border-2 border-[#b23b3b]/30 rounded-xl pointer-events-none transform translate-x-3 translate-y-3" />
              <div className="w-72 sm:w-80 h-[26rem] rounded-xl overflow-hidden shadow-xl bg-white border-4 border-white relative z-10">
                <img src={nishaPeshinImg} alt="Nisha Peshin" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center text-center md:text-left mt-4 md:mt-0">
              <span className="text-7xl font-serif font-bold leading-none block md:inline mb-2 opacity-30" style={{ color: "#b23b3b" }}>"</span>
              <h4 className={`text-gray-800 text-lg md:text-xl leading-relaxed font-normal -mt-4 italic transition-all duration-1000 delay-500 ${nishaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                Dr. Nisha Pashin, Director of Academics &amp; Public Schools, DAVCMC, provides academic
                leadership to 300+ DAV schools across India. With over 35 years of experience, she has
                significantly contributed to strengthening DAV's curriculum and educational excellence.
              </h4>
              <div className={`mt-8 border-t border-gray-200/60 pt-6 transition-all duration-1000 delay-700 ${nishaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <h3 className="text-2xl font-bold tracking-wide uppercase" style={{ color: "#1a1a6e" }}>Nisha Peshin</h3>
                <p className="text-base text-gray-600 font-medium mt-0.5">Director of Academics &amp; Public Schools</p>
                <p className="text-xs sm:text-sm text-amber-700 font-semibold uppercase tracking-wider mt-2 bg-amber-50 inline-block px-3 py-1 rounded-md">
                  Author of &ldquo;Let Them Fly: My Tryst with Kids&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Fully Rotating 3D Book Showcase */}
          <div className={`lg:col-span-4 flex flex-col items-center justify-center mt-10 lg:mt-0 transition-all duration-1000 delay-300 ${nishaVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}>
            <div className="relative py-12 px-16" style={{ perspective: "1500px" }}>
              <div 
                className="relative w-60 shadow-2xl rounded-r-md animate-book-spin cursor-pointer"
                style={{ height: "21rem", transformStyle: "preserve-3d" }}
              >
                {/* Front Cover Layer */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-r-md bg-cover bg-center z-20"
                  style={{ 
                    backgroundImage: `url(${bookCoverImg})`, 
                    backfaceVisibility: "hidden",
                    transform: "translateZ(12px)" 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/20 rounded-r-md" />
                </div>

                {/* Back Cover Layer */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-l-md bg-cover bg-center z-10"
                  style={{ 
                    backgroundImage: `url(${bookBackImg})`, 
                    backfaceVisibility: "hidden",
                    transform: "translateZ(-12px) rotateY(180deg)" 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-white/10 via-transparent to-black/20 rounded-l-md" />
                </div>

                {/* Left Spine Layer */}
                <div 
                  className="absolute top-0 bottom-0 w-6 bg-gradient-to-b from-[#6e2222] via-[#521717] to-[#3a1010]"
                  style={{ 
                    left: "-12px", 
                    transform: "rotateY(-90deg)",
                    transformOrigin: "right"
                  }} 
                />

                {/* Right Pages Inner Layer */}
                <div 
                  className="absolute top-[2px] bottom-[2px] w-6 bg-gradient-to-r from-gray-100 via-gray-200 to-amber-50 border-y border-r border-gray-300 rounded-r-sm"
                  style={{ 
                    right: "-12px", 
                    transform: "rotateY(90deg)",
                    transformOrigin: "left"
                  }} 
                />
              </div>
              <div className="absolute bottom-2 left-10 right-4 h-6 bg-black/10 blur-xl rounded-full pointer-events-none" />
            </div>
            
            <div className="text-center mt-6">
              <a href="https://www.nishapeshin.in/" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-[#1a1a6e] hover:bg-[#25258c] text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest mb-3 shadow-md transition-all duration-300 hover:-translate-y-0.5">
                Featured Publication
              </a>
              <h4 className="text-xl font-bold text-gray-900 tracking-wide">Let Them Fly</h4>
              <p className="text-sm text-gray-500 italic mt-0.5">My Tryst with Kids</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}