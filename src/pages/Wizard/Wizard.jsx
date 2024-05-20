import React, { useState } from "react";
import {
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiService from "../../api/apiService.js";

export const Wizard = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Form data:", formData);
    }
  };

  const handleFinish = async (data) => {
    console.log("handle finish called");
    setFormData({ ...formData, ...data });

    const productData = JSON.parse(localStorage.getItem("productData"));
    const requestValues = { ...productData, isDraft: false };

    console.log("request values", requestValues);

    const response = await apiService.put("/api/ProductInfo", requestValues);

    console.log("response for edit ", response);
    if (response.status === 200) {
      toast.success("Uspjesno upisani podaci");
      localStorage.clear();
      navigate("/");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Grid container spacing={3}>
      {!isSmallScreen && (
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom align="center">
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
      )}
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

export default Wizard;
