// here we will see how
// workers work
// we need to pass path of script
const worker = new Worker("./worker.js");

const sumButton = document.querySelector("#sumButton");
const bgButton = document.querySelector("#bgButton");

sumButton.addEventListener("click", event => {
  // let sum = 0;
  // for(let i = 0; i < 10000; i++){
  //   sum += i;
  // }
  // alert("Sum is " + sum);
  worker.postMessage("hello there!");
});

worker.onmessage = function(msg) {
  console.log(msg);
  alert("Sum is " + msg.data);
}

bgButton.addEventListener("click", event => {
  if(document.body.style.background !== "green")
    document.body.style.background = "green";
  else
    document.body.style.background = "blue";
});
