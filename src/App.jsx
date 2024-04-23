import "./App.css";
import Home from "./pages/Home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./static/theme";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
