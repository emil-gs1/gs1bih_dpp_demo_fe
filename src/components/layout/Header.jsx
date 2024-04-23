import { Button, Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/img/logo/GS1_Bosnia_Herzegovina_Localised3_PPT_And_Word_2016-11-02.png";
import { useState } from "react";
import LoginModal from "../../modals/LoginModal";

const Header = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Zapamti me:", rememberMe);
    handleClose();
  };

  return (
    <header
      style={{
        borderBottom: "2px solid #f26334",
        marginBottom: 100,
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} width={"30%"}></img>
        </Grid>

        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            alignItems: "center",
            padding: 40,
            paddingRight: "11%",
          }}
        >
          <Button
            style={{
              color: "white",
              fontSize: "12px",
              backgroundColor: theme.palette.secondary.main,
              marginLeft: "auto",
              fontFamily: "GothamBold",
            }}
            onClick={handleOpen}
          >
            Prijava
          </Button>
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
