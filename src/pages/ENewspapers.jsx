import { useState } from "react";
import { ExternalLink } from "lucide-react";

import toiImg       from "../assets/E-Newspaper/Times_Of_India.jpeg";
import htImg        from "../assets/E-Newspaper/Hindustan_Times.jpeg";
import ndtvImg      from "../assets/E-Newspaper/NDTV.png";
import deccanHImg   from "../assets/E-Newspaper/Deccan_Herland.jpeg";
import tribuneImg   from "../assets/E-Newspaper/The Tribute.jpeg";
import midDayImg    from "../assets/E-Newspaper/Mid_Day.jpeg";
import telegraphImg from "../assets/E-Newspaper/The Telegraph.jpeg";
import deccanCImg   from "../assets/E-Newspaper/Deccan Chronicle.jpeg";
import hinduImg     from "../assets/E-Newspaper/The Hindu.jpeg";
import bsImg        from "../assets/E-Newspaper/Business Standard.jpeg";
import btImg        from "../assets/E-Newspaper/business Today.jpeg";
import mintImg      from "../assets/E-Newspaper/The mint.jpeg";
import feImg        from "../assets/E-Newspaper/Financial Express.jpeg";
import bhaskarImg   from "../assets/E-Newspaper/dainik bhaskar.jpeg";
import jagranImg    from "../assets/E-Newspaper/jagran.jpeg";
import amarImg      from "../assets/E-Newspaper/amar ujala.jpeg";
import lokmatImg    from "../assets/E-Newspaper/lokmat.jpeg";
import esakalImg    from "../assets/E-Newspaper/E sakal.jpeg";
import mtImg        from "../assets/E-Newspaper/Maharastra Times.jpeg";
import tarunImg     from "../assets/E-Newspaper/tarun bharat.jpeg";
import prahaarImg   from "../assets/E-Newspaper/prahar.jpeg";
import navshaktiImg from "../assets/E-Newspaper/nava Shakti.jpeg";

const tabs = [
  { id: "english-free",  label: "English (Free)" },
  { id: "english-paid",  label: "English (Paid)" },
  { id: "regional",      label: "Hindi & Regional" },
  { id: "marathi-free",  label: "Marathi ePapers" },
  { id: "marathi-paid",  label: "Marathi (Paid)" },
];

const sections = {
  "english-free": [
    { name: "Times of India",     url: "https://timesofindia.com",    badge: "Free", lang: "English", thumb: toiImg },
    { name: "Hindustan Times",    url: "https://hindustantimes.com",  badge: "Free", lang: "English", thumb: htImg },
    { name: "NDTV News",          url: "https://ndtv.com",            badge: "Free", lang: "English", thumb: ndtvImg },
    { name: "Deccan Herald",      url: "https://deccanherald.com",    badge: "Free", lang: "English", thumb: deccanHImg },
    { name: "The Tribune",        url: "https://tribuneindia.com",    badge: "Free", lang: "English", thumb: tribuneImg },
    { name: "Mid-Day",            url: "https://mid-day.com",         badge: "Free", lang: "English", thumb: midDayImg },
    { name: "The Telegraph",      url: "https://telegraphindia.com",  badge: "Free", lang: "English", thumb: telegraphImg },
    { name: "Deccan Chronicle",   url: "https://deccanchronicle.com", badge: "Free", lang: "English", thumb: deccanCImg },
  ],
  "english-paid": [
    { name: "The Hindu",          url: "https://thehindu.com",          badge: "Freemium", lang: "English", note: "Subscription after free articles", thumb: hinduImg },
    { name: "Business Standard",  url: "https://business-standard.com", badge: "Paid",     lang: "English", note: "Paid subscription",                thumb: bsImg },
    { name: "Mint",               url: "https://livemint.com",          badge: "Paid",     lang: "English", note: "Subscription required",            thumb: mintImg },
    { name: "Financial Express",  url: "https://financialexpress.com",  badge: "Freemium", lang: "English", note: "Freemium",                         thumb: feImg },
    { name: "Business Today",     url: "https://businesstoday.in",      badge: "Paid",     lang: "English", note: "Subscription",                     thumb: btImg },
  ],
  "regional": [
    { name: "Dainik Bhaskar",     url: "https://bhaskar.com",          badge: "Free", lang: "Hindi",     thumb: bhaskarImg },
    { name: "Dainik Jagran",      url: "https://jagran.com",           badge: "Free", lang: "Hindi",     thumb: jagranImg },
    { name: "Amar Ujala",         url: "https://amarujala.com",        badge: "Free", lang: "Hindi",     thumb: amarImg },
    { name: "Maharashtra Times",  url: "https://maharashtratimes.com", badge: "Free", lang: "Marathi",   thumb: mtImg },
    { name: "Esakal",             url: "https://esakal.com",           badge: "Free", lang: "Marathi",   thumb: esakalImg },
    
  ],
  "marathi-free": [
    { name: "Lokmat ePaper",        url: "https://epaper.lokmat.com",          badge: "Free", lang: "Marathi", note: "Mumbai, Pune, Nagpur, Aurangabad",        thumb: lokmatImg },
    { name: "Sakal (Esakal)",       url: "https://epaper.esakal.com",          badge: "Free", lang: "Marathi", note: "Pune, statewide Maharashtra",             thumb: esakalImg },
    { name: "Maharashtra Times",    url: "https://epaper.maharashtratimes.com",badge: "Free", lang: "Marathi", note: "Mumbai, Pune, Nashik",                    thumb: mtImg },
    { name: "Loksatta",             url: "https://epaper.loksatta.com",        badge: "Free", lang: "Marathi", note: "Mumbai, Pune",                            thumb: null },
    { name: "Tarun Bharat",         url: "https://epaper.tarunbharat.com",     badge: "Free", lang: "Marathi", note: "Belgaum, Kolhapur, Konkan, Mumbai, Goa",  thumb: tarunImg },
    { name: "Nagpur Tarun Bharat",  url: "https://epaper.tarunbharat.net",     badge: "Free", lang: "Marathi", note: "Nagpur & Vidarbha",                       thumb: tarunImg },
    { name: "Prahaar",              url: "https://epaper.prahaar.in",          badge: "Free", lang: "Marathi", note: "Mumbai, Nashik, Ratnagiri, Sindhudurg",   thumb: prahaarImg },
    { name: "Navshakti",            url: "https://epaper.navshakti.co.in",     badge: "Free", lang: "Marathi", note: "Mumbai (since 1943)",                     thumb: navshaktiImg },
  ],
  "marathi-paid": [
    { name: "Sakal (full access)",    url: "https://esakal.com",   badge: "Freemium", lang: "Marathi", note: "Some content behind paywall",    thumb: esakalImg },
    { name: "Loksatta (full access)", url: "https://loksatta.com", badge: "Freemium", lang: "Marathi", note: "Indian Express Group; some paid", thumb: null },
  ],
  
};

const badgeColors = {
  Free:      "bg-green-100 text-green-700",
  Freemium:  "bg-yellow-100 text-yellow-700",
  Paid:      "bg-red-100 text-red-700",
};

const langColors = {
  English:   "bg-blue-50 text-blue-600",
  Hindi:     "bg-orange-50 text-orange-600",
  Marathi:   "bg-purple-50 text-purple-600",
  Malayalam: "bg-teal-50 text-teal-600",
  Tamil:     "bg-pink-50 text-pink-600",
  Multi:     "bg-gray-100 text-gray-600",
};

function matchesQuery(values, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
}

function NewspaperThumb({ name, thumb, lang }) {
  const [failed, setFailed] = useState(false);
  const color = langColors[lang] ?? "bg-gray-100 text-gray-600";

  if (!thumb || failed) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${color.split(" ")[0]}`}>
        <span className={`text-2xl font-extrabold ${color.split(" ")[1]}`}>{name[0]}</span>
      </div>
    );
  }
  return (
    <img
      src={thumb}
      alt={name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      onError={() => setFailed(true)}
    />
  );
}

export default function ENewspapers({ searchQuery = "" }) {
  const [active, setActive] = useState("english-free");
  const items = sections[active] ?? [];
  const filteredItems = items.filter((item) =>
    matchesQuery([tabs.find(t => t.id === active)?.label, item.name, item.url, item.badge, item.lang, item.note], searchQuery)
  );

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
              ${active === t.id
                ? "bg-[#1a1a6e] text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-5">
        <h2 className="text-xl font-extrabold !text-black px-4 py-2 rounded-full">
          {tabs.find(t => t.id === active)?.label}
        </h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{filteredItems.length} of {items.length} newspapers</span>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, i) => {
          const domain = item.url.replace(/https?:\/\//, "").split("/")[0];
          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline group"
            >
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all overflow-hidden flex flex-col h-full">
                {/* Thumbnail */}
                <div className="relative h-32 bg-gray-100 overflow-hidden">
                  <NewspaperThumb name={item.name} thumb={item.thumb} lang={item.lang} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className={`absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColors[item.badge] ?? "bg-gray-100 text-gray-500"}`}>
                    {item.badge}
                  </span>
                  <span className={`absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${langColors[item.lang] ?? "bg-gray-100 text-gray-500"}`}>
                    {item.lang}
                  </span>
                </div>
                {/* Info */}
                <div className="p-3 flex items-start gap-2 flex-1">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm group-hover:text-[#1a1a6e] transition-colors leading-snug">{item.name}</p>
                    <p className="text-xs text-blue-400 mt-0.5 truncate">{domain}</p>
                    {item.note && <p className="text-xs text-gray-400 mt-1">{item.note}</p>}
                  </div>
                  <ExternalLink size={13} className="text-gray-300 group-hover:text-[#1a1a6e] flex-shrink-0 mt-0.5 transition-colors" />
                </div>
              </div>
            </a>
          );
        })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No newspapers found.
        </div>
      )}
    </div>
  );
}
