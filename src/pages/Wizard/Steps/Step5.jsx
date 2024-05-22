import { toast } from "react-toastify";
import { Grid, Button, TextField, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PhotoUploadField from "../../../components/PhotoUploadField";
import apiService from "../../../api/apiService";

const Step5 = ({ data, onNext, onPrevious }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    productID: 0,
    careImage: "",
    careText: "",
    safetyInformation: "",
  });

  const validationSchema = Yup.object().shape({
    careImage: Yup.string().required("Slika je obavezna"),
    careText: Yup.string().required("recyclability je obavezan"),
    safetyInformation: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),
  });
  const [base64, setBase64] = useState("");
  const isDesktop = useMediaQuery("(min-width:960px)");

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const circularityData = localStorage.getItem("careData");

    if (productId) {
      setInitialFormValues((prev) => ({
        ...prev,
        productID: parseInt(productId),
      }));
    }
    if (circularityData) {
      const parsedCircularityData = JSON.parse(circularityData);

      setInitialFormValues((prev) => ({
        ...prev,
        ...parsedCircularityData,
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

      localStorage.setItem("careData", JSON.stringify(response.data.data));

      onNext(requestValues);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while submitting the form");
    }
  };

  const handleNext = async (values) => {
    const careDataStorage = localStorage.getItem("careData");
    if (careDataStorage) {
      apiCall("/api/CareInfo", "put", values);

      return;
    }
    console.log("Values are", values);
    apiCall("/api/CareInfo", "post", values);
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
                label="Slika proizvoda"
                name="careImage"
                error={Boolean(errors.careImage && touched.careImage)}
                helperText={touched.careImage && errors.careImage}
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
                    fieldName={"careImage"}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"careText"}
                label={"Care Text"}
                fullWidth
                size="small"
                error={Boolean(errors.careText && touched.careText)}
                helperText={touched.careText && errors.careText}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"safetyInformation"}
                label={"Safety Information"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.safetyInformation && touched.safetyInformation
                )}
                helperText={
                  touched.safetyInformation && errors.safetyInformation
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

export default Step5;
