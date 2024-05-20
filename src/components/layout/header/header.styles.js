import zIndex from "@mui/material/styles/zIndex";

export const headerStyles = (theme) => ({
  headerContainer: {
    borderBottom: "2px solid #f26334",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
    zIndex: 999,
  },
  logoStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginGrid: {
    display: "flex",
    alignItems: "center",
    padding: 40,
    paddingRight: "11%",
    justifyContent: "space-between",
  },

  loginButton: {
    color: "white",
    fontSize: "12px",
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    fontFamily: "GothamBold",
  },
  menuButtom: {
    color: theme.palette.primary.main,
    fontSize: "12px",
    marginLeft: "auto",
    fontFamily: "GothamBold",
  },
  gap: {
    marginLeft: theme.spacing(1),
  },
});
