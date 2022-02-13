import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { AccountInputs } from "./AccountInputs";
import { MakePayment } from "./MakePayment";
import ConfirmPayment from "./ConfirmationPage";
import { PasscodeInput } from "./PasscodeInput";
import { StepperActions } from "./StepperActions";
import PickUpLocationsComponent from "./PickUpLocations";
import { pickupLocations } from "../../actions/remittances";
import { Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import GridItem from "../Grid/GridItem.jsx";

export const PaymentMethod = (props) => {
  const [paymentStep, setPaymentStep] = useState("START");
  const { classes, onPrevious, currentValues, locations, submitStep } = props;

  const [amount, setAmount] = useState(
    (currentValues.codeData?.invoice_amount / 100).toString()
  );
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.pickupLocations();
  }, []);

  const renderAmount = (error) => (
    <GridItem xs={12} sm={12} md={12} style={{ marginBottom: "10px" }}>
      <TextField
        type="text"
        name="amount"
        placeholder="Amount"
        value={amount}
        onChange={(evt) => setAmount(evt.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MonetizationOnIcon />
            </InputAdornment>
          ),
          style: { border: "none", height: "auto" },
        }}
        label="Amount to pay"
        fullWidth
        margin="normal"
        error={!!error}
        helperText={!!error && "Invalid amount"}
      />
    </GridItem>
  );

  const getPaymentMethod = () => {
    switch (paymentStep) {
      case "ACCOUNT_INPUT":
        return (
          <AccountInputs
            classes={classes}
            currentValues={currentValues}
            onSubmit={() => setPaymentStep("PASSCODE_INPUT")}
          />
        );
      case "PASSCODE_INPUT":
        return (
          <PasscodeInput
            classes={classes}
            onSubmit={() => {
              if (props.onModelSelect) props.onModelSelect("ACCOUNT_INPUT");
              props.onNext();
            }}
          />
        );
      case "MAKE_PAYMENT":
        return (
          <MakePayment
            currentValues={currentValues}
            amount={amount}
            contract_id={currentValues.contract_number}
            merchant_id={currentValues.codeData.merchant.merchant_id}
            unit_price={amount}
            promocode={""}
            renderAmount={renderAmount}
            onSubmit={() => setPaymentStep("CONFIRM_PAYMENT")}
          />
        );
      case "CONFIRM_PAYMENT":
        return (
          <ConfirmPayment onSubmit={() => setPaymentStep("PAYMENT_COMPLETE")} />
        );
      case "PAYMENT_COMPLETE":
        return "Payment Complete";
      case "PAY_IN_CASH":
        return (
          <PickUpLocationsComponent
            locations={locations && locations.length ? locations : []}
            length={locations ? locations.length : 0}
            classes={classes}
            handleUpay={() => {
              if (props.onModelSelect) props.onModelSelect("PAY_IN_CASH");
            }}
          />
        );

      case "PAY_WITH_CHECK":
        return (
          //TODO: Need to select this field when user clicks on it
          <Typography onSubmit={() => setPaymentStep("PAY_WITH_CHECK")}>
            Check payments are currently disabled.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className={classes.actionsContainer}>
        <div>
          <Button
            color={paymentStep === "MAKE_PAYMENT" ? "primary" : ""}
            variant="contained"
            className={classes.button}
            onClick={() => {
              setPaymentStep("MAKE_PAYMENT");
              if (props.onModelSelect) props.onModelSelect("");
            }}
          >
            Credit Card
          </Button>
          <Button
            color={
              paymentStep === "ACCOUNT_INPUT" ||
              paymentStep === "PASSCODE_INPUT"
                ? "primary"
                : ""
            }
            variant="contained"
            className={classes.button}
            onClick={() => setPaymentStep("ACCOUNT_INPUT")}
          >
            Mobile Money
          </Button>
          <Button
            // color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => {
              setPaymentStep("PAY_WITH_CHECK");
            }}
          >
            Check
          </Button>
          <Button
            // color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => {
              setPaymentStep("PAY_IN_CASH");
            }}
          >
            Cash
          </Button>
        </div>
        {getPaymentMethod()}
        <StepperActions
          classes={classes}
          handleBack={onPrevious}
          handleNext={submitStep}
        />
      </div>
    </div>
  );
};
const mapStateToProps = ({ locations }) => ({
  locations: locations.locations.results,
});

const matchDispatchToProps = (dispatch) => ({
  pickupLocations: () => dispatch(pickupLocations()),
});

export default connect(mapStateToProps, matchDispatchToProps)(PaymentMethod);
