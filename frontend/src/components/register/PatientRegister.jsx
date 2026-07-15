import { useState } from "react";
import axios from "axios";
import StepProgress from "./StepProgress";

const labels = ["Basic Profile", "Medical Details", "Verification Proof"];

function PatientRegister() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
    gender: "", dob: "",
    bloodGroupNeeded: "", hospitalName: "", city: "", conditionDescription: "", urgencyLevel: "Moderate",
    relationToPatient: "self", additionalNotes: "", agreeTerms: false,
  });
  const [doctorNoteFile, setDoctorNoteFile] = useState(null);

  const update = (field, value) => setFormData((p) => ({ ...p, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("full_name", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("password", formData.password);
      payload.append("gender", formData.gender);
      payload.append("dob", formData.dob);
      payload.append("blood_group_needed", formData.bloodGroupNeeded);
      payload.append("hospital_name", formData.hospitalName);
      payload.append("city", formData.city);
      payload.append("condition_description", formData.conditionDescription);
      payload.append("urgency_level", formData.urgencyLevel);
      payload.append("relation_to_patient", formData.relationToPatient);
      payload.append("additional_notes", formData.additionalNotes);
      if (doctorNoteFile) payload.append("doctor_note", doctorNoteFile);

      await axios.post("http://127.0.0.1:5000/api/auth/register/patient", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Patient registered successfully! Please login.");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-300";
  const labelClass = "text-sm font-medium text-stone-700 block";

  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-200 w-full max-w-lg">
      <StepProgress step={step} totalSteps={3} labels={labels} />

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input className={inputClass} value={formData.fullName} onChange={(e) => update("fullName", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
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
          <button onClick={next} className="w-full mt-4 bg-rose-700 text-white font-semibold py-3 rounded-full hover:bg-rose-800 hover:shadow-lg transition-all hover:scale-[1.02]">
            Next Step →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Blood Group Needed</label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => update("bloodGroupNeeded", bg)}
                  className={`py-2 rounded-lg border font-semibold transition-all ${
                    formData.bloodGroupNeeded === bg ? "bg-rose-700 text-white border-rose-700" : "border-stone-200 hover:border-rose-300"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Hospital Name</label>
            <input className={inputClass} value={formData.hospitalName} onChange={(e) => update("hospitalName", e.target.value)} placeholder="City General Hospital" />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input className={inputClass} value={formData.city} onChange={(e) => update("city", e.target.value)} placeholder="Jodhpur" />
          </div>
          <div>
            <label className={labelClass}>Describe the Medical Condition</label>
            <textarea rows={3} className={inputClass} value={formData.conditionDescription} onChange={(e) => update("conditionDescription", e.target.value)} placeholder="Brief description of diagnosis / condition" />
          </div>
          <div>
            <label className={labelClass}>Urgency Level</label>
            <select className={inputClass} value={formData.urgencyLevel} onChange={(e) => update("urgencyLevel", e.target.value)}>
              <option value="Critical">Critical (Immediate)</option>
              <option value="High">High (2-4 hours)</option>
              <option value="Moderate">Moderate (Stable)</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={back} className="w-1/3 border border-stone-300 text-stone-700 font-semibold py-3 rounded-full hover:bg-stone-50 transition">
              Back
            </button>
            <button onClick={next} className="w-2/3 bg-rose-700 text-white font-semibold py-3 rounded-full hover:bg-rose-800 hover:shadow-lg transition-all hover:scale-[1.02]">
              Next Step →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Relation to Patient</label>
            <select className={inputClass} value={formData.relationToPatient} onChange={(e) => update("relationToPatient", e.target.value)}>
              <option value="self">Self</option>
              <option value="family">Family Member</option>
              <option value="friend">Friend / Guardian</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Upload Doctor's Note / Medical Proof</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setDoctorNoteFile(e.target.files[0])}
              className="w-full mt-1 text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-rose-50 file:text-rose-700 file:font-semibold hover:file:bg-rose-100"
            />
            <p className="text-xs text-stone-500 mt-1">This proves the request is medically genuine, not fraudulent.</p>
          </div>
          <div>
            <label className={labelClass}>Additional Notes (optional)</label>
            <textarea rows={2} className={inputClass} value={formData.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} />
          </div>
          <label className="flex items-start gap-2 text-sm text-stone-700 mt-2">
            <input type="checkbox" className="mt-1" checked={formData.agreeTerms} onChange={(e) => update("agreeTerms", e.target.checked)} />
            I confirm this information is accurate and the medical proof provided is genuine.
          </label>
          <div className="flex gap-3 mt-4">
            <button onClick={back} className="w-1/3 border border-stone-300 text-stone-700 font-semibold py-3 rounded-full hover:bg-stone-50 transition">
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.agreeTerms || submitting}
              className="w-2/3 bg-rose-700 text-white font-semibold py-3 rounded-full hover:bg-rose-800 hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {submitting ? "Submitting..." : "Complete Registration"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientRegister;