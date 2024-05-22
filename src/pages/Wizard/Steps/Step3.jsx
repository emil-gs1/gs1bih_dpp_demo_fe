import { toast } from "react-toastify";
import { Grid, Button, TextField, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import apiService from "../../../api/apiService";
import PhotoUploadField from "../../../components/PhotoUploadField";

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
    logo: Yup.string().required("Slika branda je obavezna"),
    traderLocation: Yup.string().required("Trader location je obavezan"),
  });

  const isDesktop = useMediaQuery("(min-width:960px)");
  const [base64, setBase64] = useState("");
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

      setInitialFormValues(() => ({
        ...parsedBrandData,
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

      localStorage.setItem("brandData", JSON.stringify(response.data.data));

      onNext(requestValues);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while submitting the form");
    }
  };

  const handleNext = async (values) => {
    console.log("Values are ", values);

    const brandDataStorage = localStorage.getItem("brandData");
    if (brandDataStorage) {
      apiCall("/api/BrandInfo", "put", values);
      return;
    }

    apiCall("/api/BrandInfo", "post", values);
  };

  useEffect(() => {
    console.log("Base 64 here", base64);
  }, [base64]);

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
                name={"brand"}
                label={"Brand"}
                fullWidth
                size="small"
                error={Boolean(errors.brand && touched.brand)}
                helperText={touched.brand && errors.brand}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                label="Logo"
                name="logo"
                error={Boolean(errors.logo && touched.logo)}
                helperText={touched.logo && errors.logo}
                required
              >
                {({ field }) => (
                  <PhotoUploadField
                    base64={field.value}
                    setBase64={(value) => {
                      setBase64(value);
                      field.onChange({ target: { name: field.name, value } });
                    }}
                    values={values}
                    setFormValues={setInitialFormValues}
                    fieldName={"logo"}
                  />
                )}
              </Field>
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
