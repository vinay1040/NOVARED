import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileCard from "../components/donor/ProfileCard";
import EligibilityClock from "../components/donor/EligibilityClock";
import DonationHistory from "../components/donor/DonationHistory";
import CampsList from "../components/donor/CampsList";
import BloodBankRequests from "../components/donor/BloodBankRequests";
import EditProfileModal from "../components/donor/EditProfileModal";
import BloodMap from "../components/shared/BloodMap";
import InventoryPanel from "../components/shared/InventoryPanel";
import RaiseRequestModal from "../components/shared/RaiseRequestModal";
import ScreeningTestModal from "../components/donor/ScreeningTestModal";
import { getEligibility } from "../utils/donationCycles";

// TODO: replace with axios.get("http://127.0.0.1:5000/api/donor/profile")
const mockDonor = {
  fullName: "Giriraj Suthar",
  bloodGroup: "O+",
  phone: "+91 98765 43210",
  email: "giriraj@example.com",
  city: "Jodhpur",
  lastDonationDate: "2026-05-10",
  totalDonations: 4,
  healthNotes: [],
};

// TODO: replace with axios.get("http://127.0.0.1:5000/api/donor/history")
const mockHistory = [
  { date: "2026-05-10", component: "Whole Blood", volume: "350 ml", bank: "AIIMS Jodhpur" },
  { date: "2026-02-14", component: "Platelets", volume: "250 ml", bank: "MDM Government Hospital" },
  { date: "2025-11-02", component: "Whole Blood", volume: "350 ml", bank: "Goyal Hospital & Research Centre" },
  { date: "2025-08-19", component: "Whole Blood", volume: "350 ml", bank: "AIIMS Jodhpur" },
];

// TODO: replace with axios.get("http://127.0.0.1:5000/api/donor/requests")
const mockBankRequests = [
  { id: 1, bank: "MDM Government Hospital", bloodGroup: "O+", urgency: "Critical", message: "Urgent need for trauma case" },
  { id: 2, bank: "AIIMS Jodhpur", bloodGroup: "O+", urgency: "Moderate", message: "Restocking for scheduled surgeries" },
];

function DonorDashboard() {
  const [donor, setDonor] = useState(mockDonor);
  const [history] = useState(mockHistory);
  const [bankRequests] = useState(mockBankRequests);
  const [camps, setCamps] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [raiseRequestOpen, setRaiseRequestOpen] = useState(false);
  const [myRequests, setMyRequests] = useState([]);
  const [screeningOpen, setScreeningOpen] = useState(false);
  const [screeningPassed, setScreeningPassed] = useState(null); // null = not taken yet

  const lastDonation = history[0]; // most recent donation, assumes history is sorted newest-first
  const { eligible: cycleComplete } = getEligibility(lastDonation);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/map/camps")
      .then((res) => res.json())
      .then((data) => setCamps(data))
      .catch(() => setCamps([]));
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-10 space-y-10">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wide text-red-deep mb-1">Donor Dashboard</span>
            <h1 className="font-serif text-3xl font-semibold">Welcome back, {donor.fullName.split(" ")[0]}</h1>
          </div>
          <button
            onClick={() => setEditOpen(true)}
            className="border border-ink/20 px-5 py-2.5 rounded-full text-sm font-bold hover:border-red hover:text-red-deep transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          <ProfileCard donor={donor} />
          <EligibilityClock lastDonation={lastDonation} />
        </div>

        <BloodBankRequests
          requests={bankRequests}
          currentUser={donor}
          cycleComplete={cycleComplete}
          screeningPassed={screeningPassed}
          onStartScreening={() => setScreeningOpen(true)}
        />

        <DonationHistory history={history} />

        <CampsList camps={camps} />

        <InventoryPanel />

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4">Nearby Blood Banks & Camps</h2>
          <BloodMap showCamps={true} />
        </div>
      </main>

      <Footer />

      {editOpen && (
        <EditProfileModal
          donor={donor}
          onClose={() => setEditOpen(false)}
          onSave={(updated) => {
            setDonor(updated);
            setEditOpen(false);
            // TODO: axios.put("http://127.0.0.1:5000/api/donor/profile", updated)
          }}
        />
      )}

      {screeningOpen && (
        <ScreeningTestModal
          onClose={() => setScreeningOpen(false)}
          onComplete={(passed) => {
            setScreeningPassed(passed);
            setScreeningOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default DonorDashboard;