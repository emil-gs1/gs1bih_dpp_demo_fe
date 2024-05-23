import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./static/theme";
import Layout from "./components/layout/Layout";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes basename="/gs1bih_dpp_demo_fe">
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <Layout>
                  <App />
                </Layout>
              }
            />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
    <ToastContainer position="bottom-right" theme="light" />
  </React.StrictMode>
);
