import React, { useState } from "react";
import {
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";

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
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          {steps[currentStep].title}
        </Typography>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        {React.createElement(steps[currentStep].component, {
          data: formData,
          onNext: handleNext,
          onPrevious: handlePrevious,
        })}
      </Grid>
    </Grid>
  );
};
