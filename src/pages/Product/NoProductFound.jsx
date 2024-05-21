import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import KeyValueAccordion from "../../components/KeyValueAccordion";
import axios from "../../api/axios";
import apiService from "../../api/apiService";
import { useNavigate } from "react-router-dom";

const NoProductFound = () => {
  const [products, setProducts] = useState(null);
  const [productsOverview, setProductOverview] = useState(null);
  const baseUrl = window.location.origin;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Base url is", baseUrl);
    const fetchData = async () => {
      try {
        const response = await apiService.get("/api/ProductInfo/all");

        setProducts(response.data.data);
        console.log("response is", response.data.data);
        const overview = response.data.data
          .filter(
            (product) =>
              product.isDraft === false &&
              product.gS1Attributes &&
              product.gS1Attributes.gtin
          )
          .map((product) => ({
            key: product.productName,
            value: (
              <Typography
                variant="tableContent"
                sx={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(
                    `/01/${product.gS1Attributes.gtin}/10/${product.gS1Attributes.lotNumber}`
                  )
                }
              >
                /01/{product.gS1Attributes.gtin}/10/
                {product.gS1Attributes.lotNumber}
              </Typography>
            ),
          }));
        setProductOverview(overview);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {productsOverview !== null ? (
        <KeyValueAccordion
          title={"Proizvodi"}
          data={productsOverview}
          defaultExpanded={true}
        />
      ) : (
        <Typography variant="primaryTitle">Nema proizvoda ...</Typography>
      )}
    </>
  );
};

export default NoProductFound;
