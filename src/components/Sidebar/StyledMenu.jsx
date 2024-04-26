import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      fontSize: "14px",
      fontFamily: "Gotham",
      color: theme.palette.primary.main,
      "& .MuiSvgIcon-root": {
        fontSize: 12,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("location ", location);
  }, [location]);
  const { setAuth, auth } = useAuth();

  const loggedIn = auth && auth.accessToken && auth.email;
  const userRoles =
    auth !== null && auth.roles && auth.roles.length > 0 ? auth.roles : [];
  const isAdmin = userRoles.some((role) => role.name === "Admin");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = async () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    setAuth(null);
    toast.success("Uspješna odjava");
  };

  const handleAdminPage = () => {
    navigate("/admin");
  };

  const handleUserSettings = () => {
    navigate("/admin/settings");
  };
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Menu
      </Button>
      <StyledMenu
        disableScrollLock
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {loggedIn
          ? [
              <MenuItem key="logout" onClick={handleLogOut} disableRipple>
                Odjavi se
              </MenuItem>,
              isAdmin && [
                <Divider key="divider" sx={{ my: 0.5 }} />,
                <MenuItem key="admin" onClick={handleAdminPage} disableRipple>
                  Admin stranica
                </MenuItem>,
              ],
            ]
          : [
              <MenuItem key="login" onClick={handleLogin} disableRipple>
                Prijava
              </MenuItem>,
              <MenuItem key="register" onClick={handleClose} disableRipple>
                Registracija
              </MenuItem>,
            ]}
        {location.pathname === "/admin" && [
          <Divider key="divider" sx={{ my: 0.5 }} />,

          <MenuItem key="productTable" disableRipple>
            Pregled proizvoda
          </MenuItem>,
          <MenuItem key="addProduct" disableRipple>
            Dodaj proizvod
          </MenuItem>,
          <MenuItem
            key="accountSettings"
            onClick={handleUserSettings}
            disableRipple
          >
            Postavke računa
          </MenuItem>,
          <MenuItem key="usersSettings" disableRipple>
            Postavke korisnika
          </MenuItem>,
        ]}
      </StyledMenu>
    </div>
  );
}
