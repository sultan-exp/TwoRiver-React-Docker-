import React from "react";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import toastr from "toastr";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../../Components/Card/Card.jsx";
import CardBody from "../../../Components/Card/CardBody.jsx";
import CardFooter from "../../../Components/Card/CardFooter.jsx";
import GridContainer from "../../../DashboardComponents/Grid/GridContainer.jsx";
import GridItem from "../../../DashboardComponents/Grid/GridItem.jsx";
import { getUserAuthToken } from "../../../actions/login";
import { SignUpStepsFooter } from "../../../DashboardComponents/Wizard/SignUpStepper";

const style = {
  infoText: {
    fontWeight: "600",
    margin: "10px 0 30px",
    textalign: "center",
  },
  OTPinputStyle: {
    width: "3rem",
    height: "5rem",
    margin: "0rem",
    fontSize: "2rem",
    borderRadius: "4px",
    border: "1px solid rgba(0,0,0,0.3)",
  },

  OTPContainerStyle: {
    textalign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  choiche: {
    textalign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },
};

const validationSchema = Yup.object().shape({
  passcode: Yup.number().required(),
});

const Verification = ({
  classes,
  hasPrevious,
  onPrevious,
  hasNext,
  getUserAuthToken,
  onNext,
}) => {
  const onSave = (values, actions) => {
    return getUserAuthToken({ token: values.passcode })
      .then(() => {
        if (hasNext) {
          onNext();
        }
      })
      .catch((err) => {
        toastr.error(err.message);
      })
      .finally(() => actions.setSubmitting(false));
  };
  const { values, submitForm, handleChange, errors, isSubmitting } = useFormik({
    initialValues: { firstnameState: "" },
    onSubmit: onSave,
    validationSchema,
    validateOnBlur: false,
  });

  return (
    <>
      <Grid container justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Enter Your One Time Passcode</h4>
        </GridItem>
        <GridItem xs={10} sm={10} md={6}>
          <Card plain>
            <CardBody>
              <form>
                <p>Enter the passcode you received via text or email</p>
                <OtpInput
                  value={values.passcode}
                  onChange={(value) =>
                    handleChange({ target: { value, name: "passcode" } })
                  }
                  numInputs={6}
                  inputStyle={style.OTPinputStyle}
                  separator={<span>-</span>}
                  error={errors.passcode}
                />
              </form>
            </CardBody>
            <CardFooter className={classes.justifyContent} />
          </Card>
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

const mapStateToProps = () => ({});
const mapDispatch = { getUserAuthToken };

export const StepVerification = withStyles(style)(
  connect(mapStateToProps, mapDispatch, null)(Verification)
);
