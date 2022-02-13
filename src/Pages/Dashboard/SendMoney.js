import React, { useState } from "react";

import woman from "../../assets/img/img_20210927.png";
import man from "../../assets/img/img_20210928.png";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { Grid, FormControl, Fab, FormLabel, FormControlLabel, FilledInput, OutlinedInput, FormHelperText, Radio, RadioGroup, Checkbox, Button, FormGroup, TextField, Input, InputLabel, InputAdornment, IconButton, MenuItem, Select, Paper } from '@material-ui/core';
import { CheckBoxIcon, CheckBoxOutlineBlankIcon, Favorite, FavoriteBorder, DashboardIcon, Visibility, VisibilityOff, Satellite } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paperContainer: {
    padding: 40,
    height: '100%',
    margin: '0px 15px'
  },
  cardTitle: {
    margin: 0
  },
  confirmBtn: {
    textTransform: 'none',
    width: '50%',
    paddingTop: '17px',
    paddingBottom: '18px'
  },
  createcustomerBtn: {
    textTransform: 'none',
    width: '50%',
    paddingTop: '17px',
    paddingBottom: '16px'
  },
  createBtn: {
    backgroundColor: '#0881F9',
    fontFamily: 'Wavehaus',
    padding: '10px 11px 9px 13px',
    fontStyle: 'normal',
    textTransform: 'none',
  },
  searchInput: {
    width: '50%',
    marginTop: '20px',
  },
  eoBtn: {
    backgroundColor: '#000000',
    marginTop: '60px',
    color: 'white'
  },
  fntBold: {
    fontWeight: 'Bold'
  },
  createcustombox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 137px 17px 131px',
  },
  sendstep: {
    width: '20%'
  },
  moneyBtn: {
    marginLeft: '20px',
    padding: '13px 20px',
    color: 'black',
    textTransform: 'none',
  },
  cashBtn: {
    padding: '13px 20px',
    color: 'black',
    backgroundColor: '#E1E7FE',
    textTransform: 'none',
  },
  formControl: {
    width: '100%'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepperBlock: {
    width: '100%'
  },
  avatarBlock: {
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px',
  },
  activeavatarBlock: {
    padding: '20px',
    backgroundColor: '#E1E7FE',
    borderRadius: '10px',
    marginTop: '20px',
  },
}));

const SelectCustomer = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    step: 0,
    isDetailcustomer: false,
    createcustomer: false,
    selectedIDType: 'passport',
    IDNumber: "",
    note: "",

  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = ['Select Customer', 'Select Beneficiary', 'Amount', 'Summary'];
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleConfirm = () => {
    setState({ ...state, step: state.step + 1 });
    handleNext();
  }
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleChange = (event) => {
    if (event.target.value === '08124356896') {
      setState({ ...state, isDetailcustomer: true });
    }
    else {
      setState({ ...state, isDetailcustomer: false });
    }
  };

  return (
    <Grid container className={classes.root} justifyContent="center" alignItems='center'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Send Money</h3>
        </Grid>
        <div className={classes.stepperBlock}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        {state.step == 0 ?
          <>
            {
              state.createcustomer == false ?
                <>
                  <Grid item xs={12}>
                    <Paper className={classes.paperContainer}>
                      <Box display="flex" justifyContent="space-between">
                        <h4 className={classes.cardTitle}>Select Customer</h4>
                        <Button variant="contained" disableRipple className={classes.createBtn} onClick={() => {
                          setState({ ...state, createcustomer: true })
                        }} color="primary">
                          Create Customer
                        </Button>
                      </Box>
                      <Box display="flex" justifyContent="center">
                        <TextField id="outlined-search" onChange={handleChange} className={classes.searchInput} placeholder="Search Customer (by Phone number)" type="search" variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                </>
                :
                <>
                  <Grid item xs={12}>
                    <Paper className={classes.paperContainer}>
                      <Box>
                        <h4 className={classes.cardTitle}>Create Customer</h4>
                      </Box>
                      <Box className={classes.createcustombox}>
                        <Box display="flex">
                          <Box display="flex" width="50%" flexDirection="column">
                            <p>First name</p>
                            <TextField variant="outlined"></TextField>
                          </Box>
                          <Box display="flex" width="50%" marginLeft="10px" flexDirection="column">
                            <p>Last name</p>
                            <TextField variant="outlined"></TextField>
                          </Box>
                        </Box>
                        <Box display="flex" flexDirection="column">
                          <p>Email Address</p>
                          <TextField variant="outlined"></TextField>
                        </Box>
                        <Box display="flex">
                          <Box display="flex" width="30%" flexDirection="column">
                            <p>Country Code</p>
                            <TextField variant="outlined"></TextField>
                          </Box>
                          <Box display="flex" width="70%" marginLeft="10px" flexDirection="column">
                            <p>Phone Number</p>
                            <TextField variant="outlined"></TextField>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </>
            }
            {
              state.isDetailcustomer == true ?
                <>
                  <Grid item xs={12}>
                    <Paper className={classes.paperContainer}>
                      <Box>
                        <h4 className={classes.cardTitle}>Customer Details</h4>
                      </Box>
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Fab className={classes.eoBtn} aria-label="edit">
                          EO
                        </Fab>
                        <p className={classes.fntBold}>Abdoulaye Test Bah</p>
                        <p>abah@yahwii.com</p>
                        <p>Address: <span className={classes.fntBold}>--</span></p>
                        <p>City: <span className={classes.fntBold}>Toronto</span></p>
                        <p>State: <span className={classes.fntBold}>--</span></p>
                        <p>Postal Code: <span className={classes.fntBold}>00000</span></p>
                        <p>Country: <span className={classes.fntBold}>Sierra Leone</span></p>
                        <p>Country Code: <span className={classes.fntBold}>SLE</span></p>
                        <p>Phone Number: <span className={classes.fntBold}>632879880</span></p>
                        <p>Status: <span className={classes.fntBold}>Active</span></p>
                      </Box>
                    </Paper>
                  </Grid>
                </>
                :
                <></>
            }
            <Grid item container xs={12} justifyContent="center">
              {
                state.createcustomer == false ?
                  <Button variant="contained" disableRipple color="primary" className={classes.confirmBtn} onClick={handleConfirm}>
                    Confirm
                  </Button>
                  :
                  <Button variant="contained" disableRipple color="primary" className={classes.createcustomerBtn} onClick={handleConfirm}>
                    Create Customer
                  </Button>
              }

            </Grid>
          </>
          :
          <>
          </>
        }
        {state.step == 1 ?
          <>
            <Grid item xs={12}>
              <Paper className={classes.paperContainer}>
                <Box display="flex" justifyContent="space-between">
                  <h4 className={classes.cardTitle}>Beneficiary</h4>
                  <Button variant="contained" disableRipple className={classes.createBtn} onClick={() => {
                    setState({ ...state, createcustomer: true })
                  }} color="primary">
                    Create Beneficiary
                  </Button>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Box width="70%">
                    <p>Money transfer Method</p>
                    <Box display="flex">
                      <Button variant="outlined" color="primary" className={classes.cashBtn}>
                        Cash Pickup
                      </Button>
                      <Button variant="outlined" color="primary" className={classes.moneyBtn}>
                        Mobile Money
                      </Button>
                    </Box>
                    <p>Destination Country</p>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <Select
                        native
                        value={state.age}
                        width="100%"
                        onChange={handleChange}
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>US</option>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paperContainer}>
                <h4 className={classes.cardTitle}>Beneficiary list</h4>
                <Box display="flex" justifyContent="space-around">
                  <Box display="flex" className={classes.activeavatarBlock} flexDirection="column" alignItems="center">
                    <Avatar alt="Remy Sharp" src={woman} />
                    <p>Oma Beaut</p>
                    <p>GTB.0122256783</p>
                  </Box>
                  <Box display="flex" className={classes.avatarBlock} flexDirection="column" alignItems="center">
                    <Avatar alt="Remy Sharp" src={man} />
                    <p>Oma Beaut</p>
                    <p>GTB.0122256783</p>
                  </Box>
                  <Box display="flex" className={classes.avatarBlock} flexDirection="column" alignItems="center">
                    <Avatar alt="Remy Sharp" src={woman} />
                    <p>Oma Beaut</p>
                    <p>GTB.0122256783</p>
                  </Box>
                  <Box display="flex" className={classes.avatarBlock} flexDirection="column" alignItems="center">
                    <Avatar alt="Remy Sharp" src={man} />
                    <p>Oma Beaut</p>
                    <p>GTB.0122256783</p>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
              <Button variant="contained" disableRipple color="primary" className={classes.confirmBtn} onClick={handleConfirm}>
                Confirm
              </Button>
            </Grid>
          </>
          :
          <>
          </>
        }
        {state.step == 2 ?
          <>
            <Grid item xs={12}>
              <Paper className={classes.paperContainer}>
                <h4 className={classes.cardTitle}>Enter Amount</h4>
              </Paper>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
              <Button variant="contained" disableRipple color="primary" className={classes.confirmBtn} onClick={handleConfirm}>
                Proceed
              </Button>
            </Grid>
          </>
          :
          <>
          </>
        }
      </Grid>
    </Grid>
  )
};

export default SelectCustomer;
