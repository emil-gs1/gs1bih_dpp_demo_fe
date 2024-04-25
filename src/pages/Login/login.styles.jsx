import React from "react";
import { Typography } from "@mui/material";
import { Container, keyframes } from "@mui/system";

const bounce = keyframes({
  "0%": {
    transform: "translateY(-10px)",
  },
  "50%": {
    transform: "translateY(10px)",
  },
  "100%": {
    transform: "translateY(-10px)",
  },
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const loginStyles = {
  container: {
    border: "1px solid #f26334",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    width: 350,
    p: 4,
    "& .MuiTextField-root": {
      mb: 2,
    },
  },

  loginButton: {
    display: "flex",
    justifyContent: "flex-end",
    mt: 2,
  },
  errorMessage: {
    backgroundColor: "#f26334",
    color: "#fff",
    borderRadius: "12px",
    padding: "8px",
    textAlign: "center",
    animation: `${bounce} 2s ease-in-out infinite, ${fadeIn} 2s ease-in`,
  },
};

const ErrorLabel = ({ children }) => {
  return <Container style={loginStyles.errorMessage}>{children}</Container>;
};

export default ErrorLabel;
