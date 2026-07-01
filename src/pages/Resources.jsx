import { useState } from "react";
import {
  BookOpen, BookMarked, Newspaper, Video,
  User, Globe, Tv, FileText, Library, ExternalLink, Search, X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Sub-components (Assuming these handle their own rendering or use the search query)
import EBooks from "./EBooks";
import UsefulWebsites from "./UsefulWebsites";
import TedDocMovies from "./TedDocMovies";
import ENewspapers from "./ENewspapers";
import StoryVideos from "./StoryVideos";
import Biography from "./Biography";
import EMagazines from "./EMagazines";

const categories = [
  { id: "ebooks",      label: "E-Books",                           icon: BookOpen },
  { id: "magazines",   label: "E-Magazines",                       icon: BookMarked },
  { id: "newspapers",  label: "E-Newspapers",                      icon: Newspaper },
  { id: "story",       label: "Story Videos",                      icon: Video },
  //{ id: "biography",   label: "Biographies",                       icon: User },
  { id: "reference",   label: "Reference Resources",               icon: Library },
  { id: "ted",         label: "Ted Talks & Documentaries",         icon: Tv },
  { id: "websites",    label: "Useful Websites",                   icon: Globe },
  
];

const placeholderItems = {
  magazines:  ["Science Today", "National Geographic", "The Economist", "Time Magazine", "Nature Journal", "Discover Magazine"],
  newspapers: ["The Hindu", "Times of India", "Indian Express", "Hindustan Times", "Deccan Herald", "Tribune"],
  story:      ["Panchatantra Tales", "Akbar & Birbal", "Tenali Raman Stories", "Jataka Tales", "Aesop's Fables", "Arabian Nights"],
  biography:  ["APJ Abdul Kalam", "Swami Vivekananda", "Mahatma Gandhi", "Ambedkar: A Life", "Subhash Chandra Bose", "Sardar Patel"],
  ted:        ["The Power of Vulnerability", "How Great Leaders Inspire", "Do Schools Kill Creativity?", "Inside the Mind of a Master Procrastinator"],
};

const referenceSections = [
  {
    title: "Best Free Study Websites",
    items: [
      { name: "Khan Academy", desc: "Maths, Science, English - video lessons + practice", url: "https://www.khanacademy.org" },
      { name: "LearnCBSE", desc: "Notes, solutions, sample papers", url: "https://www.learncbse.in" },
      { name: "myCBSEguide", desc: "Papers, notes, tests", url: "https://mycbseguide.com" },
      { name: "Vedantu Free Resources", desc: "NCERT solutions, revision notes, sample papers", url: "https://www.vedantu.com/cbse" },
      { name: "GeeksforGeeks CBSE Material", desc: "CBSE study material", url: "https://www.geeksforgeeks.org" },
      { name: "AglaSem", desc: "Previous year question papers for Class 9-12", url: "https://schools.aglasem.com" },
      { name: "NCERT Books Download", desc: "All classes official texts", url: "https://www.ncertbooks.net" },
    ],
  },
  {
    title: "Free Video Lectures",
    items: [
      { name: "Physics Wallah (PW)", desc: "Class 9 to 12 comprehensive courses", url: "https://www.youtube.com/@PhysicsWallah" },
      { name: "Vedantu", desc: "Class 9 to 12 interactive streams", url: "https://www.youtube.com/@Vedantu9_10" },
      { name: "Khan Academy India", desc: "Free regionalized video lessons", url: "https://www.youtube.com/@KhanAcademyIndia" },
      { name: "CBSE Official YouTube", desc: "Official board notifications and videos", url: "https://www.youtube.com/@cbsehq" },
       { name: "Ashu Ghai - 9th & 10th", desc: "Fun Science videos", url: "https://www.youtube.com/@AshuGhai9th10th" },
    ],
  },
  {
    title: "More Free YouTube Channels",
    items: [
      { name: "Magnet Brains", desc: "All subjects, clear blackboard style instruction", url: "https://www.youtube.com/@MagnetBrainsEducation" },
      { name: "Padhle Tenthies", desc: "Class 9-10 exam target concepts", url: "https://www.youtube.com/@PadhleTenthies" },
      { name: "Shobhit Nirwan", desc: "Class 9, 10, 11, 12 simplified summaries", url: "https://www.youtube.com/@MathsByShobhitNirwan" },
    ],
  },
];

// Helper to reliably grab a high-quality favicon image for external websites
const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch {
    return null;
  }
};

function matchesQuery(values, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
}

export default function Resources() {
  const [active, setActive] = useState("ebooks");
  const [query, setQuery] = useState("");

  const items = placeholderItems[active] ?? [];
  const filteredItems = items.filter((item) => matchesQuery([item], query));
  
  const filteredReferenceSections = referenceSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => matchesQuery([section.title, item.name, item.desc, item.url], query)),
    }))
    .filter((section) => section.items.length > 0);

  const referenceCount = referenceSections.reduce((total, section) => total + section.items.length, 0);
  const filteredReferenceCount = filteredReferenceSections.reduce((total, section) => total + section.items.length, 0);
  
  const currentCategory = categories.find(c => c.id === active);
  const ActiveIcon = currentCategory?.icon ?? FileText;

  return (
    <div className="min-h-screen bg-slate-50/50 antialiased selection:bg-blue-500/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a6e] to-[#2a2a9e] px-6 py-14 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <Badge className="mb-3 bg-white/10 hover:bg-white/20 text-white border-none text-xs px-3 py-1 backdrop-blur-sm">
            Digital Library
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Digital Resources Platform
          </h1>
          <p className="text-blue-100/80 mt-2 text-sm md:text-base max-w-xl font-medium">
            Explore thousands of structured learning materials, curated tools, and websites at your fingertips.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <Card className="border border-gray-200/60 shadow-sm rounded-2xl overflow-hidden sticky top-6 bg-white">
            <CardContent className="p-1.5 space-y-0.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = active === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActive(cat.id);
                      setQuery("");
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 text-left text-sm font-semibold rounded-xl transition-all duration-200
                      ${isActive
                        ? "bg-[#1a1a6e] text-white shadow-md shadow-[#1a1a6e]/20"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#1a1a6e]"
                      }`}
                  >
                    <Icon size={18} className={isActive ? "text-blue-300" : "text-gray-400 group-hover:text-gray-600"} />
                    {cat.label}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* Search Bar */}
          <div className="relative mb-8 shadow-sm rounded-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search in ${currentCategory?.label}...`}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-11 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-[#1a1a6e] focus:ring-4 focus:ring-[#1a1a6e]/5 placeholder:text-gray-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Module Router View */}
          {active === "ebooks" && <EBooks searchQuery={query} />}
          {active === "websites" && <UsefulWebsites searchQuery={query} />}
          {active === "ted" && <TedDocMovies searchQuery={query} />}
          {active === "newspapers" && <ENewspapers searchQuery={query} />}
          {active === "story" && <StoryVideos searchQuery={query} />}
          {active === "biography" && <Biography searchQuery={query} />}
          {active === "magazines" && <EMagazines searchQuery={query} />}

          {/* Dedicated View for Reference Section with Real Logos */}
          {active === "reference" && (
            <>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-[#1a1a6e]">
                    <Library size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Reference Resources</h2>
                </div>
                <Badge variant="secondary" className="text-xs bg-gray-100 border-none text-gray-600 px-2.5 py-1">
                  {filteredReferenceCount} of {referenceCount} links
                </Badge>
              </div>
              <Separator className="mb-6 bg-gray-100" />
              
              {filteredReferenceCount > 0 ? (
                <div className="space-y-10">
                  {filteredReferenceSections.map((section) => (
                    <section key={section.title} className="animate-in fade-in duration-300">
                      <h3 className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-3.5 rounded-full bg-[#1a1a6e] inline-block" />
                        {section.title}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.items.map((item) => {
                          const logoUrl = getFaviconUrl(item.url);
                          return (
                            <a 
                              key={`${section.title}-${item.name}-${item.url}`} 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="no-underline block group"
                            >
                              <Card className="border border-gray-200/60 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 rounded-xl h-full transform hover:-translate-y-0.5 bg-white">
                                <CardContent className="p-5 flex flex-col justify-between h-full">
                                  <div className="flex items-start gap-3.5">
                                    {/* Real Logo or Fallback Avatar */}
                                    <div className="w-10 h-10 shrink-0 bg-slate-50 border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden group-hover:bg-blue-50/50 transition-colors">
                                      {logoUrl ? (
                                        <img 
                                          src={logoUrl} 
                                          alt={item.name} 
                                          className="w-5 h-5 object-contain" 
                                          onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                      ) : (
                                        <span className="text-xs font-bold text-[#1a1a6e]">{item.name.charAt(0)}</span>
                                      )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-[#1a1a6e] transition-colors flex items-center gap-1.5">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{item.desc}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                                    <span className="text-[11px] font-medium text-blue-600/80 truncate max-w-[80%]">
                                      {item.url.replace(/https?:\/\/(www\.)?/, "")}
                                    </span>
                                    <ExternalLink size={13} className="text-gray-300 group-hover:text-[#1a1a6e] transition-colors" />
                                  </div>
                                </CardContent>
                              </Card>
                            </a>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400 shadow-sm">
                  No matching reference resources discovered.
                </div>
              )}
            </>
          )}

          {/* Simple Grid Framework for text arrays (Fallback rendering for static state slices) */}
          {!["ebooks", "websites", "ted", "newspapers", "story", "biography", "magazines", "reference"].includes(active) && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 rounded-xl text-[#1a1a6e]">
                  <ActiveIcon size={18} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{currentCategory?.label}</h2>
                <Badge variant="secondary" className="ml-auto text-xs bg-gray-100 text-gray-600 border-none">
                  {filteredItems.length} items
                </Badge>
              </div>
              <Separator className="mb-6 bg-gray-100" />
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item, i) => (
                    <Card key={i} className="border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl bg-white group transform hover:-translate-y-0.5">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 bg-slate-50 border border-gray-100 rounded-lg flex items-center justify-center text-[#1a1a6e] group-hover:bg-blue-50 transition-colors">
                            <ActiveIcon size={16} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm leading-snug">{item}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Verified Stream</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400 shadow-sm">
                  No resources matching your filter criteria.
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}