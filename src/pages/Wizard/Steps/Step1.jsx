import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import LoadingButton from "../../../components/buttons/LoadingButton";

const Step1 = ({ onNext }) => {
  const [numberInput, setNumberInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();
  const API_KEY = "6bcaa9940dce49f9a89703804ff1f16f"; //TODO: safe
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();

  useEffect(() => {
    console.log("responseeee", responseData);
    if (
      responseData !== null &&
      responseData.brandName &&
      responseData.netContent
    ) {
      //dodati jos
      const productInfoData = {
        gtin: responseData.gtin,
        brandName: responseData.brandName[0].value,
        productDescription: responseData.productDescription[0].value,
        gpcCategoryCode: responseData.gpcCategoryCode,
        netContent: responseData.netContent[0].value,
        unitCode: responseData.netContent[0].unitCode,
        countryOfSaleCode: responseData.countryOfSaleCode[0].alpha3,
      };

      setProductInfo(productInfoData);
    } else {
      setProductInfo(null);
    }
    if (responseData !== null) {
      const companyInfoData = {
        companyName: responseData.gs1Licence.licenseeName,
        address: responseData.gs1Licence.address,
        website: responseData.gs1Licence.contactPoint[0].website,
        licenceKey: responseData.gs1Licence.licenceKey,
        licenceType: responseData.gs1Licence.licenceType,
        gln: responseData.gs1Licence.licenseeGLN,
        memberOrg: responseData.gs1Licence.licensingMO.moName,
      };
      setCompanyInfo(companyInfoData);
    } else {
      setCompanyInfo(null);
    }
  }, [responseData]);

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
    let inputString = numberInput.toString();
    if (inputString.length === 13) {
      inputString = "0" + inputString;
    }

    const requestBody = [inputString];

    const headers = {
      "Content-Type": "application/json",
      APIKey: API_KEY,
    };
    setIsLoading(true);
    axios
      .post("https://grp.gs1.org/grp/v3.1/gtins/verified", requestBody, {
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
      })
      .finally(() => {
        setIsLoading(false);
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
      <Grid container spacing={1} style={{ marginTop: "20px" }}>
        <Grid item xs={8} sm={10}>
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
        <Grid item xs={4} sm={2}>
          <LoadingButton
            title={"Pretraga"}
            isLoading={isLoading}
            onClick={fetchDataFromAPI}
          />
        </Grid>
      </Grid>
      {responseData && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <Grid container spacing={3}>
            {/* Product Info Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="primaryTitle">Product Info</Typography>
              <div style={{ marginTop: "20px" }}>
                {productInfo && (
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>GTIN:</TableCell>
                          <TableCell>{productInfo.gtin}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Brand Name:</TableCell>
                          <TableCell>{productInfo.brandName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Product Description:</TableCell>
                          <TableCell>
                            {productInfo.productDescription}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Global Product Category Code:</TableCell>
                          <TableCell>{productInfo.gpcCategoryCode}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Net Content:</TableCell>
                          <TableCell>
                            {productInfo.netContent} {productInfo.unitCode}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Country of Sale:</TableCell>
                          <TableCell>{productInfo.countryOfSaleCode}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </Grid>
            {/* Company Info Section */}
            {companyInfo && (
              <Grid item xs={12} md={6}>
                <Typography variant="primaryTitle">Company Info</Typography>
                <div style={{ marginTop: "20px" }}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Company Name:</TableCell>
                          <TableCell>{companyInfo.companyName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Address:</TableCell>
                          <TableCell>
                            {companyInfo.address.streetAddress.value}{" "}
                            {companyInfo.address.addressLocality.value}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Website:</TableCell>
                          <TableCell>{companyInfo.website}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>License Key:</TableCell>
                          <TableCell>{companyInfo.licenceKey}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Licence Type:</TableCell>
                          <TableCell>{companyInfo.licenceType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>GLN:</TableCell>
                          <TableCell>{companyInfo.gln}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            Licensing GS1 Member Organisation:
                          </TableCell>
                          <TableCell>{companyInfo.memberOrg}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleNextStep}>
                Dalje
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Step1;
