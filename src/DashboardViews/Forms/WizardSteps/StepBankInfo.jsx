import React from "react";
import { connect } from "react-redux";
import { UpdateMerchantInfo } from "../../../actions/misc";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import GridContainer from "../../../DashboardComponents/Grid/GridContainer.jsx";
import GridItem from "../../../DashboardComponents/Grid/GridItem.jsx";
import customSelectStyle from "../../../assets/dashboard/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Input from "../Input";
import { Bank } from "../merchant-account/Accounts";
import countries from "../../../constants/countries";
import us_states from "../../../constants/states";
import DateTime from "react-datetime";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SignUpStepsFooter } from "../../../DashboardComponents/Wizard/SignUpStepper";

const style = {
  infoText: {
    fontWeight: "600",
    margin: "10px 0 30px",
    textalign: "center",
  },
  ...customSelectStyle,
  stretch: {
    maxWidth: "100%",
    padding: "0 !important",
  },
};

const validationSchema = Yup.object().shape({
  date_of_birth: Yup.date().required("Required"),
  bank_token: Yup.string().when("connectedBank", {
    is: false,
    then: Yup.string().required("Required"),
  }),
  bank_name: Yup.string().when("connectedBank", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  account_number: Yup.string().when("connectedBank", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  retype_account_number: Yup.string().when("connectedBank", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  routing_number: Yup.string().when("connectedBank", {
    is: true,
    then: Yup.string().required("Required"),
  }),
});

const BankingInfo = ({
  classes,
  hasPrevious,
  onPrevious,
  hasNext,
  onNext,
  updateWizardState,
}) => {
  const onSave = (values, actions) => {
    const data = {
      ...values,
      state: values.user_state,
    };
    actions.setSubmitting(false);
    updateWizardState({ bankingInfo: data });

    if (hasNext) {
      onNext();
    }
  };

  const {
    values,
    submitForm,
    handleChange,
    errors,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      // date_of_birth: new Date(1980, 0, 1),
      country: "US",
      user_state: "CA",
      connectedBank: false,
    },
    onSubmit: onSave,
    validationSchema,
    validateOnBlur: false,
  });

  return (
    <>
      <Grid container justify="center">
        <GridItem xs={10} sm={10} md={10} lg={10}>
          <h4 className={classes.infoText}>
            Provide the bank account information to receive your daily payouts
          </h4>
        </GridItem>
        <GridItem xs={10} sm={10} md={10} lg={10}>
          <Bank
            onChange={handleChange}
            className={classes.stretch}
            bankConnected={values.bank_token}
            setConnectedBank={(value) => setFieldValue("connectedBank", value)}
            errors={errors}
          />
        </GridItem>
        <GridItem xs={10} sm={10} md={10} lg={10}>
          <DateTime
            value={values.date_of_birth}
            timeFormat={false}
            dateFormat="MM-DD-YYYY"
            inputProps={{
              placeholder: "Date of Birth (MM-DD-YYYY)",
              disabled: false,
              utc: true,
              required: true,
            }}
            name="dueOne"
            onChange={(date) => setFieldValue("date_of_birth", date._d)}
          />
          {errors.date_of_birth && (
            <div style={{ fontSize: 12, color: "#e91e63" }}>
              {errors.date_of_birth}
            </div>
          )}
        </GridItem>
        <Input
          value={values.address}
          labelText="Address"
          id="address"
          name="address"
          onChange={handleChange}
        />
        <Input labelText="City" id="city" name="city" onChange={handleChange} />

        <GridItem xs={10} sm={10} md={10} lg={10}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Choose State
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu,
              }}
              classes={{
                select: classes.select,
              }}
              value={values.user_state}
              onChange={handleChange}
              inputProps={{
                name: "user_state",
              }}
            >
              {Object.entries(us_states).map((element, key) => (
                <MenuItem
                  key={key}
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected,
                  }}
                  value={element[1]}
                >
                  {element[0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>

        <Input
          value={values.zip_code}
          labelText="Zip Code"
          id="zipcode"
          name="zip_code"
          onChange={handleChange}
        />

        <GridItem xs={10} sm={10} md={10} lg={10}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Choose Country
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu,
              }}
              classes={{
                select: classes.select,
              }}
              value={values.country}
              onChange={handleChange}
              inputProps={{
                name: "country",
              }}
            >
              {countries.map((element, key) => (
                <MenuItem
                  key={key}
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected,
                  }}
                  value={Object.values(element)[0]}
                >
                  {Object.keys(element)[0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
const mapDispatch = { UpdateMerchantInfo };

export const StepBankInfo = withStyles(style)(
  connect(mapStateToProps, mapDispatch, null)(BankingInfo)
);
