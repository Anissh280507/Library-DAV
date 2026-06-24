import {
  BookOpen, Clock, BookMarked, RefreshCw, Search,
  Newspaper, Bell, Star, GraduationCap, Layers, Trophy, BookCheck
} from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Circulation of Books",
    color: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-100 text-blue-600",
    watermark: "bg-blue-50",
    points: [
      "Regular circulation for Classes V and above.",
      "Books issued and returned during library periods.",
      "Students maintain reading lists and submit book reviews.",
    ],
  },
  {
    icon: Clock,
    title: "Library Periods",
    color: "from-teal-500 to-teal-600",
    iconBg: "bg-teal-100 text-teal-600",
    watermark: "bg-teal-50",
    points: [
      "Library periods for every class from III to X.",
      "Students can issue and return books during these periods.",
      "Reading habit and book review submissions are encouraged.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Library Orientation",
    color: "from-orange-400 to-orange-500",
    iconBg: "bg-orange-100 text-orange-600",
    watermark: "bg-orange-50",
    points: [
      "Explains arrangement of books on shelves.",
      "Issue, return, and reservation procedures.",
      "How to suggest new books; member responsibilities.",
    ],
  },
  {
    icon: BookCheck,
    title: "CBSE / Exam Question Papers",
    color: "from-green-500 to-green-600",
    iconBg: "bg-green-100 text-green-600",
    watermark: "bg-green-50",
    points: [
      "Previous CBSE question papers kept in library.",
      "Sample papers and question banks available for reference.",
      "Accessible to both teachers and students.",
    ],
  },
  {
    icon: Bell,
    title: "Notice / Bulletin Boards",
    color: "from-pink-500 to-pink-600",
    iconBg: "bg-pink-100 text-pink-600",
    watermark: "bg-pink-50",
    points: [
      "New books, book of the week, and student reviews displayed.",
      "Career, higher education, and competition info shared.",
      "Rules and instructions on the bulletin board.",
    ],
  },
  {
    icon: Star,
    title: "New Arrivals",
    color: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-100 text-purple-600",
    watermark: "bg-purple-50",
    points: [
      "New arrivals list displayed on the notice board.",
      "Book jackets prominently displayed in the library.",
    ],
  },
  {
    icon: BookMarked,
    title: "Book Reviews",
    color: "from-yellow-500 to-yellow-600",
    iconBg: "bg-yellow-100 text-yellow-700",
    watermark: "bg-yellow-50",
    points: [
      "Good book reviews by students are displayed.",
      "Book review columns from the e-newsletter showcased.",
      "Helps readers understand and choose books.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Career / Higher Education Alerts",
    color: "from-indigo-500 to-indigo-600",
    iconBg: "bg-indigo-100 text-indigo-600",
    watermark: "bg-indigo-50",
    points: [
      "Section of notice board for higher education alerts.",
      "Information brochures and advertisements displayed.",
    ],
  },
  {
    icon: Newspaper,
    title: "Article Alert",
    color: "from-rose-500 to-rose-600",
    iconBg: "bg-rose-100 text-rose-600",
    watermark: "bg-rose-50",
    points: [
      "News clippings related to school and achievements filed.",
      "Displayed on display boards for all to see.",
    ],
  },
  {
    icon: Search,
    title: "Reference Services",
    color: "from-cyan-500 to-cyan-600",
    iconBg: "bg-cyan-100 text-cyan-600",
    watermark: "bg-cyan-50",
    points: [
      "Good collection of reference books in different subjects.",
      "Reference books are not issued — for in-library use only.",
    ],
  },
  {
    icon: Layers,
    title: "Topical Sequence",
    color: "from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-100 text-emerald-600",
    watermark: "bg-emerald-50",
    points: [
      "On special occasions, relevant books put on 'Display'.",
      "Covers birthdays of authors, festivals, and sports events.",
    ],
  },
  {
    icon: Trophy,
    title: "Literary Festivals & Competitions",
    color: "from-amber-500 to-amber-600",
    iconBg: "bg-amber-100 text-amber-700",
    watermark: "bg-amber-50",
    points: [
      "Literary quiz, character parades, reading sessions.",
      "Book jacket design and bookmark competitions.",
      "Book Exhibitions with publishers organised yearly.",
      "Prizes awarded to winners.",
    ],
  },
];

const pastelBgs = [
  "bg-blue-50", "bg-purple-50", "bg-orange-50", "bg-green-50",
  "bg-pink-50", "bg-yellow-50", "bg-teal-50", "bg-indigo-50",
  "bg-rose-50", "bg-amber-50", "bg-cyan-50", "bg-lime-50",
];

export default function LibraryServices() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#1a1a6e] uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Library Services</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
            A range of services designed to support learning, research, and a love of reading at DAV Public School, Airoli.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, color, iconBg, points }, idx) => (
            <div
              key={title}
              className={`relative ${pastelBgs[idx % pastelBgs.length]} rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden p-5 flex flex-col gap-3`}
            >
              {/* Watermark icon */}
              <div className={`absolute bottom-3 right-3 opacity-10`}>
                <Icon size={64} className="text-gray-400" />
              </div>

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                <Icon size={20} />
              </div>

              {/* Title */}
              <p className="font-bold text-gray-900 text-sm leading-snug">{title}</p>

              {/* Points */}
              <ul className="flex flex-col gap-1.5 flex-1">
                {points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1a1a6e] flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
