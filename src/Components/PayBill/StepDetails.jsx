import React from "react";
import PaymentMethod from "./AmountToSendInputs";
import { ContractInfo } from "./ContractNumberInputs";
import { AccountInputs } from "./AccountInputs";
import { PasscodeInput } from "./PasscodeInput";
import ConfirmPayment from "./ConfirmationPage";
import { Typography } from "@material-ui/core";

export const StepDetails = ({
  step,
  currentValues,
  submitStep,
  onPrevious,
  classes,
  ...props
}) => {
  switch (step) {
    case 0:
      return (
        <ContractInfo
          classes={classes}
          currentValues={currentValues}
          onSubmit={submitStep}
        />
      );
    case 1:
      return (
        <>
          <Typography>{currentValues?.codeData?.description}</Typography>
          <PaymentMethod
            classes={classes}
            currentValues={currentValues}
            onPrevious={onPrevious}
            onSubmit={submitStep}
            {...props}
          />
        </>
      );

    case 2:
      return <ConfirmPayment onPrevious={onPrevious} onSubmit={submitStep} />;

    default:
      return null;
  }
};
