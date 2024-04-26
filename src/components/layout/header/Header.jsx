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
  // const location = useLocation();

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
          <CustomizedMenus style={{ marginLeft: "10px" }} />
        </Grid>
      </Grid>

      {/* <LoginModal
        open={open}
        handleClose={handleClose}  
        handleLogin={handleLogin}
        email={email}
        password={password}
        rememberMe={rememberMe}
        setEmail={setEmail}
        setPassword={setPassword}
        setRememberMe={setRememberMe}
      /> */}
    </header>
  );
};

export default Header;
