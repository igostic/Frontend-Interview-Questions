import "./styles.css";
let counter1 = document.querySelector(".counter1");
let counter2 = document.querySelector(".counter2");
let count = 0;
setInterval(() => {
  count++;
  counter1.innerText = count;
  counter2.innerText = count / 2;
}, 1000);
