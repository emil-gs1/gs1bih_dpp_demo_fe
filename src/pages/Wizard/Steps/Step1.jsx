import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Step1 = ({ onNext }) => {
  const [numberInput, setNumberInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();
  const API_KEY = "70e2d58f1d924a4f860e507191d170dd"; //TODO: safe

  useEffect(() => {
    const productInfo = localStorage.getItem("productInfo");
    if (productInfo) {
      setResponseData(JSON.parse(productInfo));
    }
  }, []);

  useEffect(() => {
    console.log("responseData", responseData);
  }, [responseData]);

  const fetchDataFromAPI = () => {
    const requestBody = [numberInput];

    const headers = {
      "Content-Type": "application/json",
      APIKey: API_KEY,
    };

    axios
      .post("https://grp.gs1.org/grp-st/v3/gtins/verified", requestBody, {
        headers,
      })
      .then((response) => {
        console.log("API response:", response.data);

        if (response.data[0].validationErrors) {
          const errorData = response.data;
          errorData.forEach((errorItem) => {
            errorItem.validationErrors.forEach((validationError) => {
              validationError.errors.forEach((error) => {
                toast.error(error.message);
              });
            });
          });
        } else {
          setResponseData(response.data[0]);
          localStorage.setItem("productInfo", JSON.stringify(response.data[0]));
          toast.success("Uspjesno");
        }
      })
      .catch((error) => {
        toast.error("Greška");
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) || value === "") {
      setNumberInput(value);
    }
  };

  const handleNextStep = () => {
    onNext({ responseData });
  };

  return (
    <>
      {/* <Typography variant="primaryTitle">Informacije o proizvodu</Typography> */}
      <Grid container spacing={1} style={{ marginTop: "20px" }}>
        <Grid item xs={10}>
          <TextField
            type="number"
            label="Unesite barkod broj/GTIN"
            value={numberInput}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={fetchDataFromAPI}>
            Pretraga
          </Button>
        </Grid>
      </Grid>
      {responseData && (
        <div style={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="primaryTitle">
                License name: {responseData.licenseeName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleNextStep}>
                Sljedeci
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Step1;
