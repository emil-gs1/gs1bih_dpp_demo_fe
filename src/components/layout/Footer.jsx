import { useTheme } from "@mui/material/styles";
import React from "react";

const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      style={{
        marginTop: "auto",
        bottom: "0",
        position: "fixed",
        left: "0",
        width: "100%",
      }}
    >
      <p style={{ backgroundColor: theme.palette.primary.main }}>
        &copy; 2024 GS1 Bosne i Hercegovine
      </p>
    </footer>
  );
};

export default Footer;
