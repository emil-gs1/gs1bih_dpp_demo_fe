import { Button, Typography } from "@mui/material";
import KeyValueAccordion from "../components/KeyValueAccordion";
import tmp from "../assets/img/tmp/tmp.jpg";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const productOverview = [
    { key: "GTIN", value: "4047112223459" },
    { key: "Naziv brenda", value: "GS1" },
    { key: "Veličina", value: "Medium" },
    { key: "Težina", value: "1.3 kg" },
    { key: "Boja", value: "Green" },
    { key: "Glavni materijal", value: "Jeans" },
    { key: "Kategorija", value: "Jacket" },
    { key: "Godina prodaje", value: "2024" },
    { key: "Cijena", value: "159.00 BAM" },
  ];

  const serialNumber = [{ key: "broj", value: "4722" }];

  const environmentalImpact = [
    { key: "Potrošnja vode, po jedinici", value: "15 000 litara" },
    { key: "Sadržaj recikliranog materijala, u %", value: "40%" },
    { key: "Potrošnja hemikalije, po jedinici", value: "8kg" },
    { key: "Emisije GHG proizvedenog odjevnog predmeta", value: "205,4" },
    { key: "Emisija CO2e, po jedinici ", value: "30kg" },
    { key: "Minimalna trajnost proizvoda u godinama", value: "10 godina" },
  ];
  const material = [
    { key: "Reciklirani organski pamuk", value: "90%" },
    { key: "Poliester", value: "10%" },
  ];

  const certifcates = [
    { key: "Grüner Knopf", value: "Da" },
    { key: "C2C Bronze", value: "Da" },
    { key: "GOTS", value: "Da" },
  ];

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
    <div>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Typography variant="primaryBigTitle">Digital Product Pass</Typography>
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
        <KeyValueAccordion title={"Pregled proizvoda"} data={productOverview} />
        <KeyValueAccordion title={"Serijski broj"} data={serialNumber} />
        <KeyValueAccordion
          title={"Uticaj na životnu sredinu"}
          data={environmentalImpact}
        />
        <KeyValueAccordion title={"Materijal"} data={material} />
        <KeyValueAccordion title={"Certifikati"} data={certifcates} />
      </div>
    </div>
  );
};

export default Home;
