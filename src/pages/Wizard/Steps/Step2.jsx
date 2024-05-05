import { toast } from "react-toastify";
import { Grid, Button, TextField } from "@mui/material";
import { useState } from "react";

const Step2 = ({ data, onNext, onPrevious }) => {
  const [productName, setProductName] = useState("");

  const handleNext = () => {
    if (productName.trim() !== "") {
      onNext({ productName });
    } else {
      toast.error("Please enter a product name");
    }
  };

  return (
    <>
      <Grid item xs={12}>
        {/* <input
          type="text"
          placeholder="Naziv test"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        /> */}
        <TextField
          name={"test"}
          label={"test"}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        {data && (
          <Button variant="contained" onClick={onPrevious}>
            Prethodni
          </Button>
        )}
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" onClick={handleNext}>
          Sljedeci
        </Button>
      </Grid>
    </>
  );
};

export default Step2;
