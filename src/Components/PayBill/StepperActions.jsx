import Button from "@material-ui/core/Button";
import React from "react";
export const StepperActions = ({
  classes,
  handleBack,
  loading,
  handleNext,
}) => {
  return (
    <div className={classes.actionsContainer}>
      <div>
        {handleBack && (
          <Button
            onClick={handleBack}
            disabled={loading}
            className={classes.button}
          >
            Previous Step
          </Button>
        )}
        {handleNext && (
          <Button
            disabled={loading}
            className={classes.button}
            color="primary"
            onClick={handleNext}
            variant="contained"
          >
            Next Step
          </Button>
        )}
      </div>
    </div>
  );
};
