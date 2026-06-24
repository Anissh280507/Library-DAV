import { useState } from "react";
import { ExternalLink, BookOpen, Headphones, FileText, Video, Globe, Music } from "lucide-react";

const tabs = [
  { id: "maharashtra", label: "🏯 Maharashtra Icons" },
  { id: "aryasamaj",   label: "🕉️ Arya Samaj Figures" },
];

const resourceIcons = {
  book:      { icon: BookOpen,   color: "text-blue-600",   bg: "bg-blue-50",   label: "Book" },
  audio:     { icon: Headphones, color: "text-purple-600", bg: "bg-purple-50", label: "Audiobook" },
  ebook:     { icon: FileText,   color: "text-green-600",  bg: "bg-green-50",  label: "Free eBook" },
  video:     { icon: Video,      color: "text-red-600",    bg: "bg-red-50",    label: "Video/Film" },
  wiki:      { icon: Globe,      color: "text-gray-600",   bg: "bg-gray-100",  label: "Wikipedia" },
  podcast:   { icon: Music,      color: "text-pink-600",   bg: "bg-pink-50",   label: "Podcast" },
  playlist:  { icon: Video,      color: "text-orange-600", bg: "bg-orange-50", label: "Playlist" },
  pdf:       { icon: FileText,   color: "text-teal-600",   bg: "bg-teal-50",   label: "Free PDF" },
  website:   { icon: Globe,      color: "text-indigo-600", bg: "bg-indigo-50", label: "Website" },
};

// wsrv.nl is a free CORS-friendly image proxy for hotlink-blocked sources
const wp = (path) => `https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/${path}&w=300&h=300&fit=cover&we`;

const maharashtraPersons = [
  {
    id: "shivaji",
    name: "Chhatrapati Shivaji Maharaj",
    years: "1630–1680",
    title: "Founder of the Maratha Empire",
    emoji: "🏯",
    bio: "Born at Shivneri Fort on 1 March 1630, Shivaji was a visionary warrior-king who built a sovereign Maratha state. A master of guerrilla warfare, naval strategy, and administration, he is the pride of Maharashtra.",
    img: wp("a/a6/Shivaji_Maharaj.jpg"),
    resources: [
      { type: "book",  label: "Shivaji: The Grand Rebel – Dennis Kincaid", url: "https://www.amazon.in/s?k=Shivaji+Grand+Rebel+Dennis+Kincaid" },
      { type: "audio", label: "Shivaji: The Grand Rebel – Audible",        url: "https://www.audible.in/search?keywords=shivaji+grand+rebel" },
      { type: "ebook", label: "Shri Shivbharat (Hindi) – Internet Archive",url: "https://archive.org/search?query=shivbharat" },
      { type: "playlist", label: "Chhatrapati Shivaji Maharaj Docs – YouTube", url: "https://www.youtube.com/results?search_query=chhatrapati+shivaji+maharaj+documentary" },
      { type: "wiki",  label: "Shivaji – Wikipedia",                        url: "https://en.wikipedia.org/wiki/Shivaji" },
    ],
  },
  {
    id: "ambedkar",
    name: "Dr. B. R. Ambedkar",
    years: "1891–1956",
    title: "Father of the Indian Constitution",
    emoji: "⚖️",
    bio: "Born on 14 April 1891, Ambedkar was an Indian jurist, economist, politician, and social reformer. He was Independent India's first law minister and the principal architect of the Constitution of India.",
    img: wp("c/c5/Dr._Bhimrao_Ambedkar.jpg"),
    resources: [
      { type: "book",    label: "Dr. Ambedkar: Life & Mission – Dhananjay Keer", url: "https://www.amazon.in/s?k=Ambedkar+Life+Mission+Keer" },
      { type: "ebook",   label: "Dr Ambedkar: Life and Mission – Internet Archive", url: "https://archive.org/search?query=ambedkar+life+mission" },
      { type: "audio",   label: "Ambedkar Audiobooks – Audible India",       url: "https://www.audible.in/search?keywords=ambedkar" },
      { type: "video",   label: "Dr. Babasaheb Ambedkar (2000) – Film",      url: "https://www.youtube.com/results?search_query=Dr+Babasaheb+Ambedkar+2000+film+Jabbar+Patel" },
      { type: "podcast", label: "Bhimrao Ambedkar Biography – PocketFM",     url: "https://www.pocketfm.com" },
    ],
  },
  {
    id: "savitribai",
    name: "Savitribai Phule",
    years: "1831–1897",
    title: "India's First Female Teacher & Social Reformer",
    emoji: "🎓",
    bio: "Savitribai Phule was a social reformer, educator, and poet from Maharashtra. She is officially acknowledged as India's first female teacher. She founded Mahila Seva Mandali to educate women about child marriage and social issues.",
    img: wp("e/e1/Savitribai_Phule.jpg"),
    resources: [
      { type: "book", label: "Savitribai Phule: The Mother of Modern Feminism", url: "https://www.amazon.in/s?k=Savitribai+Phule+Mother+Modern+Feminism" },
      { type: "video",label: "Savitribai Phule Life Story – YouTube",          url: "https://www.youtube.com/results?search_query=Savitribai+Phule+life+story+documentary" },
      { type: "wiki", label: "Savitribai Phule – Wikipedia",                   url: "https://en.wikipedia.org/wiki/Savitribai_Phule" },
    ],
  },
  {
    id: "tilak",
    name: "Bal Gangadhar Tilak",
    years: "1856–1920",
    title: "Lokmanya — Father of Indian Unrest",
    emoji: "🔥",
    bio: "Bal Gangadhar Tilak was a mathematics teacher, writer, patriot, and freedom activist. He was the driving force behind the Deccan Education Society and was honoured with the title 'Lokmanya' by his supporters.",
    img: wp("e/e5/Bal_Gangadhar_tilak.jpg"),
    resources: [
      { type: "book",  label: "Tilak by Vaibhav Purandare – Amazon",              url: "https://www.amazon.in/s?k=Tilak+Vaibhav+Purandare" },
      { type: "audio", label: "Tilak Audiobook – Audible UK",                     url: "https://www.audible.co.uk/search?keywords=tilak" },
      { type: "ebook", label: "Bal Gangadhar Tilak (1958) – Internet Archive",    url: "https://archive.org/search?query=bal+gangadhar+tilak" },
      { type: "video", label: "Tilak: Life & History Documentary – Prasar Bharati", url: "https://www.youtube.com/results?search_query=Bal+Gangadhar+Tilak+documentary+Prasar+Bharati" },
    ],
  },
  {
    id: "lata",
    name: "Lata Mangeshkar",
    years: "1929–2022",
    title: "The Nightingale of India",
    emoji: "🎵",
    bio: "Lata Mangeshkar, the 'Nightingale of India', was born on 28 September 1929. With a career spanning over 7 decades, she sang in over 36 languages and recorded more than 30,000 songs.",
    img: wp("0/07/Lata_Mangeshkar_in_2019.jpg"),
    resources: [
      { type: "book",  label: "Lata Mangeshkar: In Her Own Voice – Amazon",  url: "https://www.amazon.in/s?k=Lata+Mangeshkar+In+Her+Own+Voice" },
      { type: "video", label: "Lata Mangeshkar Life Story – YouTube",         url: "https://www.youtube.com/results?search_query=Lata+Mangeshkar+life+story+documentary" },
      { type: "wiki",  label: "Lata Mangeshkar – Wikipedia",                  url: "https://en.wikipedia.org/wiki/Lata_Mangeshkar" },
    ],
  },
  {
    id: "phalke",
    name: "Dadasaheb Phalke",
    years: "1870–1944",
    title: "Father of Indian Cinema",
    emoji: "🎬",
    bio: "Dadasaheb Phalke was an Indian producer-director-screenwriter. His debut picture 'Raja Harishchandra' (1913) was the first Indian film to be released. The Dadasaheb Phalke Award was established in 1969 in his honour.",
    img: wp("0/08/DadasahebPhalke.jpg"),
    resources: [
      { type: "book",  label: "Dadasaheb Phalke – Amazon",           url: "https://www.amazon.in/s?k=Dadasaheb+Phalke" },
      { type: "video", label: "Dadasaheb Phalke Documentary",        url: "https://www.youtube.com/results?search_query=Dadasaheb+Phalke+documentary" },
      { type: "wiki",  label: "Dadasaheb Phalke – Wikipedia",        url: "https://en.wikipedia.org/wiki/Dadasaheb_Phalke" },
    ],
  },
  {
    id: "sachin",
    name: "Sachin Tendulkar",
    years: "b. 1973",
    title: "God of Cricket",
    emoji: "🏏",
    bio: "Born on April 24, 1973, Sachin Tendulkar is widely regarded as one of the greatest batsmen in cricket history. He became India's youngest test cricketer at 16 and is the only cricketer with 100 international centuries.",
    img: wp("b/b4/Sachin-Tendulkar.jpg"),
    resources: [
      { type: "book",  label: "Playing It My Way (Autobiography) – Amazon",              url: "https://www.amazon.in/s?k=Playing+It+My+Way+Sachin" },
      { type: "book",  label: "Sachin Tendulkar: A Definitive Biography – Everand",      url: "https://www.everand.com" },
      { type: "video", label: "Sachin: A Billion Dreams (2017) – Documentary Film",      url: "https://www.youtube.com/results?search_query=Sachin+A+Billion+Dreams+2017" },
      { type: "wiki",  label: "Sachin Tendulkar – Wikipedia",                            url: "https://en.wikipedia.org/wiki/Sachin_Tendulkar" },
    ],
  },
  {
    id: "jyotirao",
    name: "Jyotirao Phule",
    years: "1827–1890",
    title: "Pioneer of Social Reform & Women's Education",
    emoji: "📚",
    bio: "Born in Pune, Jyotirao Phule was a revolutionary social activist who fought against caste discrimination and promoted education for women and the oppressed. He founded the Satyashodhak Samaj in 1873.",
    img: wp("f/f1/Jyotirao_phule.jpg"),
    resources: [
      { type: "book",  label: "Mahatma Jyotirao Phule – Amazon",  url: "https://www.amazon.in/s?k=Mahatma+Jyotirao+Phule" },
      { type: "video", label: "Jyotirao Phule Life Story",         url: "https://www.youtube.com/results?search_query=Jyotirao+Phule+life+story" },
      { type: "wiki",  label: "Jyotirao Phule – Wikipedia",        url: "https://en.wikipedia.org/wiki/Jyotirao_Phule" },
    ],
  },
  {
    id: "paluskar",
    name: "Pandit Vishnu Digambar Paluskar",
    years: "1872–1931",
    title: "Father of Modern Hindustani Classical Music",
    emoji: "🎭",
    bio: "Born in Kurundwad, Maharashtra, Paluskar was a blind vocalist who popularized Hindustani classical music across India. He established the Gandharva Mahavidyalaya music schools, making classical music accessible to all.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Vishnu_Digambar_Paluskar.jpg/300px-Vishnu_Digambar_Paluskar.jpg",
    resources: [
      { type: "book",  label: "Vishnu Digambar Paluskar – Amazon Search", url: "https://www.amazon.in/s?k=Vishnu+Digambar+Paluskar" },
      { type: "video", label: "Paluskar Life & Music",                     url: "https://www.youtube.com/results?search_query=Vishnu+Digambar+Paluskar" },
      { type: "wiki",  label: "V. D. Paluskar – Wikipedia",                url: "https://en.wikipedia.org/wiki/Vishnu_Digambar_Paluskar" },
    ],
  },
  {
    id: "bhabha",
    name: "Homi J. Bhabha",
    years: "1909–1966",
    title: "Father of India's Nuclear Programme",
    emoji: "🔬",
    bio: "Born in Mumbai, Dr. Homi Bhabha was a world-class nuclear physicist who founded the Tata Institute of Fundamental Research (TIFR) and the Bhabha Atomic Research Centre (BARC). He was the architect of India's atomic energy program.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Homi_Jehangir_Bhabha.jpg/300px-Homi_Jehangir_Bhabha.jpg",
    resources: [
      { type: "book",  label: "Homi J. Bhabha – Amazon",       url: "https://www.amazon.in/s?k=Homi+Bhabha" },
      { type: "video", label: "Homi Bhabha Documentary",        url: "https://www.youtube.com/results?search_query=Homi+Bhabha+documentary" },
      { type: "wiki",  label: "Homi J. Bhabha – Wikipedia",    url: "https://en.wikipedia.org/wiki/Homi_J._Bhabha" },
    ],
  },
];

const aryasamajPersons = [
  {
    id: "dayanand",
    name: "Swami Dayanand Saraswati",
    years: "1824–1883",
    title: "Founder, Arya Samaj",
    emoji: "🕉️",
    bio: "Swami Dayanand Saraswati founded the Arya Samaj in 1875, a reform movement of the Vedic dharma. He championed education, social reform, and return to Vedic principles through his work Satyarth Prakash.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Swami_Dayananda_Saraswati_portrait.jpg/300px-Swami_Dayananda_Saraswati_portrait.jpg",
    resources: [
      { type: "wiki",    label: "Wikipedia",                                url: "https://en.wikipedia.org/wiki/Dayananda_Saraswati" },
      { type: "website", label: "Britannica",                               url: "https://www.britannica.com/biography/Dayananda-Sarasvati" },
      { type: "video",   label: "Documentary – MDU Rohtak",                url: "https://www.youtube.com/watch?v=t2cgvMawkhA" },
      { type: "video",   label: "Biography – StudyIQ",                     url: "https://www.youtube.com/watch?v=4H0NZAyof2M" },
      { type: "pdf",     label: "Satyarth Prakash (English) – Archive.org",url: "https://archive.org/details/satyarthprakashenglish1882" },
      { type: "pdf",     label: "Arya Samaj Books Collection – Archive.org",url: "https://archive.org/details/aryasamajbook" },
      { type: "website", label: "Arya Samaj E-Library",                    url: "https://elibrary.thearyasamaj.org/" },
    ],
  },
  {
    id: "hansraj",
    name: "Mahatma Hansraj",
    years: "1864–1938",
    title: "Educator & Arya Samaj Stalwart",
    emoji: "🏫",
    bio: "Mahatma Hansraj was a key figure in the Arya Samaj movement and a pioneering educator. He dedicated his life to spreading modern education and is remembered as the founder of DAV educational institutions.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Mahatma_Hansraj.jpg/220px-Mahatma_Hansraj.jpg",
    resources: [
      { type: "wiki",    label: "Wikipedia",                              url: "https://en.wikipedia.org/wiki/Mahatma_Hansraj" },
      { type: "website", label: "Arya Samaj Houston Profile",             url: "https://aryasamajhouston.org/about-us/stalwarts-of-arya-samaj/mahatma-hansraj/" },
      { type: "website", label: "Hansraj College – Historical Perspective",url: "https://www.hansrajcollege.ac.in/about/historicalperspective" },
      { type: "video",   label: "Biography / Inspiring Story – YouTube",  url: "https://www.youtube.com/watch?v=prC1ary7zjw" },
    ],
  },
  {
    id: "vivekananda",
    name: "Swami Vivekananda",
    years: "1863–1902",
    title: "Spiritual Leader & Social Reformer",
    emoji: "🧘",
    bio: "Swami Vivekananda was a key figure in introducing Indian philosophies of Vedanta and Yoga to the Western world. A contemporary of the Arya Samaj movement, he inspired generations with his teachings on universal brotherhood.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Swami_Vivekananda-1893-09-signed.jpg/300px-Swami_Vivekananda-1893-09-signed.jpg",
    resources: [
      { type: "wiki",    label: "Wikipedia",                               url: "https://en.wikipedia.org/wiki/Swami_Vivekananda" },
      { type: "website", label: "Britannica",                              url: "https://www.britannica.com/biography/Vivekananda" },
      { type: "video",   label: "Rare BBC Documentary (1963)",             url: "https://www.youtube.com/watch?v=WrSZz40lsow" },
      { type: "video",   label: "Films Division Documentary (Govt of India)", url: "https://www.youtube.com/watch?v=mwzDKKKOfcE" },
      { type: "video",   label: "Biography – StudyIQ",                    url: "https://www.youtube.com/watch?v=eYwoTbZh7tQ" },
      { type: "playlist",label: "Full Playlist – Life & Teachings",       url: "https://www.youtube.com/playlist?list=PLMHoCLt8JpDqHcQJlDQCCEXRyqWwCdF9W" },
    ],
  },
  {
    id: "lajpatrai",
    name: "Lala Lajpat Rai",
    years: "1865–1928",
    title: "Punjab Kesari — Freedom Fighter",
    emoji: "✊",
    bio: "Lala Lajpat Rai, known as 'Punjab Kesari', was a prominent freedom fighter and Arya Samaj leader. He played a vital role in India's independence movement and is remembered for his protest against the Simon Commission.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Lala_Lajpat_Rai.jpg/300px-Lala_Lajpat_Rai.jpg",
    resources: [
      { type: "wiki",  label: "Wikipedia",                        url: "https://en.wikipedia.org/wiki/Lala_Lajpat_Rai" },
      { type: "ebook", label: "The Arya Samaj – Internet Archive",url: "https://archive.org/details/aryasamajaccount00lajprich" },
      { type: "video", label: "Biography (English) – YouTube",    url: "https://www.youtube.com/watch?v=xpVN1wurUtA" },
      { type: "video", label: "Biography & Freedom Struggle",     url: "https://www.youtube.com/watch?v=PsQTQrB6XLM" },
    ],
  },
  {
    id: "shraddhanand",
    name: "Swami Shraddhanand",
    years: "1856–1926",
    title: "Arya Samaj Social Reformer",
    emoji: "🙏",
    bio: "Swami Shraddhanand was a prominent Arya Samaj leader and social reformer who worked for education, Hindu reconversion, and against caste discrimination. He founded the Gurukul Kangri University.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Swami_Shraddhanand.jpg/300px-Swami_Shraddhanand.jpg",
    resources: [
      { type: "wiki",    label: "Wikipedia",                          url: "https://en.wikipedia.org/wiki/Shraddhanand" },
      { type: "website", label: "The Arya Samaj (Official)",          url: "https://www.thearyasamaj.org/swamishraddhanand_en" },
      { type: "website", label: "Arya Samaj Houston Profile",         url: "https://aryasamajhouston.org/about-us/stalwarts-of-arya-samaj/swami-shraddhanand" },
    ],
  },
  {
    id: "lekhram",
    name: "Pandit Lekh Ram",
    years: "1858–1897",
    title: "Arya Samaj Scholar & Reformer",
    emoji: "📜",
    bio: "Pandit Lekh Ram was a devoted scholar and preacher of the Arya Samaj who contributed significantly to the reform movement and Vedic scholarship in Punjab.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pandit_Lekh_Ram.jpg/300px-Pandit_Lekh_Ram.jpg",
    resources: [
      { type: "wiki",    label: "Wikipedia",                      url: "https://en.wikipedia.org/wiki/Pandit_Lekh_Ram" },
      { type: "website", label: "The Arya Samaj (Official)",      url: "https://www.thearyasamaj.org/panditlekhram_en" },
      { type: "website", label: "Arya Samaj Houston Profile",     url: "https://aryasamajhouston.org/about-us/stalwarts-of-arya-samaj/pandit-lekh-ram/" },
    ],
  },
  {
    id: "gurudatta",
    name: "Pandit Gurudatta Vidyarthi",
    years: "1864–1890",
    title: "Arya Samaj Scholar & Philosopher",
    emoji: "🎓",
    bio: "Pandit Gurudatta Vidyarthi was a brilliant philosopher and Arya Samaj scholar who contributed to Vedic literature and the spread of Arya Samaj ideals despite his short life.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Pandit_Gurudatta_Vidyarthi.jpg/300px-Pandit_Gurudatta_Vidyarthi.jpg",
    resources: [
      { type: "wiki",    label: "Wikipedia",                           url: "https://en.wikipedia.org/wiki/Gurudatta_Vidyarthi" },
      { type: "website", label: "Arya Samaj Houston Profile",          url: "https://aryasamajhouston.org/about-us/stalwarts-of-arya-samaj/pandit-gurudatta-vidyarthi/" },
      { type: "website", label: "Arya Samaj Blog",                     url: "https://blog.thearyasamaj.org/pandit-gurudatta-vidhyarthiji/" },
    ],
  },
];

const aryasamajLinks = [
  { label: "Arya Samaj Houston – All Stalwarts",   url: "https://aryasamajhouston.org/about-us/stalwarts-of-arya-samaj" },
  { label: "The Arya Samaj Official Site",          url: "https://www.thearyasamaj.org" },
  { label: "Arya Samaj E-Library (free books)",    url: "https://elibrary.thearyasamaj.org/" },
  { label: "All Arya Samaj Hindi PDFs – Archive.org", url: "https://archive.org/details/aryasamajbook" },
  { label: "Drishti IAS – 150 Years of Arya Samaj",   url: "https://www.drishtiias.com/daily-updates/daily-news-analysis/150-years-of-arya-samaj" },
];

function PersonCard({ person }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Header */}
      <div className="relative h-40 bg-gradient-to-br from-[#1a1a6e] to-[#1a3adb] overflow-hidden">
        {!imgFailed ? (
          <img
            src={person.img}
            alt={person.name}
            className="w-full h-full object-cover object-top opacity-80"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {person.emoji}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a6e]/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <p className="text-white font-extrabold text-sm leading-tight">{person.name}</p>
          <p className="text-blue-200 text-xs">{person.years}</p>
        </div>
        <span className="absolute top-3 right-3 text-2xl">{person.emoji}</span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs font-bold text-[#1a1a6e]">{person.title}</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-3">{person.bio}</p>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-1.5 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Resources</p>
          {person.resources.map((r, i) => {
            const meta = resourceIcons[r.type] ?? resourceIcons.wiki;
            const Icon = meta.icon;
            return (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                className="no-underline flex items-center gap-2 group/res">
                <div className={`w-6 h-6 rounded-lg ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={11} className={meta.color} />
                </div>
                <span className="text-xs text-gray-600 group-hover/res:text-[#1a1a6e] transition-colors line-clamp-1 leading-snug">
                  {r.label}
                </span>
                <ExternalLink size={10} className="text-gray-300 ml-auto flex-shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Biography() {
  const [active, setActive] = useState("maharashtra");
  const persons = active === "maharashtra" ? maharashtraPersons : aryasamajPersons;

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
              ${active === t.id ? "bg-[#1a1a6e] text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-lg font-bold text-gray-900">{tabs.find(t => t.id === active)?.label}</h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{persons.length} profiles</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {persons.map(p => <PersonCard key={p.id} person={p} />)}
      </div>

      {/* Arya Samaj Hub Links */}
      {active === "aryasamaj" && (
        <div className="mt-10 bg-[#1a1a6e]/5 rounded-2xl border border-[#1a1a6e]/10 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">🏛️ All Stalwarts — One-Stop Hub</h3>
          <div className="flex flex-wrap gap-3">
            {aryasamajLinks.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                className="no-underline flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:text-[#1a1a6e] hover:border-blue-300 transition-all shadow-sm">
                <Globe size={12} className="text-[#1a1a6e]" />
                {l.label}
                <ExternalLink size={10} className="text-gray-300 ml-auto" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
