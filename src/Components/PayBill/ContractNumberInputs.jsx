import Paper from "@material-ui/core/Paper";
import { useFormik } from "formik";
import { default as React } from "react";
import * as Yup from "yup";
// import GridContainer from "../Grid/GridContainer";
// import GridItem from "../Grid/GridItem";

import { Grid, CircularProgress, Button } from "@material-ui/core";

import Input from "@material-ui/core/Input";
// import CustomInput from "../CustomInput/CustomInput";
import { StepperActions } from "./StepperActions";

const recipientValidationSchema = Yup.object().shape({
  contract_number: Yup.string().required("Required"),
});

export const ContractInfo = ({ onSubmit, classes, currentValues }) => {
  const { values, submitForm, handleChange, isSubmitting, errors } = useFormik({
    initialValues: { ...currentValues },
    onSubmit,
    validationSchema: recipientValidationSchema,
  });

  return (
    <div className={classes.margin}>
      <Grid container>
        <Grid item>
          <Paper square elevation={0} className={classes.bottomContainer} />
        </Grid>
        <Grid item>
          <Input
            labelText={
              <span>
                Numéro de contrat <small>(Champs réquis)</small>
              </span>
            }
            id="contract_number"
            name="contract_number"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              name: "contract_number",
              id: "contract_number",
              value: values.contract_number,
              onChange: handleChange,
            }}
          />
        </Grid>
      </Grid>
      <StepperActions
        classes={classes}
        handleNext={submitForm}
        loading={isSubmitting}
      />
    </div>
  );
};
