import "./App.css";
import Missing from "./components/Missing";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
