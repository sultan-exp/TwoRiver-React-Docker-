import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import {
  makeMobileMoneyPayment,
  finalizeMobileMoneyPayment,
} from "../../actions/remittances";
import { StepperActions } from "./StepperActions";
import { auth } from "../../actions/auth-helper";
import PaycruiserSuccess from "../../assets/PayCruiser_Success.gif";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { onLogoutNoRedirect } from "../../actions/login";

const useStyles = makeStyles({
  root: {
    maxWidth: 480,
    boxShadow: "none",
  },
});

function AmountFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        const { formattedValure, value } = values;
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      // suffix=" CFA"
    />
  );
}

AmountFormatCustom.propTypes = {
  // inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function ConfirmationPagePure(props) {
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [isDialogShown, setDialogShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPaymentCompleted, setPaymentCompleted] = useState(false);
  const classes = useStyles();
  const { onPrevious, transactions } = props;
  const { client_paid_on_phone } = transactions;
  const transactionInfo = JSON.parse(sessionStorage.getItem("transactionInfo"));
  const [amount, setAmount] = useState(transactionInfo.invoice_amount / 100);
  const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "XOF",
    locale: "fr-FR",
  });

  useEffect(() => {
    if (client_paid_on_phone) onLogoutNoRedirect(true);
  }, [client_paid_on_phone]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const userInfo = auth.getUserInfo();
    const payload = {
      mobile_number_to_charge: userInfo.username,
      client_fullname: userInfo.first_name + " " + userInfo.last_name,
      client_email: transactionInfo.merchant.email,
      transaction_reference: transactionInfo.merchant.merchant_id,
      amount_to_charge_in_cents: amount * 100,
      currency_code: "XOF",
      country_code: "SN",
      network_carrier: "EMC",
      customer_ref: transactionInfo.access_code,
    };
    const res = await props.makeMobileMoneyPayment(payload);
    res.data.errors == []
      ? setDialogContent(res.data.message)
      : setDialogContent(res.data.errors);
    // TODO: Use constant value for transaction status
    if (res.data.transaction_status == "success") {
      let response = props.finalizeMobileMoneyPayment(res.data.id);
      setPaymentCompleted(true);
    }

    setDialogTitle("Initiation du paiement en cours");
    setLoading(false);
    setDialogShown(true);
  };

  const { submitForm, isSubmitting, errors } = useFormik({
    initialValues: {},
    onSubmit: handleSubmit,
  });
  const handleClose = () => {
    setDialogShown(false);
  };

  const handleAmountChange = (e) => {
    const target = e.target;
    if (target.type === "number") {
      setAmount(target.value); //0.9 -> 0
      // setAmount(Math.ceil(target.value)); //0.9 ->1
    }
  };

  return (
    <Card className={classes.root} raised={false}>
      <CardContent>
        {!client_paid_on_phone ? (
          <>
            <Typography
              gutterBottom
              align="left"
              variant="subtitle1"
              component="subtitle1"
            >
              <Alert severity="info" color="info">
                You are going to make a payment of{" "}
                <NumberFormat
                  value={parseInt(amount)}
                  displayType={"text"}
                  thousandSeparator=" "
                  suffix=" CFA"
                  // decimalSeparator="."
                />
              </Alert>
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <TextField
                type="number"
                name="numberformat"
                id="formatted-numberformat-input"
                placeholder="Montant à payer"
                value={parseInt(amount)}
                // onChange={(evt) => setAmount(evt.target.value)}
                onChange={(e) => handleAmountChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">F CFA</InputAdornment>
                  ),
                  style: { border: "none", height: "auto" },
                }}
                // InputProps={{
                //   inputComponent: AmountFormatCustom,
                // }}
                label="Montant à payer (pas de decimal)"
                fullWidth
                margin="normal"
              />
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              En cliquant sur SUIVANT, vous allez être prélevé le montant de{" "}
              <NumberFormat
                value={parseInt(amount)}
                displayType={"text"}
                thousandSeparator=" "
                suffix=" CFA"
                // decimalSeparator="."
              />{" "}
              pour votre numéro de contrat {transactionInfo.access_code} chez{" "}
              {/* {transactionInfo.merchant.merchant_id} */} <b>SNHLM</b>
            </Typography>
          </>
        ) : (
          <>
            <Alert severity="success" color="success">
              Votre paiement de
              <NumberFormat
                value={parseInt(amount)}
                displayType={"text"}
                thousandSeparator=" "
                suffix=" CFA"
                // decimalSeparator="."
              />{" "}
              a été éffectué avec succès. Réçu envoyé par sms.
            </Alert>
            <img
              src={PaycruiserSuccess}
              alt={PaycruiserSuccess}
              style={{ padding: "10%" }}
              className="center"
            />
            {/* {toastr.success("Yay", "SUCCESS")} */}
          </>
        )}

        <Typography variant="body" color="textPrimary" component="h5">
          {isDialogShown && !client_paid_on_phone && dialogTitle}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {isDialogShown && !client_paid_on_phone && dialogContent}
          {isDialogShown && !client_paid_on_phone && isPaymentCompleted && (
            <Typography variant="body" color="textPrimary" component="p">
              <CircularProgress />
            </Typography>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        {!loading && !isPaymentCompleted ? (
          <StepperActions
            classes={classes}
            isSubmitting={isSubmitting}
            handleNext={submitForm}
            handleBack={onPrevious}
          />
        ) : (
          <StepperActions classes={classes} handleBack={onPrevious} />
        )}
        <p />
        <Typography variant="body2" color="textSecondary" component="p">
          Powered by PayCruiser
        </Typography>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = ({ transactions }) => {
  return {
    transactions: transactions,
  };
};

const matchDispatchToProps = (dispatch) => ({
  makeMobileMoneyPayment: (payload) =>
    dispatch(makeMobileMoneyPayment(payload)),
  finalizeMobileMoneyPayment: (transaction_id) =>
    dispatch(finalizeMobileMoneyPayment(transaction_id)),
});
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ConfirmationPagePure);
