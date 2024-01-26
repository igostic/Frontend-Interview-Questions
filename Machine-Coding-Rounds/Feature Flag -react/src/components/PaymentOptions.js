import React from "react";
import { useFeatureFlags } from "../contexts/FeatureFlags";

const PaymentOptions = () => {
  const { features } = useFeatureFlags();

  const handleClick = () => alert("Payment successful!");

  return (
    <>
      <button className="btn" onClick={handleClick}>
        Credit Card
      </button>
      {features.isApplePayEnabled && (
        <button className="btn" onClick={handleClick}>
          Apple Pay
        </button>
      )}
      {features.isGooglePayEnabled && (
        <button className="btn" onClick={handleClick}>
          Google Pay
        </button>
      )}
    </>
  );
};

export default PaymentOptions;
