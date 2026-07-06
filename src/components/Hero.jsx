import { useState, useEffect, useRef } from "react";
import heroImg        from "../assets/hero.png";
import nishaPeshinImg from "../assets/Hero/Nisha Pashin.jpeg";
import bookCoverImg   from "../assets/Hero/Let them FLy.jpg";
import presidentImg   from "../assets/Hero/President.png";
import principalImg   from "../assets/Hero/Principal.jpg";
import schoolImg      from "../assets/Hero/school.jpeg";

const stats = [
  { value: "1K+", label: "Digital Resources" },
  { value: "25+", label: "Faculty Members" },
  { value: "3k+", label: "Active Users" },
  { value: "10+", label: "Events Yearly" },
];

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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function SectionTitle({ title, hexColor, visible }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 pt-12 transition-all duration-1000 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      {/* Box background with guaranteed high-contrast dark inline text color */}
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

function SpotlightSection({ sectionRef, visible, bg, hexColor, sectionTitle, image, imageAlt, quote, name, role, badge, badgeBg, borderColor, imageRight = false, readMoreUrl }) {
  const imgEl = (
    <div className={`flex-shrink-0 transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-x-0" : imageRight ? "opacity-0 translate-x-16" : "opacity-0 -translate-x-16"}`}>
      <div className="relative">
        <div className={`absolute -inset-3 border-2 ${borderColor} rounded-2xl pointer-events-none transform translate-x-3 translate-y-3`} />
        <div className="w-72 sm:w-80 h-[22rem] rounded-2xl overflow-hidden shadow-xl border-4 border-white relative z-10">
          <img src={image} alt={imageAlt} className="w-full h-full object-cover object-top" />
        </div>
      </div>
    </div>
  );

  const textEl = (
    <div className={`flex-1 transition-all duration-1000 ease-out delay-200 ${visible ? "opacity-100 translate-x-0" : imageRight ? "opacity-0 -translate-x-16" : "opacity-0 translate-x-16"}`}>
      <span className="text-7xl font-serif font-bold leading-none block mb-2 opacity-30" style={{ color: hexColor }}>"</span>
      <h4 className={`text-gray-800 text-lg md:text-xl leading-relaxed font-normal -mt-4 italic transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {quote}
      </h4>
      <div className={`mt-8 border-t ${borderColor} pt-6 transition-all duration-1000 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <h3 className="text-2xl font-bold tracking-wide uppercase" style={{ color: hexColor }}>{name}</h3>
        <p className="text-base text-gray-600 font-medium mt-0.5">{role}</p>
        {badge && (
          <span className={`inline-block mt-2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md ${badgeBg}`}>
            {badge}
          </span>
        )}
        {readMoreUrl && (
          <div className="mt-5">
            <a href={readMoreUrl} target="_blank" rel="noopener noreferrer"
              className="inline-block text-white text-xs font-bold px-6 py-2.5 rounded uppercase tracking-wider shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              style={{ backgroundColor: hexColor }}>
              Read More
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className={`w-full ${bg} pb-16 md:pb-24 border-b border-gray-200/40 overflow-hidden`}>
      <SectionTitle title={sectionTitle} hexColor={hexColor} visible={visible} />
      <div className={`max-w-6xl mx-auto px-6 pt-10 flex flex-col ${imageRight ? "lg:flex-row-reverse" : "lg:flex-row"} gap-14 items-center`}>
        {imgEl}
        {textEl}
      </div>
    </section>
  );
}

export default function Hero() {
  const [isLoading, setIsLoading]         = useState(true);
  const [fadePreloader, setFadePreloader] = useState(false);
  const [rotate, setRotate]               = useState({ x: 7, y: -28 });
  const [isHovered, setIsHovered]         = useState(false);

  const [aboutRef,     aboutVisible]     = useInView();
  const [presidentRef, presidentVisible] = useInView();
  const [nishaRef,     nishaVisible]     = useInView();
  const [principalRef, principalVisible] = useInView();

  useEffect(() => {
    const triggerExit = () => { setFadePreloader(true); setTimeout(() => setIsLoading(false), 500); };
    const t = setTimeout(triggerExit, 3000);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRotate({
      x: ((e.clientY - r.top)  / r.height - 0.5) * -30,
      y: ((e.clientX - r.left) / r.width  - 0.5) *  30,
    });
  };

  return (
    <>
 

      {/* Static Hero Banner */}
      <section
        className="relative w-full h-[75vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45)" }}>
            Welcome to DAV Airoli Virtual Library
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-200 max-w-xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            Scroll Less Read More Grow Better
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex-1 flex flex-col items-center text-center py-4 md:py-0 px-6">
              <p className="text-3xl font-extrabold text-[#1a1a6e]">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 1. About School */}
      <SpotlightSection
        sectionRef={aboutRef}
        visible={aboutVisible}
        bg="bg-[#f0faf4]"
        hexColor="#1a5c36"
        sectionTitle="About School"
        image={schoolImg}
        imageAlt="DAV Public School Airoli"
        quote="Founded in the year 1998, D.A.V. Public School, Airoli, Navi Mumbai has the strength of more than 4000 students on its rolls. It upholds the great motto of imparting the modern and technological oriented education blended together with the rich Indian culture and ethics."
        name="DAV Public School, Airoli"
        role="Navi Mumbai, Maharashtra · Est. 1998"
        badge="4000+ Students on Rolls"
        badgeBg="text-green-800 bg-green-100"
        borderColor="border-green-200/60"
        imageRight={false}
        readMoreUrl="https://davairoli.ac.in/5C0A6447-872D-43FE-ABA1-9B5EAF253B77/CMS/Page/About-School"
      />

      {/* 2. Our Mentor (President) */}
      <SpotlightSection
        sectionRef={presidentRef}
        visible={presidentVisible}
        bg="bg-[#e8f4fd]"
        hexColor="#1a1a6e"
        sectionTitle="Our Mentor"
        image={presidentImg}
        imageAlt="DAV President"
        quote="DAV College Managing Committee (DAVCMC) is dedicated to nurturing generations of students with a strong foundation in values, knowledge, and a spirit of service to the nation. Education is not merely about acquiring degrees — it is about building character, cultivating wisdom, and inspiring a lifelong love for learning."
        name="DAV President"
        role="DAV College Managing Committee"
        badge="Guiding 900+ DAV Institutions Nationwide"
        badgeBg="text-blue-800 bg-blue-100"
        borderColor="border-blue-200/60"
        imageRight={true}
        readMoreUrl="https://davcmc.net.in/B46D2794-51B4-4B3A-95B8-46BB25875D74/CMS/Page/MESSAGE-OF-THE-PRESIDENT"
      />

      {/* 3. Our Mentor (Nisha Peshin) */}
      <section ref={nishaRef} className="w-full bg-[#fcf8f2] pb-16 md:pb-24 border-b border-gray-200/50 overflow-hidden">
        <div className={`max-w-7xl mx-auto px-6 pt-12 transition-all duration-1000 transform ${nishaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Box background styled perfectly using reliable inline styles */}
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
          <div className={`lg:col-span-4 flex flex-col items-center justify-center mt-10 lg:mt-0 transition-all duration-1000 delay-300 ${nishaVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}>
            <div className="relative py-12 px-16 cursor-grab active:cursor-grabbing" style={{ perspective: "1500px" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => { setIsHovered(false); setRotate({ x: 7, y: -28 }); }}>
              <div className="relative w-60 shadow-2xl rounded-r-md transition-all duration-150 ease-out"
                style={{ height: "21rem", transformStyle: "preserve-3d", transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})` }}>
                <div className="absolute inset-0 w-full h-full rounded-r-md bg-cover bg-center z-20"
                  style={{ backgroundImage: `url(${bookCoverImg})`, backfaceVisibility: "hidden" }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/20 rounded-r-md" />
                </div>
                <div className="absolute top-0 bottom-0 w-7 bg-gradient-to-b from-[#6e2222] via-[#521717] to-[#3a1010]"
                  style={{ left: 0, transform: "rotateY(-90deg)", transformOrigin: "left" }} />
                <div className="absolute top-[2px] bottom-[2px] w-6 bg-gradient-to-r from-gray-100 via-gray-200 to-amber-50 border-y border-r border-gray-300 rounded-r-sm"
                  style={{ right: "-22px", transform: "rotateY(90deg)", transformOrigin: "left" }} />
              </div>
              <div className="absolute bottom-2 left-10 right-4 h-6 bg-black/20 blur-xl rounded-full pointer-events-none" />
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

      {/* 4. Our Principal */}
      <SpotlightSection
        sectionRef={principalRef}
        visible={principalVisible}
        bg="bg-[#fdf4ff]"
        hexColor="#5b1a6e"
        sectionTitle="Our Principal"
        image={principalImg}
        imageAlt="Principal, DAV Airoli"
        quote="DAV Airoli, under the aegis of DAVCMC, New Delhi is doing an exceptionally commendable job to shape the destiny of thousands of children. Our vision is of all round development of our students where we inspire them to be creative, innovative and sensitive human beings."
        name="Principal's Message"
        role="DAV Public School, Airoli"
        badge="Shaping Future Leaders Since 1998"
        badgeBg="text-purple-800 bg-purple-100"
        borderColor="border-purple-200/60"
        imageRight={false}
        readMoreUrl="https://davairoli.ac.in/14056EE2-4E1F-4D2D-BD0B-FD60BFA5066F/CMS/Page/Principal%E2%80%99s-Message"
      />
    </>
  );
}