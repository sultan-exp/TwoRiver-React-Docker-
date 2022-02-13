import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { getOneTimePasscode, getUserAuthToken } from "./../../actions/login";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

//phone input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import "../assets/scss/phone-number-input.css";
import "./../../assets/css/phone-number-input.css";

import toastr from "toastr";
const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    width: "100%",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textalign: "justify",
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

function getStepContent({
  step,
  props,
  handleInputChange,
  mobile,
  mode,
  type,
  email,
}) {
  switch (step) {
    case 0:
      return (
        <AccountInputs
          {...props}
          handleInputChange={handleInputChange}
          mobile={mobile}
          mode={mode}
          email={email}
          type={type}
        />
      );
    case 1:
      return <PasscodeInput {...props} handleInputChange={handleInputChange} />;
    default:
      return "Unknown step";
  }
}

class AccountInputs extends React.Component {
  handleInputChange(evt, field) {
    this.props.handleInputChange(evt.target.value, field);
  }
  render() {
    const { classes, mobile, email, type } = this.props;
    return (
      <div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignitems="flex-end" item>
            {/* <TextField
              onChange={evt => this.handleInputChange(evt, "email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {type === "mobile" ? <Phone /> : <Email />}
                  </InputAdornment>
                ),
                style: { border: "none", height: "auto" }
              }}
              id="input-with-icon-grid"
              label="email or phone number (+15629992511)"
              fullWidth
              margin="normal"
              value={mobile}
              //helperText="If provided, You will receive your One-time passcode at this Email address"
            /> */}
            {type === "mobile" ? (
              <PhoneInput
                country={"us"}
                value={mobile}
                // placeholder={"5629992511"}
                placeholder="(702) 123-4567"
                onChange={(phone) =>
                  this.handleInputChange(
                    { target: { value: `+${phone}` } },
                    "mobile"
                  )
                }
              />
            ) : (
              <TextField
                onChange={(evt) => this.handleInputChange(evt, "email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                  style: { border: "none", height: "auto" },
                }}
                id="input-with-icon-grid"
                label="email"
                fullWidth
                margin="normal"
                value={email}
                //helperText="If provided, You will receive your One-time passcode at this Email address"
              />
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

class PasscodeInput extends React.Component {
  handleInputChange(evt, field) {
    this.props.handleInputChange(evt.target.value, field);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignitems="flex-end">
            <Grid item>
              <Lock />
            </Grid>
            <Grid item>
              <TextField
                onChange={(evt) => this.handleInputChange(evt, "token")}
                inputProps={{ style: { border: "none", height: "auto" } }}
                id="input-with-icon-grid"
                label="123456"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

class VerticalLinearStepper extends React.Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      pass: "",
      mobile: "",
      email: "",
      token: "",
      type: "mobile",
      steps: [
        {
          label: "Enter Your Phone number to recieve a One-time passcode",
          mode: "mobile",
        },
        {
          label: "Enter the One-time Passcode you received via email or text",
          mode: "passcode",
        },
      ],
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.one_time_code_resp && nextProps.one_time_code_resp.detail) {
      toastr.info(nextProps.one_time_code_resp.detail);
    }
  }

  handleNext = (isEnd) => {
    if (this.state.activeStep === 0) {
      this.setState({ loading: true });
      this.props.getOneTimePasscode(this.state).then((res) => {
        this.setState({ loading: false });
        if (res.err) {
          toastr.error(res.err);
        } else {
          this.setState((state) => ({
            activeStep: state.activeStep + 1,
          }));
        }
      });
    }

    if (this.state.activeStep === 1) {
      this.setState({ loading: true });
      this.props.getUserAuthToken(this.state).then((res) => {
        this.setState({ loading: false });
        if (res.err) {
          toastr.error(res.err);
        } else {
          window.location.href = "/transactions";
        }
      });
    }
  };

  handleBack() {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  }

  handleReset() {
    this.setState({
      activeStep: 0,
    });
  }
  isNumber = (str) => {
    // eslint-disable-next-line
    let pattern = /([0-9\s\-]{5,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

    return pattern.test(str); // returns a boolean
  };

  handleInputChange(value, field) {
    if (field === "token") {
      this.setState({
        [field]: value,
      });
    } else {
      this.setState({
        pass: value,
      });
    }
  }

  handleModeSwitch = (mode) => {
    const { steps } = this.state;
    let newItem;
    if (mode === "mobile") {
      newItem = {
        label: "Enter Email Address to receive a One-time passcode",
        mode: "email",
      };
    } else {
      newItem = {
        label: "Enter Phone number to receive a One-time passcode",
        mode: "mobile",
      };
    }
    steps.splice(0, 1, newItem);
    this.setState({ steps });
  };
  onChangeType = () => {
    this.setState(({ type }) => ({
      type: type === "mobile" ? "email" : "mobile",
      pass: "",
    }));
  };
  render() {
    const { classes } = this.props;
    const { activeStep, loading, steps, pass, type } = this.state;

    return (
      <span>
        <section className="page-banner">
          <div className="container">
            <div className="row pge-banner-height align-items-center">
              <div className="col-12 text-center">
                <div className="banner-content-page">
                  <h3
                    className="animation"
                    data-animation="fadeInUp"
                    data-animation-delay="0.6s"
                  >
                    Login
                  </h3>
                  <div
                    className="animation"
                    data-animation="fadeInDown"
                    data-animation-delay="0.6s"
                  >
                    <h5>
                      We value your security. Therefore, you can only login by
                      requesting for a One Time Passcode via text(preferred) or
                      email.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="blog-area">
          <div className={classes.root}>
            <Grid
              container
              direction="column"
              justify="center"
              alignitems="center"
            >
              <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((item, index) => {
                      const { mode } = item;
                      return (
                        <Step key={item.label}>
                          <StepLabel>{item.label}</StepLabel>
                          {/* <Paper
                            square
                            elevation={0}
                            onClick={this.onChangeType}
                            className={classes.bottomContainer}
                          >
                            or click here to login with your{" "}
                            {type === "mobile" ? " Email" : " Phone"}
                          </Paper> */}
                          <StepContent>
                            {loading ? (
                              <h1>Loading...</h1>
                            ) : (
                              getStepContent({
                                step: index,
                                props: this.props,
                                handleInputChange: this.handleInputChange,
                                mobile: pass,
                                email: pass,
                                mode,
                                type,
                              })
                            )}
                            <div className={classes.actionsContainer}>
                              <div>
                                <Button
                                  disabled={activeStep === 0}
                                  onClick={this.handleBack}
                                  className={classes.button}
                                >
                                  Back
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    this.handleNext(
                                      activeStep === steps.length - 1
                                    )
                                  }
                                  disabled={loading}
                                  className={classes.button}
                                >
                                  {activeStep === steps.length - 1
                                    ? "Login"
                                    : "Next"}
                                </Button>
                              </div>
                            </div>
                          </StepContent>
                        </Step>
                      );
                    })}
                  </Stepper>
                  {activeStep === steps.length && (
                    <Paper
                      square
                      elevation={0}
                      className={classes.resetContainer}
                    >
                      <Typography>
                        All steps completed - you&quot;re finished
                      </Typography>
                      <Button
                        onClick={this.handleReset}
                        className={classes.button}
                      >
                        Reset
                      </Button>
                    </Paper>
                  )}

                  <Paper
                    square
                    elevation={0}
                    className={classes.bottomContainer}
                  >
                    Don't have an account?{" "}
                    <Link to="/#signup" className={classes.link}>
                      {" "}
                      Sign Up
                    </Link>
                  </Paper>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </section>
      </span>
    );
  }
}

// Get apps store and pass it as props to Container
//  > whenever store changes, the Container will automatically re-render
function mapStateToProps(store) {
  return {
    one_time_code_resp: store.user_data.one_time_code_resp,
    auth_token: store.user_data.auth_token,
    loading: store.user_data.loading,
  };
}

// Get actions and pass them as props to Container
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOneTimePasscode: getOneTimePasscode,
      getUserAuthToken: getUserAuthToken,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withStyles(styles)(VerticalLinearStepper));
