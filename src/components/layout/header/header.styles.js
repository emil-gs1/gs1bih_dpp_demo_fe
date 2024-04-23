export const headerStyles = (theme) => ({
  headerContainer: {
    borderBottom: "2px solid #f26334",
    marginBottom: 100,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
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
  },
  loginButton: {
    color: "white",
    fontSize: "12px",
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    fontFamily: "GothamBold",
  },
});
