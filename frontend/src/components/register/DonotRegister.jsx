import { useState } from "react";
import axios from "axios";
import StepProgress from "./StepProgress";

const labels = ["Basic Profile", "Health & Eligibility", "Preferences"];

function DonorRegister() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
    gender: "", dob: "",
    bloodGroup: "", weight: "", lastDonationDate: "",
    hasChronicCondition: false, onMedication: false,
    city: "", address: "", agreeTerms: false,
  });

  const update = (field, value) => setFormData((p) => ({ ...p, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await axios.post("http://127.0.0.1:5000/api/auth/register/donor", {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        gender: formData.gender,
        dob: formData.dob,
        blood_group: formData.bloodGroup,
        weight: formData.weight,
        last_donation_date: formData.lastDonationDate,
        has_chronic_condition: formData.hasChronicCondition,
        on_medication: formData.onMedication,
        city: formData.city,
        address: formData.address,
      });
      alert("Donor registered successfully! Please login.");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-red-300";
  const labelClass = "text-sm font-medium text-stone-700 block";

  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-200 w-full max-w-lg">
      <StepProgress step={step} totalSteps={3} labels={labels} />

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input className={inputClass} value={formData.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Giriraj Suthar" />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" className={inputClass} value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input className={inputClass} value={formData.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" className={inputClass} value={formData.password} onChange={(e) => update("password", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Confirm Password</label>
              <input type="password" className={inputClass} value={formData.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Gender</label>
              <select className={inputClass} value={formData.gender} onChange={(e) => update("gender", e.target.value)}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Date of Birth</label>
              <input type="date" className={inputClass} value={formData.dob} onChange={(e) => update("dob", e.target.value)} />
            </div>
          </div>
          <button onClick={next} className="w-full mt-4 bg-red-800 text-white font-semibold py-3 rounded-full transition-all hover:bg-red-900 hover:shadow-lg hover:scale-[1.02]">
            Next Step →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Blood Group (if known)</label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => update("bloodGroup", bg)}
                  className={`py-2 rounded-lg border font-semibold transition-all ${
                    formData.bloodGroup === bg ? "bg-red-800 text-white border-red-800" : "border-stone-200 hover:border-red-300"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Weight (kg)</label>
            <input type="number" className={inputClass} value={formData.weight} onChange={(e) => update("weight", e.target.value)} placeholder="e.g. 65" />
          </div>
          <div>
            <label className={labelClass}>Last Donation Date (if any)</label>
            <input type="date" className={inputClass} value={formData.lastDonationDate} onChange={(e) => update("lastDonationDate", e.target.value)} />
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input type="checkbox" checked={formData.hasChronicCondition} onChange={(e) => update("hasChronicCondition", e.target.checked)} />
            I have a chronic medical condition
          </label>
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input type="checkbox" checked={formData.onMedication} onChange={(e) => update("onMedication", e.target.checked)} />
            I'm currently on medication
          </label>
          <div className="flex gap-3 mt-4">
            <button onClick={back} className="w-1/3 border border-stone-300 text-stone-700 font-semibold py-3 rounded-full hover:bg-stone-50 transition">
              Back
            </button>
            <button onClick={next} className="w-2/3 bg-red-800 text-white font-semibold py-3 rounded-full hover:bg-red-900 hover:shadow-lg transition-all hover:scale-[1.02]">
              Next Step →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>City</label>
            <input className={inputClass} value={formData.city} onChange={(e) => update("city", e.target.value)} placeholder="Jodhpur" />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input className={inputClass} value={formData.address} onChange={(e) => update("address", e.target.value)} placeholder="Street, Area" />
          </div>
          <label className="flex items-start gap-2 text-sm text-stone-700 mt-2">
            <input type="checkbox" className="mt-1" checked={formData.agreeTerms} onChange={(e) => update("agreeTerms", e.target.checked)} />
            I confirm the information provided is accurate and I agree to the terms of service.
          </label>
          <div className="flex gap-3 mt-4">
            <button onClick={back} className="w-1/3 border border-stone-300 text-stone-700 font-semibold py-3 rounded-full hover:bg-stone-50 transition">
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.agreeTerms || submitting}
              className="w-2/3 bg-red-800 text-white font-semibold py-3 rounded-full hover:bg-red-900 hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {submitting ? "Submitting..." : "Complete Registration"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonorRegister;