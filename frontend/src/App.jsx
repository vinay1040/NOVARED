import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import About from "./pages/About";
import PatientDashboard from "./pages/PatientDashboard";
import PatientEditProfileModal from "./components/patient/PatientEditProfileModal";
import Camps from "./pages/Camps";
import BloodBankDashboard from "./pages/Bloodbank";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/bloodbank" element={<BloodBankDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}