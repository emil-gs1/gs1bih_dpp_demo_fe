import { Typography } from "@mui/material";
import React from "react";
import { Sidebar } from "react-pro-sidebar";
import ProductsTable from "./ProductsTable";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <Typography variant="primaryTitle">Pregled proizvoda </Typography>
      <div style={{ marginTop: "20px" }}>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Dashboard;
