import { toast } from "react-toastify";
import { Grid, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PhotoUploadField from "../../../components/PhotoUploadField";

const Step3 = ({ data, onNext, onPrevious }) => {
  const [productName, setProductName] = useState("");
  const [testNumber, setTestNumber] = useState("");

  const handleNext = () => {
    // if (productName.trim() !== "") {
    onNext({ productName });
    // } else {
    //   toast.error("Please enter a product name");
    // }
  };

  return (
    <>
      <Grid container spacing={2} style={{ padding: "0px 200px 0px 200px" }}>
        <Grid item xs={12} md={6}>
          <TextField
            name={"brand"}
            label={"Brand"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PhotoUploadField />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"subBrand"}
            label={"Sub brand"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"parentCompany"}
            label={"Parent company"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"trader"}
            label={"Trader"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"traderLocation"}
            label={"Trader location"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={6} md={6}>
          {data && (
            <Button variant="contained" onClick={onPrevious}>
              Prethodni
            </Button>
          )}
        </Grid>
        <Grid item xs={6} md={6}>
          <Button variant="contained" onClick={handleNext}>
            Sljedeci
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Step3;
