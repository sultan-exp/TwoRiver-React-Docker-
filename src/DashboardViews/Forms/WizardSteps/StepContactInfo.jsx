import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import InputAdornment from "@material-ui/core/InputAdornment";
import Business from "@material-ui/icons/Business";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../DashboardComponents/Grid/GridContainer";
import GridItem from "../../../DashboardComponents/Grid/GridItem";
import CustomInput from "../../../DashboardComponents/CustomInput/CustomInput";
import { getSubDomain } from "../../../DashboardComponents/Wizard/utils";
import { signUpStepOne } from "../../../actions/misc";
import { SignUpStepsFooter } from "../../../DashboardComponents/Wizard/SignUpStepper";
import "react-phone-input-2/lib/style.css";
import "./../../../assets/scss/phone-number-input.css";

const style = {
  infoText: {
    fontWeight: "600",
    margin: "10px 0 30px",
    textalign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  inputAdornment: {
    position: "relative",
  },
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email("Please enter a valid email"),
  firstname: Yup.string().required().min(3),
  lastname: Yup.string().required().min(3),
  business_name: Yup.string()
    .required()
    .max(10, "business name must be at most 10 characters")
    .min(3),
  phone_number: Yup.string()
    .required()
    .matches(/^\+?\d*$/, { excludeEmptyString: true })
    .min(10),
});

const ContactInfo = ({
  onPrevious,
  classes,
  signUpStepOne,
  hasNext,
  onNext,
  hasPrevious,
  updateWizardState,
}) => {
  const onSave = (values, actions) => {
    const domain_url = getSubDomain();
    const data = { ...values, domain_url };
    return signUpStepOne(data)
      .then(() => {
        updateWizardState({ contactInfo: data });
        if (hasNext) {
          onNext();
        }
      })
      .catch((error) => {
        console.log(error);
        toastr.error("Error Saving contact info");
      })
      .finally(() => actions.setSubmitting(false));
  };

  const { values, submitForm, handleChange, errors, isSubmitting } = useFormik({
    initialValues: {},
    onSubmit: onSave,
    validationSchema,
    validateOnBlur: false,
  });

  return (
    <>
      <Grid container justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Let
            {"'"}s start with your contact information
          </h4>
        </GridItem>
        <GridItem xs={10} sm={10} md={10} lg={10}>
          <CustomInput
            error={errors.firstname}
            labelText={
              <span>
                First Name <small>(Required)</small>
              </span>
            }
            id="firstname"
            name="firstname"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: handleChange,
              value: values.firstname,
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            error={errors.lastname}
            labelText={
              <span>
                Last Name <small>(Required)</small>
              </span>
            }
            id="lastname"
            name="lastname"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: handleChange,
              value: values.lastname,
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <RecordVoiceOver className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
          <PhoneInput
            country="us"
            value={values.phone_number}
            placeholder="(702) 123-4567"
            onChange={(phone_number) =>
              handleChange({
                target: { value: `+${phone_number}`, name: "phone_number" },
              })
            }
          />
          {errors.phone_number && (
            <div style={{ fontSize: 12, color: "#f44336" }}>
              {errors.phone_number}
            </div>
          )}
          <CustomInput
            error={errors.business_name}
            labelText={
              <span>
                Business Name <small>(Required)</small>
              </span>
            }
            name="business_name"
            id="business_name"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: handleChange,
              value: values.business_name,
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Business className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
          {errors.business_name && (
            <div style={{ fontSize: 12, color: "#f44336" }}>
              {errors.business_name}
            </div>
          )}
        </GridItem>
        <GridItem xs={10} sm={10} md={10} lg={10}>
          <CustomInput
            error={errors.email}
            labelText={
              <span>
                Email <small>(Required; Only alpha numeric characters)</small>
              </span>
            }
            id="email"
            name="email"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: handleChange,
              value: values.email,
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
      </Grid>
      <SignUpStepsFooter
        {...{
          hasPrevious,
          onPrevious,
          isSubmitting,
          hasNext,
          submitForm,
        }}
      />
    </>
  );
};

const mapDispatch = { signUpStepOne };

export const StepContactInfo = withStyles(style)(
  connect(() => ({}), mapDispatch, null)(ContactInfo)
);
