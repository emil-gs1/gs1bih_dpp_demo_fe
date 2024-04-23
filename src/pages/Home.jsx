import { Typography } from "@mui/material";
import KeyValueAccordion from "../components/KeyValueAccordion";
import tmp from "../assets/img/tmp/tmp.jpg";

const Home = () => {
  const productOverview = [
    { key: "GTIN", value: "4047112223459" },
    { key: "Brand name", value: "GS1" },
    { key: "Size", value: "Medium" },
    { key: "Weight", value: "1.3 kg" },
    { key: "Color", value: "Green" },
    { key: "Main material", value: "Jeans" },
    { key: "Category", value: "Jacket" },
    { key: "Year of sale", value: "2024" },
    { key: "Price", value: "159.00 BAM" },
  ];

  const serialNumber = [{ key: "number", value: "4722" }];

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
      <div style={{ padding: 100 }}>
        <KeyValueAccordion title={"Pregled proizvoda"} data={productOverview} />
        <KeyValueAccordion title={"Serijski broj"} data={serialNumber} />
        <KeyValueAccordion
          title={"Uticaj na životnu sredinu"}
          data={serialNumber}
        />
        <KeyValueAccordion title={"Materijal"} data={serialNumber} />
        <KeyValueAccordion title={"Certifikati"} data={serialNumber} />
      </div>
    </div>
  );
};

export default Home;
