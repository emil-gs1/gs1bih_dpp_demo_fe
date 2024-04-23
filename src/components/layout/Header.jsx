import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/img/logo/GS1_Bosnia_Herzegovina_Localised3_PPT_And_Word_2016-11-02.png";

const Header = () => {
  const theme = useTheme();
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
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
