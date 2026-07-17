import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const tabConfigs = {
  donor: {
    title: "Welcome back",
    subtitle: "Secure access to the BloodNet network.",
    idLabel: "Mobile Number",
    idPlaceholder: "+91 98765 43210",
    buttonText: "Sign In to Dashboard",
    ringClass: "focus:ring-red-300",
    buttonClass: "bg-red-800 hover:bg-red-900",
    registerText: "New donor?",
  },
  patient: {
    title: "Patient Access",
    subtitle: "Enter your credentials to track your request",
    idLabel: "Patient ID / Email",
    idPlaceholder: "PX-12345678",
    buttonText: "Secure Login",
    ringClass: "focus:ring-rose-300",
    buttonClass: "bg-rose-700 hover:bg-rose-800",
    registerText: "New patient?",
  },
  bloodbank: {
    title: "Partner Login",
    subtitle: "Access the BloodNet clinical network dashboard",
    idLabel: "License ID",
    idPlaceholder: "RB-XXXXX-2024",
    buttonText: "Authorize Access",
    ringClass: "focus:ring-neutral-400",
    buttonClass: "bg-neutral-900 hover:bg-neutral-800",
    registerText: "New facility or lab?", // blood banks don't self-register
  },
};

function Login() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role");
  const [activeTab, setActiveTab] = useState(
    tabConfigs[initialRole] ? initialRole : "donor"
  );

  const config = tabConfigs[activeTab];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="flex gap-2 bg-stone-100 p-1 rounded-full mb-6">
        {Object.keys(tabConfigs).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200
              ${activeTab === key ? "bg-red-800 text-white shadow" : "text-stone-600 hover:text-red-800"}`}
          >
            {key === "bloodbank" ? "Blood Bank" : key}
          </button>
        ))}
      </div>

      <LoginForm config={config} role={activeTab} />

      {config.registerText && (
        <p className="text-sm text-stone-500 mt-5">
          {config.registerText}{" "}
          <Link to={`/register?role=${activeTab}`} className="text-red-800 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      )}
    </div>
  );
}

export default Login;