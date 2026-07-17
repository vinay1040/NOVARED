import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Droplets, 
  Users, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Clock
} from "lucide-react";

// Local Status Color Theme System matching your design palette
const inventoryBadgeStyles = {
  Full: "bg-green/10 text-green border-green/20",
  Moderate: "bg-amber/15 text-[#8A5A15] border-amber/20",
  Low: "bg-red/10 text-red-deep border-red/20",
  Empty: "bg-red text-white border-red/20 animate-pulse",
};

function BloodBankDashboard() {
  // --- HARDCODED STATE PLACEHOLDERS (Ready for Flask API wiring later) ---
  
  // 1. Inventory Panel State
  const [inventory, setInventory] = useState([
    { type: "O+", status: "Full" },
    { type: "O-", status: "Low" },
    { type: "A+", status: "Moderate" },
    { type: "A-", status: "Empty" },
    { type: "B+", status: "Full" },
    { type: "B-", status: "Low" },
    { type: "AB+", status: "Moderate" },
    { type: "AB-", status: "Empty" },
  ]);

  // 2. Patient Demands Feed State
  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: "REQ-9041",
      hospital: "MDM Government Hospital",
      location: "Jodhpur, Rajasthan · Trauma ICU",
      bloodType: "O-",
      units: "6 Units",
      time: "22 min ago",
      level: "critical",
      chip: "bg-red",
      status: "Pending",
      donorsAccepted: ["Giriraj Suthar", "Amit Kumar"] // Community response list
    },
    {
      id: "REQ-9042",
      hospital: "AIIMS Jodhpur",
      location: "Basni · Oncology Ward",
      bloodType: "B+",
      units: "3 Units",
      time: "3 hrs ago",
      level: "high",
      chip: "bg-maroon",
      status: "Pending",
      donorsAccepted: [] // No donors matched yet
    }
  ]);

  // --- INTERACTION LOGIC ---

  // Update Stock Dropdowns
  const handleStockUpdate = (bloodType, newStatus) => {
    setInventory((prev) =>
      prev.map((item) => (item.type === bloodType ? { ...item, status: newStatus } : item))
    );
    // FLASK INTEGRATION HINT:
    // axios.put('/api/inventory/update', { type: bloodType, status: newStatus })
  };

  // Process Institutional Supply Request Action
  const handleProvideSupply = (requestId) => {
    setIncomingRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "Fulfilled" } : req))
    );
    // FLASK INTEGRATION HINT:
    // axios.post(`/api/requests/${requestId}/fulfill`)
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-12">
        
        {/* Module Title Section */}
        <div className="mb-10">
          <span className="block text-xs font-bold uppercase tracking-wide text-red-deep mb-2">
            Institutional Portal
          </span>
          <h1 className="font-serif text-4xl font-semibold text-ink">
            Blood Bank Management Dashboard
          </h1>
          <p className="text-sm text-ink-soft mt-2">
            Monitor real-time regional requirements, review incoming local donor actions, and manage live stock inventory thresholds.
          </p>
        </div>

        {/* Dashboard Split Column View Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.9fr_1.1fr] gap-8 items-start">
          
          {/* LEFT CONTAINER: Live Urgent Public Requests Panel */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-red/10 text-red-deep rounded-xl flex items-center justify-center">
                <AlertCircle size={18} />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-ink">Incoming Patient Demands</h2>
            </div>

            {incomingRequests.map((req) => (
              <div 
                key={req.id} 
                className="bg-paper border border-ink/10 rounded-[22px] p-6 flex flex-col gap-4 transition-all hover:shadow-[0_15px_40px_-15px_rgba(74,18,32,0.15)]"
              >
                {/* Header Information Row */}
                <div className="flex items-center justify-between border-b border-ink/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs bg-ink/5 px-2.5 py-1 rounded-md text-ink-soft font-bold">
                      {req.id}
                    </span>
                    <span className="text-xs font-semibold text-ink-soft flex items-center gap-1">
                      <Clock size={12} /> {req.time}
                    </span>
                  </div>

                  {/* High Visibility Blood Token */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-white shadow-sm ${req.chip}`}>
                    {req.bloodType}
                  </div>
                </div>

                {/* Patient Case Overview Details */}
                <div>
                  <h3 className="font-bold text-base text-ink">{req.hospital}</h3>
                  <p className="text-xs text-ink-soft flex items-center gap-1 mt-1">
                    <MapPin size={13} /> {req.location}
                  </p>
                  <p className="text-xs font-semibold mt-3 text-ink-soft">
                    Target Volume Needed: <span className="text-red-deep font-bold text-sm">{req.units}</span>
                  </p>
                </div>

                {/* COMMUNITY DONOR RESPONSES VISIBILITY SUB-PANEL */}
                <div className="bg-cream/50 rounded-xl p-3.5 border border-ink/5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft flex items-center gap-1.5 mb-2.5">
                    <Users size={13} /> Community Donors Onboard ({req.donorsAccepted.length})
                  </p>
                  
                  {req.donorsAccepted.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {req.donorsAccepted.map((donor, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center gap-1 text-xs bg-white text-green border border-green/20 px-2.5 py-1 rounded-full font-medium"
                        >
                          <ShieldCheck size={12} />
                          {donor}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-ink-soft italic">No active external donor match logs currently registered.</p>
                  )}
                </div>

                {/* Institutional Submission Call to Action */}
                <div className="flex justify-end mt-2">
                  {req.status === "Pending" ? (
                    <button
                      onClick={() => handleProvideSupply(req.id)}
                      className="flex items-center gap-1 bg-red-deep text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all hover:bg-red-700 shadow-sm"
                    >
                      <span>Can Supply</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green bg-green/10 px-4 py-2.5 rounded-full border border-green/20">
                      <CheckCircle size={14} /> Supplied Institutionally
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT CONTAINER: Reusable Editable Stocks Management List */}
          <div className="bg-paper border border-ink/10 rounded-[22px] p-6 lg:sticky lg:top-6">
            <div className="flex items-center gap-2.5 mb-5 border-b border-ink/5 pb-4">
              <div className="w-9 h-9 bg-red/10 text-red-deep rounded-xl flex items-center justify-center">
                <Droplets size={18} />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-ink">Stock Inventory</h2>
                <p className="text-[11px] text-ink-soft mt-0.5">Toggle live status parameters</p>
              </div>
            </div>

            {/* Editable Matrix Component Rows */}
            <div className="flex flex-col gap-2.5">
              {inventory.map((item) => (
                <div 
                  key={item.type} 
                  className="flex items-center justify-between p-3 rounded-xl bg-cream/30 border border-ink/5"
                >
                  <span className="w-8 h-8 bg-ink text-white rounded-lg flex items-center justify-center font-mono font-bold text-xs">
                    {item.type}
                  </span>

                  {/* Interactive Option Selectors */}
                  <select
                    value={item.status}
                    onChange={(e) => handleStockUpdate(item.type, e.target.value)}
                    className={`text-xs font-bold border px-2.5 py-1.5 rounded-full bg-white outline-none cursor-pointer tracking-wide transition-all ${inventoryBadgeStyles[item.status]}`}
                  >
                    <option value="Full" className="text-green bg-white">Full</option>
                    <option value="Moderate" className="text-[#8A5A15] bg-white">Moderate</option>
                    <option value="Low" className="text-red-deep bg-white">Low</option>
                    <option value="Empty" className="text-red-deep font-bold bg-white">Empty</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Quick Note Card for Backend Context */}
            <div className="mt-6 p-4 bg-ink/5 rounded-xl border border-ink/5">
              <p className="text-[11px] text-ink-soft leading-relaxed font-medium">
                💡 <strong>Internship Project Notice:</strong> Component variables use state arrays local to React execution. Integrate explicit API endpoints to process database operations when wiring up Flask views.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BloodBankDashboard;