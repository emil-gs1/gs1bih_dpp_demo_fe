import "./App.css";
import Missing from "./components/Missing";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import AccountSettings from "./pages/Admin/AccountSettings.jsx";
import AddProduct from "./pages/Product/AddProduct.jsx";

const roles = {
  Admin: "Admin",
  User: "User",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Missing />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<RequireAuth allowedRoles={[roles.Admin]} />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/settings" element={<AccountSettings />} />
      </Route>
      <Route path="/admin/addProduct" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
