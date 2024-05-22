import { toast } from "react-toastify";
import { Grid, Button, TextField, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import apiService from "../../../api/apiService";

const Step6 = ({ data, onNext, onPrevious }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    productID: 0,
    harmfulSubstances: "",
    harmfulSubstancesInfo: "",
    certifications: "",
    certificationsValidation: "",
    chemicalComplianceStandard: "",
    chemicalComplianceValidation: "",
    chemicalComplianceScan4ChemLink: "",
    microfibers: "",
    traceabilityProvider: "",
  });

  const validationSchema = Yup.object().shape({
    harmfulSubstances: Yup.string().required("Performance je obavezan"),
    harmfulSubstancesInfo: Yup.string().required("recyclability je obavezan"),
    certifications: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),

    certificationsValidation: Yup.string().required("Performance je obavezan"),
    chemicalComplianceStandard: Yup.string().required(
      "recyclability je obavezan"
    ),
    chemicalComplianceValidation: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),

    chemicalComplianceScan4ChemLink: Yup.string().required(
      "Performance je obavezan"
    ),
    microfibers: Yup.string().required("recyclability je obavezan"),
    traceabilityProvider: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),
  });

  const isDesktop = useMediaQuery("(min-width:960px)");

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const complianceData = localStorage.getItem("complianceData");

    if (productId) {
      setInitialFormValues((prev) => ({
        ...prev,
        productID: parseInt(productId),
      }));
    }
    if (complianceData) {
      const parsedComplianceData = JSON.parse(complianceData);

      setInitialFormValues((prev) => ({
        ...prev,
        ...parsedComplianceData,
      }));
    }
  }, []);

  const apiCall = async (url, method, requestValues) => {
    try {
      let response;
      if (method === "post") {
        response = await apiService.post(url, requestValues);
      } else if (method === "put") {
        response = await apiService.put(url, requestValues);
      } else {
        return;
      }

      localStorage.setItem(
        "complianceData",
        JSON.stringify(response.data.data)
      );

      onNext(requestValues);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while submitting the form");
    }
  };

  const handleNext = async (values) => {
    const complianceDataStorage = localStorage.getItem("complianceData");
    if (complianceDataStorage) {
      apiCall("/api/ComplianceInfo", "put", values);

      return;
    }
    console.log("Values are", values);
    apiCall("/api/ComplianceInfo", "post", values);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleNext}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Grid
            container
            spacing={2}
            style={isDesktop ? { padding: "0px 200px" } : null}
          >
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"harmfulSubstances"}
                label={"Harmful Substances"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.harmfulSubstances && touched.harmfulSubstances
                )}
                helperText={
                  touched.harmfulSubstances && errors.harmfulSubstances
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"harmfulSubstancesInfo"}
                label={"Harmful Substances Info"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.harmfulSubstancesInfo && touched.harmfulSubstancesInfo
                )}
                helperText={
                  touched.harmfulSubstancesInfo && errors.harmfulSubstancesInfo
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"certifications"}
                label={"Certifications"}
                fullWidth
                size="small"
                error={Boolean(errors.certifications && touched.certifications)}
                helperText={touched.certifications && errors.certifications}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"certificationsValidation"}
                label={"Certifications Validation"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.certificationsValidation &&
                    touched.certificationsValidation
                )}
                helperText={
                  touched.certificationsValidation &&
                  errors.certificationsValidation
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"chemicalComplianceStandard"}
                label={"chemical Compliance Standard"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.chemicalComplianceStandard &&
                    touched.chemicalComplianceStandard
                )}
                helperText={
                  touched.chemicalComplianceStandard &&
                  errors.chemicalComplianceStandard
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"chemicalComplianceValidation"}
                label={"Chemical Compliance Validation"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.chemicalComplianceValidation &&
                    touched.chemicalComplianceValidation
                )}
                helperText={
                  touched.chemicalComplianceValidation &&
                  errors.chemicalComplianceValidation
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"chemicalComplianceScan4ChemLink"}
                label={"Chemical Compliance Scan 4 ChemLink"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.chemicalComplianceScan4ChemLink &&
                    touched.chemicalComplianceScan4ChemLink
                )}
                helperText={
                  touched.chemicalComplianceScan4ChemLink &&
                  errors.chemicalComplianceScan4ChemLink
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"microfibers"}
                label={"Microfibers"}
                fullWidth
                size="small"
                error={Boolean(errors.microfibers && touched.microfibers)}
                helperText={touched.microfibers && errors.microfibers}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"traceabilityProvider"}
                label={"Traceability Provider"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.traceabilityProvider && touched.traceabilityProvider
                )}
                helperText={
                  touched.traceabilityProvider && errors.traceabilityProvider
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6} md={6}>
              {data && (
                <Button variant="contained" onClick={onPrevious}>
                  Nazad
                </Button>
              )}
            </Grid>
            <Grid item xs={6} md={6}>
              <Button variant="contained" type="submit">
                Dalje
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Step6;
