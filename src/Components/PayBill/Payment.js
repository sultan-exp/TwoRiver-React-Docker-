import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import AccountCircle from "@material-ui/icons/AccountCircle";
import CreditCard from "@material-ui/icons/CreditCard";
import DateRange from "@material-ui/icons/DateRange";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Phone from "@material-ui/icons/Phone";
import TextFields from "@material-ui/icons/TextFields";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// core components
// import GridContainer from "../Grid/GridContainer.jsx";
// import GridItem from "../Grid/GridItem.jsx";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Cards from "react-credit-cards";
import NumberFormat from "react-number-format";
import MaskedInput from "react-text-mask";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "left",
    color: theme.palette.text.secondary,
    marginBottom: "6%",
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 4,
    elevation: "24",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  smallTextField: {
    width: 100,
  },
  menu: {
    width: 200,
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const currencyFormatter = new Intl.NumberFormat(navigator.language, {
  style: "currency",
  currency: "USD",
  locale: "us-US",
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
//GD
class PaymentComponent extends Component {
  render() {
    const {
      classes,
      address,
      handleInputChange,
      showAddress,
      emailError,
      nameError,
      amountError,
      cardNoError,
      expiryError,
      cvcError,
      promoCodeError,
      zipcodeError,
    } = this.props;

    return (
      <Box
        // display="flex"
        // minWidth={500}
        // minHeight={500}
        maxWidth={600}
        bgcolor="transprent"
        alignItems="center"
        justifyContent="center"
        m="auto"
        display="flex"
        marginTop="5%"
        marginBottom="8%"
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "25px" }}>
            <Alert severity="info" color="info">
              This transaction is secured. We will not store your card
              information.
            </Alert>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={this.props.small ? 12 : 6}>
                <Cards
                  number={this.props.number}
                  name={this.props.name}
                  expiry={this.props.expiry}
                  cvc={this.props.cvc}
                  focused={this.props.focused}
                  callback={this.props.handleCallback}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={this.props.small ? 12 : 6}>
                <form>
                  <Grid container direction="column">
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        type="tel"
                        className={cardNoError}
                        name="number"
                        placeholder="Card number"
                        onChange={this.props.handleInputChange}
                        onFocus={this.props.handleInputFocus}
                        // inputProps={{ style: { border: 'none', height: 'auto' }}}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CreditCard />
                            </InputAdornment>
                          ),
                          style: { border: "none", height: "auto" },
                        }}
                        id="cardNumber_id"
                        label="Card number"
                        fullWidth
                        margin="normal"
                        error={cardNoError}
                        helperText={cardNoError && "Invalid card number"}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginBottom: "10px" }}
                    >
                      <TextField
                        type="text"
                        className={nameError}
                        name="name"
                        placeholder="Cardholder name"
                        onChange={this.props.handleInputChange}
                        onFocus={this.props.handleInputFocus}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                          style: { border: "none", height: "auto" },
                        }}
                        id="card_holder_name_id"
                        label="Cardholder name"
                        fullWidth
                        margin="normal"
                        error={nameError}
                        helperText={nameError && "Invalid cardholder name"}
                      />
                    </Grid>
                    {this.props.renderAmount &&
                      this.props.renderAmount(amountError)}

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      mb={4}
                      style={{ marginBottom: "25px" }}
                    >
                      <TextField
                        type="tel"
                        className={classes.smallTextField}
                        name="expiry"
                        placeholder="MM/YY"
                        onChange={this.props.handleInputChange}
                        onFocus={this.props.handleInputFocus}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DateRange />
                            </InputAdornment>
                          ),
                          style: { border: "none", height: "auto" },
                        }}
                        id="card_exp_month"
                        label="Expiry"
                        error={expiryError}
                        helperText={
                          expiryError &&
                          "If provided, You will receive your One-time passcode at this Email address"
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ marginBottom: "25px" }}
                    >
                      <TextField
                        type="tel"
                        className={classes.smallTextField}
                        name="cvc"
                        placeholder="CVC"
                        onChange={this.props.handleInputChange}
                        onFocus={this.props.handleInputFocus}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          ),
                          style: { border: "none", height: "auto" },
                        }}
                        id="card_cvv"
                        label="CVC"
                        error={cvcError}
                        helperText={
                          cvcError &&
                          "If provided, You will receive your One-time passcode at this Email address"
                        }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginBottom: "25px" }}
                    >
                      <TextField
                        type="text"
                        // className={classes.smallTextField}
                        name="zipcode"
                        placeholder="Zip code"
                        onChange={this.props.handleInputChange}
                        onFocus={this.props.handleInputFocus}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                          style: { border: "none", height: "auto" },
                        }}
                        id="card_zip_id"
                        label="Zip code"
                        fullWidth
                        error={zipcodeError}
                        helperText={
                          zipcodeError &&
                          "If provided, You will receive your One-time passcode at this Email address"
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginBottom: "25px" }}
                    >
                      <TextField
                        type="text"
                        name="phone_number"
                        placeholder="+221778325461"
                        // id="inputError"
                        onChange={this.props.handleInputChange}
                        onFocus={this.props.handleInputFocus}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          ),
                          style: { border: "none", height: "auto" },
                        }}
                        id="user_phone_id"
                        label="Mobile for receipt"
                        fullWidth
                      />
                    </Grid>

                    <Grid item style={{ marginBottom: "25px" }}>
                      <TextField
                        type="text"
                        name="email"
                        placeholder="Email"
                        // id="inputError"
                        onChange={this.props.handleInputChange}
                        onFocus={this.props.handleInputFocus}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                          style: { border: "none", height: "auto" },
                        }}
                        id="user_email_id"
                        label="Email for receipt"
                        fullWidth
                      />
                    </Grid>

                    <Grid item style={{ marginBottom: "25px" }}>
                      <TextField
                        {...(this.props.memoProps ? this.props.memoProps : {})}
                        type="text"
                        name="memo"
                        placeholder="invoice number"
                        // id="inputError"
                        //value={this.props.memoProps.}
                        //value={this.props.memoProps.}
                        onChange={this.props.handleInputChange}
                        onFocus={this.props.handleInputFocus}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TextFields />
                            </InputAdornment>
                          ),
                          style: { border: "none", height: "auto" },
                        }}
                        id="user_memo_id"
                        label="Invoice number (not editable)"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "25px" }}>
            {this.props.disabled ? (
              // <Button round color="success" disabled>
              //   <b>
              //     {this.props.buttonText}
              //     <i className="fa fa-arrow-right" />{" "}
              //     <NumberFormat
              //       value={this.props.amount_to_charge}
              //       type="text"
              //       displayType={"text"}
              //       // thousandSeparator="."
              //       suffix=" USD"
              //       xs={12}
              //       sm={12}
              //       md={6}
              //       className="btn btn-theme-white"
              //       round
              //       // decimalSeparator="."
              //     />
              //   </b>{" "}
              // </Button>
              <Alert
                severity="success"
                color="success"
                onClose={this.handleSuccessAlertClose}
              >
                {this.props.buttonText}
              </Alert>
            ) : (
              <Button
                round
                suffix=" USD"
                xs={12}
                sm={12}
                md={12}
                className="btn btn-theme-white"
                onClick={this.props.handleSubmit}
              >
                <b>
                  {this.props.buttonText}
                  {/* <ArrowForwardIosIcon />{" "} */}
                  <NumberFormat
                    value={this.props.amount_to_charge}
                    type="text"
                    displayType={"text"}
                    thousandSeparator=","
                    suffix=" USD"
                    // decimalSeparator="."
                  />
                </b>{" "}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
export default withStyles(styles)(PaymentComponent);
