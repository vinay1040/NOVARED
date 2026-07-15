import { Link } from "react-router-dom";
import { Users, Heart, Building2, User, HeartPulse } from "lucide-react";
import Navbar from "../components/Navbar";

const stats = [
  { label: "Total Donors", value: "24.8k", icon: Users },
  { label: "Lives Saved", value: "72.1k", icon: Heart },
  { label: "Partner Banks", value: "115", icon: Building2 },
];

const urgentRequests = [
  { id: 1, bloodType: "O-", hospital: "City General Hospital", info: "Emergency Trauma Ward • 2.4 miles away", critical: true },
  { id: 2, bloodType: "B+", hospital: "St. Jude Medical Center", info: "Scheduled Surgeries • 5.1 miles away", critical: false },
  { id: 3, bloodType: "AB-", hospital: "North Star Children's", info: "Pediatric Unit • 8.0 miles away", critical: false },
];

const supplyStatus = [
  { type: "A+", level: "stable" },
  { type: "O-", level: "critical" },
  { type: "B+", level: "stable" },
  { type: "AB+", level: "moderate" },
  { type: "B-", level: "low" },
];

const levelColor = {
  stable: "text-green-700 border-green-200",
  moderate: "text-orange-600 border-orange-200",
  low: "text-orange-600 border-orange-200",
  critical: "text-red-700 border-red-300",
};

function Dashboard() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <section className="bg-neutral-900 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-lg">
            <span className="text-xs font-semibold tracking-wide text-red-400 bg-red-950 px-3 py-1 rounded-full">
              LIVE NETWORK STATUS
            </span>
            <h1 className="text-white text-3xl md:text-4xl font-bold mt-4 leading-tight">
              Every drop counts towards a life saved.
            </h1>
            <p className="text-stone-400 mt-3">
              Join the BloodNet network today. Whether you're here to give or in need — we connect you fast.
            </p>

            {/* Donor / Patient CTA buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/login?role=donor"
                className="flex items-center gap-2 bg-white text-red-800 font-semibold px-5 py-2.5 rounded-full
                           transition-all duration-200 hover:scale-[1.04] hover:shadow-lg"
              >
                <User size={18} /> I'm a Donor
              </Link>
              <Link
                to="/login?role=patient"
                className="flex items-center gap-2 bg-red-800 text-white font-semibold px-5 py-2.5 rounded-full
                           transition-all duration-200 hover:scale-[1.04] hover:shadow-lg hover:bg-red-700"
              >
                <HeartPulse size={18} /> I'm a Patient
              </Link>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-2xl p-6 w-full md:w-64">
            <p className="text-white text-3xl font-bold">1,402</p>
            <p className="text-stone-400 text-xs uppercase tracking-wide mt-1">
              Units needed today
            </p>
            <div className="w-full bg-neutral-700 h-1.5 rounded-full mt-4">
              <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-stone-400 text-xs mt-2">65% of daily target reached</p>
          </div>
        </section>

        {/* Stat cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 flex items-center justify-between border border-stone-200
                         transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:border-red-200 cursor-pointer"
            >
              <div>
                <p className="text-xs uppercase text-stone-500 tracking-wide">{label}</p>
                <p className="text-2xl font-bold text-stone-900 mt-1">{value}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-xl">
                <Icon className="text-red-800" size={22} />
              </div>
            </div>
          ))}
        </section>

        {/* Urgent Requests + Supply Inventory */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-stone-900">Urgent Requests</h2>
              <a href="#" className="text-sm text-red-800 font-medium hover:underline">View All</a>
            </div>
            <div className="space-y-3">
              {urgentRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between border border-stone-200
                             transition-all duration-200 hover:shadow-md hover:border-red-200"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border ${req.critical ? "bg-red-50 text-red-800 border-red-200" : "bg-stone-50 text-stone-700 border-stone-200"}`}>
                      {req.bloodType}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{req.hospital}</p>
                      <p className="text-xs text-stone-500">{req.info}</p>
                      {req.critical && (
                        <span className="text-xs text-red-700 font-semibold">CRITICAL SUPPLY</span>
                      )}
                    </div>
                  </div>
                  <button className="bg-red-800 text-white text-sm font-semibold px-4 py-2 rounded-full
                                     transition-all duration-200 hover:bg-red-900 hover:scale-105">
                    Respond
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-stone-900 mb-3">Supply Inventory Status</h2>
            <div className="grid grid-cols-3 gap-3">
              {supplyStatus.map(({ type, level }) => (
                <div
                  key={type}
                  className={`bg-white rounded-xl p-3 text-center border transition-all duration-200 hover:scale-105 hover:shadow-md ${levelColor[level]}`}
                >
                  <p className="font-bold text-stone-900">{type}</p>
                  <p className={`text-[10px] uppercase font-semibold mt-1 ${levelColor[level].split(" ")[0]}`}>
                    {level}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;