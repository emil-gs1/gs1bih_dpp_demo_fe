import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ positions, locationNames }) => {
  const defaultCenter = [44.1279872961239, 18.613669184783795];
  const [centerPosition, setCenterPosition] = useState(defaultCenter);
  const [zoom, setZoom] = useState(5);
  const storedPosition = localStorage.getItem("position");

  useEffect(() => {
    if (storedPosition) {
      console.log("stored position", storedPosition);
      setCenterPosition(JSON.parse(storedPosition));
      setZoom(13);
    } else {
      console.log("else");

      setCenterPosition(defaultCenter);
      setZoom(5);
    }
  }, [storedPosition]);

  return (
    <MapContainer
      key={`${centerPosition[0]}-${centerPosition[1]}-${zoom}`}
      center={centerPosition}
      zoom={zoom}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions &&
        positions.map((pos, index) => (
          <Marker key={index} position={pos}>
            <Popup>{locationNames[index]}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
