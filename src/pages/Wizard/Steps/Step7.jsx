import { toast } from "react-toastify";
import { Grid, Button, TextField, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Step7 = ({ data, onNext, onPrevious }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    productID: 0,
    dataCarrierIdentifierType: "",
    dataCarrierIdentifierMaterial: "",
    dataCarrierIdentifierLocation: "",
  });

  const validationSchema = Yup.object().shape({
    dataCarrierIdentifierType: Yup.string().required("Performance je obavezan"),
    dataCarrierIdentifierMaterial: Yup.string().required(
      "recyclability je obavezan"
    ),
    dataCarrierIdentifierLocation: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),
  });

  const isDesktop = useMediaQuery("(min-width:960px)");

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const digitalIdData = localStorage.getItem("digitalIdData");

    if (productId) {
      setInitialFormValues((prev) => ({
        ...prev,
        productID: parseInt(productId),
      }));
    }
    if (digitalIdData) {
      const parsedDigitalIdData = JSON.parse(digitalIdData);

      setInitialFormValues((prev) => ({
        ...prev,
        ...parsedDigitalIdData,
      }));
    }
  }, []);

  const handleNext = async (values) => {
    const complianceDataStorage = localStorage.getItem("digitalIdData");
    if (complianceDataStorage) {
      onNext(values);
      return;
    }
    console.log("Values are", values);
    try {
      const response = await axios.post(
        "https://localhost:7127/api/DigitalIdentifierInfo",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedFormValues = { ...values };

      for (const key in response.data) {
        if (key in updatedFormValues) {
          updatedFormValues[key] = response.data[key];
        }
      }

      localStorage.setItem("digitalIdData", JSON.stringify(updatedFormValues));

      onNext(values);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while submitting the form");
    }
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
                name={"dataCarrierIdentifierType"}
                label={"Data Carrier Identifier Type"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.dataCarrierIdentifierType &&
                    touched.dataCarrierIdentifierType
                )}
                helperText={
                  touched.dataCarrierIdentifierType &&
                  errors.dataCarrierIdentifierType
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"dataCarrierIdentifierMaterial"}
                label={"Data Carrier Identifier Material"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.dataCarrierIdentifierMaterial &&
                    touched.dataCarrierIdentifierMaterial
                )}
                helperText={
                  touched.dataCarrierIdentifierMaterial &&
                  errors.dataCarrierIdentifierMaterial
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"dataCarrierIdentifierLocation"}
                label={"Data Carrier Identifier Location"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.dataCarrierIdentifierLocation &&
                    touched.dataCarrierIdentifierLocation
                )}
                helperText={
                  touched.dataCarrierIdentifierLocation &&
                  errors.dataCarrierIdentifierLocation
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

export default Step7;
