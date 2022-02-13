import React from "react";
import { withRouter } from "react-router-dom";
import CartComponent from "./Cart";

const MakePaymentPure = ({ currentValues, amount, renderAmount, merchant }) => {
  return (
    <div>
      <div>
        <CartComponent
          contract_id={currentValues.contract_number}
          merchant_id={currentValues.codeData.merchant.merchant_id}
          unit_price={amount}
          promocode={""}
          amount_to_charge={amount}
          renderAmount={renderAmount}
          product_id={999}
          memo={currentValues.contract_number}
          memoProps={{ value: currentValues.contract_number, disabled: true }}
        />
      </div>
    </div>
  );
};

export const MakePayment = withRouter(MakePaymentPure);
