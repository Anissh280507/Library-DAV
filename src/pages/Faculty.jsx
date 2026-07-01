import { useState, useMemo } from "react";

// ==========================================
// 1. ASSET IMPORTS (Fix these to match your exact filenames!)
// ==========================================
import imgAkshadaSonawane from "../assets/Faculty/Akshada Sonawane.jpeg";
import imgAnitaPatil from "../assets/Faculty/Anita Patil.jpeg";
import imgChitraShinde from "../assets/Faculty/Chitra Shinde.jpeg";
import imgGeetaSetty from "../assets/Faculty/Geeta Setty.jpg";
import imgKrantiBagade from "../assets/Faculty/Kranti Bagade.jpeg";
import imgManishaDesai from "../assets/Faculty/Manisha Desai.jpeg";
import imgMonikaTawade from "../assets/Faculty/Monika Tawade.jpeg";
import imgMrChandrakantPawar from "../assets/Faculty/Mr. Chandrakant Pawar.jpeg";
import imgMrRajendraV from "../assets/Faculty/Mr. Rajendra V..jpeg";
import imgMsAartiPathak from "../assets/Faculty/Ms. Aarti Pathak.jpeg";
import imgMsBalvinderChumber from "../assets/Faculty/Ms. Balvinder Chumber.jpeg";
import imgMsBhavanaMehra from "../assets/Faculty/Ms. Bhavana Mehra.jpeg";
import imgMsDevishankarGharde from "../assets/Faculty/Ms. Devishankar Gharde.jpeg";
import imgMsGunashreeSoundade from "../assets/Faculty/Ms. Gunashree Soundade.jpeg";
import imgMsJaiParkar from "../assets/Faculty/Ms. Jai Parkar.jpeg";
import imgMsKanchanManuja from "../assets/Faculty/Ms. Kanchan Manuja.jpeg";
import imgMsPritiSingh from "../assets/Faculty/Ms. Priti Singh.jpeg";
import imgMsPriyashankar from "../assets/Faculty/Ms. Priyashankar.jpeg";
import imgMsRadhikaWaghole from "../assets/Faculty/Ms. Radhika Waghole.jpeg";
import imgMsRukhsharS from "../assets/Faculty/Ms. Rukhshar S..jpeg";
import imgMsSabaShaikh from "../assets/Faculty/Ms. Saba Shaikh.jpeg";
import imgMsSangeetaTripathi from "../assets/Faculty/Ms. Sangeeta Tripathi.jpeg";
import imgMsShrenikaPremkumar from "../assets/Faculty/Ms. Shrenika Premkumar.jpeg";
import imgMsSuchitaKandle from "../assets/Faculty/Ms. Suchita Kandle.jpeg";
import imgMsSurekhaKotian from "../assets/Faculty/Ms. Surekha Kotian.jpeg";
import imgMsVrushaliV from "../assets/Faculty/Ms. Vrushali V..jpeg";
import imgNishiGupta from "../assets/Faculty/Nishi Gupta.jpeg";
import imgSumanPradhan from "../assets/Faculty/Suman Pradhan.jpeg";

// ==========================================
// 2. CONFIGURATION CONSTANTS
// ==========================================
const STATS = [
  { value: "27+", label: "Faculty Members" },
  { value: "9+", label: "Departments" },
  { value: "2", label: "Librarians" },
  { value: "6", label: "Committee Members" },
];

const FILTERS = [
  { id: "All", label: "All" },
  { id: "Management", label: "Management" },
  { id: "Library", label: "Library" },
  { id: "Morning", label: "Representatives – Morning" },
  { id: "Afternoon35", label: "Representatives – Afternoon (3–5)" },
  { id: "AfternoonNur", label: "Representatives – Afternoon (Nur–II)" },
];

// ==========================================
// 3. FACULTY DIRECTORY DATA
// ==========================================
const ALL_FACULTY = [
  // Management
  { name: "Ms. Suman Pradhan", role: "Principal", dept: "Management", img: imgSumanPradhan },
  { name: "Ms. Kanchan Manuja", role: "Supervisor", dept: "Management", img: imgMsKanchanManuja },
  { name: "Ms. Balvinder Chumber", role: "Supervisor", dept: "Management", img: imgMsBalvinderChumber },
  { name: "Ms. Shrenika Premkumar", role: "Supervisor", dept: "Management", img: imgMsShrenikaPremkumar },
  { name: "Ms. Gunashree Soundade", role: "Supervisor", dept: "Management", img: imgMsGunashreeSoundade },
  
  // Library
  { name: "Ms. Monika Tawade", role: "Librarian", dept: "Library", img: imgMonikaTawade },
  { name: "Ms. Geeta Setty", role: "Librarian", dept: "Library", img: imgGeetaSetty },
  
  // Morning HODs
  { name: "Ms. Saba Shaikh", role: "English - HOD", dept: "Morning", img: imgMsSabaShaikh },
  { name: "Mr. Rajendra V.", role: "Hindi - HOD", dept: "Morning", img: imgMrRajendraV },
  { name: "Ms. Anita Patil", role: "Marathi - HOD", dept: "Morning", img: imgAnitaPatil },
  { name: "Ms. Kranti Bagade", role: "Sanskrit - HOD", dept: "Morning", img: imgKrantiBagade },
  { name: "Ms. Jai Parkar", role: "Science - HOD", dept: "Morning", img: imgMsJaiParkar },
  { name: "Ms. Priti Singh", role: "Social Science - HOD", dept: "Morning", img: imgMsPritiSingh },
  { name: "Mr. Chandrakant Pawar", role: "Maths - HOD", dept: "Morning", img: imgMrChandrakantPawar },
  { name: "Ms. Manisha Desai", role: "Computer - HOD", dept: "Morning", img: imgManishaDesai },
  { name: "Ms. Devishankar Gharde", role: "Art - HOD", dept: "Morning", img: imgMsDevishankarGharde },

  // Afternoon (3–5)
  { name: "Ms. Akshada S", role: "English", dept: "Afternoon35", img: imgAkshadaSonawane },
  { name: "Ms. Radhika Waghole", role: "Maths", dept: "Afternoon35", img: imgMsRadhikaWaghole },
  { name: "Ms. Priyashankar", role: "Science", dept: "Afternoon35", img: imgMsPriyashankar },
  { name: "Ms. Nishi Gupta", role: "Social Science", dept: "Afternoon35", img: imgNishiGupta },
  { name: "Ms. Chitra Shinde", role: "Marathi", dept: "Afternoon35", img: imgChitraShinde },
  { name: "Ms. Sangeeta Tripathi", role: "Hindi", dept: "Afternoon35", img: imgMsSangeetaTripathi },

  // Afternoon (Nur–II)
  { name: "Ms. Aarti Pathak", role: "LITTLE STARS CREW", dept: "AfternoonNur", img: imgMsAartiPathak },
  { name: "Ms. Bhavana Mehra", role: "LITTLE STARS CREW", dept: "AfternoonNur", img: imgMsBhavanaMehra },
  { name: "Ms. Surekha Kotian", role: "LITTLE STARS CREW", dept: "AfternoonNur", img: imgMsSurekhaKotian },
  { name: "Ms. Vrushali V.", role: "LITTLE STARS CREW", dept: "AfternoonNur", img: imgMsVrushaliV },
  { name: "Ms. Suchita Kandle", role: "LITTLE STARS CREW", dept: "AfternoonNur", img: imgMsSuchitaKandle },
  { name: "Ms. Rukhshar S.", role: "LITTLE STARS CREW", dept: "AfternoonNur", img: imgMsRukhsharS },
];

const getDeptLabel = (dept) => {
  const mapping = {
    Morning: "Morning Shift",
    Afternoon35: "Afternoon (3–5)",
    AfternoonNur: "Afternoon (Nur–II)",
  };
  return mapping[dept] || dept;
};

export default function Faculty() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaculty = useMemo(() => {
    const cleanSearch = searchQuery.trim().toLowerCase();
    
    return ALL_FACULTY.filter((faculty) => {
      const matchesDept = activeFilter === "All" || faculty.dept === activeFilter;
      const matchesSearch = !cleanSearch || 
        faculty.name.toLowerCase().includes(cleanSearch) ||
        faculty.role.toLowerCase().includes(cleanSearch);
        
      return matchesDept && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans">
      {/* Header section with refined typography */}
      <header className="bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] px-6 py-14 text-white text-center shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
            Meet Our Faculty
          </h1>
          <p className="text-blue-100 opacity-90 text-sm md:text-base font-medium max-w-xl mx-auto">
            Library Committee 2026–27 · DAV Public School, Airoli
          </p>
        </div>
      </header>

      {/* Structured Stats Section */}
      <section className="max-w-5xl mx-auto px-4 -mt-8" aria-label="Statistics">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-2 divide-x-0 md:divide-x divide-slate-100">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center px-2">
              <p className="text-2xl md:text-3xl font-black text-[#1d4ed8]">{value}</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Control Actions: Search Input & Category Filters */}
      <section className="max-w-6xl mx-auto px-6 mt-10 space-y-5" aria-label="Controls">
        <div className="relative max-w-3xl mx-auto shadow-sm rounded-xl">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search directory by name or role designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white text-slate-900 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/10 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isActive
                    ? "bg-[#1d4ed8] text-white border-[#1d4ed8] shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid Directory Layout */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filteredFaculty.map((person) => {
              const fallbackLetter = person.name.replace(/^(Ms\.|Mr\.)/, "").trim()[0] || "?";
              
              return (
                <div 
                  key={`${person.name}-${person.role}`} 
                  className="bg-white rounded-2xl border-2 border-slate-900/10 shadow-sm hover:shadow-md hover:border-[#1d4ed8]/30 transition-all duration-200 p-4 flex flex-col items-center text-center group"
                >
                  {/* Styled Frame Photo Container */}
                  <div className="w-35 h-35 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center mb-4 ring-4 ring-slate-50 group-hover:ring-[#1d4ed8]/10 transition-all flex-shrink-0">
                    {person.img ? (
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.style.display = "none";
                          const fallbackNode = document.createElement("span");
                          fallbackNode.className = "text-2xl font-black text-[#1d4ed8]";
                          fallbackNode.innerText = fallbackLetter;
                          e.target.parentNode.appendChild(fallbackNode);
                        }}
                      />
                    ) : (
                      <span className="text-2xl font-black text-[#1d4ed8]">{fallbackLetter}</span>
                    )}
                  </div>

              {/* Profile Typography: Absolute Black Text Inlines */}
<h2 
  style={{ color: '#000000' }} 
  className="font-bold text-[7px] tracking-tight leading-snug min-h-[2rem] flex items-center justify-center w-full"
>
  {person.name}
</h2>

<p className="text-[#1d4ed8] text-[15px] font-black mt-0.5 tracking-wider uppercase">
  {person.role}
</p>
                  
                  {/* Shift Badge Indicator */}
                  <div className="mt-4 w-full bg-slate-50 group-hover:bg-blue-60/70 rounded-xl px-2 py-1.5 border border-slate-100/80 transition-colors">
                    <span className="text-[13px] font-bold text-slate-500">
                      {getDeptLabel(person.dept)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-semibold max-w-xl mx-auto shadow-sm">
            No matched faculty listings criteria found.
          </div>
        )}
      </main>
    </div>
  );
}