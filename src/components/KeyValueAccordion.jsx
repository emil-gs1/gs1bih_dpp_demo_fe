import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import expandIcon from "../assets/icons/expandIconGs1_r.png";
const KeyValueAccordion = ({ title, data }) => {
  const theme = useTheme();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={
          <img
            width={"100%"}
            style={{ marginLeft: "auto" }}
            src={expandIcon}
            alt="Expand"
          />
        }
      >
        <Typography variant="primaryTitle">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <Typography variant="tableContent">{item.key}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="tableContent">{item.value}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default KeyValueAccordion;
