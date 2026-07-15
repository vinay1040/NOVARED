import { useState } from "react";
import axios from "axios";
import StepProgress from "./StepProgress";

const labels = ["Facility Info", "License & Address"];

function BloodBankRegister() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    facilityName: "", licenseId: "", email: "", phone: "", password: "", confirmPassword: "",
    city: "", address: "",
  });
  const [licenseFile, setLicenseFile] = useState(null);

  const update = (field, value) => setFormData((p) => ({ ...p, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("facility_name", formData.facilityName);
      payload.append("license_id", formData.licenseId);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("password", formData.password);
      payload.append("city", formData.city);
      payload.append("address", formData.address);
      if (licenseFile) payload.append("license_document", licenseFile);

      await axios.post("http://127.0.0.1:5000/api/auth/register/bloodbank", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-neutral-400";
  const labelClass = "text-sm font-medium text-stone-700 block";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-stone-200 w-full max-w-lg text-center">
        <h2 className="text-xl font-bold text-stone-900">Application Submitted</h2>
        <p className="text-sm text-stone-500 mt-2">
          Your facility is under review. Our team will verify your license document and approve your account within 24-48 hours. You'll be notified by email.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-200 w-full max-w-lg">
      <StepProgress step={step} totalSteps={2} labels={labels} />

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Facility / Blood Bank Name</label>
            <input className={inputClass} value={formData.facilityName} onChange={(e) => update("facilityName", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>License ID</label>
            <input className={inputClass} value={formData.licenseId} onChange={(e) => update("licenseId", e.target.value)} placeholder="RB-XXXXX-2024" />
          </div>
          <div>
            <label className={labelClass}>Official Email</label>
            <input type="email" className={inputClass} value={formData.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input className={inputClass} value={formData.phone} onChange={(e) => update("phone", e.target.value)} />
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
          <button onClick={next} className="w-full mt-4 bg-neutral-900 text-white font-semibold py-3 rounded-full hover:bg-neutral-800 hover:shadow-lg transition-all hover:scale-[1.02]">
            Next Step →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>City</label>
            <input className={inputClass} value={formData.city} onChange={(e) => update("city", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Full Address</label>
            <input className={inputClass} value={formData.address} onChange={(e) => update("address", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Upload License / Registration Document</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setLicenseFile(e.target.files[0])}
              className="w-full mt-1 text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-neutral-100 file:text-neutral-800 file:font-semibold hover:file:bg-neutral-200"
            />
            <p className="text-xs text-stone-500 mt-1">Required for manual verification before your account is approved.</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={back} className="w-1/3 border border-stone-300 text-stone-700 font-semibold py-3 rounded-full hover:bg-stone-50 transition">
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-2/3 bg-neutral-900 text-white font-semibold py-3 rounded-full hover:bg-neutral-800 hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit for Verification"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BloodBankRegister;