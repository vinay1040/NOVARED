import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Droplets, 
  HeartHandshake, 
  IndianRupee, 
  Info, 
  ShieldCheck, 
  Activity,
  CalendarCheck2,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

function About() {
  // State for interactive FAQ accordion
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const compatibilityData = [
    { type: "O-", gives: "Everyone (Universal)", receives: "O-" },
    { type: "O+", gives: "O+, A+, B+, AB+", receives: "O-, O+" },
    { type: "A-", gives: "A-, A+, AB-, AB+", receives: "O-, A-" },
    { type: "A+", gives: "A+, AB+", receives: "O-, O+, A-, A+" },
    { type: "B-", gives: "B-, B+, AB-, AB+", receives: "O-, B-" },
    { type: "B+", gives: "B+, AB+", receives: "O-, O+, B-, B+" },
    { type: "AB-", gives: "AB-, AB+", receives: "O-, A-, B-, AB-" },
    { type: "AB+", gives: "AB+ Only (Universal)", receives: "Everyone" },
  ];

  const faqs = [
    {
      question: "Who is eligible to donate blood in India?",
      answer: "Generally, any healthy adult aged between 18 and 65 years, weighing at least 45 kg, with a hemoglobin level of 12.5 g/dL or higher is eligible. You should not have any active infections, uncontrolled chronic illnesses, or recent major surgeries."
    },
    {
      question: "How often can I donate blood?",
      answer: "Healthy male donors can safely donate whole blood every 3 months (90 days), while female donors can safely donate every 4 months (120 days) to allow the body's iron levels to fully recover."
    },
    {
      question: "Is it safe to donate blood during the current year?",
      answer: "Absolutely. All licensed blood banks utilize sterile, single-use, disposable equipment for every donor. There is zero risk of contracting bloodborne infections from donating blood."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col text-slate-800">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Hero Section */}
        <div className="mb-12 text-center md:text-left">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-3 py-1 rounded-full mb-3">
            Our Story & Mission
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-slate-900">
            About BLOOD NET
          </h1>
          <div className="grid md:grid-cols-2 gap-8 text-base md:text-lg text-slate-600 leading-relaxed">
            <p>
              What started as a spreadsheet tracking donors for one hospital in Jodhpur is now a live network
              linking patients, verified donors, and licensed blood banks — built so an urgent request is never
              stuck in a phone tree at 2 a.m.
            </p>
            <p>
              BLOOD NET exists to close the critical gap between someone needing blood and someone willing to give it —
              providing real-time, transparent visibility into who has what, and where, when seconds count.
            </p>
          </div>
        </div>

        <hr className="border-slate-200 my-12" />

        {/* Informational Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Diseases & Types */}
          <div id="diseases" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm scroll-mt-24 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-rose-50 text-rose-600 mb-4">
                <Droplets size={24} />
              </div>
              <h2 className="font-serif text-xl font-semibold mb-3 text-slate-900">Diseases & Blood Types</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Not every blood type is compatible. Understanding cross-matching rules is why every unit on BLOOD NET's partner banks is carefully typed before transfusions.
              </p>
            </div>
            <a href="#compatibility-chart" className="text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 mt-2">
              View compatibility chart &rarr;
            </a>
          </div>

          {/* Card 2: Post Donation Care */}
          <div id="care" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm scroll-mt-24">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-rose-50 text-rose-600 mb-4">
              <HeartHandshake size={24} />
            </div>
            <h2 className="font-serif text-xl font-semibold mb-3 text-slate-900">Post Donation Care</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              After donating, rest for 10-15 minutes, drink plenty of fluids, and avoid heavy lifting. Most donors feel back to normal within 24 hours while your body naturally replenishes volume.
            </p>
          </div>

          {/* Card 3: Processing Charges */}
          <div id="charges" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm scroll-mt-24">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-rose-50 text-rose-600 mb-4">
              <IndianRupee size={24} />
            </div>
            <h2 className="font-serif text-xl font-semibold mb-3 text-slate-900">Processing Charges</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Blood is free; however, licensed facilities charge an approved processing fee to cover crucial safety screenings, high-tech cold storage, and component separation processing.
            </p>
          </div>
        </div>

        {/* Section: Blood Compatibility Quick-Reference */}
        <div id="compatibility-chart" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 text-slate-700">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-slate-900">Compatibility Guide</h3>
              <p className="text-xs text-slate-500">Quick medical compatibility lookup table</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold uppercase text-xs border-b border-slate-100">
                  <th className="py-3.5 px-4">Blood Type</th>
                  <th className="py-3.5 px-4">Can Give Blood To</th>
                  <th className="py-3.5 px-4">Can Receive Blood From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {compatibilityData.map((row) => (
                  <tr key={row.type} className="hover:bg-rose-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-rose-700">{row.type}</td>
                    <td className="py-3 px-4 text-slate-600">{row.gives}</td>
                    <td className="py-3 px-4 text-slate-600">{row.receives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section: Step-by-Step Donation Process */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-semibold text-center mb-8 text-slate-900">The Donation Journey</h3>
          <div className="grid md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative">
              <span className="absolute top-4 right-4 text-3xl font-extrabold text-rose-100">01</span>
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <Info size={16} />
              </div>
              <h4 className="font-bold text-sm mb-1 text-slate-900">Registration</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Fill out a basic health and medical history questionnaire at the desk.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative">
              <span className="absolute top-4 right-4 text-3xl font-extrabold text-rose-100">02</span>
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <ShieldCheck size={16} />
              </div>
              <h4 className="font-bold text-sm mb-1 text-slate-900">Mini-Physical</h4>
              <p className="text-xs text-slate-500 leading-relaxed">A brief check of temperature, blood pressure, pulse, and hemoglobin levels.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative">
              <span className="absolute top-4 right-4 text-3xl font-extrabold text-rose-100">03</span>
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <Droplets size={16} />
              </div>
              <h4 className="font-bold text-sm mb-1 text-slate-900">The Donation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Actual donation takes roughly 8 to 10 minutes to draw one unit of blood.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative">
              <span className="absolute top-4 right-4 text-3xl font-extrabold text-rose-100">04</span>
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <CalendarCheck2 size={16} />
              </div>
              <h4 className="font-bold text-sm mb-1 text-slate-900">Refreshment</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Enjoy snacks and drinks in the recovery area for 10-15 minutes before leaving.</p>
            </div>

          </div>
        </div>

        {/* Section: Accordion FAQ */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 text-slate-700">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-slate-900">Common Questions</h3>
              <p className="text-xs text-slate-500">Quick medical requirements & rules</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left font-medium text-slate-800 hover:text-rose-600 transition-colors py-2 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed pl-1 transition-all">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;