export default data = [
  {
    options: [
      { label: "I am not checked", value: "xyz", disabled: false },
      { label: "I am checked", value: "abc", disabled: false },
      { label: "I am disabled", value: "pqr", disabled: true },
      { label: "I am checked as well", value: "lmn", disabled: false },
    ],
    name: "radio",
    question: "Question1",
    checked: [],
  },
  {
    options: [
      { label: "I am not checked", value: "xyz", disabled: true },
      { label: "I am checked", value: "abc", disabled: false },
      { label: "I am disabled", value: "pqr", disabled: true },
      { label: "I am checked as well", value: "lmn", disabled: false },
    ],
    name: "checkbox",
    question: "Question2",
    checked: ["abc"],
  },
];
