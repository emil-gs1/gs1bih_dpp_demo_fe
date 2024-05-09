import React, { useState } from "react";
import {
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export const Wizard = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Form data:", formData);
    }
  };

  const handleFinish = (data) => {
    console.log("handle finish called");
    setFormData({ ...formData, ...data });

    toast.success("Uspjesno upisani podaci");
    localStorage.clear();
    navigate("/");
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
          onFinish: handleFinish,
        })}
      </Grid>
    </Grid>
  );
};
