const data = [
  {
    id: "firstName",
    type: "input",
    placeholder: "First Name",
    config: {
      dataType: "text",
      placeholder: "John"
    },
    value: "",
    validation: { required: true },
    valid: false,
    errorMessage: "Enter valid Data",
    touched: false
  },
  {
    id: "lastName",
    type: "input",
    placeholder: "Last Name",
    config: {
      dataType: "text",
      placeholder: "Doe"
    },
    value: "",
    validation: { required: true },
    valid: false,
    errorMessage: "Enter valid Data",
    touched: false
  },
  {
    id: "email",
    type: "input",
    placeholder: "Email",
    config: {
      dataType: "email",
      placeholder: "john.doe@example.com"
    },
    value: "",
    validation: {
      required: true,
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    valid: false,
    errorMessage: "Enter a valid email address",
    touched: false
  },
  {
    id: "phoneNumber",
    type: "input",
    placeholder: "Phone Number",
    config: {
      dataType: "tel",
      placeholder: "555-555-5555"
    },
    value: "",
    validation: { required: true, pattern: /^\d{3}-\d{3}-\d{4}$/ },
    valid: false,
    errorMessage: "Enter a valid phone number (e.g., 555-555-5555)",
    touched: false
  }
];

export default data;
