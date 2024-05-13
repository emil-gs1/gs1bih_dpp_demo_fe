import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import KeyValueAccordion from "../../components/KeyValueAccordion";
import axios from "../../api/axios";

const NoProductFound = () => {
  const [products, setProducts] = useState(null);
  const [productsOverview, setProductOverview] = useState(null);
  const baseUrl = window.location.origin;

  useEffect(() => {
    console.log("Base url is", baseUrl);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7127/api/ProductInfo/all"
        );

        setProducts(response.data.data);
        console.log("response is", response.data.data);
        const overview = response.data.data.map((product) => ({
          key: product.productName,
          value: (
            <a
              href={`${baseUrl}/id/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {baseUrl}/01/{product.gS1Attributes.gtin}/10/
              {product.gS1Attributes.lotNumber}
            </a>
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
        <KeyValueAccordion title={"Proizvodi"} data={productsOverview} />
      ) : (
        <Typography variant="primaryTitle">Nema proizvoda ...</Typography>
      )}
    </>
  );
};

export default NoProductFound;
