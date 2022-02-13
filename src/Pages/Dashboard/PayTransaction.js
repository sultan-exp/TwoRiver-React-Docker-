import React, { useState } from "react";

import GridItem from "../../DashboardComponents/Grid/GridItem.jsx";
import CustomInput from "../../DashboardComponents/CustomInput/CustomInput.jsx";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import { Grid, FormControl, FormLabel, FormControlLabel, FilledInput, OutlinedInput, FormHelperText, Radio, RadioGroup, Checkbox, Button, FormGroup, TextField, Input, InputLabel, InputAdornment, IconButton, MenuItem, Select, Paper } from '@material-ui/core';
import { CheckBoxIcon, CheckBoxOutlineBlankIcon, Favorite, FavoriteBorder, DashboardIcon, Visibility, VisibilityOff, Satellite } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // backgroundColor:'grey',
  },
  paperItem: {
    height: 200,
    width: 200,
    margin: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  paperContainer: {
    padding: 40,
    height: '100%',
    margin: '0px 15px'
  },
  companySelected: {
    backgroundColor: '#e1e7fe'
  },
  cardTitle: {
    // paddingTop:20,
    // paddingLeft:20
  },
  nextBtn: {
    width: '50%'
  },
  payBtn: {
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
    backgroundColor: '#6da544',
  },
  companyItem: {
    display: 'flex',
    width: 100,
    background: 'blue',
    borderRadius: 100,
    padding: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  companyItemChecked: {
    backgroundColor: '#292fbb'
  }

}));

const COUNTRIES = [
  {
    value: 'USA',
    label: 'USA',
  },
  {
    value: 'CA',
    label: 'CA',
  },
  {
    value: 'RUS',
    label: 'RUS',
  },
];

const ID_TYPES = [
  {
    value: 'passport',
    label: 'Passport',
  },
  {
    value: 'idcard',
    label: 'National ID Card',
  },
  {
    value: 'driver_license',
    label: 'Driver License',
  },
]

const PayTransaction = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    step: 0,
    isPickupCodeChecked: true,
    isConfirmPaymentChecked: false,
    selectedIDType: 'passport',
    IDNumber: "",
    selectedCountry: 'USA',
    selectedCompany: 'BNB',
    governmentIDPhoto: '',
    receiptPhoto: '',
    address: '',
    note: "",

  });

  const onItemClick = (link) => {

  }

  const handleChange = (event) => {
    // setChecked(event.target.checked);
  };
  const handleChangeCurrency = (event) => {
    // setCurrency(event.target.checked);
  };

  return (
    <Grid container className={classes.root} justifyContent="center" alignItems='center'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Pay Transaction</h3>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <FormControlLabel
            control={<Checkbox checked={state.step >= 0} onChange={() => { setState({ ...state, isPickupCodeChecked: true }) }} name="checkedA" />}
            label="Pickup Code"
          />
          <FormControlLabel
            control={<Checkbox checked={state.step > 0} onChange={handleChange} name="checkedA" />}
            label="Confirm payment"
          />
        </Grid>
        {state.step == 0 ?
          <>
            <Grid item xs={12}>
              <Paper className={classes.paperContainer}>
                <h4 className={classes.cardTitle}>Select company</h4>
                <Grid container justifyContent="center">
                  <Paper className={clsx(classes.paperItem, state.selectedCompany == "BNB" && classes.companySelected)} variant="outlined"
                    onClick={() => { setState({ ...state, selectedCompany: "BNB" }) }}
                  >
                    <div className={classes.companyItem}>
                      <h4>BNB</h4>
                    </div>

                  </Paper>
                  <Paper className={clsx(classes.paperItem, state.selectedCompany == "RIA" && classes.companySelected)} variant="outlined" onClick={() => { setSelectedCompany("RIA") }} >
                    <div className={classes.companyItem}>
                      <h4>RIA</h4>
                    </div>
                  </Paper>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paperContainer}>
                <h4 className={classes.cardTitle}>Pickup Code</h4>
                <Grid container xs={12} justifyContent="center">
                  <TextField
                    id="outlined-helperText"
                    label="Enter Pickup code"
                    placeholder="123456"
                    // helperText="Some important text"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: '50%' }}
                  />

                </Grid>

              </Paper>
            </Grid>

            <Grid item container xs={12} justifyContent="center">
              <Button variant="contained" color="primary" className={classes.nextBtn} onClick={() => { setState({ ...state, step: state.step + 1 }) }}>
                Next
              </Button>
            </Grid>
          </>
          :
          <>
            <Grid item container xs={12}>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paperContainer}>
                  <h4 className={classes.cardTitle}>Beneficiary</h4>
                  <Grid container>
                    <Grid item container xs={12}>
                      <Grid item xs={6}><span>Pickup Code:</span></Grid>
                      <Grid item xs={6}><span>12dk4o4</span></Grid>
                    </Grid>

                    <Grid item container xs={12}>
                      <Grid item xs={6}><span>Name:</span></Grid>
                      <Grid item xs={6}><span>Melcvin Sesay</span></Grid>
                    </Grid>

                    <Grid item container xs={12}>
                      <Grid item xs={6}><span>Phone Number:</span></Grid>
                      <Grid item xs={6}><span>23748273487</span></Grid>
                    </Grid>

                    <Grid item container xs={12}>
                      <Grid item xs={6}><span>Amount:</span></Grid>
                      <Grid item xs={6}><span>415000 SLL</span></Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper className={classes.paperContainer}>
                  <h4 className={classes.cardTitle}>Sender</h4>
                  <Grid container>
                    <Grid item container xs={12}>
                      <Grid item xs={6}><span>Name:</span></Grid>
                      <Grid item xs={6}><span>Melcvin Sesay</span></Grid>
                    </Grid>

                    <Grid item container xs={12}>
                      <Grid item xs={6}><span>Country:</span></Grid>
                      <Grid item xs={6}><span>USA</span></Grid>
                    </Grid>

                    <Grid item container xs={12}>
                      <Grid item xs={6}><span>Phone number:</span></Grid>
                      <Grid item xs={6}><span>23748273487</span></Grid>
                    </Grid>

                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paperContainer}>
                <h4 className={classes.cardTitle}>Customer Details</h4>
                <Grid container xs={12} justifyContent="center">
                  <TextField
                    id="standard-select-currency"
                    select
                    label="ID Type"
                    value={state.selectedIDType}
                    onChange={(e) => { setState({ ...state, selectedIDType: e.target.value }) }}
                    variant="outlined"
                    style={{ width: '50%' }}
                  // helperText="Please select your currency"
                  >
                    {ID_TYPES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <br />
                <Grid container xs={12} justifyContent="center">
                  <TextField
                    id="outlined-helperText"
                    label="ID Number"
                    placeholder="123456"
                    // helperText="Some important text"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={state.IDNumber}
                    onChange={(e) => { setState({ ...state, IDNumber: e.target.value }) }}
                    style={{ width: '50%' }}
                  />
                </Grid>
                <br />
                <Grid container xs={12} justifyContent="center">
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Issuing Country"
                    value={state.selectedCountry}
                    onChange={(event) => {
                      setState({
                        ...Satellite,
                        selectedCountry: event.target.value
                      })
                    }}
                    variant="outlined"
                    style={{ width: '50%' }}
                  // helperText="Please select your currency"
                  >
                    {COUNTRIES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <br />
                <Grid container xs={12} justifyContent="center">
                  <FormControl className={clsx(classes.margin, classes.textField)} style={{ width: '50%' }} variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    shrink={true}
                  >
                    <InputLabel htmlFor="outlined-adornment-password" shrink>
                      Government ID Photo
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      // type={values.showPassword ? 'text' : 'password'}
                      // value={values.password}
                      // onChange={handleChange('password')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      shrink
                      endAdornment={
                        <InputAdornment position="end">
                          <Button variant="contained" color="primary">Browse</Button>
                        </InputAdornment>
                      }
                      labelWidth={160}
                    />
                    <FormHelperText id="my-helper-text">JPG or PNG, Max file size 2MB.</FormHelperText>
                  </FormControl>
                </Grid>
                <br />

                <Grid container xs={12} justifyContent="center">
                  <FormControl className={clsx(classes.margin, classes.textField)} style={{ width: '50%' }} variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    shrink={true}
                  >
                    <InputLabel htmlFor="outlined-adornment-password" shrink>
                      Receipt Photo
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      // type={values.showPassword ? 'text' : 'password'}
                      // value={values.password}
                      // onChange={handleChange('password')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      shrink
                      endAdornment={
                        <InputAdornment position="end">
                          <Button variant="contained" color="primary">Browse</Button>
                        </InputAdornment>
                      }
                      labelWidth={100}
                    />
                    <FormHelperText id="my-helper-text">JPG or PNG, Max file size 2MB.</FormHelperText>
                  </FormControl>
                </Grid>
                <br />
                <Grid container xs={12} justifyContent="center">
                  <TextField
                    id="outlined-helperText"
                    label="Address"
                    variant="outlined"
                    placeholder="Put address"
                    // helperText="Some important text"
                    value={state.address}
                    onChange={(e) => { setState({ ...state, address: e.target.value }) }}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: '50%' }}
                  />
                </Grid>
                <br />
                <Grid container xs={12} justifyContent="center">
                  <TextField
                    id="outlined-helperText"
                    label="Note"
                    placeholder="input note"
                    value={state.note}
                    onChange={(e) => { setState({ ...state, note: e.target.value }) }}
                    multiline
                    rows={3}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: '50%' }}
                  />
                </Grid>




                {/* <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl> */}

              </Paper>
              <Grid item container xs={12} justifyContent="center">
                <Button variant="contained" color="primary" className={classes.payBtn} onClick={() => { setState({ ...state, step: state.step + 1 }) }}>
                  Pay
                </Button>
              </Grid>
            </Grid>
          </>
        }

        {/* <Grid item xs={3}></Grid> */}
      </Grid>
    </Grid>
  )
};

export default PayTransaction;
