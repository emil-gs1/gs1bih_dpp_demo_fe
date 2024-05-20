import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../../../assets/img/logo/GS1_Bosnia_Herzegovina_Localised3_PPT_And_Word_2016-11-02.png";
import { headerStyles } from "./header.styles";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CustomizedMenus from "../../Sidebar/StyledMenu";

const Header = () => {
  const theme = useTheme();
  const styles = headerStyles(theme);
  const navigate = useNavigate();

  return (
    <header style={styles.headerContainer}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={8} md={6}>
          <div
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <img
              src={logo}
              style={{ width: "100%", maxWidth: "200px" }}
              alt="Logo"
            />
          </div>
        </Grid>
        <Grid item xs={4} md={6}>
          <Grid container justifyContent="center">
            <CustomizedMenus />
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
