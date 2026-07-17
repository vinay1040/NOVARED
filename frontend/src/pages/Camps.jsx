import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CalendarDays, MapPin } from "lucide-react";
import BloodMap from "../components/shared/BloodMap";

function Camps() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/map/camps")
      .then((res) => res.json())
      .then((data) => setCamps(data))
      .catch(() => setCamps([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-12">
        <span className="block text-xs font-bold uppercase tracking-wide text-red-deep mb-2">Get Involved</span>
        <h1 className="font-serif text-4xl font-semibold mb-3">Upcoming Blood Donation Camps</h1>
        <p className="text-ink-soft max-w-2xl mb-10">
          Find a blood donation camp near you in Jodhpur. No appointment needed — just show up, and bring a valid ID.
        </p>

        <div className="mb-10">
          <BloodMap showCamps={true} showBank={false} />
        </div>

        {loading && (
          <div className="bg-paper border border-ink/10 rounded-[18px] p-8 text-center text-sm text-ink-soft">
            Loading camps...
          </div>
        )}

        {!loading && camps.length === 0 && (
          <div className="bg-paper border border-ink/10 rounded-[18px] p-8 text-center text-sm text-ink-soft">
            No upcoming camps found right now. Check back soon.
          </div>
        )}

        {!loading && camps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {camps.map((camp) => (
              <div key={camp.id} className="bg-paper border border-ink/10 rounded-[20px] p-7">
                <h3 className="font-serif text-xl font-semibold mb-3">{camp.title}</h3>
                <p className="flex items-center gap-2 text-sm text-ink-soft mb-1.5">
                  <CalendarDays size={15} /> {camp.date} · {camp.time}
                </p>
                <p className="flex items-center gap-2 text-sm text-ink-soft">
                  <MapPin size={15} /> {camp.venue}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Camps;