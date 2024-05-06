import { toast } from "react-toastify";
import { Grid, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PhotoUploadField from "../../../components/PhotoUploadField";

const Step4 = ({ data, onNext, onPrevious }) => {
  const [productName, setProductName] = useState("");
  const [testNumber, setTestNumber] = useState("");

  const handleNext = () => {
    if (productName.trim() !== "") {
      onNext({ productName });
    } else {
      toast.error("Please enter a product name");
    }
  };

  return (
    <>
      {/* <Typography variant="primaryTitle">Informacije o proizvodu</Typography> */}
      <Grid container spacing={2} style={{ padding: "0px 200px 0px 200px" }}>
        <Grid item xs={12} md={6}>
          <TextField
            name={"performance"}
            label={"Performance"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"recyclability"}
            label={"Recyclability"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"takeBackInstructions"}
            label={"Take Back Instructions"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"recyclingInstructions"}
            label={"Recycling Instructions"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"disassemblyInstructionsSorters"}
            label={"Disassembly Instructions Sorters"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"disassemblyInstructionsUser"}
            label={"Disassembly Instructions User"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"circularDesignStrategy"}
            label={"Circular Design Strategy"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"circularDesignStrategyDescription"}
            label={"Circular Design Strategy Description"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"repairInstructions"}
            label={"Repair Instructions"}
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

export default Step4;
