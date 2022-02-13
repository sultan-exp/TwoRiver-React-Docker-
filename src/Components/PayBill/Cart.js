import { withStyles } from "@material-ui/core/styles";
import { forEach, isString } from "lodash";
import React, { Component } from "react";
import "react-credit-cards/es/styles-compiled.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-image-lightbox/style.css";
import { connect } from "react-redux";
import toastr from "toastr";
import Snackbar from "@material-ui/core/Snackbar";
import "toastr/build/toastr.css";
import validator from "validator";
import { buyTicket } from "../../actions/cart";
import { getMerchantInfo } from "../../actions/misc";
import PaymentComponent from "./Payment";
import MuiAlert from "@material-ui/lab/Alert";
import PaycruiserSuccess from "../../assets/PayCruiser_Success.gif";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
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
  table: {
    minWidth: 700,
  },
});

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

class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSuccessPaymentSnack: false,
      payment_confirmation_code: "",
      number: "",
      name: "",
      cvc: "",
      focused: "",
      expiry: "",
      cardtype: "",
      promocode: "",
      zipcode: "",
      emailError: null,
      nameError: null,
      cardNoError: null,
      expiryError: null,
      cvcError: null,
      amountError: null,
      promoCodeError: null,
      zipcodeError: null,
      buttonText: "Click Here to Pay ",
      disabled: false,
      unit_count: 0,
      unit_price: 0,
      subTotal: 0,
      photoIndex: 0,
      phone_number: "",
      email: "",
      merchant_id: "",
      isOpen: false,
      memo: "",
      address: {},
    };
  }

  componentDidMount() {}

  componentWillUpdate(nextProps, nextState) {
    if (nextState.number !== this.state.number) {
      this.setState({ cardNoError: null });
    }
    if (
      nextState.name !== this.state.name &&
      nextState.name.trim().indexOf(" ") !== -1
    ) {
      this.setState({ nameError: null });
    }

    if (
      nextState.email !== this.state.email &&
      validator.isEmail(nextState.email)
    ) {
      this.setState({ emailError: null });
    }

    if (nextState.expiry !== this.state.expiry) {
      this.setState({ expiryError: null });
    }
    if (nextState.cvc !== this.state.cvc) {
      this.setState({ cvcError: null });
    }
    if (nextState.amount != this.state.amount) {
      this.setState({ amountError: null });
    }
    if (nextState.zipcode !== this.state.zipcode) {
      this.setState({ zipcodeError: null });
    }
  }
  handleSuccessAlertClose = () => {
    this.setState({ openSuccessPaymentSnack: false });
  };

  handleSubmit() {
    // check from validity
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-full-width",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    if (!this.state.number) {
      this.setState({ cardNoError: "error-form-field" });
      toastr.error("Please insert your card  number");
      return false;
    }

    if (!this.state.name) {
      this.setState({ nameError: "error-form-field" });
      toastr.error("Please Write your Name");
      return false;
    }

    if (this.state.name.trim().indexOf(" ") === -1) {
      this.setState({ nameError: "error-form-field" });
      toastr.error("Name is Not valid");
      return false;
    }
    console.log("this.props.amount_to_charge", this.props.amount_to_charge);
    if (
      !this.props.amount_to_charge ||
      parseFloat(this.props.amount_to_charge) <= 0
    ) {
      this.setState({ amountError: "error-amount-field" });
      toastr.error("Amount must be greater than 0");
      return false;
    }

    if (!this.state.expiry) {
      this.setState({ expiryError: "error-form-field" });
      toastr.error("Write card thru");
      return false;
    }
    if (!this.state.cvc) {
      this.setState({ cvcError: "error-form-field" });
      toastr.error("Please insert your card cvc number");
      return false;
    }

    if (!this.state.zipcode) {
      this.setState({ zipcodeError: "error-form-field" });
      toastr.error("Please enter a zip code");
      return false;
    } else {
      this.setState({
        buttonText: "Processing your payment...DO NOT REFRESH THE PAGE",
        disabled: true,
        cardNoError: null,
        nameError: null,
        amountError: null,
        emailError: null,
        cvcError: null,
        expiryError: null,
      });

      // separate month and year
      let spilt = this.state.expiry.match(/.{1,2}/g);
      let paymentDetails = {
        fullName: this.state.name.trim(),
        email: this.state.email,
        cardnum: this.state.number,
        cardtype: this.state.cardtype,
        cardmonth: spilt[0],
        cardyear: spilt[1],
        description: this.props.description || "",
        cardcvc: this.state.cvc,
        promocode: this.props.promocode,
        zipcode: this.state.zipcode,
        phone_number: this.state.phone_number,
        merchant_account: this.props.merchant_id,
        memo: this.props.memo,
        product_id: this.props.product_id,
        unit_price: this.props.unit_price,
        unit_count: +this.props.unit_count || 1,
        tip: "0",
      };
      toastr.info("Processing Payment. PLEASE DO NOT REFRESH THE PAHE");
      this.props
        .buyTicket(paymentDetails)
        .then((res) => {
          forEach(res.errors, (err) => {
            if (isString(err)) {
              toastr.error(err);
            }
          });
          if (res.status_code === 601 || res.status_code === 610) {
            this.setState({ buttonText: "PAY ", disabled: false });
            return;
          }

          if (res.status_code === 700) {
            toastr.error(
              "We could not process your transaction. If the issue persist, please call 562-999-2511 to complete your purchase."
            );
            this.setState({ buttonText: "PAY ", disabled: false });
            return;
          }

          if (res.errors.length > 0) {
            this.setState({ buttonText: "PAY ", disabled: false });

            res.errors.map((item, index) => toastr.error(item));
          } else {
            if (res.status_code === 250 || res.status_code === 200) {
              // toastr.options = {
              //   closeButton: true,
              //   debug: false,
              //   newestOnTop: true,
              //   progressBar: true,
              //   positionClass: "toast-bottom-right",
              //   preventDuplicates: true,
              //   onclick: alert(res.payment_status),
              //   showDuration: "300",
              //   hideDuration: "1000",
              //   timeOut: 0,
              //   extendedTimeOut: 0,
              //   showEasing: "swing",
              //   hideEasing: "linear",
              //   showMethod: "fadeIn",
              //   hideMethod: "fadeOut",
              //   tapToDismiss: false,
              // };
              // toastr.success(res.payment_status, "SUCCESS");

              this.setState({
                buttonText: res.payment_status,
                disabled: true,
                openSuccessPaymentSnack: true,
                payment_confirmation_code: res.confirmation_code,
                name: "",
                email: "",
                number: "",
                cardtype: "",
                cardmonth: "",
                cardyear: "",
                cardcvc: "",
                promocode: "",
                zipcode: "",
              });

              // TODO: Go confirmation Page
            }
            //window.location.href="/transactions"
          }
        })
        .catch((err) => {
          toastr.warning("An error occured. CODE:" + err);
          toastr.warning(
            "Please contact support to complete this purchase" + err
          );
          this.setState({ buttonText: "pay now", disabled: false });
        });
    }
  }
  // card focus when fill form
  handleInputFocus(e) {
    const target = e.target;

    this.setState({
      focused: target.name,
    });
  }

  // update state field onchange
  handleInputChange(e) {
    const target = e.target;

    if (target.name === "number") {
      this.setState({
        [target.name]: target.value.replace(/ /g, ""),
      });
    } else if (target.name === "expiry") {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ""),
      });
    } else {
      this.setState({
        [target.name]: target.value,
      });
    }
  }

  openLightbox() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  // get card type according to card number
  handleCallback(type, isValid) {
    this.setState({ cardtype: type.issuer });
  }

  render() {
    return (
      <div>
        <section className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-xs-12">
                <div className="cart-detail-wrapper mb80 white-bg-box">
                  <div className="payment-form">
                    {!this.state.openSuccessPaymentSnack ? (
                      <PaymentComponent
                        small={this.props.small}
                        handleInputChange={this.handleInputChange.bind(this)}
                        handleInputFocus={this.handleInputFocus.bind(this)}
                        handleCallback={this.handleCallback.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        amount_to_charge={this.props.amount_to_charge}
                        unit_count={this.props.unit_count}
                        showAddress={this.props.showAddress}
                        renderAmount={this.props.renderAmount}
                        memoProps={this.props.memoProps}
                        {...this.state}
                      />
                    ) : (
                      <>
                        <Alert severity="success" color="success">
                          Your Payment of{" "}
                          <NumberFormat
                            value={this.props.amount_to_charge}
                            displayType={"text"}
                            thousandSeparator
                            prefix="$"
                            suffix=" USD"
                            // decimalSeparator="."
                          />{" "}
                          was successful. Confirmation Code:{" "}
                          {this.state.payment_confirmation_code}
                        </Alert>
                        <img
                          src={PaycruiserSuccess}
                          alt={PaycruiserSuccess}
                          style={{ padding: "10%" }}
                          className="center"
                        />
                      </>
                    )}
                    <Snackbar
                      open={this.state.openSuccessPaymentSnack}
                      autoHideDuration={24000}
                      onClose={this.handleSuccessAlertClose}
                    >
                      <Alert
                        severity="success"
                        color="success"
                        onClose={this.handleSuccessAlertClose}
                      >
                        Your payment was successfully processed
                      </Alert>
                    </Snackbar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const matchDispatchToProps = (dispatch) => ({
  buyTicket: (data) => dispatch(buyTicket(data)),
  getMerchantInfo: (productId) => dispatch(getMerchantInfo(productId)),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withStyles(styles)(CartComponent));
