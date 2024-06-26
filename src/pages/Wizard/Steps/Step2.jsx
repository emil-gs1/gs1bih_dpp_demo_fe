import { toast } from "react-toastify";
import { Grid, Button, TextField, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import PhotoUploadField from "../../../components/PhotoUploadField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import apiService from "../../../api/apiService";

const Step2 = ({ data, onNext, onPrevious }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    uniqueProductID: "",
    productName: "",
    consumerFacingDescription: "",
    photo: "",
    articleNumber: "",
    itemNumber: "",
    poNumber: "",
    commodityCodeSystem: "",
    commodityCodeNumber: "",
    yearOfIntendedSale: 0,
    seasonOfIntendedSale: "",
    priceCurrency: "",
    msrp: 0,
    resalePrice: 0,
    size: "",
    countryCodeForSize: "",
    colorBrand: "",
    colorGeneral: "",
    category: "",
    productGroup: "",
    typeLineConcept: "",
    itemType: "",
    ageGroup: "",
    gender: "",
    marketSegment: "",
    waterProperties: "",
    finalProductNetWeight: 0,
    unitOfWeight: "",
    isDraft: true,
  });

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .required("Naziv proizvoda je obavezan")
      .min(2, "Naziv proizvoda mora imati najmanje 2 karaktera")
      .max(50, "Naziv proizvoda može imati najviše 50 karaktera"),
    consumerFacingDescription: Yup.string()
      .required("Opis proizvoda je obavezan")
      .max(200, "Opis proizvoda može imati najviše 200 karaktera"),
    articleNumber: Yup.string().required("Broj artikla je obavezan"),
    itemNumber: Yup.string().required("Item number je obavezan"),
    poNumber: Yup.string().required("PO number je obavezan"),
    yearOfIntendedSale: Yup.number().required(
      "Godina planirane prodaje je obavezna"
    ),
    seasonOfIntendedSale: Yup.string().required(
      "Sezona planirane prodaje je obavezna"
    ),
    priceCurrency: Yup.string().required("Valuta je obavezna"),
    msrp: Yup.number().required("MSRP je obavezan"),
    resalePrice: Yup.number().required("Resale price je obavezan"),
    size: Yup.string().required("Veličina je obavezna"),
    countryCodeForSize: Yup.string().required(
      "Kod zemlje za veličinu je obavezan"
    ),
    photo: Yup.string().required("Slika proizvoda je obavezna"),
    colorBrand: Yup.string().required("Boja je obavezna"),
    category: Yup.string().required("Kategorija je obavezna"),
    productGroup: Yup.string().required("Grupa proizvoda je obavezna"),
    typeLineConcept: Yup.string().required("TypeLineConcept je obavezan"),
    itemType: Yup.string().required("ItemType je obavezan"),
    ageGroup: Yup.string().required("Dobna grupa je obavezna"),
    gender: Yup.string().required("Spol je obavezan"),
    marketSegment: Yup.string().required("Market Segment je obavezan"),
    waterProperties: Yup.string().required("WaterProperties je obavezan"),
    finalProductNetWeight: Yup.number().required(
      "Težina proizvoda je obavezna"
    ),
    unitOfWeight: Yup.string().required("Jedinica težine je obavezna"),
  });

  const isDesktop = useMediaQuery("(min-width:960px)");

  const [base64, setBase64] = useState("");
  useEffect(() => {
    const productData = localStorage.getItem("productData");
    console.log("Product data is", productData);
    if (productData) {
      const parsedProductData = JSON.parse(productData);
      console.log("Parsed product data is: ", parsedProductData);
      console.log("Photo value: ", parsedProductData.photo);
      const updatedInitialFormValues = {
        ...parsedProductData,
      };
      setInitialFormValues(updatedInitialFormValues);
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

      localStorage.setItem("productData", JSON.stringify(response.data.data));
      localStorage.setItem("productId", response.data.data.id);

      onNext(requestValues);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while submitting the form");
    }
  };

  const handleNext = async (values) => {
    const { photo } = values;
    console.log("Photo on next is", photo);
    const parsedDataStorage = localStorage.getItem("productData");
    if (parsedDataStorage) {
      const productId = localStorage.getItem("productId");
      const requestValues = { ...values, id: productId };
      apiCall("/api/ProductInfo", "put", requestValues);
      return;
    }
    console.log("Values are", values);

    apiCall("/api/ProductInfo", "post", values);
  };

  useEffect(() => {
    console.log("changed initial values ", initialFormValues);
  }, [initialFormValues]);

  // useEffect(() => {
  //   setInitialFormValues((prevValues) => {
  //     return {
  //       ...prevValues,
  //       photo: base64,
  //     };
  //   });
  // }, [base64, setInitialFormValues]);

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
                name="productName"
                label="Naziv proizvoda"
                // value={values.productName}
                fullWidth
                size="small"
                error={Boolean(errors.productName && touched.productName)}
                helperText={touched.productName && errors.productName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name="consumerFacingDescription"
                label="Opis proizvoda"
                fullWidth
                size="small"
                error={Boolean(
                  errors.consumerFacingDescription &&
                    touched.consumerFacingDescription
                )}
                helperText={
                  touched.consumerFacingDescription &&
                  errors.consumerFacingDescription
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                label="Slika proizvoda"
                name="photo"
                error={Boolean(errors.photo && touched.photo)}
                helperText={touched.photo && errors.photo}
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
                    fieldName={"photo"}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name="articleNumber"
                label={"Broj artikla"}
                fullWidth
                size="small"
                error={Boolean(errors.articleNumber && touched.articleNumber)}
                helperText={touched.articleNumber && errors.articleNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name="itemNumber"
                label={"Item number"}
                fullWidth
                size="small"
                error={Boolean(errors.itemNumber && touched.itemNumber)}
                helperText={touched.itemNumber && errors.itemNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name="poNumber"
                label="po number"
                fullWidth
                size="small"
                error={Boolean(errors.poNumber && touched.poNumber)}
                helperText={touched.poNumber && errors.poNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                type="number"
                name={"yearOfIntendedSale"}
                label={"Godina planirane prodaje"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.yearOfIntendedSale && touched.yearOfIntendedSale
                )}
                helperText={
                  touched.yearOfIntendedSale && errors.yearOfIntendedSale
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"seasonOfIntendedSale"}
                label={"Sezona planirane prodaje"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.seasonOfIntendedSale && touched.seasonOfIntendedSale
                )}
                helperText={
                  touched.seasonOfIntendedSale && errors.seasonOfIntendedSale
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"priceCurrency"}
                label={"Valuta"}
                fullWidth
                size="small"
                error={Boolean(errors.priceCurrency && touched.priceCurrency)}
                helperText={touched.priceCurrency && errors.priceCurrency}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"msrp"}
                label={"MSRP"}
                fullWidth
                size="small"
                error={Boolean(errors.msrp && touched.msrp)}
                helperText={touched.msrp && errors.msrp}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"resalePrice"}
                label={"Resale price"}
                fullWidth
                size="small"
                error={Boolean(errors.resalePrice && touched.resalePrice)}
                helperText={touched.resalePrice && errors.resalePrice}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"size"}
                label={"Velicina"}
                fullWidth
                size="small"
                error={Boolean(errors.size && touched.size)}
                helperText={touched.size && errors.size}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"countryCodeForSize"}
                label={"Kod zemlje za veličinu"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.countryCodeForSize && touched.countryCodeForSize
                )}
                helperText={
                  touched.countryCodeForSize && errors.countryCodeForSize
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"colorBrand"}
                label={"Boja"}
                fullWidth
                size="small"
                error={Boolean(errors.colorBrand && touched.colorBrand)}
                helperText={touched.colorBrand && errors.colorBrand}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"category"}
                label={"Kategorija"}
                fullWidth
                size="small"
                error={Boolean(errors.category && touched.category)}
                helperText={touched.category && errors.category}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"productGroup"}
                label={"Grupa proizvoda"}
                fullWidth
                size="small"
                error={Boolean(errors.productGroup && touched.productGroup)}
                helperText={touched.productGroup && errors.productGroup}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"typeLineConcept"}
                label={"TypeLineConcept"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.typeLineConcept && touched.typeLineConcept
                )}
                helperText={touched.typeLineConcept && errors.typeLineConcept}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"itemType"}
                label={"ItemType"}
                fullWidth
                size="small"
                error={Boolean(errors.itemType && touched.itemType)}
                helperText={touched.itemType && errors.itemType}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"ageGroup"}
                label={"Dobna grupa"}
                fullWidth
                size="small"
                error={Boolean(errors.ageGroup && touched.ageGroup)}
                helperText={touched.ageGroup && errors.ageGroup}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"gender"}
                label={"Spol"}
                fullWidth
                size="small"
                error={Boolean(errors.gender && touched.gender)}
                helperText={touched.gender && errors.gender}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"marketSegment"}
                label={"Market Segment"}
                fullWidth
                size="small"
                error={Boolean(errors.marketSegment && touched.marketSegment)}
                helperText={touched.marketSegment && errors.marketSegment}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"waterProperties"}
                label={"WaterProperties"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.waterProperties && touched.waterProperties
                )}
                helperText={touched.waterProperties && errors.waterProperties}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"finalProductNetWeight"}
                label={"Tezina proizvoda"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.finalProductNetWeight && touched.finalProductNetWeight
                )}
                helperText={
                  touched.finalProductNetWeight && errors.finalProductNetWeight
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"unitOfWeight"}
                label={"Jedinica težine"}
                fullWidth
                size="small"
                error={Boolean(errors.unitOfWeight && touched.unitOfWeight)}
                helperText={touched.unitOfWeight && errors.unitOfWeight}
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

export default Step2;
