import { useEffect, useState } from "react";
// import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}





















// export default function App() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     axios
//       .get("http://127.0.0.1:5000/")
//       .then((response) => {
//         if (mounted) setData(response.data);
//       })
//       .catch((err) => {
//         if (mounted) setError(err.message || "Request failed");
//       });
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   if (error) return <div>Error: {error}</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       {/* <h1>Backend response</h1> */}
//       {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}





//       {}
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           {/* <Route path="/login" element={<Login />} /> */}
//         </Routes>
//       </BrowserRouter>
//       {}

//     </div>
//   );
// }

