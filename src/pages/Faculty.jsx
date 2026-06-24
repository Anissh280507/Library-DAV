import { useState } from "react";

const stats = [
  { value: "25+", label: "Faculty Members" },
  { value: "9+",  label: "Departments" },
  { value: "2",   label: "Librarians" },
  { value: "6",   label: "Committee Members" },
];

const filters = [
  { id: "All",          label: "All" },
  { id: "Management",   label: "Management" },
  { id: "Library",      label: "Library" },
  { id: "Morning",      label: "Representatives – Morning" },
  { id: "Afternoon35",  label: "Representatives – Afternoon (3–5)" },
  { id: "AfternoonNur", label: "Representatives – Afternoon (Nur–II)" },
];

const allFaculty = [
  // Management
  { name: "Ms. Suman Pradhan",      role: "Principal",   dept: "Management" },
  { name: "Ms. Kanchan Manuja",     role: "Supervisor",  dept: "Management" },
  { name: "Ms. Balvinder Chumber",  role: "Supervisor",  dept: "Management" },
  { name: "Ms. Shrenika Premkumar", role: "Supervisor",  dept: "Management" },
  { name: "Ms. Gunashree Soundade", role: "Supervisor",  dept: "Management" },
  // Library
  { name: "Ms. Monika Tawade",      role: "Librarian",   dept: "Library" },
  { name: "Ms. Geeta Sety",         role: "Librarian",   dept: "Library" },
  // Morning
  { name: "Ms. Saba Shaikh",        role: "English – HOD",       dept: "Morning" },
  { name: "Mr. Rajendra V.",        role: "Hindi – HOD",         dept: "Morning" },
  { name: "Ms. Anita Patil",        role: "Marathi – HOD",       dept: "Morning" },
  { name: "Ms. Kranti Bagade",      role: "Sanskrit – HOD",      dept: "Morning" },
  { name: "Ms. Jai Parkar",         role: "Science – HOD",       dept: "Morning" },
  { name: "Ms. Priti Singh",        role: "Social Science – HOD",dept: "Morning" },
  { name: "Mr. Chandrakant Pawar",  role: "Maths – HOD",         dept: "Morning" },
  { name: "Ms. Manisha Desai",      role: "Computer – HOD",      dept: "Morning" },
  { name: "Ms. Devishankar Gharde", role: "Art – HOD",           dept: "Morning" },
  // Afternoon (3–5)
  { name: "Ms. Deepali Kulkarni",   role: "English",             dept: "Afternoon35" },
  { name: "Ms. Radhika Waghole",    role: "Maths",               dept: "Afternoon35" },
  { name: "Ms. Priyashankar",       role: "Science",             dept: "Afternoon35" },
  { name: "Ms. Nishi Gupta",        role: "Social Science",      dept: "Afternoon35" },
  // Afternoon (Nur–II)
  { name: "Ms. Aarti Pathak",       role: "Teacher's Representative", dept: "AfternoonNur" },
  { name: "Ms. Bhavana Mehra",      role: "Teacher's Representative", dept: "AfternoonNur" },
  { name: "Ms. Surekha Kotian",     role: "Teacher's Representative", dept: "AfternoonNur" },
  { name: "Ms. Vrushali V.",        role: "Teacher's Representative", dept: "AfternoonNur" },
  { name: "Ms. Suchita Kandle",     role: "Teacher's Representative", dept: "AfternoonNur" },
  { name: "Ms. Rukhshar S.",        role: "Teacher's Representative", dept: "AfternoonNur" },
];

export default function Faculty() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allFaculty.filter(f => {
    const matchesDept = active === "All" || f.dept === active;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                          f.role.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a3adb] px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
          Meet Our Faculty
        </h1>
        <p className="text-blue-200 mt-1 text-sm md:text-base">
          Library Committee 2026–27
        </p>
      </div>

      {/* Stats bar */}
      <div className="w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-7 flex divide-x divide-gray-200">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex-1 text-center">
              <p className="text-2xl font-extrabold text-[#1a3adb]">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="w-full bg-white px-6 py-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1a3adb] focus:ring-1 focus:ring-[#1a3adb]"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-gray-100 border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                ${active === f.id
                  ? "bg-[#1a3adb] text-white shadow"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-[#1a3adb]"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((person, i) => {
            const initial = person.name.replace(/^(Ms\.|Mr\.)/, "").trim()[0] ?? "?";
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#1a3adb]">{initial}</span>
                </div>
                <p className="font-bold text-gray-900 text-sm">{person.name}</p>
                <p className="text-[#1a3adb] text-xs font-semibold mt-1">{person.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
