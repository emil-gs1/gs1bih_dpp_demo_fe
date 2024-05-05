import { Grid } from "@mui/material";
import React, { useState } from "react";

export const Wizard = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Form data:", formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Grid container spacing={1}>
      {React.createElement(steps[currentStep], {
        data: formData,
        onNext: handleNext,
        onPrevious: handlePrevious,
      })}
    </Grid>
  );
};
