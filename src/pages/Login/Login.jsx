import {
  Button,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Container,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { loginStyles } from "./login.styles";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/img/logo/GS1_Bosnia_Herzegovina_Localised3_PPT_And_Word_2016-11-02.png";
import ErrorLabel from "./login.styles.jsx";

const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const LOGIN_URL = "/api/User/login";
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    console.log("from is ", from);
  }, [from]);

  const handleLogin = async () => {
    try {
      console.log("Login called");

      const promiseToast = toast.promise(
        axios.post(LOGIN_URL, JSON.stringify({ email, password, rememberMe }), {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }),
        {
          pending: "Prijava...",
          success: "Uspješna prijava",
          error: "Neuspješna prijava",
        }
      );

      const response = await promiseToast;

      if (response.status === 200) {
        const accessToken = response?.data?.token;
        const roles = response?.data?.roles;
        setAuth({ email, roles, accessToken }); //pwd removed
        setEmail("");
        setPassword("");
        navigate(from);
      } else {
      }
    } catch (err) {
      console.log("Catch login called", err);
      err.response ? setErrMsg(err.response.data) : setErrMsg(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Box
            sx={{ textAlign: "center", marginBottom: theme.spacing(45) }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} width={"50%"} alt="Logo" />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={loginStyles.container}>
            <TextField
              label="Email"
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: 12,
                    color: theme.palette.primary.main,
                    fontFamily: "Gotham",
                  }}
                >
                  Zapamti me
                </Typography>
              }
            />
            <Box sx={loginStyles.loginButton}>
              <Button onClick={handleLogin} variant="contained">
                Prijava
              </Button>
            </Box>
          </Box>
        </Grid>
        {errMsg && (
          <Grid item xs={12}>
            <ErrorLabel>{errMsg}</ErrorLabel>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Login;
