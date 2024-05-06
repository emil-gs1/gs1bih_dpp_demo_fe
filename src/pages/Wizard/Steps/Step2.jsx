import { toast } from "react-toastify";
import { Grid, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PhotoUploadField from "../../../components/PhotoUploadField";

const Step2 = ({ data, onNext, onPrevious }) => {
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
            name={"productName"}
            label={"Naziv proizvoda"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"description"}
            label={"Opis proizvoda"}
            value={testNumber}
            onChange={(e) => setTestNumber(e.target.value)}
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
            name={"articleNumber"}
            label={"Broj artikla"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            name={"itemNumber"}
            label={"Item number"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            name={"poNumber"}
            label={"po number"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            name={"yearOfIntendedSale"}
            label={"Godina planirane prodaje"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"seasonOfIntendedSale"}
            label={"Sezona planirane prodaje"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"priceCurrency"}
            label={"Valuta"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"msrp"}
            label={"MSRP"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"resalePrice"}
            label={"Resale price"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"size"}
            label={"Velicina"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"countryCodeForSize"}
            label={"Kod zemlje za veličinu"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"color"}
            label={"Boja"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name={"category"}
            label={"Kategorija"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"productGroup"}
            label={"Grupa proizvoda"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"typeLineConcept"}
            label={"TypeLineConcept"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"itemType"}
            label={"ItemType"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"ageGroup"}
            label={"Dobna grupa"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"gender"}
            label={"Spol"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"marketSegment"}
            label={"Market Segment"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"waterProperties"}
            label={"WaterProperties"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"finalProductNetWeight"}
            label={"Tezina proizvoda"}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "100%" }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name={"unitOfWeight"}
            label={"Jedinica težine"}
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

export default Step2;
