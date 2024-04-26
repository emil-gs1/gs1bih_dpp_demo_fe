import { Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const goBack = () => navigate(-1);

  return (
    <section>
      <Typography variant="primaryTitle">Unauthorized</Typography>
      <br />
      <Typography variant="tableContent">
        Nemate pristup ovoj stranici.
      </Typography>
      <div style={{ marginTop: "20px" }}>
        <Button
          style={{
            color: theme.palette.primary.main,
            fontSize: "12px",
            marginLeft: "auto",
            fontFamily: "GothamBold",
          }}
          onClick={goBack}
        >
          Nazad
        </Button>
      </div>
    </section>
  );
};

export default Unauthorized;
