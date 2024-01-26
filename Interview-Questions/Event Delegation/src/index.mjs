import "./styles.css";

// instead of adding event listeners 
// to each items, we are adding it to
// parent
let products = document.querySelector("#products");
products.addEventListener('click', (event) => {
  console.log(event);
  if(event.target.tagName === "LI"){
    window.location.href += "#" + event.target.id
  }
})