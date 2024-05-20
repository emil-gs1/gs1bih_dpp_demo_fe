import { toast } from "react-toastify";
import { Grid, Button, TextField, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Step4 = ({ data, onNext, onPrevious }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    productID: 0,
    performance: "",
    recyclability: "",
    takeBackInstructions: "",
    recyclingInstructions: "",
    disassemblyInstructionsSorters: "",
    disassemblyInstructionsUser: "",
    circularDesignStrategy: "",
    circularDesignStrategyDescription: "",
    repairInstructions: "",
  });

  const validationSchema = Yup.object().shape({
    performance: Yup.string().required("Performance je obavezan"),
    recyclability: Yup.string().required("recyclability je obavezan"),
    takeBackInstructions: Yup.string().required(
      "takeBackInstructions company je obavezan"
    ),
    recyclingInstructions: Yup.string().required(
      "recyclingInstructions je obavezan"
    ),
    disassemblyInstructionsSorters: Yup.string(),
    disassemblyInstructionsUser: Yup.string().required(
      "disassemblyInstructionsUser location je obavezan"
    ),
    circularDesignStrategy: Yup.string().required(
      "circularDesignStrategy je obavezan"
    ),
    circularDesignStrategyDescription: Yup.string(),
    repairInstructions: Yup.string().required(
      "repairInstructions location je obavezan"
    ),
  });
  const isDesktop = useMediaQuery("(min-width:960px)");

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const circularityData = localStorage.getItem("circularityData");

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

  const handleNext = async (values) => {
    const circularityDataStorage = localStorage.getItem("circularityData");
    if (circularityDataStorage) {
      onNext(values);
      return;
    }
    console.log("Values are", values);
    try {
      const response = await axios.post(
        "https://localhost:7127/api/CircularityInfo",
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
        "circularityData",
        JSON.stringify(updatedFormValues)
      );

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
                name={"performance"}
                label={"Performance"}
                fullWidth
                size="small"
                error={Boolean(errors.performance && touched.performance)}
                helperText={touched.performance && errors.performance}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"recyclability"}
                label={"Recyclability"}
                fullWidth
                size="small"
                error={Boolean(errors.recyclability && touched.recyclability)}
                helperText={touched.recyclability && errors.recyclability}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"takeBackInstructions"}
                label={"Take Back Instructions"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.takeBackInstructions && touched.takeBackInstructions
                )}
                helperText={
                  touched.takeBackInstructions && errors.takeBackInstructions
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"recyclingInstructions"}
                label={"Recycling Instructions"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.recyclingInstructions && touched.recyclingInstructions
                )}
                helperText={
                  touched.recyclingInstructions && errors.recyclingInstructions
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"disassemblyInstructionsSorters"}
                label={"Disassembly Instructions Sorters"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.disassemblyInstructionsSorters &&
                    touched.disassemblyInstructionsSorters
                )}
                helperText={
                  touched.disassemblyInstructionsSorters &&
                  errors.disassemblyInstructionsSorters
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"disassemblyInstructionsUser"}
                label={"Disassembly Instructions User"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.disassemblyInstructionsUser &&
                    touched.disassemblyInstructionsUser
                )}
                helperText={
                  touched.disassemblyInstructionsUser &&
                  errors.disassemblyInstructionsUser
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"circularDesignStrategy"}
                label={"Circular Design Strategy"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.circularDesignStrategy &&
                    touched.circularDesignStrategy
                )}
                helperText={
                  touched.circularDesignStrategy &&
                  errors.circularDesignStrategy
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"circularDesignStrategyDescription"}
                label={"Circular Design Strategy Description"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.circularDesignStrategyDescription &&
                    touched.circularDesignStrategyDescription
                )}
                helperText={
                  touched.circularDesignStrategyDescription &&
                  errors.circularDesignStrategyDescription
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name={"repairInstructions"}
                label={"Repair Instructions"}
                fullWidth
                size="small"
                error={Boolean(
                  errors.repairInstructions && touched.repairInstructions
                )}
                helperText={
                  touched.repairInstructions && errors.repairInstructions
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

export default Step4;
