import { Button, CircularProgress, Typography } from "@mui/material";
import KeyValueAccordion from "../components/KeyValueAccordion";
import tmp from "../assets/img/tmp/tmp.jpg";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import NoProductFound from "./Product/NoProductFound";

const Home = () => {
  //eslint-disable-next-line
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  let { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProductData(null);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://localhost:7127/api/ProductInfo/id?id=" + id,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("repsone is ", response);
        setProductData(response.data.data);
      } catch (error) {
        console.log("INSIDE CATCH");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("Product data is ", productData);
  }, [productData]);

  let productOverview, serialNumber, environmentalImpact, material, certifcates;
  if (productData) {
    productOverview = [
      { key: "GTIN", value: "03870000000204" },
      { key: "Naziv brenda", value: productData.productName },
      { key: "Veličina", value: productData.size },
      { key: "Težina", value: productData.finalProductNetWeight },
      { key: "Boja", value: productData.colorGeneral },
      { key: "Glavni materijal", value: productData.productGroup },
      { key: "Kategorija", value: productData.category },
      { key: "Godina prodaje", value: productData.yearOfIntendedSale },
      { key: "Cijena", value: productData.resalePrice },
    ];

    serialNumber = [{ key: "broj", value: "4722" }];

    environmentalImpact = [
      { key: "Potrošnja vode, po jedinici", value: "15 000 litara" },
      { key: "Sadržaj recikliranog materijala, u %", value: "40%" },
      { key: "Potrošnja hemikalije, po jedinici", value: "8kg" },
      { key: "Emisije GHG proizvedenog odjevnog predmeta", value: "205,4" },
      { key: "Emisija CO2e, po jedinici ", value: "30kg" },
      { key: "Minimalna trajnost proizvoda u godinama", value: "10 godina" },
    ];
    material = [
      { key: "Reciklirani organski pamuk", value: "90%" },
      { key: "Poliester", value: "10%" },
    ];

    certifcates = [
      { key: "Grüner Knopf", value: "Da" },
      { key: "C2C Bronze", value: "Da" },
      { key: "GOTS", value: "Da" },
    ];
  }
  const handleClick = () => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log("Inside catch");
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {productData !== null ? (
            <div>
              <div
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <Typography variant="primaryBigTitle">
                  Digital Product Pass
                </Typography>
                <img
                  style={{
                    marginTop: 20,
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                    width: "20%",
                  }}
                  src={tmp}
                />
              </div>

              <div>
                <Button onClick={handleClick}>Click to test</Button>
              </div>
              <div style={{ padding: 100 }}>
                <KeyValueAccordion
                  title={"Pregled proizvoda"}
                  data={productOverview}
                />
                <KeyValueAccordion
                  title={"Serijski broj"}
                  data={serialNumber}
                />
                <KeyValueAccordion
                  title={"Uticaj na životnu sredinu"}
                  data={environmentalImpact}
                />
                <KeyValueAccordion title={"Materijal"} data={material} />
                <KeyValueAccordion title={"Certifikati"} data={certifcates} />
              </div>
            </div>
          ) : (
            <NoProductFound />
          )}
        </>
      )}
    </>
  );
};

export default Home;
