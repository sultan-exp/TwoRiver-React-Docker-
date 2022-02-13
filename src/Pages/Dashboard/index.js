import React from "react";

import GridItem from "../../DashboardComponents/Grid/GridItem.jsx";
import CustomInput from "../../DashboardComponents/CustomInput/CustomInput.jsx";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'grey',
    // padding: '0px 100px',
    marginTop: '15%'
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
  }
}));

const DashboardHome = ({ labelText, id, name, onChange, classname }) => {
  const classes = useStyles();
  const history = useHistory();
  const onItemClick = (link) => {
    history.push(link)
  }
  return (
    <Grid container className={classes.root} justifyContent="center" alignItems='center'>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid item container xs={6} justifyContent="center">
          <Grid container item xs={12} md={12}>
            <Paper className={classes.paperItem} variant="outlined" onClick={() => { onItemClick("/dashboard/pay-transaction") }} >
              <DashboardIcon /><br />
              <p>Pay Transactions</p>
            </Paper>
            <Paper className={classes.paperItem} variant="outlined" onClick={() => { onItemClick("/sendmoney/selectcustomer") }}>
              <DashboardIcon /><br />
              <p>Send Money</p>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Paper className={classes.paperItem} variant="outlined">
              <DashboardIcon /><br />
              <p>Submit Paid Transaction</p>
            </Paper>
            <Paper className={classes.paperItem} variant="outlined" >
              <DashboardIcon /><br />
              <p>Send Validation Request</p>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={3}></Grid>
      </Grid>
    </Grid>
  )
};

export default DashboardHome;
