import "./styles.css";
import data from "./config";

// function handleInputChange(event) {
//   const element = event.target;
//   const itemId = element.id; // Assuming you have an id for each element
//   const item = data.find(item => item.id === itemId);
//   console.log(element);
//   if (item) {
//       item.value = element.value;
//       // Perform validation and any other necessary logic here
//       // For example, you can update the validity of the item
//       item.valid = element.value !== '';
//   }
// }

// function renderElement(item) {
//   const element = document.createElement(item.type);

//   for (const prop in item.config) {
//       if (item.config.hasOwnProperty(prop)) {
//           element[prop] = item.config[prop];
//       }
//   }

//   element.value = item.value;

//   if (item.id) {
//       element.id = item.id;
//   }

//   if (item.class) {
//       element.className = item.class;
//   }

//   // console.log(element)
//   element.addEventListener('input', handleInputChange);

//   document.body.appendChild(element);
// }


// function renderItems(data) {
//   data.forEach(item => {
//       renderElement(item);
//   });
// }

// renderItems(data);

function validateField(value, rules) {
  let isValid = true;
  if (rules.required) {
      isValid = value.trim() !== '' && isValid;
  }
  if (rules.pattern) {
      isValid = rules.pattern.test(value) && isValid;
  }
  return isValid;
}

function handleInputChange(event) {
  const element = event.target;
  const itemId = element.id;
  const item = data.find(item => item.id === itemId);

  if (item) {
      item.value = element.value;
      item.valid = validateField(item.value, item.validation);
      item.touched = true;
      // Update UI to reflect validity or show error messages
      updateUI(item);
  }
}

function updateUI(item) {
  const element = document.getElementById(item.id);
  const errorMessageElement = document.getElementById(`${item.id}-error`);

  if (item.valid) {
      element.classList.remove('invalid');
      errorMessageElement.textContent = '';
  } else {
      element.classList.add('invalid');
      errorMessageElement.textContent = item.errorMessage;
  }
}

function renderElement(item) {
  const element = document.createElement(item.type);

  for (const prop in item.config) {
      if (item.config.hasOwnProperty(prop)) {
          element[prop] = item.config[prop];
      }
  }

  element.value = item.value;

  if (item.id) {
      element.id = item.id;
  }

  if (item.class) {
      element.className = item.class;
  }

  element.addEventListener('input', handleInputChange);

  const container = document.createElement('div');
  container.appendChild(element);

  const errorMessage = document.createElement('div');
  errorMessage.id = `${item.id}-error`;
  errorMessage.classList.add('error-message');
  container.appendChild(errorMessage);

  document.body.appendChild(container);
}

function renderForm(data) {
  data.forEach(item => {
      renderElement(item);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Submit';
  document.body.appendChild(submitButton);

  submitButton.addEventListener('click', function() {
      const formIsValid = data.every(item => item.valid);

      if (formIsValid) {
          const formData = data.map(item => ({ id: item.id, value: item.value }));
          console.log('Form Data:', formData);
          // Perform form submission
      } else {
          console.log('Form is not valid. Please check the fields.');
          // Display error messages or take appropriate action
      }
  });
}

renderForm(data);
