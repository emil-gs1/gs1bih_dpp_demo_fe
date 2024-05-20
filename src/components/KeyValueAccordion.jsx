import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import expandIcon from "../assets/icons/expandIconGs1_r.png";

const KeyValueAccordion = ({ title, data, defaultExpanded = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const accordionWidth = isMobile ? "100%" : "800px";
  const accordionMinWidth = isMobile ? "100%" : "800px";
  const accordionMaxWidth = isMobile ? "100%" : "800px";
  const isDesktop = useMediaQuery("(min-width:960px)");

  return (
    <Accordion
      style={{
        width: accordionWidth,
        minWidth: accordionMinWidth,
        maxWidth: accordionMaxWidth,
        margin: "auto",
      }}
      defaultExpanded={defaultExpanded}
    >
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
        <Grid container spacing={2} sx={isDesktop ? { px: 10 } : null}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6} sm={6} style={{ textAlign: "left" }}>
                <Typography
                  variant="tableContent"
                  style={{ textAlign: "left" }}
                >
                  {item.key}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                {typeof item.value === "string" ? (
                  <Typography
                    variant="tableContent"
                    style={{ textAlign: "right" }}
                  >
                    {item.value}
                  </Typography>
                ) : (
                  item.value
                )}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default KeyValueAccordion;
