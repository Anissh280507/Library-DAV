import { useState } from "react";
import {
  BookOpen, BookMarked, Newspaper, Video,
  Headphones, User, Globe, Tv, FileText, Library, ExternalLink, Search, X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EBooks from "./EBooks";
import UsefulWebsites from "./UsefulWebsites";
import TedDocMovies from "./TedDocMovies";
import ENewspapers from "./ENewspapers";
import StoryVideos from "./StoryVideos";
import Biography from "./Biography";
import EMagazines from "./EMagazines";

const categories = [
  { id: "ebooks",      label: "E-Books",                           icon: BookOpen },
  { id: "magazines",  label: "E-Magazines",                       icon: BookMarked },
  { id: "newspapers", label: "E-Newspapers",                      icon: Newspaper },
  { id: "story",      label: "Story Videos",                      icon: Video },
  { id: "reference",  label: "Reference Resources",               icon: Library },
  { id: "ted",        label: "Ted Talks, Documentaries & Movies", icon: Tv },
  { id: "websites",   label: "Useful Websites",                   icon: Globe },
];

const placeholderItems = {
  magazines:  ["Science Today", "National Geographic", "The Economist", "Time Magazine", "Nature Journal", "Discover Magazine"],
  newspapers: ["The Hindu", "Times of India", "Indian Express", "Hindustan Times", "Deccan Herald", "Tribune"],
  story:      ["Panchatantra Tales", "Akbar & Birbal", "Tenali Raman Stories", "Jataka Tales", "Aesop's Fables", "Arabian Nights"],
  audio:      ["Gitanjali by Tagore", "Poems of Kabir", "Wings of Fire (Audio)", "My Experiments with Truth", "The Alchemist", "Ramayana Narrated"],
  biography:  ["APJ Abdul Kalam", "Swami Vivekananda", "Mahatma Gandhi", "Ambedkar: A Life", "Subhash Chandra Bose", "Sardar Patel"],
  reference:  ["Oxford English Dictionary", "Encyclopedia Britannica", "JSTOR Articles", "Shodhganga Theses", "Wikipedia Academic", "IndiaInfo Yearbook"],
  ted:        ["The Power of Vulnerability", "How Great Leaders Inspire", "Do Schools Kill Creativity?", "Inside the Mind of a Master Procrastinator", "The Puzzle of Motivation", "Your Body Language May Shape Who You Are"],
  websites:   ["NPTEL", "Coursera", "Khan Academy", "MIT OpenCourseWare", "INFLIBNET", "e-PG Pathshala"],
};

const referenceSections = [
  {
    title: "Best Free Study Websites",
    items: [
      { name: "Khan Academy", desc: "Maths, Science, English - video lessons + practice", url: "https://www.khanacademy.org" },
      { name: "LearnCBSE", desc: "Notes, solutions, sample papers", url: "https://www.learncbse.in" },
      { name: "myCBSEguide", desc: "Papers, notes, tests", url: "https://mycbseguide.com" },
      { name: "Vedantu Free Resources", desc: "NCERT solutions, revision notes, sample papers", url: "https://www.vedantu.com/cbse" },
      { name: "GeeksforGeeks CBSE Study Material", desc: "CBSE study material", url: "https://www.geeksforgeeks.org/cbse-study-material" },
      { name: "AglaSem", desc: "Previous year question papers for Class 9, 10, 11, 12", url: "https://schools.aglasem.com/cbse-previous-year-question-papers" },
      { name: "NCERT Books Download", desc: "All classes", url: "https://www.ncertbooks.net" },
    ],
  },
  {
    title: "Free Video Lectures",
    items: [
      { name: "Physics Wallah (PW)", desc: "Class 9 to 12", url: "https://www.youtube.com/@PhysicsWallah" },
      { name: "Vedantu", desc: "Class 9 to 12", url: "https://www.youtube.com/@VedantuClass9_10" },
      { name: "Khan Academy India", desc: "Free video lessons", url: "https://www.youtube.com/@KhanAcademyIndia" },
      { name: "CBSE Official YouTube", desc: "Official CBSE videos", url: "https://www.youtube.com/@cbsehq" },
    ],
  },
  {
    title: "More Official / Govt. Free Resources",
    items: [
      { name: "NIOS YouTube", desc: "Class 9 & 10", url: "https://www.youtube.com/channel/UC1we0IrHSKyC7f30wE50_hQ" },
      { name: "NIOS YouTube", desc: "Class 11 & 12", url: "https://www.youtube.com/channel/UC6R9rI1iEsPCPmvzlunKDg" },
      { name: "CBSE YouTube", desc: "Class 12 Physics, Chemistry, Maths", url: "https://www.youtube.com/channel/UCG7qv69PhtZlwDzB2vTWzKQ" },
      { name: "NCERT Help", desc: "Books, notes, papers, solutions", url: "https://ncerthelp.com" },
      { name: "NROER", desc: "National Repository of Open Educational Resources - 14,000+ files", url: "https://nroer.gov.in" },
    ],
  },
  {
    title: "More Free NCERT Solutions Websites",
    items: [
      { name: "LearnCBSE", desc: "NCERT Solutions Class 9-12", url: "https://www.learncbse.in/ncert-solutions-2" },
      { name: "SelfStudys", desc: "NCERT solutions + notes PDF", url: "https://www.selfstudys.com/books/ncert-solution" },
      { name: "Infinity Learn", desc: "Notes + solutions free PDF", url: "https://infinitylearn.com/ncert-solutions" },
      { name: "Aakash", desc: "NCERT solutions free PDF", url: "https://www.aakash.ac.in/ncert-solutions" },
      { name: "NCRTSolutions.in", desc: "Chapter-wise PDF", url: "https://www.ncrtsolutions.in" },
      { name: "CBSELearning.in", desc: "NCERT solutions 2026-27", url: "https://www.cbselearning.in" },
      { name: "eSaral", desc: "Revision notes + solutions", url: "https://www.esaral.com/cbse/class-12-revision-notes" },
    ],
  },
  {
    title: "Free Revision Notes & Formula Sheets",
    items: [
      { name: "Vedantu", desc: "Class 12 notes - all subjects", url: "https://www.vedantu.com/revision-notes/cbse-class-12-notes" },
      { name: "Vedantu", desc: "Class 11 Physics notes", url: "https://www.vedantu.com/revision-notes/cbse-class-11-physics-notes" },
      { name: "Vidyakul", desc: "Notes + formula sheets for Physics, Chemistry, Biology, Maths", url: "https://vidyakul.com/cbse-class-11-physics-notes" },
      { name: "ToppersCBSE", desc: "Class 11 notes PDF", url: "https://topperscbse.com/cbse-class-11th-notes" },
      { name: "ToppersCBSE", desc: "Class 12 notes PDF", url: "https://topperscbse.com/cbse-class-12th-notes" },
      { name: "BYJU'S", desc: "Class 11 revision notes", url: "https://byjus.com/cbse-notes/class-11-revision-notes" },
    ],
  },
  {
    title: "More Free YouTube Channels",
    items: [
      { name: "Physics Wallah", desc: "All Science - Class 9-12", url: "https://www.youtube.com/@PhysicsWallah" },
      { name: "Magnet Brains", desc: "All subjects, blackboard style", url: "https://www.youtube.com/@MagnetBrains" },
      { name: "ExamFear Education", desc: "Class 10 & 12 all subjects", url: "https://www.youtube.com/@ExamFear" },
      { name: "LearnoHub", desc: "Class 9, 10, 11, 12", url: "https://www.youtube.com/@LearnoHub" },
      { name: "Bodhaguru", desc: "Maths & Science up to Class 10", url: "https://www.youtube.com/@Bodhaguru" },
      { name: "Toppr Study", desc: "Class 10 & 12", url: "https://www.youtube.com/@TopprStudy" },
      { name: "Arvind Academy", desc: "Maths & Science", url: "https://www.youtube.com/@ArvindAcademy" },
      { name: "Learn With Sumit", desc: "SST & English", url: "https://www.youtube.com/@LearnWithSumit" },
      { name: "Accounts Adda", desc: "Class 12 Accountancy", url: "https://www.youtube.com/@Commerceking-accountsadda" },
    ],
  },
  {
    title: "Free Mock Tests & Practice",
    items: [
      { name: "StudiesToday", desc: "Free online mock tests for Class 9-12", url: "https://www.studiestoday.com/online-test/67/cbse.html" },
      { name: "Unacademy", desc: "Free mock tests Class 9", url: "https://unacademy.com/goal/cbse-class-9/SUVLV/test-series" },
      { name: "Unacademy", desc: "Free mock tests Class 10", url: "https://unacademy.com/goal/cbse-class-10/GSZGO/test-series" },
      { name: "Unacademy", desc: "Free mock tests Class 12", url: "https://unacademy.com/goal/cbse-class-12/PLWCX/test-series" },
      { name: "myCBSEguide", desc: "Free MCQ tests - 100+ per subject", url: "https://mycbseguide.com/cbse-online-tests.html" },
      { name: "Oswaal360", desc: "Free mock test Class 10", url: "https://www.oswaal360.com/pages/free-cbse-class-10-online-mock-test-series--practice-paper-sets--sample-papers--for-2025-exam" },
      { name: "Oswaal360", desc: "Free mock test Class 12", url: "https://www.oswaal360.com/pages/free-cbse-class-12-online-mock-test-sample-papers-for-latest-board-exam-preparation" },
    ],
  },
];

const referenceCount = referenceSections.reduce((total, section) => total + section.items.length, 0);

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
  const filteredReferenceCount = filteredReferenceSections.reduce((total, section) => total + section.items.length, 0);
  const ActiveIcon = categories.find(c => c.id === active)?.icon ?? FileText;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a1a6e] px-8 py-12">
        <Badge className="mb-3 bg-white/20 text-white hover:bg-white/20 text-xs px-3 py-1">Resources</Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
          Digital Resources
        </h1>
        <p className="text-blue-200 mt-2 text-sm md:text-base">
          Explore thousands of learning materials at your fingertips
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-60 shrink-0">
          <Card className="border-0 shadow-md rounded-2xl overflow-hidden p-0">
            <CardContent className="p-0">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = active === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActive(cat.id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-left text-sm font-medium transition-colors
                      ${isActive
                        ? "bg-[#1a1a6e] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#1a1a6e]"
                      }`}
                  >
                    <Icon size={15} className={isActive ? "text-blue-300" : "text-gray-400"} />
                    {cat.label}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <main className="flex-1">
          <div className="relative mb-6">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${categories.find(c => c.id === active)?.label ?? "resources"}`}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm text-gray-800 shadow-sm outline-none transition focus:border-[#1a1a6e] focus:ring-2 focus:ring-[#1a1a6e]/10"
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

          {active === "ebooks" ? (
            <EBooks searchQuery={query} />
          ) : active === "websites" ? (
            <UsefulWebsites searchQuery={query} />
          ) : active === "ted" ? (
            <TedDocMovies searchQuery={query} />
          ) : active === "newspapers" ? (
            <ENewspapers searchQuery={query} />
          ) : active === "story" ? (
            <StoryVideos searchQuery={query} />
          ) : active === "biography" ? (
            <Biography />
          ) : active === "magazines" ? (
            <EMagazines searchQuery={query} />
          ) : active === "reference" ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Library size={18} className="text-[#1a1a6e]" />
                </div>
                 <h2 className="text-xl font-extrabold !text-black px-4 py-2 rounded-full">
                  Reference Resources
                </h2>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {filteredReferenceCount} of {referenceCount} links
                </Badge>
              </div>
              <Separator className="mb-6" />
              {filteredReferenceCount > 0 ? (
                <div className="space-y-10">
                {filteredReferenceSections.map((section) => (
                  <section key={section.title}>
                    <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 rounded-full bg-[#1a1a6e] inline-block" />
                      {section.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.items.map((item) => (
                        <a key={`${section.title}-${item.name}-${item.url}`} href={item.url} target="_blank" rel="noopener noreferrer" className="no-underline group">
                          <Card className="border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all rounded-xl h-full">
                            <CardContent className="pt-5 pb-5">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  <Library size={16} className="text-[#1a1a6e]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-[#1a1a6e] transition-colors">{item.name}</p>
                                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                                  <p className="text-xs text-blue-400 mt-2 truncate">{item.url.replace(/https?:\/\//, "")}</p>
                                </div>
                                <ExternalLink size={14} className="text-gray-300 group-hover:text-[#1a1a6e] flex-shrink-0 transition-colors" />
                              </div>
                            </CardContent>
                          </Card>
                        </a>
                      ))}
                    </div>
                  </section>
                ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                  No reference resources found.
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <ActiveIcon size={18} className="text-[#1a1a6e]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {categories.find(c => c.id === active)?.label}
                </h2>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {filteredItems.length} of {items.length} items
                </Badge>
              </div>
              <Separator className="mb-6" />
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item, i) => (
                  <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group rounded-xl">
                    <CardContent className="pt-5 pb-5">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <ActiveIcon size={16} className="text-[#1a1a6e]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm leading-snug">{item}</p>
                          <p className="text-xs text-gray-400 mt-1">Available online</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                  No resources found.
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
