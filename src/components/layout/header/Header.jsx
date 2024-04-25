import { Button, Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../../../assets/img/logo/GS1_Bosnia_Herzegovina_Localised3_PPT_And_Word_2016-11-02.png";
import { useState, useRef, useEffect } from "react";
import LoginModal from "../../../modals/login/LoginModal";
import { headerStyles } from "./header.styles";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LOGIN_URL = "/api/User/login";

const Header = () => {
  const theme = useTheme();
  const styles = headerStyles(theme);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { setAuth } = useAuth();

  const { auth } = useAuth();
  const loggedIn = auth && auth.accessToken && auth.email;
  const userRoles =
    auth !== null && auth.roles && auth.roles.length > 0 ? auth.roles : [];
  const isAdmin = userRoles.some((role) => role.name === "Admin");

  useEffect(() => {
    console.log("Roles are: ", userRoles);
    console.log("Auth is here", auth);
  }, [auth]);

  const navigate = useNavigate();
  const location = useLocation();

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    try {
      console.log("Login called");
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password, rememberMe }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      console.log(response?.data);
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });
      setEmail("");
      setPassword("");
      // navigate(from, { replace: true });
    } catch (err) {
      console.log("Catch login called", err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
    handleClose();
  };

  const handleLogOut = () => {
    setAuth(null);
    toast.success("Uspješna odjava");
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleAdminPage = () => {
    navigate("/admin");
  };
  return (
    <header style={styles.headerContainer}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} width={"30%"} alt="Logo" />
          </div>
        </Grid>

        <Grid item xs={6}>
          {loggedIn ? (
            <React.Fragment>
              {isAdmin && (
                <Button style={styles.menuButtom} onClick={handleAdminPage}>
                  Admin stranica
                </Button>
              )}
              <Button
                style={{ ...styles.loginButton, marginLeft: "10px" }}
                onClick={handleLogOut}
              >
                Odjavi se
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button style={styles.loginButton} onClick={handleNavigate}>
                Prijava
              </Button>
              <Button
                style={{ ...styles.loginButton, marginLeft: "10px" }}
                onClick={handleOpen}
              >
                Registracija
              </Button>
            </React.Fragment>
          )}
        </Grid>
      </Grid>

      <LoginModal
        open={open}
        handleClose={handleClose}
        handleLogin={handleLogin}
        email={email}
        password={password}
        rememberMe={rememberMe}
        setEmail={setEmail}
        setPassword={setPassword}
        setRememberMe={setRememberMe}
      />
    </header>
  );
};

export default Header;
