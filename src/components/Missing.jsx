import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div>
      <div>
        <Typography variant="primaryBigTitle">
          Stranica nije pronađena
        </Typography>
        <br />
        <Typography variant="secondary">
          Stanica koju tražite nije pronađena
        </Typography>
        <div className="flexGrow">
          <Link to="/">Nazad na početnu stranicu</Link>
        </div>
      </div>
    </div>
  );
};

export default Missing;
