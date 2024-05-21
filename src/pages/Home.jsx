import { Button, CircularProgress, Typography, Divider } from "@mui/material";
import KeyValueAccordion from "../components/KeyValueAccordion";
import tmp from "../assets/img/tmp/tmp.jpg";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NoProductFound from "./Product/NoProductFound";
import apiService from "../api/apiService";
import locations from "../assets/icons/locations.png";

const Home = () => {
  //eslint-disable-next-line
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  let { gtin, lot } = useParams();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log({ gtin }, { lot });
  }, [gtin, lot]);

  useEffect(() => {
    setProductData(null);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get(
          "/api/ProductInfo/gtinlot?gtin=" + gtin + "&lot=" + lot
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

    if (gtin && lot) {
      fetchData();
    }
  }, [gtin, lot]);

  useEffect(() => {
    console.log("Product data is ", productData);
  }, [productData]);

  let productOverview,
    environmentalImpact,
    brandInformation,
    materialInformation,
    identifikator,
    complianceInforamtion,
    supplyChainInformation;
  if (productData) {
    productOverview = [
      { key: "Šifra identificiranja", value: "GTIN" },
      { key: "Naziv proizvoda", value: productData.productName },
      { key: "Opis artikla", value: productData.consumerFacingDescription },
      {
        key: "Šifra artikla u skeniranoj veličini",
        value: productData.articleNumber,
      },
      { key: "Sezona prodaje", value: productData.seasonOfIntendedSale },
      {
        key: "Godina početka proizvodnje artikla",
        value: productData.yearOfIntendedSale,
      },
      { key: "Valuta plaćanja", value: productData.priceCurrency },
      { key: "Cijena artikla", value: productData.resalePrice },
      { key: "Veličina", value: productData.size },
      { key: "Kod zemlje za velicinu", value: productData.countryCodeForSize },
      { key: "Boja", value: productData.colorBrand },
      { key: "Kategorija", value: productData.category },
      { key: "Grupa proizvoda", value: productData.productGroup },
      { key: "Tip proizvoda", value: productData.typeLineConcept },
      { key: "Vrsta proizvoda", value: productData.itemType },
      { key: "Za kupce", value: productData.ageGroup },
      { key: "Spol", value: productData.gender },
      { key: "Vodootporno", value: productData.waterProperties },
      { key: "Tezina artikla", value: productData.finalproductNetWeight },
      { key: "Jedinica mjere za tezinu", value: productData.unitOfWeight },
    ];

    if (productData.gS1Attributes) {
      const productNameIndex = productOverview.findIndex(
        (item) => item.key === "Šifra identificiranja"
      );

      productOverview.splice(productNameIndex + 1, 0, {
        key: "GTIN",
        value: productData.gS1Attributes.gtin,
      });
      productOverview.splice(productNameIndex + 2, 0, {
        key: "LOT",
        value: productData.gS1Attributes.lotNumber,
      });
    }

    if (productData.brandInformation) {
      brandInformation = [
        { key: "Brand", value: productData.brandInformation.brand },
        { key: "Sub brand", value: productData.brandInformation.subBrand },
        {
          key: "Brand logo",
          value: (
            <img
              src={`data:image/jpeg;base64,${productData.brandInformation.logo}`}
              alt="Product Image"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          ),
        },
      ];
    }

    if (productData.materialInformation) {
      materialInformation = [
        { key: "Materijal", value: productData.materialInformation.material },
        {
          key: "Sastav materijala",
          value: productData.materialInformation.contentName,
        },
        {
          key: "Reciklirani materijal",
          value: productData.materialInformation.recycled,
        },
        {
          key: "Procenat recikliranog materijala",
          value: productData.materialInformation.recycledPercentage,
        },
        { key: "Print", value: productData.materialInformation.printInkType },
        {
          key: "Sastav materijala konca",
          value: productData.materialInformation.sewingThreadContent,
        },
      ];
    }

    if (productData.digitalIdentifierInformation) {
      identifikator = [
        {
          key: "Nacin identifikacije",
          value:
            productData.digitalIdentifierInformation.dataCarrierIdentifierType,
        },
        {
          key: "Materijal za izradu identifikatora",
          value:
            productData.digitalIdentifierInformation
              .dataCarrierIdentifierMaterial,
        },
        {
          key: "Lokacija identifikatora",
          value:
            productData.digitalIdentifierInformation
              .dataCarrierIdentifierLocation,
        },
      ];
    }

    if (productData.complianceInformation) {
      complianceInforamtion = [
        { key: "Sigurnosne informacije", value: "PROVJERITI" },
        {
          key: "Opasne materije",
          value: productData.complianceInformation.harmfulSubstances,
        },
        {
          key: "Detaljne informacije o opasnim materijama",
          value: productData.complianceInformation.harmfulSubstancesInfo,
        },
        {
          key: "Certifikati",
          value: productData.complianceInformation.certifications,
        },
        {
          key: "Mikrofiberi",
          value: productData.complianceInformation.microfibers,
        },
        {
          key: "Uskladjenost hemijskih propisa",
          value: productData.complianceInformation.chemicalComplianceStandard,
        },
      ];
    }

    if (productData.supplyChainInformation) {
      supplyChainInformation = [
        {
          key: "Dobavljac",
          value: productData.supplyChainInformation.supplierName,
        },
        {
          key: "Lokacija dobavljaca",
          value: productData.supplyChainInformation.supplierLocation,
        },
        {
          key: "Drzava porijekla - sivanje",
          value:
            productData.supplyChainInformation.countryOfOriginWeavingKnitting,
        },
        {
          key: "Drzava porijekla - krojenje",
          value:
            productData.supplyChainInformation.countryOfOriginDyeingPrinting,
        },
      ];
    }

    environmentalImpact = [
      { key: "Potrošnja vode, po jedinici", value: "15 000 litara" },
      { key: "Sadržaj recikliranog materijala, u %", value: "40%" },
      { key: "Potrošnja hemikalije, po jedinici", value: "8kg" },
      { key: "Emisije GHG proizvedenog odjevnog predmeta", value: "205,4" },
      { key: "Emisija CO2e, po jedinici ", value: "30kg" },
      { key: "Minimalna trajnost proizvoda u godinama", value: "10 godina" },
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

  const handleTrackAndTrace = () => {
    navigate("/track-and-trace");
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
                  Digital Product Passport
                </Typography>
                {productData.photo ? (
                  <img
                    style={{
                      marginTop: 20,
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                      width: "40%",
                    }}
                    src={`data:image/png;base64,${productData.photo}`}
                    alt="Product Photo"
                  />
                ) : (
                  <img
                    style={{
                      marginTop: 20,
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                      width: "20%",
                    }}
                    src={tmp}
                    alt="Default Photo"
                  />
                )}
              </div>
              <div style={{ marginTop: "20px" }}>
                <Typography variant="primaryTitle">
                  {productData.productName}
                </Typography>
                <Divider
                  style={{
                    width: "40%",
                    margin: "auto",
                    backgroundColor: "#f26334",
                    height: "1px",
                  }}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Button variant="contained" onClick={handleTrackAndTrace}>
                  <img
                    src={locations}
                    alt="icon"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                      filter:
                        "brightness(0) invert(1) sepia(0) saturate(0) hue-rotate(0deg)",
                      WebkitFilter:
                        "brightness(0) invert(1) sepia(0) saturate(0) hue-rotate(0deg)", // For Safari
                    }}
                  />
                  CO2
                </Button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <KeyValueAccordion
                  title={"Informacije o proizvodu"}
                  data={productOverview}
                  defaultExpanded={true}
                />
                {productData.brandInformation && (
                  <KeyValueAccordion
                    title={"Brand informacije"}
                    data={brandInformation}
                  />
                )}
                {productData.materialInformation && (
                  <KeyValueAccordion
                    title={"Informacije o materijalima"}
                    data={materialInformation}
                  />
                )}
                {productData.digitalIdentifierInformation && (
                  <KeyValueAccordion
                    title={"Identifikator"}
                    data={identifikator}
                  />
                )}
                {productData.complianceInformation && (
                  <KeyValueAccordion
                    title={"Informacije o uskladjenosti"}
                    data={complianceInforamtion}
                  />
                )}
                {productData.supplyChainInformation && (
                  <KeyValueAccordion
                    title={"Lanac snabdijevanja"}
                    data={supplyChainInformation}
                  />
                )}

                <KeyValueAccordion
                  title={"Uticaj na životnu sredinu"}
                  data={environmentalImpact}
                />
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
