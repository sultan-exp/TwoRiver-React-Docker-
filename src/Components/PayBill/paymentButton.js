import React from "react";
import paymentRequest from "react-payment-request-api";

const Button = ({ show, isSupported, style }) =>
  isSupported ? (
    <button onClick={show} style={style}>
      Pay now!
    </button>
  ) : (
    <span>Payment request not supported</span>
  );

const details = {
  displayItems: [
    {
      label: "Original donation amount",
      amount: { currency: "USD", value: "65.00" },
    },
    {
      label: "Friends and family discount",
      amount: { currency: "USD", value: "-10.00" },
    },
    {
      label: "Delivery tax",
      pending: true,
      amount: { currency: "USD", value: "10.00" },
    },
  ],
  total: {
    label: "Total due",
    amount: { currency: "USD", value: "55.00" },
  },
};

export const getConfig = () => ({
  methodData: [
    {
      supportedMethods: ["basic-card"],
      data: {
        supportedNetworks: ["visa", "mastercard", "diners"],
      },
    },
  ],
  details: details,
  options: {
    requestShipping: true,
    requestPayerEmail: true,
    requestPayerPhone: true,
  },
  onShowSuccess: (result, resolve, reject): void => {
    /* tslint:disable-next-line:no-console */
    // make the payment
    setTimeout(resolve, 2000);
  },
  /* tslint:disable-next-line:no-console */
  onShowFail: (error) => console.log("Error", error),
  onShippingAddressChange: (request, resolve, reject) => {
    /* tslint:disable-next-line:no-console */
    // recalculate details
    details.shippingOptions = [
      {
        id: "all",
        label: "Wherever you want for free",
        amount: { currency: "USD", value: "0.00" },
        selected: true,
      },
    ];
    details.displayItems[2] = {
      label: "Tax",
      pending: false,
      amount: { currency: "USD", value: "8.00" },
    };
    resolve(details);
  },
  onShippingOptionChange: (request, resolve, reject): void => {
    resolve(details);
  },
});

//export default getConfig;

export default paymentRequest()(Button);

const methodData = [
  {
    supportedMethods: ["basic-card"],
    data: {
      supportedNetworks: ["visa", "mastercard", "diners"],
    },
  },
];

class Paymentrequest {
  constructor() {}
}

new Paymentrequest(methodData, details);
