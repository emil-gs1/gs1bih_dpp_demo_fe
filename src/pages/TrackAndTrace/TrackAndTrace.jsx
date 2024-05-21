import { Typography, useMediaQuery } from "@mui/material";
import MapComponent from "./MapComponent";
import TrackTraceList from "./TrackTraceList";
import "./trackAndTrace.css";
const TrackAndTrace = () => {
  const traceData = [
    {
      stage: "Osnovni materijal",
      supplier: "Kasar Dual",
      data: {
        uuid: "urn:uuid:64eeccd7-90ba-4d5f-9ce5-fc602a8527fe",
        date: "2023-10-16T06:45:02.505Z",
        co2: 102.23,
      },
      position: [41.02457912240872, 28.906893238623],
    },
    {
      stage: "Pomoćni materijal konac",
      supplier: "Coats",
      data: {
        uuid: "urn:uuid:64eeccd7-90ba-4d5f-9ce5-fc602a8527fe",
        date: "2023-10-16T08:45:02.505Z",
        co2: 150.5,
      },
      position: [42.65723810481914, 23.389477968449704],
    },
    {
      stage: "Etiketa",
      supplier: "Miletiket",
      data: {
        uuid: "urn:uuid:64eeccd7-90ba-4d5f-9ce5-fc602a8527fe",
        date: "2023-10-16T10:45:02.505Z",
        co2: 75.3,
      },
      position: [40.994260469769706, 28.82603351081153],
    },
    {
      stage: "Privjesna etiketa",
      supplier: "Grafički atelje Oskar",
      data: {
        uuid: "urn:uuid:64eeccd7-90ba-4d5f-9ce5-fc602a8527fe",
        date: "2023-10-16T12:45:02.505Z",
        co2: 60.1,
      },
      position: [43.84970389095201, 18.401643557325468],
    },
    {
      stage: "Splinta za pakovanje",
      supplier: "Komas Commerce",
      data: {
        uuid: "urn:uuid:64eeccd7-90ba-4d5f-9ce5-fc602a8527fe",
        date: "2023-10-10T14:45:02.505Z",
        co2: 40.2,
      },
      position: [43.84814460652206, 18.365405156856255],
    },

    {
      stage: "Skladištenje i distribucija",
      supplier: "Alma Ras",
      data: {
        uuid: "urn:uuid:64eeccd7-90ba-4d5f-9ce5-fc602a8527fe",
        date: "2023-10-10T14:45:02.505Z",
        co2: 40.2,
      },
      position: [44.1279872961239, 18.613669184783795],
    },
  ];

  const positions = [
    [41.02457912240872, 28.906893238623],
    [42.65723810481914, 23.389477968449704],
    [40.994260469769706, 28.82603351081153],
    [43.84970389095201, 18.401643557325468],
    [43.84814460652206, 18.365405156856255],
    [44.1279872961239, 18.613669184783795],
  ];

  const locationNames = [
    "Kasar Dual",
    "Coats",
    "Mil Etiket",
    "Gafički atelje Oskar",
    "Komas Commerce",
    "Alma Ras Factory Store",
  ];

  const totalCO2 = traceData
    .reduce((acc, item) => acc + item.data.co2, 0)
    .toFixed(2);
  const isDesktop = useMediaQuery("(min-width:960px)");

  return (
    <div className={isDesktop ? "desktop-container" : null}>
      <Typography variant="primaryBigTitle">
        Track and Trace CO2 Usage
      </Typography>
      <MapComponent positions={positions} locationNames={locationNames} />
      <div className="total-co2">
        <Typography variant="primaryTitle">
          Ukupno CO2: {totalCO2} Kg
        </Typography>
      </div>
      <TrackTraceList traceData={traceData} />
    </div>
  );
};

export default TrackAndTrace;
