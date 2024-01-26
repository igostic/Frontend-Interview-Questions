import "./styles.css";


const inp = document.getElementById('inp');
const ul = document.getElementById('list');

function renderLi(value) {
  ul.innerHTML = "";
  for(let i = 0; i < value; i++){
    const li = document.createElement('li');
    li.textContent = i + 1;
    ul.appendChild(li);
  }
  // inp.appendChild(div);
}

function updateInputValue(value) {
  inp.value = value;
}

inp.addEventListener('input', (event) => {
  let value = parseInt(event.target.value, 10);

  if(isNaN(value) || value < 1) {
    value = 1;
    updateInputValue(value);
  } else if (value > 10) {
    value = 10;
    updateInputValue(value);

  }

  renderLi(value);
});

ul.addEventListener('click', (e) => {
  if(e.target.tagName === 'LI'){
    e.target.textContent = parseInt(e.target.textContent, 10) * 2;
  }
});