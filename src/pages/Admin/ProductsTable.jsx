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
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../api/axios";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

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
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  const handleEdit = async (product) => {
    console.log("Edit data ", product);
    // Handle edit logic
  };

  const handleDelete = async () => {
    console.log("Deleting product with ID:", deleteProductId);
    // Perform delete operation
    setOpenDeleteModal(false); // Close modal after delete
  };

  const handleOpenDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
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
                          {/* Add margin between the buttons */}
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
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
          }}
        >
          <Typography variant="h6" id="delete-modal-title" align="center">
            Da li ste sigurni da želite izbrisati proizvod?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleDelete}>
              Da
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseDeleteModal}
              sx={{ ml: 2 }}
            >
              Ne
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Paper>
  );
};

export default ProductsTable;
