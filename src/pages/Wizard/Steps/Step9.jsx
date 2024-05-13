import { toast } from "react-toastify";
import { Grid, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Step9 = ({ data, onNext, onPrevious, onFinish }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    productID: 0,
    supplierName: "",
    supplierLocation: "",
    facilityRegistry: "",
    facilityIdentifier: "",
    operatorRegistry: "",
    operatorIdentifier: "",
    countryOfOriginConfection: "",
    countryOfOriginDyeingPrinting: "",
    countryOfOriginWeavingKnitting: "",
  });

  const validationSchema = Yup.object().shape({
    supplierName: Yup.string().required("Performance je obavezan"),
    supplierLocation: Yup.string().required("recyclability je obavezan"),
    facilityRegistry: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),

    facilityIdentifier: Yup.string().required("Performance je obavezan"),
    operatorRegistry: Yup.string().required("recyclability je obavezan"),
    operatorIdentifier: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),

    countryOfOriginConfection: Yup.string().required("Performance je obavezan"),
    countryOfOriginDyeingPrinting: Yup.string().required(
      "recyclability je obavezan"
    ),
    countryOfOriginWeavingKnitting: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),
  });

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const supplyChainData = localStorage.getItem("supplyChainData");

    if (productId) {
      setInitialFormValues((prev) => ({
        ...prev,
        productID: parseInt(productId),
      }));
    }
    if (supplyChainData) {
      const parsedSupplyChainData = JSON.parse(supplyChainData);

      setInitialFormValues((prev) => ({
        ...prev,
        ...parsedSupplyChainData,
      }));
    }
  }, []);

  const handleNext = async (values) => {
    const supplyChainDataStorage = localStorage.getItem("supplyChainData");
    if (supplyChainDataStorage) {
      onNext();
      return;
    }
    console.log("Values are", values);
    try {
      const response = await axios.post(
        "https://localhost:7127/api/SupplyChainInfo",
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

      localStorage.setItem(
        "supplyChainData",
        JSON.stringify(updatedFormValues)
      );

      onNext();
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
            style={{ padding: "0px 200px 0px 200px" }}
          >
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"supplierName"}
                label={"Supplier Name"}
                fullWidth
                size="small"
                error={Boolean(errors.supplierName && touched.supplierName)}
                helperText={touched.supplierName && errors.supplierName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"supplierLocation"}
                label={"Supplier Location"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.supplierLocation && touched.supplierLocation
                )}
                helperText={touched.supplierLocation && errors.supplierLocation}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"facilityRegistry"}
                label={"Facility Registry"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.facilityRegistry && touched.facilityRegistry
                )}
                helperText={touched.facilityRegistry && errors.facilityRegistry}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"facilityIdentifier"}
                label={"Facility Identifier"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.facilityIdentifier && touched.facilityIdentifier
                )}
                helperText={
                  touched.facilityIdentifier && errors.facilityIdentifier
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"operatorRegistry"}
                label={"Operator Registry"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.operatorRegistry && touched.operatorRegistry
                )}
                helperText={touched.operatorRegistry && errors.operatorRegistry}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"operatorIdentifier"}
                label={"Operator Identifier"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.operatorIdentifier && touched.operatorIdentifier
                )}
                helperText={
                  touched.operatorIdentifier && errors.operatorIdentifier
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"countryOfOriginConfection"}
                label={"Country Of Origin Confection"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.countryOfOriginConfection &&
                    touched.countryOfOriginConfection
                )}
                helperText={
                  touched.countryOfOriginConfection &&
                  errors.countryOfOriginConfection
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"countryOfOriginDyeingPrinting"}
                label={"Country Of Origin Dyeing Printing"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.countryOfOriginDyeingPrinting &&
                    touched.countryOfOriginDyeingPrinting
                )}
                helperText={
                  touched.countryOfOriginDyeingPrinting &&
                  errors.countryOfOriginDyeingPrinting
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"countryOfOriginWeavingKnitting"}
                label={"Country Of Origin Weaving Knitting"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.countryOfOriginWeavingKnitting &&
                    touched.countryOfOriginWeavingKnitting
                )}
                helperText={
                  touched.countryOfOriginWeavingKnitting &&
                  errors.countryOfOriginWeavingKnitting
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ marginTop: "10px", padding: "0px 200px 0px 200px" }}
          >
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

export default Step9;
