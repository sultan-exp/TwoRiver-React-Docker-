import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { getMobileMoneyOTP, getUserAuthToken } from "../../actions/login";
import { StepperActions } from "./StepperActions";

const accountValidationSchema = Yup.object().shape({
  sender_mobile: Yup.string().required("Required"),
});

const AccountInputsPure = ({
  classes,
  onSubmit,
  onPrevious,
  getMobileMoneyOTP,
  currentValues,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    getMobileMoneyOTP({ phone_number: values.sender_mobile, type: "mobile" })
      .then(() => {
        actions.setSubmitting(false);
        onSubmit(values);
        setActiveStep((step) => step + 1);
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  };
  const { values, submitForm, handleChange, isSubmitting, errors } = useFormik({
    initialValues: { ...currentValues },
    onSubmit: handleSubmit,
    validationSchema: accountValidationSchema,
  });

  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" item>
          <div>Entrez votre numéro de telephone </div>
          <PhoneInput
            containerClass={errors.sender_mobile && `input_error`}
            country={"sn"}
            placeholder="+1 (562) 999-2511"
            value={values.sender_mobile}
            onChange={(phone) =>
              handleChange({
                target: { value: `+${phone}`, name: "sender_mobile" },
              })
            }
          />
        </Grid>
      </div>
      <StepperActions
        classes={classes}
        handleBack={onPrevious}
        loading={isSubmitting}
        handleNext={submitForm}
      />
    </div>
  );
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getMobileMoneyOTP: getMobileMoneyOTP,
      getUserAuthToken: getUserAuthToken,
    },
    dispatch
  );
};

export const AccountInputs = connect(() => {}, matchDispatchToProps)(
  AccountInputsPure
);
