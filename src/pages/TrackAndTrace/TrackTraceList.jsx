// src/components/TrackTraceList.js
import React from "react";
import TrackTraceItem from "./TrackTraceItem";

const TrackTraceList = ({ traceData }) => {
  return (
    <div className="trace-list">
      {traceData.map((item, index) => (
        <TrackTraceItem
          key={index}
          stage={item.stage}
          supplier={item.supplier}
          data={item.data}
          position={item.position}
        />
      ))}
    </div>
  );
};

export default TrackTraceList;
