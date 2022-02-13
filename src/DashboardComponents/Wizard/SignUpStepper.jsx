/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { getSubDomain } from "./utils";
import Button from "../../Components/CustomButtons/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import wizardStyle from "../../assets/dashboard/jss/material-dashboard-pro-react/components/wizardStyle";

export const SignUpStepsFooter = withStyles(wizardStyle)(
  ({ classes, hasPrevious, onPrevious, isSubmitting, hasNext, submitForm }) => (
    <div className={classes.footer}>
      <div className={classes.left}>
        {hasPrevious && (
          <Button disabled={isSubmitting} onClick={onPrevious}>
            Previous
          </Button>
        )}
      </div>
      <div className={classes.right}>
        <Button disabled={isSubmitting} color="rose" onClick={submitForm}>
          {isSubmitting ? (
            <CircularProgress thickness={6} size={20} />
          ) : (
            <>{hasNext ? "Next" : "Finish"}</>
          )}
        </Button>
      </div>
      <div className={classes.clearfix} />
    </div>
  )
);

export const SignUpStepper = withStyles(wizardStyle)(
  ({ classes, subtitle, title, steps = [] }) => {
    const [width, setWidth] = useState("100%");
    const [currentStep, setCurrentStep] = useState(0);
    const subDomain = getSubDomain();
    const [formState, setFormState] = useState();

    useEffect(() => {
      let calcWidth;

      if (window.innerWidth < 600) {
        if (steps.length !== 3) {
          calcWidth = "50%";
        } else {
          calcWidth = 100 / 3 + "%";
        }
      } else {
        calcWidth = 100 / steps.length + "%";
      }
      setWidth(calcWidth);
    }, []);

    const renderStep = () => {
      const { stepComponent: Component, ...other } = steps[currentStep];

      return (
        <div className={classes.stepContentActive} key={currentStep}>
          <Component
            {...other}
            wizardState={formState}
            updateWizardState={stepState =>
              setFormState({ ...formState, ...stepState })
            }
            hasNext={steps.length - 1 > currentStep}
            hasPrevious={currentStep > 0}
            onNext={() => setCurrentStep(currentStep + 1)}
            onPrevious={() => setCurrentStep(currentStep - 1)}
          />
        </div>
      );
    };

    return (
      <div className={classes.wizardContainer}>
        <Card className={classes.card}>
          <div className={classes.wizardHeader}>
            {subDomain && (
              <img
                width={50}
                height={50}
                src="https://paycruiser-public.s3-us-west-1.amazonaws.com/paycruiser_transparent.png"
                alt="Company"
              />
            )}
            <h3 className={classes.title}>{title}</h3>
            <h5 className={classes.subtitle}>{subtitle}</h5>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                return (
                  <li className={classes.steps} key={key} style={{ width }}>
                    <button className={classes.stepsAnchor}>
                      {prop.stepName}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div
              className={classes.movingTab + " " + classes["rose"]}
              style={{
                transition: "transform 0s"
              }}
            >
              {steps[currentStep].stepName}
            </div>
          </div>
          <div className={classes.content}>{renderStep()}</div>
        </Card>
      </div>
    );
  }
);
