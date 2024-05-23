import "./App.css";
import Missing from "./components/Missing";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import AccountSettings from "./pages/Admin/AccountSettings.jsx";
import AddProduct from "./pages/Product/AddProduct.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TrackAndTrace from "./pages/TrackAndTrace/TrackAndTrace.jsx";

const roles = {
  Admin: "Admin",
  User: "User",
};

function App() {
  const location = useLocation();

  // useEffect(() => {
  //   // console.log(import.meta.env.VITE_SOME_KEY); // "123"

  //   const clearLocalStorage = () => {
  //     if (
  //       location.pathname !== "/admin/addProduct" &&
  //       location.pathname !== "/track-and-trace"
  //     ) {
  //       localStorage.clear();
  //     }
  //   };

  //   clearLocalStorage();

  //   const unlisten = () => {
  //     clearLocalStorage();
  //   };

  //   return unlisten;
  // }, [location]);

  return (
    <Routes basename="/gs1bih_dpp_demo_fe">
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Missing />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/01/:gtin/10/:lot" element={<Home />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/track-and-trace" element={<TrackAndTrace />} />

      <Route element={<RequireAuth allowedRoles={[roles.Admin]} />}>
        <Route path="/admin/settings" element={<AccountSettings />} />
      </Route>
      <Route path="/admin/addProduct" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
