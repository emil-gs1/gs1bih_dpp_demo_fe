import { Typography, Grid, CircularProgress, Button } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import axios from "../../../api/axios";

const GenerateQrCode = ({ onFinish }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lotNumber, setLotNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [gtin, setGtin] = useState("");
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const productIdStorage = localStorage.getItem("productId");
    setProductId(productIdStorage);
  }, []);

  const fetchData = useCallback(async () => {
    setErrorMessage("");
    try {
      const productInfo = localStorage.getItem("productInfo");
      const productInfoJson = JSON.parse(productInfo);
      const gtinStorage = productInfoJson.gtin;
      setGtin(gtinStorage);

      const response = await axios.get("https://localhost:7127/api/Resolver", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response && response.data) {
        const lotNumber = response.data;
        setLotNumber(lotNumber);
        console.log("Id is ", productId);
        const values = {
          identificationKeyType: "gtin",
          identificationKey: gtin,
          itemDescription: "Test",
          qualifierPath: "/10/" + lotNumber,
          public: true,
          responses: [
            {
              linkType: "gs1:pip",
              language: "en",
              context: "us",
              mimeType: "text/html",
              linkTitle: "Where to buy",
              targetUrl: "http://localhost:5173/id/" + productId,
              defaultLinkType: true,
              defaultLanguage: true,
              defaultContext: true,
              defaultMimeType: true,
              fwqs: true,
              public: true,
            },
          ],
        };

        const resolverResponse = await axios.post(
          "https://localhost:7127/api/Resolver",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (resolverResponse.status === 200) {
          const barcodeResponse = await axios.post(
            "https://localhost:7127/api/Barcode/generate",
            {
              uri: "https://resolver-st.gs1.org",
              gtin,
              lotNumber,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              responseType: "arraybuffer",
            }
          );

          if (
            barcodeResponse.data &&
            barcodeResponse.data.byteLength > 0 &&
            barcodeResponse.status === 200
          ) {
            const byteArray = new Uint8Array(barcodeResponse.data);
            const base64String = btoa(
              String.fromCharCode.apply(null, byteArray)
            );
            const dataUrl = `data:image/jpeg;base64,${base64String}`;
            setImageSrc(dataUrl);
          } else {
            setErrorMessage("Error generating barcode");
            console.error("Empty or invalid image data received.");
          }
        } else {
          setErrorMessage("Error setting resolver api");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [productId, gtin]);

  useEffect(() => {
    console.log("fetch data calling");
    if (productId) {
      fetchData();
    }
  }, [fetchData]);

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7127/api/GS1Attributes",
        {
          productID: productId,
          gtin,
          lotNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response from finish is", response);
      onFinish();
    } catch (error) {
      console.log("Error setting gtin and lot number for product");
    } finally {
      setIsLoading(false);
    }

    onFinish();
  };

  return (
    <Grid container>
      {isLoading && (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      )}
      {!isLoading && lotNumber && (
        <Grid item xs={12}>
          <Typography variant="primaryTitle">
            Generisani lot: {lotNumber}
          </Typography>
        </Grid>
      )}
      {!isLoading && errorMessage && !imageSrc && (
        <Grid item xs={12}>
          <Typography variant="primaryTitle" style={{ color: "red" }}>
            {errorMessage}
          </Typography>
        </Grid>
      )}
      {!isLoading && imageSrc && (
        <Grid item xs={12}>
          <img src={imageSrc} alt="Generated Barcode" />
        </Grid>
      )}

      {!isLoading && imageSrc && lotNumber && (
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleFinish}>
            Završi
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default GenerateQrCode;
