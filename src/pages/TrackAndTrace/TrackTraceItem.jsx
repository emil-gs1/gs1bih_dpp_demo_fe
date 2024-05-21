// src/components/TrackTraceItem.js
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TrackTraceItem = ({ stage, supplier, data, position }) => {
  const handleItemClick = () => {
    console.log("handleItemClick called", position);
    localStorage.setItem("position", JSON.stringify(position));
  };

  return (
    <div className="trace-item">
      <Link onClick={handleItemClick}>
        <div style={{ textAlign: "left", paddingLeft: "30px" }}>
          <Typography variant="primaryTitle">{stage}</Typography>
        </div>
        <div style={{ textAlign: "left", paddingLeft: "30px" }}>
          <Typography variant="secondaryTitle">Naziv dobavljača: </Typography>
          <Typography variant="secondary">{supplier}</Typography>
        </div>
        <div style={{ textAlign: "left", paddingLeft: "30px" }}>
          <Typography variant="secondaryTitle">UUID: </Typography>
          <Typography variant="secondary">{data.uuid}</Typography>
        </div>
        <div style={{ textAlign: "left", paddingLeft: "30px" }}>
          <Typography variant="secondaryTitle">Datum: </Typography>
          <Typography variant="secondary">
            {new Date(data.date).toLocaleString()}
          </Typography>
        </div>
        <div style={{ textAlign: "left", paddingLeft: "30px" }}>
          <Typography variant="secondaryTitle">CO2: </Typography>
          <Typography variant="secondary">{data.co2}Kg</Typography>
        </div>
      </Link>
    </div>
  );
};

export default TrackTraceItem;
