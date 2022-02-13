// core components
// import Grid from "@material-ui/core/Grid";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Lock from "@material-ui/icons/Lock";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { getOneTimePasscode, getUserAuthToken } from "../../actions/login";
import { StepperActions } from "./StepperActions";
import toastr from "toastr";
import { Alert } from "@material-ui/lab";

const pascodeValidationSchema = Yup.object().shape({
  token: Yup.string().required("Required"),
});

const PasscodeInputPure = ({
  classes,
  onSubmit,
  onPrevious,
  getUserAuthToken,
  user_data,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [infoMsg, setInfoMsg] = useState("");
  const [infoType, setInfoType] = useState("info");

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    getUserAuthToken(values)
      .then((response) => {
        if (response.err) {
          toastr.error(response.err);
          setInfoMsg(response.err);
          setInfoType("error");
        } else {
          onSubmit(values);
        }
      })
      .catch((error) => {
        console.log("error1", error);
      });
  };

  const { values, submitForm, handleChange, isSubmitting, errors } = useFormik({
    initialValues: {},
    onSubmit: handleSubmit,
    validationSchema: pascodeValidationSchema,
  });

  useEffect(() => {
    const { one_time_code_resp } = user_data;
    const message = one_time_code_resp
      ? one_time_code_resp.one_time_pass_result.detail
      : "";
    setInfoMsg(message);
    setInfoType("info");
  }, [user_data]);

  return (
    <div>
      <div className={classes.margin}>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            {infoMsg && <Alert severity={infoType}>{infoMsg}</Alert>}

            <TextField
              error={errors.token}
              name="token"
              id="input-with-icon-grid"
              inputProps={{ style: { border: "none", height: "auto" } }}
              label="123456"
              onChange={handleChange}
              value={values.token}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <div>Please enter the One Time Code Sent to your Mobile</div>
          </GridItem>
        </Grid>
      </div>
      <StepperActions
        classes={classes}
        isSubmitting={isSubmitting}
        handleNext={submitForm}
        handleBack={onPrevious}
      />
    </div>
  );
};

const matchDispatchToPropsPasscodeInput = (dispatch) => {
  return bindActionCreators(
    {
      getOneTimePasscode: getOneTimePasscode,
      getUserAuthToken: getUserAuthToken,
    },
    dispatch
  );
};
const mapStateToProps = ({ user_data }) => {
  return {
    user_data: user_data,
  };
};

export const PasscodeInput = connect(
  mapStateToProps,
  matchDispatchToPropsPasscodeInput
)(PasscodeInputPure);
