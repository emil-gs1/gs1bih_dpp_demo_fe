import React from "react";
import Header from "./header/Header";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
      }}
    >
      <Header />
      <main style={{ marginTop: 100 }}>{children}</main>
      {/* <Footer />     */}
    </div>
  );
};

export default Layout;
