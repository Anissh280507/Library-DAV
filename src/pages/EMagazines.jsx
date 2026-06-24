import { ExternalLink } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    title: "🌍 General Knowledge & Science",
    sites: [
      { name: "National Geographic Kids", url: "https://kids.nationalgeographic.com", desc: "Science, nature, animals & geography for kids",       color: "bg-yellow-100 text-yellow-700" },
      { name: "Science News Explores",    url: "https://www.snexplores.org",          desc: "Science journalism for students",                      color: "bg-blue-100 text-blue-700" },
      { name: "NASA Students",            url: "https://www.nasa.gov/stem/forstudents/k-4/index.html", desc: "Space science resources by NASA", color: "bg-indigo-100 text-indigo-700" },
    ],
  },
  {
    title: "📰 News & Current Affairs",
    sites: [
      { name: "Time for Kids",        url: "https://www.timeforkids.com", desc: "Weekly news magazine for students",                     color: "bg-red-100 text-red-700" },
      { name: "DOGOnews",             url: "https://www.dogonews.com",    desc: "Current events & news articles for students",          color: "bg-green-100 text-green-700" },
      { name: "Newsela (Free Signup)",url: "https://newsela.com",         desc: "News articles at multiple reading levels",             color: "bg-orange-100 text-orange-700" },
    ],
  },
  {
    title: "📖 Reading & Stories",
    sites: [
      { name: "ReadWorks (Free)", url: "https://www.readworks.org", desc: "Free reading comprehension passages & lessons",        color: "bg-purple-100 text-purple-700" },
      { name: "CommonLit (Free)", url: "https://www.commonlit.org", desc: "Free literary texts & reading resources",               color: "bg-teal-100 text-teal-700" },
      { name: "Open Library",    url: "https://openlibrary.org",   desc: "Universal access to all human knowledge — free books", color: "bg-amber-100 text-amber-700" },
    ],
  },
  {
    title: "🔬 STEM & Math",
    sites: [
      { name: "Popular Science",  url: "https://www.popsci.com",              desc: "Latest in science, technology & innovation",          color: "bg-sky-100 text-sky-700" },
      { name: "Maths Careers",    url: "https://www.mathscareers.org.uk",     desc: "Inspiring maths resources & career paths",            color: "bg-lime-100 text-lime-700" },
    ],
  },
  {
    title: "🇮🇳 India-Specific (Free)",
    sites: [
      { name: "StoryWeaver (Pratham Books)", url: "https://storyweaver.org.in",       desc: "Free multilingual stories for children",              color: "bg-orange-100 text-orange-700" },
      { name: "e-Pathshala (NCERT)",         url: "https://epathshala.nic.in",        desc: "NCERT e-books, audio & videos",                       color: "bg-green-100 text-green-700" },
      { name: "NCERT Free Textbooks",        url: "https://ncert.nic.in/textbook.php",desc: "Free PDF of all NCERT books Class 1–12",              color: "bg-blue-100 text-blue-700" },
      { name: "National Digital Library",    url: "https://ndl.iitkgp.ac.in",         desc: "Millions of free books, journals & learning material", color: "bg-indigo-100 text-indigo-700" },
    ],
  },
  {
    title: "🎨 Fun & Creative",
    sites: [
      { name: "Highlights Kids", url: "https://www.highlightskids.com", desc: "Stories, puzzles, games & activities for kids",       color: "bg-pink-100 text-pink-700" },
      { name: "Funbrain",        url: "https://www.funbrain.com",       desc: "Educational games, books & videos for kids",          color: "bg-rose-100 text-rose-700" },
    ],
  },
];

function matchesQuery(values, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
}

function SiteCard({ site }) {
  const initial = site.name.replace(/[^a-zA-Z]/g, "")[0]?.toUpperCase() ?? "?";
  const domain = site.url.replace(/https?:\/\//, "").split("/")[0];

  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer" className="no-underline group">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-4 flex items-start gap-4 h-full">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-base ${site.color}`}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm group-hover:text-[#1a1a6e] transition-colors leading-snug">{site.name}</p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{site.desc}</p>
          <p className="text-xs text-blue-400 mt-1 truncate">{domain}</p>
        </div>
        <ExternalLink size={13} className="text-gray-300 group-hover:text-[#1a1a6e] flex-shrink-0 mt-0.5 transition-colors" />
      </div>
    </a>
  );
}

export default function EMagazines({ searchQuery = "" }) {
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      sites: cat.sites.filter((site) => matchesQuery([cat.title, site.name, site.desc, site.url], searchQuery)),
    }))
    .filter((cat) => cat.sites.length > 0);

  return (
    <div className="space-y-10">
      {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
        <div key={cat.title}>
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-[#1a1a6e] inline-block" />
            {cat.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.sites.map((site, i) => <SiteCard key={i} site={site} />)}
          </div>
        </div>
      )) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No magazines found.
        </div>
      )}
    </div>
  );
}
