import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const KeyValueAccordion = ({ data }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />} // Display the ExpandMoreIcon
      >
        <Typography variant="h6">Key-Value Table</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <Typography variant="body1">{item.key}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{item.value}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default KeyValueAccordion;
