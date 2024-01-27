import "./styles.css";

// step 1
// if user stops scroll ie scroll event with 
// delay(debounce) ie debounce scroll event

// step 2
// detect html elements present in viewport
// an element will be in viewport if it's 
// in between top, down, left and right
// Example if width of viewport ie
// between top and bottom is 100px
// then item1 or item10 should be place
// item10 is less than 100 and greater than 0
// item1 will be greater than 0 and less than 100

// we can use the method known as getBoundingClientRectangle
// which provide us the dimensions of each element

// const block = document.querySelector('.blocks');
// console.log(block.getBoundingClientRect())


const inViewPort = (ele) => {
  const elmDim = ele.getBoundingClientRect();
  // const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewHeight = window.innerHeight;
  const viewWidth = window.innerWidth;

  return (elmDim.top >= 0 && 
    elmDim.left >= 0 && 
    elmDim.right <= viewWidth && 
    elmDim.bottom <= viewHeight);
}

const detect = () => {
  // store the viewport elements
  const result = [];
  const blocks = document.querySelectorAll('.blocks');
  blocks.forEach((block) => {
    if(inViewPort(block)){
      result.push(block.textContent)
    }
  });
  console.log({result})
}

const debounce = (fn, delay) => {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(()=>{
      fn(args);
    }, delay)
  }
}
const onscroll = debounce(detect, 1000);

window.addEventListener('scroll', onscroll);


// we can acheive the same with IntersectionObserver API

// const detect = () => {
//   const result = [];
//   const blocks = document.querySelectorAll('.blocks');

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         result.push(entry.target.textContent);
//       }
//     });
//     console.log({result});
//   }, { threshold: 1 }); // Change the threshold as needed (0.5 means 50% visibility)

//   blocks.forEach(block => {
//     observer.observe(block);
//   });
// }

// const debounce = (fn, delay) => {
//   let timer;
//   return function(...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   }
// }

// const onScroll = debounce(detect, 1000);

// window.addEventListener('scroll', onScroll);


// we can use this piece of code with little modification anywhere

// const inViewPort = (ele) => {
//   const elmDim = ele.getBoundingClientRect();
//   const viewHeight = window.innerHeight;
//   const viewWidth = window.innerWidth;

//   return (elmDim.top >= 0 && 
//     elmDim.left >= 0 && 
//     elmDim.right <= viewWidth && 
//     elmDim.bottom <= viewHeight);
// }

// const detect = (selector) => {
//   const result = [];
//   const blocks = document.querySelectorAll(`.${selector}`);
//   blocks.forEach((block) => {
//     if(inViewPort(block)){
//       result.push(block.textContent)
//     }
//   });
//   console.log({result})
// }

// const debounce = (fn, delay) => {
//   let timer;
//   return function(...args) {
//     clearTimeout(timer);
//     timer = setTimeout(()=>{
//       fn(...args);
//     }, delay)
//   }
// }

// const onscroll = debounce(detect, 1000);

// window.addEventListener('scroll', () => {
//   onscroll('product-base'); // Replace 'your-class-name' with the actual class name
// }, false);

