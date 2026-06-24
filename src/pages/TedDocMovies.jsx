import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

function getYTId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

const tabs = [
  { id: "ted",   label: "TED Talks" },
  { id: "docs",  label: "Documentaries" },
];

const tedTalks = [
  // 🧠 Mindset & Personal Growth
  { title: "The Power of Believing You Can Improve", speaker: "Carol Dweck", url: "https://www.youtube.com/watch?v=_X0mgOOSpLU", category: "Mindset" },
  { title: "Grit: The Power of Passion and Perseverance", speaker: "Angela Duckworth", url: "https://www.youtube.com/watch?v=H14bBuluwB8", category: "Mindset" },
  { title: "How to Stop Screwing Yourself Over", speaker: "Mel Robbins", url: "https://www.youtube.com/watch?v=Lp7E973zozc", category: "Mindset" },
  { title: "The Puzzle of Motivation", speaker: "Dan Pink", url: "https://www.youtube.com/watch?v=rrkrvAUbU9Y", category: "Mindset" },
  { title: "Why 30 is Not the New 20", speaker: "Meg Jay", url: "https://www.youtube.com/watch?v=vhhgI4tSMwc", category: "Mindset" },
  { title: "Inside the Mind of a Master Procrastinator", speaker: "Tim Urban", url: "https://www.youtube.com/watch?v=arj7oStGLkU", category: "Mindset" },
  { title: "The Philosophy of Stoicism", speaker: "Massimo Pigliucci", url: "https://www.youtube.com/watch?v=R9OCA6UFE-0", category: "Mindset" },

  // 💡 Creativity & Innovation
  { title: "Do Schools Kill Creativity?", speaker: "Sir Ken Robinson", url: "https://www.youtube.com/watch?v=iG9CE55wbtY", category: "Creativity" },
  { title: "Your Elusive Creative Genius", speaker: "Elizabeth Gilbert", url: "https://www.youtube.com/watch?v=86x-u-tz0MA", category: "Creativity" },
  { title: "The Surprising Habits of Original Thinkers", speaker: "Adam Grant", url: "https://www.youtube.com/watch?v=fxbCHn6gE3U", category: "Creativity" },
  { title: "How to Build Your Creative Confidence", speaker: "David Kelley", url: "https://www.youtube.com/watch?v=16p9YRF0l-g", category: "Creativity" },
  { title: "Where Good Ideas Come From", speaker: "Steven Johnson", url: "https://www.youtube.com/watch?v=0af00UcTO-c", category: "Creativity" },

  // 🗣️ Communication & Leadership
  { title: "How to Speak So That People Want to Listen", speaker: "Julian Treasure", url: "https://www.youtube.com/watch?v=eIho2S0ZahI", category: "Leadership" },
  { title: "Start With Why", speaker: "Simon Sinek", url: "https://www.youtube.com/watch?v=u4ZoJKF_VuA", category: "Leadership" },
  { title: "Everyday Leadership", speaker: "Drew Dudley", url: "https://www.youtube.com/watch?v=uAy6EawKKME", category: "Leadership" },
  { title: "The Power of Introverts", speaker: "Susan Cain", url: "https://www.youtube.com/watch?v=c0KYU2j0TM4", category: "Leadership" },
  { title: "10 Ways to Have a Better Conversation", speaker: "Celeste Headlee", url: "https://www.youtube.com/watch?v=R1vskiVDwl4", category: "Leadership" },
  { title: "How to Sound Smart in Your TEDx Talk", speaker: "Will Stephen", url: "https://www.youtube.com/watch?v=8S0FDjFBj8o", category: "Leadership" },

  // 😊 Happiness & Mental Health
  { title: "The Happy Secret to Better Work", speaker: "Shawn Achor", url: "https://www.youtube.com/watch?v=GXy__kBVq1M", category: "Happiness" },
  { title: "The Surprising Science of Happiness", speaker: "Dan Gilbert", url: "https://www.youtube.com/watch?v=4q1dgn_C0AU", category: "Happiness" },
  { title: "How to Make Stress Your Friend", speaker: "Kelly McGonigal", url: "https://www.youtube.com/watch?v=RcGyVTAoXEU", category: "Happiness" },
  { title: "The Power of Vulnerability", speaker: "Brené Brown", url: "https://www.youtube.com/watch?v=iCvmsMzlF7o", category: "Happiness" },
  { title: "What Makes a Good Life?", speaker: "Robert Waldinger", url: "https://www.youtube.com/watch?v=8KkKuTCFvzI", category: "Happiness" },

  // 🎯 Success & Career
  { title: "How Great Leaders Inspire Action", speaker: "Simon Sinek", url: "https://www.youtube.com/watch?v=qp0HIF3SfI4", category: "Success" },
 // { title: "Success, Failure and the Drive to Keep Creating", speaker: "Elizabeth Gilbert", url: "https://www.youtube.com/watch?v=GHKkjkGnR5c", category: "Success" },
  { title: "Why You Will Fail to Have a Great Career", speaker: "Larry Smith", url: "https://www.youtube.com/watch?v=iKHTawgyKWQ", category: "Success" },
  { title: "8 Secrets of Success", speaker: "Richard St. John", url: "https://www.youtube.com/watch?v=Y6bbMQXQ180", category: "Success" },
 // { title: "The Career Advice You Probably Didn't Get", speaker: "Susan Colantuono", url: "https://www.youtube.com/watch?v=eLzUb4rGFo4", category: "Success" },
  { title: "How to Find Work You Love", speaker: "Scott Dinsmore", url: "https://www.youtube.com/watch?v=jpe-LKn-4gM", category: "Success" },
  { title: "How to Get Your Ideas to Spread", speaker: "Seth Godin", url: "https://www.youtube.com/watch?v=xBIVlM435Zg", category: "Success" },

  // 🧬 Science & Technology
  { title: "The Next Web", speaker: "Tim Berners-Lee", url: "https://www.youtube.com/watch?v=OM6XIICm_qo", category: "Science" },
  { title: "How AI Could Compose a Personalized Soundtrack", speaker: "Pierre Barreau", url: "https://www.youtube.com/watch?v=wYb3Wimn01s", category: "Science" },
  { title: "The Mathematics of Love", speaker: "Hannah Fry", url: "https://www.youtube.com/watch?v=yFVXsjVdvmY", category: "Science" },
  { title: "Feats of Memory Anyone Can Do", speaker: "Joshua Foer", url: "https://www.youtube.com/watch?v=U6PoUg7jXsA", category: "Science" },
  //{ title: "Mysteries of Vernacular", speaker: "Jessica Oreck", url: "https://www.youtube.com/watch?v=EECFBRFiCnM", category: "Science" },
  //{ title: "The Brain in Your Gut", speaker: "Hana Kahleova", url: "https://www.youtube.com/watch?v=5KQHpHvMhKk", category: "Science" },

  // 🌍 Society & Big Ideas
  { title: "The Danger of a Single Story", speaker: "Chimamanda Ngozi Adichie", url: "https://www.youtube.com/watch?v=D9Ihs241zeg", category: "Society" },
  //{ title: "Looks Aren't Everything", speaker: "Cameron Russell", url: "https://www.youtube.com/watch?v=KM4Xe6Dlp0w", category: "Society" },
  { title: "The Paradox of Choice", speaker: "Barry Schwartz", url: "https://www.youtube.com/watch?v=VO6XEQIsCoM", category: "Society" },
  //{ title: "How to Fix a Broken School? Lead Fearlessly, Love Hard", speaker: "Linda Cliatt-Wayman", url: "https://www.youtube.com/watch?v=Xe2nlk_kcxE", category: "Society" },
  { title: "We Should All Be Feminists", speaker: "Chimamanda Ngozi Adichie", url: "https://www.youtube.com/watch?v=hg3umXU_qWc", category: "Society" },
  { title: "Why Privacy Matters", speaker: "Glenn Greenwald", url: "https://www.youtube.com/watch?v=pcSlowAhvUk", category: "Society" },

  // 📚 Learning & Education
  //{ title: "How to Learn Faster – Elon Musk's Technique", speaker: "TEDx", url: "https://www.youtube.com/watch?v=nHEDxG0Ks5A", category: "Education" },
  { title: "The First 20 Hours – How to Learn Anything", speaker: "Josh Kaufman", url: "https://www.youtube.com/watch?v=5MgBikgcWnY", category: "Education" },
  { title: "Let's Use Video to Reinvent Education", speaker: "Sal Khan", url: "https://www.youtube.com/watch?v=nTFEUsudhfs", category: "Education" },
  //{ title: "What Do Babies Think?", speaker: "Alison Gopnik", url: "https://www.youtube.com/watch?v=TiKOGdCHFCk", category: "Education" },
  { title: "Try Something New for 30 Days", speaker: "Matt Cutts", url: "https://www.youtube.com/watch?v=UNP03fDSj1U", category: "Education" },

  // 💪 Resilience & Courage
  { title: "My Philosophy for a Happy Life", speaker: "Sam Berns", url: "https://www.youtube.com/watch?v=36m1o-tM05g", category: "Resilience" },
  { title: "The Power of Yet", speaker: "Carol Dweck", url: "https://www.youtube.com/watch?v=J-swZaKN2Ic", category: "Resilience" },
  { title: "What I Learned from 100 Days of Rejection", speaker: "Jia Jiang", url: "https://www.youtube.com/watch?v=-vZXgApsPCQ", category: "Resilience" },
  
  { title: "How Great Leaders Inspire Action",              speaker: "Simon Sinek",            url: "https://www.youtube.com/watch?v=qp0HIF3SfI4",  category: "Leadership" },
  { title: "Grit: Power of Passion & Perseverance",         speaker: "Angela Lee Duckworth",   url: "https://www.youtube.com/watch?v=H14bBuluwB8",  category: "Mindset" },
  { title: "How to Learn? From Mistakes",                   speaker: "Diana Laufenberg",       url: "https://www.youtube.com/watch?v=up4hFj-jcTY",  category: "Education" },
  { title: "Really Achieving Your Childhood Dreams",        speaker: "Randy Pausch",           url: "https://www.youtube.com/watch?v=ji5_MqicxSo",  category: "Motivation" },
  { title: "Why We All Need Emotional First Aid",           speaker: "Guy Winch",              url: "https://www.youtube.com/watch?v=F2hc2FLOdhI",  category: "Mindset" },
  { title: "The Puzzle of Motivation",                      speaker: "Dan Pink",               url: "https://www.youtube.com/watch?v=rrkrvAUbU9Y",  category: "Motivation" },
  { title: "Let's Teach for Mastery Not Test Scores",       speaker: "Sal Khan",               url: "https://www.youtube.com/watch?v=bCvYyYrJ_C8",  category: "Education" },
  { title: "How I Built a Windmill",                        speaker: "William Kamkwamba",      url: "https://www.youtube.com/watch?v=G8yKFVPOD6o",  category: "Innovation" },
  { title: "The Power of a Teacher",                        speaker: "Adam Saenz",             url: "https://www.youtube.com/watch?v=AyogyD7vXbw",  category: "Education" },
  { title: "The Power of Believing You Can Improve",        speaker: "Carol Dweck",            url: "https://www.youtube.com/watch?v=_X0mgOOSpLU",  category: "Mindset" },
  { title: "The Happy Secret to Better Work",               speaker: "Shawn Achor",            url: "https://www.youtube.com/watch?v=fLJsdqxnZb0",  category: "Mindset" },
  { title: "Inside the Mind of a Master Procrastinator",    speaker: "Tim Urban",              url: "https://www.youtube.com/watch?v=arj7oStGLkU",  category: "Mindset" },
  { title: "Do Schools Kill Creativity?",                   speaker: "Ken Robinson",           url: "https://www.youtube.com/watch?v=iG9CE55wbtY",  category: "Education" },
  { title: "Let's Use Video to Reinvent Education",         speaker: "Sal Khan",               url: "https://www.youtube.com/watch?v=nTFEUsudhfs",  category: "Education" },
  { title: "Every Kid Needs a Champion",                    speaker: "Rita Pierson",           url: "https://www.youtube.com/watch?v=SFnMTHhKdkw",  category: "Education" },
  { title: "How to Stop Screwing Yourself Over",            speaker: "Mel Robbins",            url: "https://www.youtube.com/watch?v=Lp7E973zozc",  category: "Motivation" },
  //{ title: "Why We Do What We Do",                          speaker: "Tony Robbins",           url: "https://www.youtube.com/watch?v=Cpc-t-Uwv1I",  category: "Motivation" },
  //{ title: "Why Most People Never Feel Successful",         speaker: "Vishen Lakhiani",        url: "https://www.youtube.com/watch?v=mvMbBOlLkMs",  category: "Success" },
  { title: "You Can Grow New Brain Cells",                  speaker: "Sandrine Thuret",        url: "https://www.youtube.com/watch?v=B_tjKYvEziI",  category: "Science" },
  { title: "After Watching This Your Brain Will Not Be the Same", speaker: "Lara Boyd",       url: "https://www.youtube.com/watch?v=LNHBMFCzznE",  category: "Science" },
  { title: "Learning How to Learn",                         speaker: "Barbara Oakley",         url: "https://www.youtube.com/watch?v=O96fE1E-rf8",  category: "Science" },
  { title: "How to Live Before You Die (Stanford)",         speaker: "Steve Jobs",             url: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",  category: "Motivation" },
  { title: "The Power of Vulnerability",                    speaker: "Brené Brown",            url: "https://www.youtube.com/watch?v=iCvmsMzlF7o",  category: "Mindset" },
  { title: "Your Elusive Creative Genius",                  speaker: "Elizabeth Gilbert",      url: "https://www.youtube.com/watch?v=86x-u-tz0MA",  category: "Creativity" },
];

const movies = [
  { title: "Taare Zameen Par",  subtitle: "Hindi",   category: "Hindi",   url: "https://www.youtube.com/watch?v=D0EpxQXLTZI" },
  { title: "I Am Kalam",        subtitle: "Hindi",   category: "Hindi",   url: "https://www.youtube.com/watch?v=mUHY-Z_wJsk" },
  { title: "Bhaag Milkha Bhaag",subtitle: "Hindi",   category: "Hindi",   url: "https://www.youtube.com/watch?v=WwS1MhgKsVU" },
  { title: "Hawaa Hawaai",      subtitle: "Hindi",   category: "Hindi",   url: "https://www.youtube.com/watch?v=4I6KAZghy3U" },
  { title: "Dead Poets Society",subtitle: "English", category: "English", url: "https://tubitv.com/movies/720844/dead-poets-society" },
  { title: "Forrest Gump",      subtitle: "English", category: "English", url: "https://tubitv.com/movies/568500/forrest-gump" },
  { title: "Indu",              subtitle: "Marathi", category: "Marathi", url: "https://www.youtube.com/watch?v=0k9OqIrrOgE" },
  { title: "Palashichi PT",     subtitle: "Marathi", category: "Marathi", url: "https://www.youtube.com/watch?v=QnEMM8bN1Mw" },
  { title: "Short Films Playlist", subtitle: "Marathi", category: "Marathi", url: "https://www.youtube.com/playlist?list=PLoIbxxoLFnC5pg9u9fsOw-I6hY-ON5DUe" },
];

const documentaries = [
  
  { title: "Solar System 101",                                    category: "Space", url: "https://www.youtube.com/watch?v=libKVRa01L8" },
  { title: "Mars Martian Mega Rover — BBC/Nat Geo",               category: "Space", url: "https://www.youtube.com/watch?v=Err8dxndGg8" },
  { title: "Apollo 11 Moon Mission — Full Documentary",           category: "Space", url: "https://www.youtube.com/watch?v=YKCjBSIGB8k" },
  { title: "One Giant Leap for Mankind — Apollo",                 category: "Space", url: "https://www.youtube.com/watch?v=ziWQFJB-Rz4" },
  { title: "MARS EXPEDITION — NASA Documentary (Hindi)",          category: "Space", url: "https://www.youtube.com/watch?v=nqNDTvyEz_M" },
  { title: "NASA Documentary — Hubble Space Telescope",           category: "Space", url: "https://www.youtube.com/watch?v=SLmWY_ycFUA" },
  { title: "Apollo 17 — Last Men on the Moon",                    category: "Space", url: "https://www.youtube.com/watch?v=-idr3GEYf1Q" },
  { title: "Space Shuttle Final Countdown — NASA History",        category: "Space", url: "https://www.youtube.com/watch?v=3Co8Z8BQgWc" },
  { title: "BBC Super Structures — National Geographic",          category: "Space", url: "https://www.youtube.com/watch?v=D9kTzSN-dbg" },
  { title: "National Geographic — Underwater Marine Life",        category: "Nature", url: "https://www.youtube.com/watch?v=TGtGfydHKi0" },
  { title: "Super Pride — Awesome Animals",                       category: "Nature", url: "https://www.youtube.com/watch?v=EhooOuUqnY0" },
  { title: "Sharks 101 — National Geographic",                    category: "Nature", url: "https://www.youtube.com/watch?v=4HGNqFdaD34" },
  { title: "How Do Honeybees Get Their Jobs — Nat Geo",           category: "Nature", url: "https://www.youtube.com/watch?v=A8iRp8h9LVU" },
  { title: "100 Greatest Discoveries — Discovery Channel",        category: "Nature", url: "https://www.youtube.com/watch?v=1I8ylbyuTss" },
  { title: "Mahatma Gandhi Biography — Full Documentary",         category: "History", url: "https://www.youtube.com/watch?v=54IOHIYap7c" },
  { title: "Mahatma Gandhi — Dying for Freedom",                  category: "History", url: "https://www.youtube.com/watch?v=ztZmjBfENMY" },
  { title: "Genghis Khan — Rise of Mongols",                      category: "History", url: "https://www.youtube.com/watch?v=nqNDTvyEz_M" },
  { title: "World War 2 Largest Submarine — History Channel",     category: "History", url: "https://www.youtube.com/watch?v=SOZadUVU2BY" },
  { title: "The Great Plague Black Death — Full Documentary",     category: "History", url: "https://www.youtube.com/watch?v=HYNB4sAxemk" },
  { title: "Origins of the Universe — National Geographic",       category: "History", url: "https://www.youtube.com/watch?v=MYnMXEcHI7U" },
  { title: "Great Wall of China — National Geographic 2020",      category: "History", url: "https://www.youtube.com/watch?v=eXa2c9-8788" },
  { title: "Abraham Lincoln Biography — National Geographic",     category: "History", url: "https://www.youtube.com/watch?v=pqVn3fTYCj4" },
  { title: "Biography of Napoleon — Discovery History Channel",   category: "History", url: "https://www.youtube.com/watch?v=pqVn3fTYCj4" },
  { title: "The Extraordinary Genius of Albert Einstein",         category: "People", url: "https://www.youtube.com/watch?v=lyAH3u6sDM8" },
  { title: "Meet the Kids Who Think for Themselves — BBC",        category: "People", url: "https://www.youtube.com/watch?v=E00731OeWCA" },
];

const categoryColors = {
  Leadership: "bg-blue-100 text-blue-700",
  Mindset:    "bg-purple-100 text-purple-700",
  Education:  "bg-green-100 text-green-700",
  Motivation: "bg-orange-100 text-orange-700",
  Innovation: "bg-teal-100 text-teal-700",
  Science:    "bg-sky-100 text-sky-700",
  Success:    "bg-yellow-100 text-yellow-700",
  Creativity: "bg-pink-100 text-pink-700",
  Hindi:      "bg-orange-100 text-orange-700",
  English:    "bg-blue-100 text-blue-700",
  Marathi:    "bg-purple-100 text-purple-700",
  Space:      "bg-indigo-100 text-indigo-700",
  Nature:     "bg-emerald-100 text-emerald-700",
  History:    "bg-amber-100 text-amber-700",
  People:     "bg-rose-100 text-rose-700",
};

function getWatchLabel(url) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "Watch on YouTube";
  if (url.includes("tubitv.com")) return "Watch on Tubi";
  if (url.includes("zee5.com")) return "Watch on ZEE5";
  if (url.includes("netflix.com")) return "Open on Netflix";
  return "Open link";
}

function matchesQuery(values, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
}

function VideoCard({ title, subtitle, url, category }) {
  const id = getYTId(url);
  const watchLabel = getWatchLabel(url);
  const qualities = id ? [
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/default.jpg`,
  ] : [];
  const [qIdx, setQIdx] = useState(0);
  const hasImage = qualities.length > 0 && qIdx < qualities.length;
  const badgeClass = categoryColors[category] ?? "bg-gray-100 text-gray-600";

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline group">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-200 overflow-hidden flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative bg-linear-to-br from-gray-800 to-gray-900" style={{ aspectRatio: "16/9" }}>
          {hasImage && (
            <img
              src={qualities[qIdx]}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setQIdx(q => q + 1)}
            />
          )}
          {!hasImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-red-600/80 flex items-center justify-center">
                <Play size={22} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-white/50 text-xs">{watchLabel.replace("Watch on ", "").replace("Open on ", "")}</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          {/* Hover play */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
              <Play size={24} className="text-white ml-1" fill="white" />
            </div>
          </div>
          {/* Category badge */}
          {category && (
            <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeClass} shadow-sm`}>
              {category}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1 flex-1">
          <p className="text-xs font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1a1a6e] transition-colors">{title}</p>
          {subtitle && <p className="text-[11px] text-blue-500 font-semibold">{subtitle}</p>}
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-auto pt-2">
            <ExternalLink size={10} />
            {watchLabel}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function TedDocMovies({ searchQuery = "" }) {
  const [active, setActive] = useState("ted");
  const filteredTedTalks = tedTalks.filter((item) =>
    matchesQuery(["TED Talks", item.title, item.speaker, item.category, item.url], searchQuery)
  );
  const filteredMovies = movies.filter((item) =>
    matchesQuery(["Movies", item.title, item.subtitle, item.category, item.url], searchQuery)
  );
  const filteredDocumentaries = documentaries.filter((item) =>
    matchesQuery(["Documentaries", item.title, item.category, item.url], searchQuery)
  );

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
              ${active === t.id
                ? "bg-[#1a1a6e] text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "ted" && (
        <>
         <h2 className="text-xl font-extrabold text-black! px-4 py-2 rounded-full">TED Talks <span className="text-sm text-gray-400 font-normal">— {tedTalks.length} videos</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTedTalks.map((v, i) => <VideoCard key={i} title={v.title} subtitle={v.speaker} url={v.url} category={v.category} />)}
          </div>
        </>
      )}

      {active === "movies" && (
        <>
         <h2 className="text-xl font-extrabold text-black! px-4 py-2 rounded-full">Movies <span className="text-sm text-gray-400 font-normal">— {movies.length} films</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMovies.map((v, i) => <VideoCard key={i} title={v.title} subtitle={v.subtitle} url={v.url} category={v.category} />)}
          </div>
        </>
      )}

      {active === "docs" && (
        <>
          <h2 className="text-xl font-extrabold text-black! px-4 py-2 rounded-full">Documentaries <span className="text-sm text-gray-400 font-normal">— {documentaries.length} docs</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocumentaries.map((v, i) => <VideoCard key={i} title={v.title} url={v.url} category={v.category} />)}
          </div>
        </>
      )}
    </div>
  );
}
