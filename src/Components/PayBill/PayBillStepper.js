import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
// import GridContainer from "../../components/Grid/GridContainer";
// import GridItem from "../../components/Grid/GridItem";
import FooterLogoImg from "../../assets/logo-bg-white.png";
import { baseUrl } from "./../../config";
import { StepDetails } from "./StepDetails";
import { Alert } from "@material-ui/lab";
const steps = [
  {
    label: "Enter Invoice/Contract Number",
    mode: "contractIDVerification",
  },
  {
    label: "Choose payment method",
    mode: "amountToSendUSD",
  },
  {
    label: "Confirm payment",
    mode: "ConfirmPayment",
  },
];

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    flexGrow: 1,
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    width: "100%",
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "justify",
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  border: {
    border: "none",
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "center",
  },
  link: {
    padding: "0 5px",
    color: "#3f51b5",
  },
});

const useStyles = makeStyles(styles);

export const PayBillStepper = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [currentValues, setCurrentValues] = useState({});
  const [errMsg, setErrorMsg] = useState("");

  const handleReset = () => {
    setActiveStep(0);
  };

  const submitStep = (values, actions) => {
    setCurrentValues((data) => ({ ...data, ...values }));
    if (activeStep === 0) {
      actions.setSubmitting(true);
      axios
        .get(
          `${baseUrl}/pay/invoice-lookup/?security_code=${values.contract_number}`,
          {
            headers: { authorization: "" },
          }
        )
        .then(({ data }) => {
          if (data.is_success == true) {
            setCurrentValues((state) => ({ ...state, codeData: data }));
            // props.onSetInvoiceCode({
            //   invoice_code: values.contract_number,
            //   invoice_amount: data.invoice_amount,
            //   invoice_name: data.name,
            //   invoice_email: data.merchant.email,
            // });
            setActiveStep((step) => step + 1);
            sessionStorage.setItem("transactionInfo", JSON.stringify(data));
            setErrorMsg("");
          } else {
            setErrorMsg(data.errors);
          }
        })
        .catch((e) => {
          setErrorMsg(e);
          // toastr.error("Numéro de contrat erroné")
        })
        .finally(() => actions.setSubmitting(false));
    } else if (activeStep < steps.length - 1) {
      setActiveStep((step) => step + 1);
    }
  };

  return (
    <Box
      // display="flex"
      // minWidth={500}
      // minHeight={500}
      Height={500}
      Width={500}
      bgcolor="transprent"
      alignItems="center"
      justifyContent="center"
      m="auto"
      display="flex"
      marginTop="5%"
      marginBottom="8%"
    >
      <Paper>
        {/* <Typography variant="h4">Secured Payment Interface</Typography> */}
        <div style={{ textAlign: "center" }}>
          <img
            alt="Logo"
            // src={props.from === 'footer' ? FooterLogoImg : LogoImg}
            src={FooterLogoImg}
            style={{ width: 40, height: 40 }}
          />
        </div>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((item, index) => (
            <Step key={item.label}>
              <StepLabel>{item.label}</StepLabel>
              <StepContent>
                {errMsg != "" && (
                  <Alert severity="error" color="error">
                    {errMsg}
                  </Alert>
                )}
                <StepDetails
                  classes={classes}
                  currentValues={currentValues}
                  onPrevious={() => setActiveStep((step) => step - 1)}
                  onNext={() => setActiveStep((step) => step + 1)}
                  step={index}
                  submitStep={submitStep}
                  onModelSelect={props.onModelSelect}
                />
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}

        {/* <Paper square elevation={0} className={classes.bottomContainer}>
                Don
                {"'"}t have an account?{" "}
                <Link to="/sign-up" className={classes.link}>
                  Sign Up
                </Link>
              </Paper> */}
      </Paper>
    </Box>
  );
};
