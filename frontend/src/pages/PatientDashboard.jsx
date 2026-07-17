import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BloodMap from "../components/shared/BloodMap";
import InventoryPanel from "../components/shared/InventoryPanel";
import RaiseRequestModal from "../components/shared/RaiseRequestModal";
import PatientEditProfileModal from "../components/patient/PatientEditProfileModal";

// TODO: replace with axios.get("http://127.0.0.1:5000/api/patient/profile")
// bloodGroup here is the patient's own fixed type — set once at registration, never edited after.
const mockPatient = {
  fullName: "Amit Verma",
  bloodGroup: "B+",
  phone: "+91 91234 56780",
  email: "amit@example.com",
  city: "Jodhpur",
};

// TODO: replace with axios.get("http://127.0.0.1:5000/api/patient/requests")
// Each request is its own independent event — separate hospital, urgency, and units each time.
const mockMyRequests = [
  {
    id: 101,
    bloodGroup: "B+",
    hospital: "AIIMS Jodhpur",
    unitsNeeded: 2,
    urgency: "Critical",
    status: "Pending",
    date: "2026-07-14",
    acceptedBy: [{ name: "Rohit Jain", city: "Jodhpur" }],
    replacementGiven: false,
  },
  {
    id: 102,
    bloodGroup: "B+",
    hospital: "MDM Government Hospital",
    unitsNeeded: 1,
    urgency: "Moderate",
    status: "Completed",
    date: "2026-04-02",
    acceptedBy: [{ name: "Priya Rathore", city: "Jodhpur" }],
    replacementGiven: true,
  },
];

const statusStyles = {
  Pending: "bg-amber/15 text-[#8A5A15]",
  Completed: "bg-green/10 text-green",
};

function PatientDashboard() {
  const [patient, setPatient] = useState(mockPatient);
  const [myRequests, setMyRequests] = useState(mockMyRequests);
  const [raiseOpen, setRaiseOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-10 space-y-10">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wide text-red-deep mb-1">Patient Dashboard</span>
            <h1 className="font-serif text-3xl font-semibold">Welcome back, {patient.fullName.split(" ")[0]}</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditOpen(true)}
              className="border border-ink/20 px-5 py-2.5 rounded-full text-sm font-bold hover:border-red hover:text-red-deep transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setRaiseOpen(true)}
              className="bg-red-deep text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-red transition"
            >
              Raise Blood Request
            </button>
          </div>
        </div>

        {/* Profile — blood group is fixed, shown but not editable */}
        <div className="bg-paper border border-ink/10 rounded-[22px] p-7">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-red/10 text-red-deep flex items-center justify-center font-mono font-bold text-xl">
              {patient.bloodGroup}
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold">{patient.fullName}</h3>
              <p className="text-sm text-ink-soft">{patient.city}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p className="text-ink-soft">Phone: <span className="font-semibold text-ink">{patient.phone}</span></p>
            <p className="text-ink-soft">Email: <span className="font-semibold text-ink">{patient.email}</span></p>
          </div>
        </div>

        {/* Request history + replacement tracking */}
        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4">Your Blood Requests</h2>
          <div className="flex flex-col gap-3">
            {myRequests.length === 0 && (
              <div className="bg-paper border border-ink/10 rounded-[18px] p-6 text-center text-sm text-ink-soft">
                You haven't raised any blood requests yet.
              </div>
            )}
            {myRequests.map((r) => (
              <div key={r.id} className="bg-paper border border-ink/10 rounded-[18px] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sm">
                      {r.bloodGroup} · {r.unitsNeeded} unit{r.unitsNeeded > 1 ? "s" : ""} · {r.hospital}
                    </p>
                    <p className="text-xs text-ink-soft mt-0.5">Requested on {r.date}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusStyles[r.status]}`}>{r.status}</span>
                </div>

                {r.acceptedBy.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-ink/10">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1.5">
                      People willing to donate
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {r.acceptedBy.map((d, i) => (
                        <span key={i} className="text-xs bg-ink/5 px-2.5 py-1 rounded-full">
                          ✓ {d.name} · {r.bloodGroup} · {d.city}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-ink/10 flex items-center justify-between">
                  <p className="text-xs text-ink-soft">
                    Replacement donation: {r.replacementGiven ? "Completed" : "Pending"}
                  </p>
                  {!r.replacementGiven && r.status === "Completed" && (
                    <span className="text-xs font-bold text-amber-700">Reciprocal donation still owed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <InventoryPanel />

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4">Nearby Blood Banks</h2>
          <BloodMap showCamps={false} />
        </div>
      </main>

      <Footer />

      {raiseOpen && (
        <RaiseRequestModal
          requesterName={patient.fullName}
          onClose={() => setRaiseOpen(false)}
          onSubmit={(newRequest) => {
            setMyRequests((prev) => [
              { ...newRequest, status: "Pending", date: new Date().toISOString().split("T")[0], acceptedBy: [], replacementGiven: false },
              ...prev,
            ]);
            setRaiseOpen(false);
            // TODO: axios.post("http://127.0.0.1:5000/api/requests", newRequest)
          }}
        />
      )}

      {editOpen && (
        <PatientEditProfileModal
          patient={patient}
          onClose={() => setEditOpen(false)}
          onSave={(updated) => {
            setPatient(updated);
            setEditOpen(false);
            // TODO: axios.put("http://127.0.0.1:5000/api/patient/profile", updated)
          }}
        />
      )}
    </div>
  );
}

export default PatientDashboard;