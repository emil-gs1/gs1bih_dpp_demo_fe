import { createTheme } from "@mui/material/styles";

export const shades = {
  primary: {
    500: "#002c6c",
  },

  secondary: {
    500: "#f26334",
  },
  neutral: {},
};

const theme = createTheme({
  palette: {
    primary: { main: shades.primary[500] },
    secondary: { main: shades.secondary[500] },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  },
  typography: {
    fontFamily: "Gotham",
    primaryTitle: {
      color: "#012c6d",
      fontSize: "14px",
      fontFamily: "GothamBold",
    },
    primaryBigTitle: {
      color: "#012c6d",
      fontSize: "24px",
      fontFamily: "GothamBold",
    },
    secondaryTitle: {
      color: "#012c6d",
      fontSize: "12px",
      fontFamily: "GothamBold",
    },
    secondary: {
      color: "#012c6d",
      fontSize: "12px",
      fontFamily: "Gotham",
    },
    tableContent: {
      color: "#012c6d",
      fontSize: "12px",
      fontFamily: "Gotham",
    },
  },
});

export default theme;
