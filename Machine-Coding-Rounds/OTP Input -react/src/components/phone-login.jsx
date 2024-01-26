import { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  function handlePhoneNumber(e) {
    setPhoneNumber(e.target.value);
  }
  function handlePhoneSubmit(e) {
    // stops page refresh and api call
    e.preventDefault();

    // phone no. validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    // call BE API for sending OTP if any
    // then show OTP field
    setShowOtpInput(true);
  }

  function onOtpSubmit(otp) {
    console.log("login successful", otp);
  }
  // here will have two things
  // 1. phone number input field
  // 2. once no. is filed then otp section
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="enter Phone Number"
          />
          {/* on Click of submit our onSubmit will be fired */}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};
export default PhoneOtpLogin;
