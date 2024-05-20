import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  ButtonGroup,
  Box,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import apiService from "../../api/apiService";

const columns = [
  { id: "id", label: "ID", minWidth: 1, align: "center" },
  { id: "productName", label: "Product Name", minWidth: 100, align: "center" },
  { id: "photo", label: "Photo", minWidth: 100, align: "center" },
  {
    id: "consumerFacingDescription",
    label: "Consumer Facing Description",
    minWidth: 100,
    align: "center",
  },
  {
    id: "articleNumber",
    label: "Article Number",
    minWidth: 50,
    align: "center",
  },
  { id: "resalePrice", label: "Resale Price", minWidth: 50, align: "center" },
  { id: "size", label: "Size", minWidth: 50, align: "center" },
  { id: "category", label: "Category", minWidth: 50, align: "center" },
  { id: "gtin", label: "GTIN", minWidth: 50, align: "center" },
  {
    id: "lotNumber",
    label: "LOT",
    minWidth: 50,
    align: "center",
  },
];

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7127/api/ProductInfo/all"
        );
        setProducts(response.data.data);
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

  const handleEdit = async (product) => {
    console.log("Edit data ", product);
    // Handle edit logic
  };

  const handleDelete = async () => {
    console.log("Deleting product with ID:", deleteProductId);
    try {
      const response = await apiService.delete(
        "/api/ProductInfo?id=" + deleteProductId
      );

      console.log("Delete response ", response);

      if (response.status === 200) {
        const updatedProducts = products.filter(
          (product) => product.id !== deleteProductId
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDeleteModal(false);
  };

  const handleOpenDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper style={{ height: "100%", overflow: "hidden" }}>
      <TableContainer
        style={{
          maxHeight: "calc(100vh - 200px)",
          overflow: "auto",
          width: isMobile ? "300px" : isTablet ? "500px" : "100%",
        }}
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
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: product.isDraft
                      ? "rgba(255, 0, 0, 0.1)"
                      : "inherit",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {getCellContent(product, column)}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <ButtonGroup
                      size="small"
                      aria-label="small outlined button group"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </Button>
                      <Box ml={1}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleOpenDeleteModal(product.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper style={{ width: "80%", maxWidth: "400px", padding: "20px" }}>
          <Typography variant="h6" align="center">
            Da li ste sigurni da želite izbrisati proizvod?
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            mt={2}
            mb={2}
            sx={{ gap: 2 }}
          >
            <Button variant="contained" color="primary" onClick={handleDelete}>
              Da
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseDeleteModal}
            >
              Ne
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Paper>
  );
};

function getCellContent(product, column) {
  if (column.id === "photo") {
    return (
      <img
        src={`data:image/jpeg;base64,${product.photo}`}
        alt="Product Photo"
        style={{ maxWidth: "100%", maxHeight: "100px" }}
      />
    );
  }
  if (column.id === "gtin" || column.id === "lotNumber") {
    if (product.gS1Attributes) {
      return product.gS1Attributes[column.id] || "";
    } else {
      return "";
    }
  } else {
    return product[column.id] || "";
  }
}

export default ProductsTable;
