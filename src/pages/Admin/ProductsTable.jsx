import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const columns = [
  { id: "id", label: "ID", minWidth: 1, align: "center" },
  { id: "productName", label: "Product Name", minWidth: 1, align: "center" },
  {
    id: "consumerFacingDescription",
    label: "Consumer Facing Description",
    minWidth: 1,
    align: "center",
  },
  {
    id: "articleNumber",
    label: "Article Number",
    minWidth: 1,
    align: "center",
  },
  { id: "resalePrice", label: "Resale Price", minWidth: 1, align: "center" },
  { id: "size", label: "Size", minWidth: 1, align: "center" },
  { id: "colorGeneral", label: "Color", minWidth: 1, align: "center" },
  { id: "category", label: "Category", minWidth: 1, align: "center" },
  { id: "productGroup", label: "Product Group", minWidth: 1, align: "center" },
  { id: "ageGroup", label: "Age Group", minWidth: 1, align: "center" },
  { id: "gender", label: "Gender", minWidth: 1, align: "center" },
];

const ProductsTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7127/api/ProductInfo/all"
        );
        setProducts(response.data.data); // Assuming your API response contains the product data directly
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div style={{ overflowX: isMobile ? "auto" : "unset" }}>
        <TableContainer
          sx={{ maxHeight: isMobile ? "unset" : 600, width: "auto" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {product[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductsTable;
