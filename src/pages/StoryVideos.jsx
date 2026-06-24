import { useState } from "react";
import { ExternalLink, Play, List } from "lucide-react";

function getYTId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}
function getPlaylistId(url) {
  const match = url.match(/list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

const tabs = [
  { id: "moral",       label: "✅ Moral Stories" },
  { id: "spooky",      label: "👻 Spooky / Horror" },
  { id: "comedy",      label: "😂 Comedy / Funny" },
  { id: "adventure",   label: "🗡️ Adventure / Fantasy" },
  { id: "panchatantra",label: "🪔 Panchatantra / Hindi" },
  { id: "playlists",   label: "📚 Playlists" },
];

const categoryColors = {
  moral:        "bg-green-100 text-green-700",
  spooky:       "bg-gray-800 text-gray-100",
  comedy:       "bg-yellow-100 text-yellow-700",
  adventure:    "bg-blue-100 text-blue-700",
  panchatantra: "bg-orange-100 text-orange-700",
  playlists:    "bg-purple-100 text-purple-700",
};

const stories = {
  moral: [
    { title: "English Bed Time Tales – Moral Animated Stories",        url: "https://www.youtube.com/watch?v=iKIG-1nqrKo" },
    { title: "English Kids Stories – Princess, Snow Queen",            url: "https://www.youtube.com/watch?v=YjF07qQKexw" },
    { title: "The Happy Stories – Wolf, Clever Monkey, Chicken Little",url: "https://www.youtube.com/watch?v=i0rQq517hpA" },
    { title: "Kids Hut – Selfish Giant, Thumbelina, Nutcracker",       url: "https://www.youtube.com/watch?v=0YOXt_XgLZc" },
    { title: "Kids Hut – English Stories Compilation",                 url: "https://www.youtube.com/watch?v=lBI8ByusbFE" },
    { title: "Friendly Dragon Saves the Day",                          url: "https://www.youtube.com/watch?v=fAE4p8oi8v8" },
  ],
  spooky: [
    { title: "The Whispering Library",                                 url: "https://www.youtube.com/watch?v=oIRaMtaLI1Q" },
    { title: "Haunted Stories – Tia & Tofu",                          url: "https://www.youtube.com/watch?v=7GUkZDSsVEA" },
    { title: "Haunted Stories for Children – Kids Hut Compilation",   url: "https://www.youtube.com/watch?v=rmnFOBPgwro" },
    { title: "Top 10 Spooky Ghost Stories for Kids",                  url: "https://www.youtube.com/watch?v=gXgx2w2mjoQ" },
    { title: "Spooky Stories – The Forbidden Book",                   url: "https://www.youtube.com/watch?v=_tmWqTLvdiQ" },
    { title: "The Haunted Library – Tia & Tofu",                      url: "https://www.youtube.com/watch?v=0vpuvastYLc" },
    { title: "Top 10 Spooky Haunted Tales",                           url: "https://www.youtube.com/watch?v=EQ7zinaHFOQ" },
  ],
  comedy: [
    { title: "Everyone's AWAKE – Funny Bedtime Story",                url: "https://www.youtube.com/watch?v=ZHV_Xj6MJiY" },
    { title: "I Need My Monster",                                     url: "https://www.youtube.com/watch?v=XDEXt_7uqag" },
    { title: "Mr. Osbert the Funniest Onion",                         url: "https://www.youtube.com/watch?v=F2ctQShDfYA" },
    { title: "The Strange Egg",                                       url: "https://www.youtube.com/watch?v=m17-KkBEFmE" },
    { title: "Smelly Bill Stinks Again",                              url: "https://www.youtube.com/watch?v=avgW6k1HO-E" },
    { title: "The Fly That Forgot Its Name",                          url: "https://www.youtube.com/watch?v=QFVOIXR8soQ" },
  ],
  adventure: [
    { title: "Top 3 Adventure Stories – Aladdin, Sindbad",            url: "https://www.youtube.com/watch?v=VbdyJ3EjUi4" },
    { title: "Top 10 Adventure Stories – Kids Hut",                   url: "https://www.youtube.com/watch?v=l6k3fPZj5eI" },
    { title: "Best 5 Magical Stories – Tia & Tofu",                   url: "https://www.youtube.com/watch?v=3_mzVUVsngI" },
    { title: "Best Children's Classics – Pollyanna, Heidi, Alice, Peter Pan", url: "https://www.youtube.com/watch?v=jjcvbaMHhSU" },
    { title: "Older Adventures Collection (Age 7–12)",                url: "https://www.youtube.com/watch?v=IyDnmR_PrKM" },
    { title: "Kids Adventure Story Collection – Kids Hut Jukebox",   url: "https://www.youtube.com/watch?v=KIA0eBgJv9M" },
  ],
  panchatantra: [
    { title: "Panchtantra – Lion & Mouse, Boy Who Cried Wolf",         url: "https://www.youtube.com/watch?v=k59VV4DwZFc" },
    { title: "Best of Panchatantra in Hindi – MagicBox",              url: "https://www.youtube.com/watch?v=IqBS_mNqKkY" },
    { title: "Panchatantra – Bandar Aur Magarmach",                   url: "https://www.youtube.com/watch?v=YQdTe3uXfSQ" },
    { title: "पंचतंत्र की कहानियाँ – Jungle TV Compilation",          url: "https://www.youtube.com/watch?v=Sv3ts-ARuHc" },
  ],
  playlists: [
    { title: "Kids Bedtime Stories with Morals",                      url: "https://www.youtube.com/playlist?list=PLhuEelKSHsFmMN7aiOI89XnGWspkLC7eY", isPlaylist: true },
    { title: "Hindi Bedtime Stories – Panchatantra & Fairy Tales",    url: "https://www.youtube.com/playlist?list=PLud6PVHs-sTX47jrUqLlJuM0TzDl_0vRs", isPlaylist: true },
    { title: "Adventure Stories for Kids – Storyland Explorers",      url: "https://www.youtube.com/playlist?list=PLMbciU7Edi1r53XxezmSA3TKkj5FAFv41", isPlaylist: true },
  ],
};

function matchesQuery(values, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
}

function VideoCard({ title, url, category, isPlaylist }) {
  const id = isPlaylist ? getPlaylistId(url) : getYTId(url);
  const thumbUrl = isPlaylist
    ? null
    : id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;

  const [qIdx, setQIdx] = useState(0);
  const fallbacks = id && !isPlaylist ? [
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/default.jpg`,
  ] : [];

  const badgeClass = categoryColors[category] ?? "bg-gray-100 text-gray-600";

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline group">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-200 overflow-hidden flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900" style={{ aspectRatio: "16/9" }}>
          {isPlaylist ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-900 to-purple-700">
              <List size={32} className="text-white/70" />
              <span className="text-white/60 text-xs font-medium">Playlist</span>
            </div>
          ) : fallbacks.length > 0 && qIdx < fallbacks.length ? (
            <img
              src={fallbacks[qIdx]}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setQIdx(q => q + 1)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={32} className="text-white/40" />
            </div>
          )}
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Hover play */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
              <Play size={20} className="text-white ml-0.5" fill="white" />
            </div>
          </div>
          {/* Category badge */}
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${badgeClass}`}>
            {tabs.find(t => t.id === category)?.label.replace(/^.{2}\s/, "")}
          </span>
        </div>
        {/* Info */}
        <div className="p-3 flex flex-col gap-1 flex-1">
          <p className="text-xs font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1a1a6e] transition-colors">{title}</p>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-auto pt-2">
            <ExternalLink size={10} />
            {isPlaylist ? "Open Playlist on YouTube" : "Watch on YouTube"}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function StoryVideos({ searchQuery = "" }) {
  const [active, setActive] = useState("moral");
  const items = stories[active] ?? [];
  const filteredItems = items.filter((item) =>
    matchesQuery([tabs.find(t => t.id === active)?.label, item.title, item.url, item.isPlaylist ? "playlist" : "video"], searchQuery)
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
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{filteredItems.length} of {items.length} videos</span>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((v, i) => (
          <VideoCard key={i} title={v.title} url={v.url} category={active} isPlaylist={v.isPlaylist} />
        ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No story videos found.
        </div>
      )}
    </div>
  );
}
