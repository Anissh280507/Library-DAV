import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const infoCards = [
  { icon: Mail,   label: "Email",    value: "librarydavpsairoli@gmail.com", href: "mailto:librarydavpsairoli@gmail.com", color: "bg-blue-50 text-blue-600" },
  { icon: Phone,  label: "Phone",    value: "022-47778582",                 href: "tel:02247778582",                     color: "bg-green-50 text-green-600" },
  { icon: MapPin, label: "Location", value: "D.A.V. Public School, Airoli, Plot No.11, Sector-10, Navi Mumbai – 400708", href: "https://maps.google.com/?q=DAV+Public+School+Airoli+Navi+Mumbai", color: "bg-purple-50 text-purple-600" },
  { icon: Clock,  label: "Hours",    value: "Mon–Fri: 9AM – 6PM",                                                        color: "bg-yellow-50 text-yellow-600" },
];

const whyItems = [
  "Get technical support with your account",
  "Request access to specific resources",
  "Propose new features or improvements",
  "Schedule mentorship sessions with faculty",
  "Report issues or provide feedback",
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a3adb] px-8 py-16 text-center">
        <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20 text-xs px-3 py-1">Contact</Badge>
        <h1 className="text-4xl font-extrabold text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}>
          Get in Touch
        </h1>
        <p className="text-blue-200 mt-3 text-base max-w-md mx-auto">
          We're here to help and answer any questions you might have
        </p>
      </div>

      {/* Info cards */}
      <div className="max-w-5xl mx-auto px-6 -mt-6 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {infoCards.map(({ icon: Icon, label, value, href, color }) => (
            <Card key={label} className="shadow-md border-0 rounded-2xl hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center gap-3">
                <div className={`p-3 rounded-2xl ${color.split(" ")[0]}`}>
                  <Icon size={20} className={color.split(" ")[1]} />
                </div>
                <p className="font-bold text-gray-900 text-sm">{label}</p>
                <Separator />
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-gray-600 hover:text-[#1a3adb] transition-colors no-underline leading-relaxed font-medium">
                    {value}
                  </a>
                ) : (
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{value}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Contact Us + Map */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Why Contact Us */}
          <Card className="bg-[#1a3adb] border-0 rounded-2xl shadow-lg">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-xl font-bold text-white mb-6">Why Contact Us?</h2>
              <ul className="flex flex-col gap-4">
                {whyItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white text-sm">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="border-0 shadow-md rounded-2xl overflow-hidden p-0">
            <iframe
              title="DAV Public School Airoli Location"
              src="https://www.google.com/maps?q=DAV+Public+School+Sector+10+Airoli+Navi+Mumbai+Maharashtra+400708&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "340px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
