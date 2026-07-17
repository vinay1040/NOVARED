import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginForm({ config, role }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // OTP step state — only used for donor/patient
  const [step, setStep] = useState("credentials"); // "credentials" | "otp"
  const [mockOtp, setMockOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [pendingUser, setPendingUser] = useState(null);

  const needsOtp = role === "donor" || role === "patient";

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phone || !password) {
      setError("Please enter both your phone number and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", {
        phone,
        password,
        role,
      });

      if (needsOtp) {
        // Don't log in yet — send OTP first (mocked until real SMS API exists)
        const generated = Math.floor(1000 + Math.random() * 9000).toString();
        setMockOtp(generated);
        setPendingUser(res.data);
        setStep("otp");
        alert("Demo OTP sent: " + generated);
      } else {
        // Blood bank — no OTP step, log in directly
        login({ name: res.data.name, role });
        navigate(`/${role}-dashboard`);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) setError("Incorrect password. Please try again.");
        else if (err.response.status === 404) setError("This phone number isn't registered. Please sign up first.");
        else setError(err.response.data?.message || "Login failed. Please try again.");
      } else {
        setError("Could not reach the server. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpInput !== mockOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }
    login({ name: pendingUser.name, role });
    navigate(`/${role}-dashboard`);
  };

  if (step === "otp") {
    return (
      <form onSubmit={handleOtpSubmit} className="bg-white rounded-2xl p-8 border border-stone-200 w-full max-w-md">
        <h2 className="text-xl font-bold text-stone-900">Verify Your Phone</h2>
        <p className="text-sm text-stone-500 mt-1">Enter the OTP sent to {phone}</p>

        <label className="text-sm font-medium text-stone-700 mt-6 block">OTP Code</label>
        <input
          type="text"
          maxLength={4}
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          className={`w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 ${config.ringClass}`}
        />

        {error && (
          <p className="text-sm text-red-600 mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          className={`w-full mt-6 ${config.buttonClass} text-white font-semibold py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
        >
          Verify & Sign In
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleCredentialsSubmit} className="bg-white rounded-2xl p-8 border border-stone-200 w-full max-w-md">
      <h2 className="text-xl font-bold text-stone-900">{config.title}</h2>
      <p className="text-sm text-stone-500 mt-1">{config.subtitle}</p>

      <label className="text-sm font-medium text-stone-700 mt-6 block">{config.idLabel}</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={config.idPlaceholder}
        className={`w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 ${config.ringClass}`}
      />

      <label className="text-sm font-medium text-stone-700 mt-4 block">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 ${config.ringClass}`}
      />

      {error && (
        <p className="text-sm text-red-600 mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full mt-6 ${config.buttonClass} text-white font-semibold py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100`}
      >
        {loading ? "Signing in..." : config.buttonText}
      </button>
    </form>
  );
}

export default LoginForm;