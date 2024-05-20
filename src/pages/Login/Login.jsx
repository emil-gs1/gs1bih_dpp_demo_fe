import React from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { loginStyles } from "./login.styles";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/img/logo/GS1_Bosnia_Herzegovina_Localised3_PPT_And_Word_2016-11-02.png";
import ErrorLabel from "./login.styles.jsx";
import { LOGIN_URL } from "../../api/api.types.js";
import LoadingButton from "../../components/buttons/LoadingButton.jsx";
import { useLocation } from "react-router-dom";
import apiService from "../../api/apiService.js";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = loginStyles(isMobile);
  const { setAuth } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const promiseToast = toast.promise(
        apiService.post(
          LOGIN_URL,
          JSON.stringify({ email, password, rememberMe })
        ),
        {
          pending: "Prijava...",
          success: "Uspješna prijava",
          error: "Neuspješna prijava",
        }
      );

      const response = await promiseToast;
      console.log("response login", response);
      if (response.status === 200) {
        const accessToken = response?.data?.data.token;
        const roles = response?.data?.data.roles;
        console.log("From is ", from);
        console.log("Roles are", roles);
        setAuth({ email, roles, accessToken });
        setEmail("");
        setPassword("");
        navigate(from);
      }
    } catch (err) {
      err.response ? setErrMsg(err.response.data) : setErrMsg(err.message);
    } finally {
      setIsLoading(false);
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
          <Box sx={styles.container}>
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
            <Box sx={styles.loginButton}>
              <LoadingButton
                title={"Prijava"}
                onClick={handleLogin}
                isLoading={isLoading}
              />
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
