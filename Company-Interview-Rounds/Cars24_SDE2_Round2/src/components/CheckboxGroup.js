import { useState } from "react";

import React from "react";

const CheckboxGroup = ({ options, name, question, checked, handleChange }) => {
  const [optionsState, setOptionsState] = useState(
    options.map((field) => {
      return {
        ...field,
        checked: !!checked?.find(
          (checkedField) => checkedField === field.value
        ),
      };
    })
  );
  const onChange = (idx, type) => {
    let tempOptions = [...optionsState];
    if (type === "radio") {
      // setOptionsState((options) => {
      //   return options.map((option, index) => {
      //     if (option.checked) {
      //       option.checked = false;
      //     }
      //     return option;
      //   });
      // });
      tempOptions = tempOptions.map((option, index) => {
        if (option.checked) {
          option.checked = false;
        }
        return option;
      });
      // console.log("tempOptions", tempOptions);
    }

    // setOptionsState((options) => {
    //   return options.map((option, index) => {
    //     if (index === idx) {
    //       return {
    //         ...option,
    //         checked: !option?.checked,
    //       };
    //     }
    //     return option;
    //   });
    // });
    tempOptions = tempOptions.map((option, index) => {
      if (index === idx) {
        return {
          ...option,
          checked: !option?.checked,
        };
      }
      return option;
    });
    // console.log("tempOptions1", tempOptions);
    handleChange(tempOptions);
    setOptionsState(tempOptions);
  };
  return (
    <div>
      {optionsState.map((option, idx) => (
        <label key={option?.value + idx}>
          <input
            type={name}
            value={option?.value}
            disabled={option?.disabled}
            onChange={(e) => onChange(idx, name)}
            checked={option?.checked}
          />
          {option?.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
