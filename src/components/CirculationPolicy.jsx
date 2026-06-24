import React from "react";
import { BookOpen, Clock, AlertTriangle, RefreshCw, BookMarked, FileText } from "lucide-react";

const policies = [
  {
    icon: BookOpen,
    title: "Borrowing Privileges",
    category: "01 / ACCESS",
    sidebarBg: "bg-blue-100/90 text-blue-800 border-blue-200",
    points: [
      "Students may use the library during their library periods, recess, and after school.",
      "Library access in other periods requires written permission from the subject teacher.",
    ],
  },
  {
    icon: Clock,
    title: "Loan Periods",
    category: "02 / DURATION",
    sidebarBg: "bg-purple-100/90 text-purple-800 border-purple-200",
    points: [
      "Class VI–VIII students can issue one book at a time for one week.",
      "General books are issued for seven days.",
      "Overnight / Short-term issue for competitive books, sample papers, essays & periodicals.",
      "Faculty and staff may issue books for up to 3 months.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Lost & Damaged Books",
    category: "03 / LIABILITY",
    sidebarBg: "bg-rose-100/90 text-rose-800 border-rose-200",
    points: [
      "Check books at the time of issue and report any existing damage immediately.",
      "In case of loss or damage, the student must pay the cost of the book.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Renewals & Clearances",
    category: "04 / LIFECYCLE",
    sidebarBg: "bg-emerald-100/90 text-emerald-800 border-emerald-200",
    points: [
      "The book must be present at the time of renewal.",
      "Books may be renewed only twice.",
      "No renewal if another member has reserved the same book.",
      "Library Clearance required by January/February each session.",
    ],
  },
  {
    icon: BookMarked,
    title: "Reference Materials",
    category: "05 / RETENTION",
    sidebarBg: "bg-amber-100/90 text-amber-900 border-amber-200",
    points: [
      "Encyclopedias, dictionaries & reference materials are for in-library use only and cannot be checked out.",
    ],
  },
  {
    icon: FileText,
    title: "Policy Review",
    category: "06 / SYSTEM",
    sidebarBg: "bg-slate-100 text-slate-800 border-slate-200",
    points: [
      "The circulation policy is reviewed annually and updated as needed.",
    ],
  },
];

export default function CirculationPolicy() {
  return (
    <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Centered Section Header */}
        <div className="border-b-2 border-black pb-10 mb-16 flex flex-col items-center justify-center text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-sm sm:text-base md:text-xl font-bold uppercase tracking-widest text-black bg-slate-200/70 px-5 py-2.5 rounded-md border border-slate-300/60 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              DAV Airoli Library Circulation Policy
            </span>
          </div>
        </div>

        {/* Structural Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {policies.map(({ icon: Icon, title, category, sidebarBg, points }) => (
            <div 
              key={title} 
              className="bg-white border-2 border-black rounded-xl overflow-hidden flex flex-row min-h-[180px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {/* Unique Vertical Sidebar Indicator */}
              <div className={`w-16 sm:w-20 ${sidebarBg} border-r-2 border-black flex flex-col items-center justify-between py-6 flex-shrink-0`}>
                <span className="text-[10px] font-black tracking-widest uppercase [writing-mode:vertical-lr] rotate-180 select-none">
                  {category}
                </span>
                <div className="w-8 h-8 rounded-lg bg-white border border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <Icon size={16} strokeWidth={2.5} className="text-black" />
                </div>
              </div>

              {/* Main Contents Area */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-start space-y-4">
                <h3 className="font-extrabold text-black font-serif text-lg tracking-tight leading-tight border-b border-slate-100 pb-2">
                  {title}
                </h3>
                
                <ul className="space-y-3 flex-1 flex flex-col justify-start">
                  {points.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14.5px] text-black font-medium font-sans leading-relaxed">
                      <span className="mt-2 w-2 h-2 border border-black bg-black rounded-none rotate-45 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}