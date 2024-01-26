import "./styles.css";

let display = document.getElementById('display');
let buttonsContainer = document.querySelector('.buttons');

buttonsContainer.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
      handleButtonClick(event.target.innerText);
  }
});

function handleButtonClick(value) {
    switch (value) {
        case '=':
            calculateResult();
            break;
        case 'C':
            clearDisplay();
            break;
        default:
            appendToDisplay(value);
            break;
    }
}

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}