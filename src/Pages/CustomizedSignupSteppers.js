import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import Divider from "@material-ui/core/Divider";
// import { useHistory } from "react-router-dom";
import AppleIcon from "@material-ui/icons/Apple";
import AndroidIcon from "@material-ui/icons/Android";
import PAycruiserMobile from "../assets/PAycruiserMobile.png";
import CalendlyComponent from "../Components/Calendly/CalendlyComponent";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const DownloadAppSection = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    colSpace: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  return (
    <Grid className="PaycruiserMob-sec secInrGap">
      <Container className="container">
        <Box
          container
          spacing={3}
          className=""
          display="flex"
          flexDirection="row"
          alignitems="center"
          flexWrap="wrap"
        >
          <Grid item md={5} className={classes.colSpace}>
            <Paper className="BoxSdwNone" textalign="left">
              <img src={PAycruiserMobile} alt="" />
            </Paper>
          </Grid>
          <Grid item md={7} className={classes.colSpace}>
            <Box className="PaycruCapt">
              <Typography className="SecTitle">
                Sign Up With Our Mobile Apps
              </Typography>
              <Typography className="SecSubTitle">
                For enhanced security, we require new users to register using
                our Mobile Apps on IOS and Android.
              </Typography>
              <div className="btn-section">
                <Box
                  component="div"
                  display="inline"
                  // display="block" //for vertical alignment
                  p={1}
                  m={1}
                  // bgcolor="background.paper"
                >
                  <Button
                    href="https://apps.apple.com/us/app/paycruiser/id1420821593"
                    rel=""
                    target="_blank"
                    startIcon={<AppleIcon />}
                    xs={12}
                    sm={12}
                    md={6}
                    className="btn btn-theme-white"
                  >
                    {" "}
                    SIGN UP ON IOS{" "}
                  </Button>
                </Box>
                <Box
                  component="div"
                  display="inline"
                  // display="block"
                  p={1}
                  m={1}
                  // bgcolor="background.paper"
                >
                  <Button
                    href="https://play.google.com/store/apps/details?id=com.paycruiser.app"
                    rel=""
                    target="_blank"
                    startIcon={<AndroidIcon />}
                    xs={12}
                    sm={12}
                    md={6}
                    className="btn btn-theme-white"
                    round
                  >
                    {" "}
                    SIGN UP ON ANDROID{" "}
                  </Button>
                </Box>
              </div>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
};
export default function CustomizedSignupSteppers() {
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getSteps() {
    return [
      "Download App",
      "Schedule free onboarding session",
      "Access your dashboard",
    ];
  }

  const onSchedule = () => {
    history.push("/login");
  };
  const [skipBooking, setSkipBooking] = useState(false);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <DownloadAppSection />;
      case 1:
        return (
          <CalendlyComponent
            setSkipBooking={setSkipBooking}
            onSchedule={onSchedule}
          />
        );
      case 2:
        history.push("/login");
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
