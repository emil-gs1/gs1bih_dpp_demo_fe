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

const columns = [
  { id: "name", label: "Naziv kompanije", minWidth: 1, align: "center" },
  { id: "address", label: "Adresa", minWidth: 1, align: "center" },
  {
    id: "webpage",
    label: "Web\u00a0stranica",
    minWidth: 1,
    align: "center",
  },
  {
    id: "licensetype",
    label: "Tip\u00a0licence",
    minWidth: 1,
    align: "center",
  },
  {
    id: "license",
    label: "Licenca",
    minWidth: 1,
    align: "center",
  },

  {
    id: "gs1",
    label: "gs1",
    minWidth: 1,
    align: "center",
  },
];

function createData(name, address, webpage, licensetype, license, gs1) {
  return { name, address, webpage, licensetype, license, gs1 };
}

const rows = [
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
  createData(
    "PIVARA TUZLA D.D",
    "Sarajevo bb",
    "https://www.pivaratuzla.ba/",
    "GS1 Company Prefix",
    "3870015",
    "3870015000008",
    "GS1 Bosnia and Herzegovina"
  ),
];

const ProductsTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell
                        key={`${column.id}-${rowIndex}`}
                        align={column.align}
                      >
                        {column.format && typeof row[column.id] === "number"
                          ? column.format(row[column.id])
                          : row[column.id]}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductsTable;
