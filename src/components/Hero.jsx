import heroImg from "../assets/hero.png";
import { Separator } from "@/components/ui/separator";

const stats = [
  { value: "1K+", label: "Digital Resources" },
  { value: "25+", label: "Faculty Members" },
  { value: "3k+", label: "Active Users" },
  { value: "10+", label: "Events Yearly" },
];

export default function Hero() {
  return (
    <>
      <section
        className="relative w-full h-[75vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(0,0,0,0.3)" }}
          >
            Welcome to DAV Airoli Virtual Library
          </h1>
          <p
            className="text-lg md:text-xl font-light text-gray-200 max-w-xl"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
           Scroll Less Read More Grow Better
          </p>
          <div className="flex gap-4 mt-2">
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map(({ value, label }, i) => (
            <div key={label} className="flex-1 flex flex-col items-center text-center py-4 md:py-0 px-6">
              <p className="text-3xl font-extrabold text-[#1a1a6e]">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
