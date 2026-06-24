import { BookOpen, Clock, AlertTriangle, RefreshCw, BookMarked, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const policies = [
  {
    icon: BookOpen,
    title: "Borrowing Privileges",
    color: "bg-blue-50 text-blue-700",
    points: [
      "Students may use the library during their library periods, recess, and after school.",
      "Library access in other periods requires written permission from the subject teacher.",
    ],
  },
  {
    icon: Clock,
    title: "Loan Periods",
    color: "bg-purple-50 text-purple-700",
    points: [
      "Class VI–VIII students can issue one book at a time for one week.",
      "General books are issued for seven days.",
      "Overnight / Short-term issue for competitive books, sample papers, essays & periodicals.",
      "Faculty and staff may issue books for up to 3 months.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Lost & Damaged Books",
    color: "bg-red-50 text-red-600",
    points: [
      "Check books at the time of issue and report any existing damage immediately.",
      "In case of loss or damage, the student must pay the cost of the book.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Renewals",
    color: "bg-green-50 text-green-700",
    points: [
      "The book must be present at the time of renewal.",
      "Books may be renewed only twice.",
      "No renewal if another member has reserved the same book.",
      "Library Clearance required by January/February each session.",
    ],
  },
  {
    icon: BookMarked,
    title: "Reference Materials",
    color: "bg-yellow-50 text-yellow-700",
    points: [
      "Encyclopedias, dictionaries & reference materials are for in-library use only and cannot be checked out.",
    ],
  },
  {
    icon: FileText,
    title: "Policy Review",
    color: "bg-gray-100 text-gray-600",
    points: [
      "The circulation policy is reviewed annually and updated as needed.",
    ],
  },
];

export default function CirculationPolicy() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-blue-100 text-[#1a1a6e] hover:bg-blue-100 text-xs font-semibold px-3 py-1">
            Library Guidelines
          </Badge>
          <h2 className="text-3xl font-extrabold black-900 mt-2">Library Circulation Policy</h2>
          <Separator className="w-16 mx-auto mt-4 bg-[#1a1a6e] h-0.5" />
          <p className="text-black-500 mt-4 text-sm max-w-l mx-auto">
            Rules and guidelines for borrowing, returning, and using library resources at DAV Public School, Airoli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {policies.map(({ icon: Icon, title, color, points }) => (
            <Card key={title} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base font-bold text-gray-900">
                  <div className={`p-2 rounded-xl ${color.split(" ")[0]}`}>
                    <Icon size={17} className={color.split(" ")[1]} />
                  </div>
                  {title}
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <ul className="flex flex-col gap-2.5">
                  {points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1a1a6e] flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
