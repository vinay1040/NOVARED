import { useSearchParams, Link } from "react-router-dom";
import DonorRegister from "../components/register/DonotRegister";
import PatientRegister from "../components/register/PatientRegister";
import BloodBankRegister from "../components/register/BloodBankRegister";

function Register() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "donor";

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900 mb-1 capitalize">
        {role === "bloodbank" ? "Blood Bank" : role} Registration
      </h1>
      <p className="text-sm text-stone-500 mb-6">Join the BloodNet network</p>

      {role === "donor" && <DonorRegister />}
      {role === "patient" && <PatientRegister />}
      {role === "bloodbank" && <BloodBankRegister />}

      <p className="text-sm text-stone-500 mt-5">
        Already have an account?{" "}
        <Link to={`/login?role=${role}`} className="text-red-800 font-semibold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Register;