import React, { useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import styled from "styled-components";
import Button from "../../../Components/CustomButtons/Button.jsx";
import Input from "../Input";

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Footer = styled.div`
  width: 100%;
  text-align: left;
`;

const Content = styled.div`
  position: relative;
`;

const SubContainer = styled.div`
  font-size: 15px;

  span {
    color: blue;
    cursor: pointer;
  }
`;

const ErrorContainer = styled.div`
  font-size: 12px;
  color: #e91e63;
  margin-left: 15px;
`;

export const Bank = ({
  onChange,
  bankConnected,
  isUpdate,
  saving,
  title = "For instant account verification, you should automatically connect your bank account.",
  onSave = () => {},
  setConnectedBank = () => {},
  errors = {},
  ...props
}) => {
  const [showForm, setShowForm] = useState(false);
  const onSuccess = token =>
    onChange({
      target: {
        name: "bank_token",
        value: token,
      },
    });

  const config = {
    clientName: "PayCruiser",
    env: process.env.REACT_APP_HOST_ENV === "development" ? "sandbox" : "production",
    product: ["auth"],
    publicKey: "6cbc61420e2dece14e7f4776ed184d",
    onSuccess,
  };

  const { open, ready, error } = usePlaidLink(config);

  const toggleFormView = value => {
    setShowForm(value);
    setConnectedBank(value);
  };

  return (
    <Content>
      {title}
      <div>{error}</div>
      {!showForm && (
        <Container>
          {errors.bank_token && (
            <div style={{ fontSize: 12, color: "#e91e63" }}>{errors.bank_token}</div>
          )}
          <Button
            round
            color={bankConnected ? "success" : "rose"}
            onClick={open}
            disabled={!ready || bankConnected}
          >
            {bankConnected
              ? "Bank account successfully connected"
              : "Connect a bank account"}
          </Button>
          {!bankConnected && (
            <SubContainer>
              Or click <span onClick={() => toggleFormView(true)}>here</span> to manually
              enter your bank information
            </SubContainer>
          )}
        </Container>
      )}
      {showForm && (
        <div>
          <Input
            {...props}
            labelText="Bank Name"
            id="bank_name"
            name="bank_name"
            onChange={onChange}
          />
          {errors.bank_name && <ErrorContainer>{errors.bank_name}</ErrorContainer>}
          <Input
            {...props}
            labelText="Account Number"
            id="account_number"
            name="account_number"
            onChange={onChange}
          />
          {errors.account_number && (
            <ErrorContainer>{errors.account_number}</ErrorContainer>
          )}
          <Input
            {...props}
            labelText="Re-type Account Number"
            id="retype_account_number"
            name="retype_account_number"
            onChange={onChange}
          />
          {errors.retype_account_number && (
            <ErrorContainer>{errors.retype_account_number}</ErrorContainer>
          )}
          <Input
            {...props}
            labelText="Routing Number"
            id="routing_number"
            name="routing_number"
            onChange={onChange}
          />
          {errors.routing_number && (
            <ErrorContainer>{errors.routing_number}</ErrorContainer>
          )}
          {!bankConnected && (
            <SubContainer>
              Or click <span onClick={() => toggleFormView(false)}>here</span> to connect
              automatically
            </SubContainer>
          )}
          <Footer>
            {isUpdate && (
              <Button
                disabled={saving}
                round
                color={bankConnected ? "success" : "rose"}
                onClick={onSave}
              >
                {saving ? "Save..." : "Save"}
              </Button>
            )}
          </Footer>
        </div>
      )}
    </Content>
  );
};

const merchant_service = ({ onChange, ...props }) => (
  <>
    Our fees are 0.10c per transaction when you use your own merchant services account
    <Input
      {...props}
      labelText="Merchant Service Provider"
      id="merchant_service_provider"
      name="merchant_service_provider"
      onChange={onChange}
    />
    <Input
      {...props}
      labelText="Merchant Service Api Key"
      id="merchant_service_api_key"
      name="merchant_service_api_key"
      onChange={onChange}
    />
  </>
);

// const Paypal = ({ onChange, ...props }) => (
//   <>
//     <b>
//       Paypal: Fees: 10 cents per transaction (But Paypal will also charge you)
//     </b>
//     <Input
//       {...props}
//       labelText="Paypal Id"
//       id="paypalid"
//       name="paypal_id"
//       onChange={onChange}
//     />
//     <Input
//       {...props}
//       labelText="Paypal Api Key"
//       id="paypal_api_key"
//       name="paypal_api_key"
//       onChange={onChange}
//     />
//   </>
// );

// const Stripe = ({ onChange, ...props }) => (
//   <>
//     <b>
//       Stripe: Fees: 10 cents per transaction (Stripe will also charge )
//     </b>
//     <Input
//       {...props}
//       labelText="Stripe Id"
//       id="stripe_id"
//       name="stripe_id"
//       onChange={onChange}
//     />
//     <Input
//       {...props}
//       labelText="Stripe Api Key"
//       id="stripe_api_key"
//       name="stripe_api_key"
//       onChange={onChange}
//     />
//   </>
// );

// const Venmo = ({ onChange, ...props }) => (
//   <>
//     <b>
//       Venmo: For this option, our fees are 2.6% + 50 cents per transaction,
//       regardless of the amount processed.
//     </b>
//     <Input
//       {...props}
//       labelText="Venmo Id"
//       id="venmo_id"
//       name="venmo_id"
//       onChange={onChange}
//     />
//     <Input
//       {...props}
//       labelText="Venmo Api Key"
//       id="venmo_api_key"
//       name="venmo_api_key"
//       onChange={onChange}
//     />
//   </>
// );

const components = [Bank, merchant_service];

export default components;
