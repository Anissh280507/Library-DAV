import React from "react";
import {
  BookOpen, Clock, BookMarked, Search,
  Newspaper, Bell, Star, GraduationCap, Layers, Trophy, BookCheck
} from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Circulation of Books",
    iconBg: "bg-blue-100 text-blue-700",
    cardBg: "bg-blue-50/70 border-blue-100",
    bulletColor: "bg-blue-600",
    points: [
      "Regular circulation for Classes V and above.",
      "Books issued and returned during library periods.",
      "Students maintain reading lists and submit book reviews.",
    ],
  },
  {
    icon: Clock,
    title: "Library Periods",
    iconBg: "bg-teal-100 text-teal-700",
    cardBg: "bg-teal-50/70 border-teal-100",
    bulletColor: "bg-teal-600",
    points: [
      "Library periods for every class from III to X.",
      "Students can issue and return books during these periods.",
      "Reading habit and book review submissions are encouraged.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Library Orientation",
    iconBg: "bg-orange-100 text-orange-700",
    cardBg: "bg-orange-50/60 border-orange-100",
    bulletColor: "bg-orange-600",
    points: [
      "Explains arrangement of books on shelves.",
      "Issue, return, and reservation procedures.",
      "How to suggest new books; member responsibilities.",
    ],
  },
  {
    icon: BookCheck,
    title: "CBSE / Exam Question Papers",
    iconBg: "bg-green-100 text-green-700",
    cardBg: "bg-green-50/70 border-green-100",
    bulletColor: "bg-green-600",
    points: [
      "Previous CBSE question papers kept in library.",
      "Sample papers and question banks available for reference.",
      "Accessible to both teachers and students.",
    ],
  },
  {
    icon: Bell,
    title: "Notice / Bulletin Boards",
    iconBg: "bg-pink-100 text-pink-700",
    cardBg: "bg-pink-50/70 border-pink-100",
    bulletColor: "bg-pink-600",
    points: [
      "New books, book of the week, and student reviews displayed.",
      "Career, higher education, and competition info shared.",
      "Rules and instructions on the bulletin board.",
    ],
  },
  {
    icon: Star,
    title: "New Arrivals",
    iconBg: "bg-purple-100 text-purple-700",
    cardBg: "bg-purple-50/70 border-purple-100",
    bulletColor: "bg-purple-600",
    points: [
      "New arrivals list displayed on the notice board.",
      "Book jackets prominently displayed in the library.",
    ],
  },
  {
    icon: BookMarked,
    title: "Book Reviews",
    iconBg: "bg-yellow-100 text-yellow-800",
    cardBg: "bg-yellow-50/70 border-yellow-100",
    bulletColor: "bg-yellow-600",
    points: [
      "Good book reviews by students are displayed.",
      "Book review columns from the e-newsletter showcased.",
      "Helps readers understand and choose books.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Career & Higher Ed Alerts",
    iconBg: "bg-indigo-100 text-indigo-700",
    cardBg: "bg-indigo-50/70 border-indigo-100",
    bulletColor: "bg-indigo-600",
    points: [
      "Section of notice board for higher education alerts.",
      "Information brochures and advertisements displayed.",
    ],
  },
  {
    icon: Newspaper,
    title: "Article Alert",
    iconBg: "bg-rose-100 text-rose-700",
    cardBg: "bg-rose-50/70 border-rose-100",
    bulletColor: "bg-rose-600",
    points: [
      "News clippings related to school and achievements filed.",
      "Displayed on display boards for all to see.",
    ],
  },
  {
    icon: Search,
    title: "Reference Services",
    iconBg: "bg-cyan-100 text-cyan-700",
    cardBg: "bg-cyan-50/70 border-cyan-100",
    bulletColor: "bg-cyan-600",
    points: [
      "Good collection of reference books in different subjects.",
      "Reference books are not issued — for in-library use only.",
    ],
  },
  {
    icon: Layers,
    title: "Topical Sequence",
    iconBg: "bg-emerald-100 text-emerald-700",
    cardBg: "bg-emerald-50/70 border-emerald-100",
    bulletColor: "bg-emerald-600",
    points: [
      "On special occasions, relevant books put on 'Display'.",
      "Covers birthdays of authors, festivals, and sports events.",
    ],
  },
  {
    icon: Trophy,
    title: "Literary Festivals",
    iconBg: "bg-amber-100 text-amber-800",
    cardBg: "bg-amber-50/70 border-amber-100",
    bulletColor: "bg-amber-600",
    points: [
      "Literary quiz, character parades, reading sessions.",
      "Book jacket design and bookmark competitions.",
      "Book Exhibitions with publishers organised yearly.",
      "Prizes awarded to winners.",
    ],
  },
];

export default function LibraryServices() {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xl font-bold uppercase tracking-widest text-slate-900 bg-slate-200/60 px-3 py-1.5 rounded-md border border-slate-300/40">
            What DAV Airoli Library Offers
          </span>
          <div className="w-12 h-1 bg-slate-900 mx-auto rounded-full mt-4" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, iconBg, cardBg, bulletColor, points }) => (
            <div
              key={title}
              className={`relative ${cardBg} rounded-2xl border p-6 flex flex-col gap-4 shadow-sm`}
            >
              {/* Subtle Watermark Icon */}
              <div className="absolute bottom-3 right-3 text-slate-900 opacity-[0.04] pointer-events-none">
                <Icon size={80} strokeWidth={1.2} />
              </div>

              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} shadow-sm flex-shrink-0`}>
                <Icon size={22} strokeWidth={2} />
              </div>

              {/* Content Space */}
              <div className="space-y-3 flex-1 flex flex-col relative z-10">
                <h3 className="font-bold text-slate-900 text-base tracking-tight leading-snug">
                  {title}
                </h3>

                <ul className="space-y-2.5 flex-1 flex flex-col justify-start">
                  {points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-slate-900 font-medium leading-relaxed">
                      <span className={`mt-2 w-1.5 h-1.5 rounded-full ${bulletColor} opacity-75 flex-shrink-0`} />
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