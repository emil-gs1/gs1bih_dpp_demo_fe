import { toast } from "react-toastify";
import {
  Grid,
  Button,
  TextField,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import apiService from "../../../api/apiService";

const Step8 = ({ data, onNext, onPrevious }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    productID: 0,
    component: "",
    material: "",
    contentName: "",
    contentValue: 0,
    contentSource: "",
    materialTradeMarks: "",
    trimType: "",
    componentWeight: 0,
    recycled: true,
    recycledPercentage: 0,
    recycledInputSource: "",
    leatherSpecies: "",
    leatherGrade: "",
    leatherSpeciesOther: "",
    leatherPattern: "",
    leatherThickness: 0,
    leatherMax: 0,
    leatherMin: 0,
    sewingThreadContent: "",
    printInkType: "",
    dyeClass: "",
    dyeClassStandard: "",
    finishes: "",
    pattern: "",
  });

  const validationSchema = Yup.object().shape({
    component: Yup.string().required("Performance je obavezan"),
    material: Yup.string().required("recyclability je obavezan"),
    contentName: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),
    contentValue: Yup.number().required("recyclingInstructions je obavezan"),
    contentSource: Yup.string(),
    materialTradeMarks: Yup.string().required(
      "disassemblyInstructionsUser location je obavezan"
    ),
    trimType: Yup.string().required("circularDesignStrategy je obavezan"),
    componentWeight: Yup.number(),
    recycled: Yup.string().required("repairInstructions location je obavezan"),
    recycledPercentage: Yup.number(),
    recycledInputSource: Yup.string().required(
      "disassemblyInstructionsUser location je obavezan"
    ),
    leatherSpecies: Yup.string().required("circularDesignStrategy je obavezan"),
    leatherGrade: Yup.string(),
    leatherSpeciesOther: Yup.string().required(
      "repairInstructions location je obavezan"
    ),
    leatherPattern: Yup.string(),
    leatherThickness: Yup.number().required(
      "disassemblyInstructionsUser location je obavezan"
    ),
    leatherMax: Yup.number().required("circularDesignStrategy je obavezan"),
    leatherMin: Yup.number(),
    sewingThreadContent: Yup.string().required(
      "repairInstructions location je obavezan"
    ),
    printInkType: Yup.string(),
    dyeClass: Yup.string().required(
      "disassemblyInstructionsUser location je obavezan"
    ),
    dyeClassStandard: Yup.string().required(
      "circularDesignStrategy je obavezan"
    ),
    finishes: Yup.string(),
    pattern: Yup.string().required("repairInstructions location je obavezan"),
  });

  const isDesktop = useMediaQuery("(min-width:960px)");

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const materialData = localStorage.getItem("materialData");

    if (productId) {
      setInitialFormValues((prev) => ({
        ...prev,
        productID: parseInt(productId),
      }));
    }
    if (materialData) {
      const parsedMaterialData = JSON.parse(materialData);

      setInitialFormValues((prev) => ({
        ...prev,
        ...parsedMaterialData,
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

      localStorage.setItem("materialData", JSON.stringify(response.data.data));

      onNext(requestValues);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while submitting the form");
    }
  };

  const handleNext = async (values) => {
    console.log("material handle next called");
    const materialDataStorage = localStorage.getItem("materialData");
    if (materialDataStorage) {
      apiCall("/api/MaterialInfo", "put", values);
      return;
    }
    console.log("Values are", values);
    apiCall("/api/MaterialInfo", "post", values);
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
                name={"component"}
                label={"Component"}
                fullWidth
                size="small"
                error={Boolean(errors.component && touched.component)}
                helperText={touched.component && errors.component}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                type="number"
                name="contentValue"
                label="Content Value"
                fullWidth
                size="small"
                error={Boolean(errors.contentValue && touched.contentValue)}
                helperText={touched.contentValue && errors.contentValue}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"material"}
                label={"Material"}
                fullWidth
                size="small"
                error={Boolean(errors.material && touched.material)}
                helperText={touched.material && errors.material}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"contentName"}
                label={"Content Name"}
                fullWidth
                size="small"
                error={Boolean(errors.contentName && touched.contentName)}
                helperText={touched.contentName && errors.contentName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                type="number"
                name="contentValue"
                label="Content Value"
                fullWidth
                size="small"
                error={Boolean(errors.contentValue && touched.contentValue)}
                helperText={touched.contentValue && errors.contentValue}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"contentSource"}
                label={"Content Source"}
                fullWidth
                size="small"
                error={Boolean(errors.contentSource && touched.contentSource)}
                helperText={touched.contentSource && errors.contentSource}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"materialTradeMarks"}
                label={"Material Trade Marks"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.materialTradeMarks && touched.materialTradeMarks
                )}
                helperText={
                  touched.materialTradeMarks && errors.materialTradeMarks
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"trimType"}
                label={"Trim Type"}
                fullWidth
                size="small"
                error={Boolean(errors.trimType && touched.trimType)}
                helperText={touched.trimType && errors.trimType}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                type="number"
                name={"componentWeight"}
                label={"Component Weight"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.componentWeight && touched.componentWeight
                )}
                helperText={touched.componentWeight && errors.componentWeight}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={Checkbox}
                type="checkbox"
                name={"recycled"}
                label={"Recycled"}
                fullWidth
                size="small"
                error={Boolean(errors.recycled && touched.recycled)}
                helperText={touched.recycled && errors.recycled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                type="number"
                name={"recycledPercentage"}
                label={"Recycled Percentage"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.recycledPercentage && touched.recycledPercentage
                )}
                helperText={
                  touched.recycledPercentage && errors.recycledPercentage
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"recycledInputSource"}
                label={"Recycled Input Source"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.recycledInputSource && touched.recycledInputSource
                )}
                helperText={
                  touched.recycledInputSource && errors.recycledInputSource
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"leatherSpecies"}
                label={"Leather Species"}
                fullWidth
                size="small"
                error={Boolean(errors.leatherSpecies && touched.leatherSpecies)}
                helperText={touched.leatherSpecies && errors.leatherSpecies}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"leatherGrade"}
                label={"Leather Grade"}
                fullWidth
                size="small"
                error={Boolean(errors.leatherGrade && touched.leatherGrade)}
                helperText={touched.leatherGrade && errors.leatherGrade}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"leatherSpeciesOther"}
                label={"Leather Species Other"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.leatherSpeciesOther && touched.leatherSpeciesOther
                )}
                helperText={
                  touched.leatherSpeciesOther && errors.leatherSpeciesOther
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"leatherPattern"}
                label={"Leather Pattern"}
                fullWidth
                size="small"
                error={Boolean(errors.leatherPattern && touched.leatherPattern)}
                helperText={touched.leatherPattern && errors.leatherPattern}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                type="number"
                name={"leatherThickness"}
                label={"Leather Thickness"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.leatherThickness && touched.leatherThickness
                )}
                helperText={touched.leatherThickness && errors.leatherThickness}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                type="number"
                name={"leatherMax"}
                label={"Leather Max"}
                fullWidth
                size="small"
                error={Boolean(errors.leatherMax && touched.leatherMax)}
                helperText={touched.leatherMax && errors.leatherMax}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                type="number"
                name={"leatherMin"}
                label={"Leather Min"}
                fullWidth
                size="small"
                error={Boolean(errors.leatherMin && touched.leatherMin)}
                helperText={touched.leatherMin && errors.leatherMin}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"sewingThreadContent"}
                label={"Sewing Thread Content"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.sewingThreadContent && touched.sewingThreadContent
                )}
                helperText={
                  touched.sewingThreadContent && errors.sewingThreadContent
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"printInkType"}
                label={"Print Ink Type"}
                fullWidth
                size="small"
                error={Boolean(errors.printInkType && touched.printInkType)}
                helperText={touched.printInkType && errors.printInkType}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"dyeClass"}
                label={"Dye Class"}
                fullWidth
                size="small"
                error={Boolean(errors.dyeClass && touched.dyeClass)}
                helperText={touched.dyeClass && errors.dyeClass}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"dyeClassStandard"}
                label={"Dye Class Standard"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.dyeClassStandard && touched.dyeClassStandard
                )}
                helperText={touched.dyeClassStandard && errors.dyeClassStandard}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"finishes"}
                label={"Finishes"}
                fullWidth
                size="small"
                error={Boolean(errors.finishes && touched.finishes)}
                helperText={touched.finishes && errors.finishes}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"pattern"}
                label={"Pattern"}
                fullWidth
                size="small"
                error={Boolean(errors.pattern && touched.pattern)}
                helperText={touched.pattern && errors.pattern}
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

export default Step8;
