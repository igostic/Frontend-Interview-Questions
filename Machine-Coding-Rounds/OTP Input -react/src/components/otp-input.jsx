import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  // storing our otp we need a state
  const [otp, setOtp] = useState(new Array(length).fill(""));
  // now once we enter no and otp input field renders
  // i want to focus on input box, for that will use useRef
  const refs = useRef([]); // array bcz we have multiple fields
  //   console.log("----", refs);

  // no we will have a useEffect whenever a component renders
  // useEffect will be called
  useEffect(() => {
    // making 0th idx input field as focus on every render
    if (refs.current[0]) {
      refs.current[0].focus();
    }
  }, []);

  function handleChange(idx, e) {
    const { value } = e.target;
    // only number allowef in input field
    if (isNaN(value)) return;
    const newOtp = [...otp];
    // allow only one number in one inp field
    // from my observation, whenever we on an inp
    // field our cursoris at the end so we can take
    // the latest inp value, so we are doing it
    // like this below
    newOtp[idx] = value.substring(value.length - 1);
    setOtp(newOtp);

    // if all fields are filled trigger onSubmit
    // we are using newOtp not Otp of useState bcz
    // at this time as setOtp of useState is an async
    // operation, so updated value will not be present
    const combinedOtp = newOtp.join(""); // we will get a
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // now move to next input if current field is filled
    // checking idx < length -1 for last inp field
    // refs.current[idx + 1] working without it also
    if (value && idx < length - 1 && refs.current[idx + 1]) {
      // if (value && idx < length - 1  ) {
      refs.current[idx + 1].focus();
    }
  }
  // whe we click on an inp field we want our cursor
  // to move to end of input data
  function handleClick(idx) {
    // setSelectionRange() selects the text from one
    // point to other
    refs.current[idx].setSelectionRange(1, 1);

    // optional - don't show to interviewer
    // if (idx > 0 && !otp[idx - 1]) {
    //   refs.current[otp.indexOf("")].focus();
    // }
  }
  function handleKeyDown(idx, e) {
    // check for Backspace key press and otp value exists
    if (
      e.key === "Backspace" &&
      !otp[idx] &&
      idx > 0 &&
      refs.current[idx - 1]
    ) {
      // Move focus to the previous input field on backspace
      refs.current[idx - 1].focus();
    }
  }

  return (
    <div>
      {otp.map((val, idx) => {
        return (
          <input
            // provides the ref for all otp input fields
            ref={(input) => (refs.current[idx] = input)}
            key={val + idx}
            type="text"
            value={val}
            onChange={(e) => handleChange(idx, e)}
            // when we click on otp field cursor moved to last postion
            onClick={() => handleClick(idx)}
            // when we press backspace it will go to prev field
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

OtpInput.propTypes = {
  length: PropTypes.number,
  onOtpSubmit: PropTypes.func,
};
export default OtpInput;
