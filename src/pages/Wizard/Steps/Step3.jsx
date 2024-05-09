import { toast } from "react-toastify";
import { Grid, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Step3 = ({ data, onNext, onPrevious }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    productID: 0,
    brand: "",
    logo: "",
    subBrand: "",
    parentCompany: "",
    trader: "",
    traderLocation: "",
  });

  const validationSchema = Yup.object().shape({
    brand: Yup.string().required("Brand je obavezan"),
    subBrand: Yup.string().required("Subbrand je obavezan"),
    parentCompany: Yup.string().required("Parent company je obavezan"),
    trader: Yup.string().required("Trader je obavezan"),
    logo: Yup.string(),
    traderLocation: Yup.string().required("Trader location je obavezan"),
  });

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const brandData = localStorage.getItem("brandData");

    if (productId) {
      setInitialFormValues((prev) => ({
        ...prev,
        productID: parseInt(productId),
      }));
    }
    if (brandData) {
      const parsedBrandData = JSON.parse(brandData);

      setInitialFormValues((prev) => ({
        ...prev,
        ...parsedBrandData,
      }));
    }
  }, []);

  const handleNext = async (values) => {
    console.log("Values are ", values);

    const brandDataStorage = localStorage.getItem("brandData");
    if (brandDataStorage) {
      onNext(values);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7127/api/BrandInfo",
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

      localStorage.setItem("brandData", JSON.stringify(updatedFormValues));

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
            style={{ padding: "0px 200px 0px 200px" }}
          >
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"brand"}
                label={"Brand"}
                fullWidth
                size="small"
                error={Boolean(errors.brand && touched.brand)}
                helperText={touched.brand && errors.brand}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <PhotoUploadField /> */}
              <Field
                as={TextField}
                name={"logo"}
                label={"Logo"}
                fullWidth
                size="small"
                error={Boolean(errors.logo && touched.logo)}
                helperText={touched.logo && errors.logo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"subBrand"}
                label={"Sub brand"}
                fullWidth
                size="small"
                error={Boolean(errors.subBrand && touched.subBrand)}
                helperText={touched.subBrand && errors.subBrand}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"parentCompany"}
                label={"Parent company"}
                fullWidth
                size="small"
                error={Boolean(errors.parentCompany && touched.parentCompany)}
                helperText={touched.parentCompany && errors.parentCompany}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"trader"}
                label={"Trader"}
                fullWidth
                size="small"
                error={Boolean(errors.trader && touched.trader)}
                helperText={touched.trader && errors.trader}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"traderLocation"}
                label={"Trader location"}
                fullWidth
                size="small"
                error={Boolean(errors.traderLocation && touched.traderLocation)}
                helperText={touched.traderLocation && errors.traderLocation}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              {data && (
                <Button variant="contained" onClick={onPrevious}>
                  Nazad
                </Button>
              )}
            </Grid>
            <Grid item xs={6} md={6}>
              <Button type="submit" variant="contained">
                Dalje
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Step3;
