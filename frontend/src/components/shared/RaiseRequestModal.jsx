import { useState } from "react";
import { X } from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const urgencyLevels = ["Moderate", "High", "Critical"];

function RaiseRequestModal({ onClose, onSubmit, requesterName }) {
  const [form, setForm] = useState({
    bloodGroup: "",
    hospital: "",
    condition: "",
    urgency: "Moderate",
    unitsNeeded: "",
  });
  const [error, setError] = useState("");

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = () => {
    if (!form.bloodGroup || !form.hospital || !form.condition || !form.unitsNeeded) {
      setError("Please fill in all fields before submitting.");
      return;
    }
    onSubmit({
      ...form,
      requesterName,
      time: "Just now",
      id: Date.now(), // temporary unique id until backend assigns real one
    });
  };

  return (
    <div className="fixed inset-0 bg-ink/50 flex items-center justify-center z-50 px-4">
      <div className="bg-paper rounded-[22px] p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-serif text-xl font-semibold">Raise a Blood Request</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Blood Group Needed</label>
            <div className="grid grid-cols-4 gap-2">
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => update("bloodGroup", bg)}
                  className={`py-2 rounded-lg border font-semibold text-sm transition-all ${
                    form.bloodGroup === bg ? "bg-red-deep text-white border-red-deep" : "border-ink/15 hover:border-red/40"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Units Needed</label>
            <input
              type="number"
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:ring-2 focus:ring-red-300"
              value={form.unitsNeeded}
              onChange={(e) => update("unitsNeeded", e.target.value)}
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Hospital Name</label>
            <input
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:ring-2 focus:ring-red-300"
              value={form.hospital}
              onChange={(e) => update("hospital", e.target.value)}
              placeholder="e.g. MDM Government Hospital"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Describe the Condition</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:ring-2 focus:ring-red-300"
              value={form.condition}
              onChange={(e) => update("condition", e.target.value)}
              placeholder="Brief description — e.g. surgery, accident, ongoing treatment"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Urgency Level</label>
            <div className="flex gap-2">
              {urgencyLevels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => update("urgency", lvl)}
                  className={`flex-1 py-2 rounded-lg border font-semibold text-sm transition-all ${
                    form.urgency === lvl ? "bg-red-deep text-white border-red-deep" : "border-ink/15 hover:border-red/40"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="w-1/3 border border-ink/15 font-semibold py-3 rounded-full hover:bg-ink/5 transition">
            Cancel
          </button>
          <button onClick={handleSubmit} className="w-2/3 bg-red-deep text-white font-semibold py-3 rounded-full hover:bg-red transition">
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaiseRequestModal;