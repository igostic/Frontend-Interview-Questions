import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
<p>Initialize two pointers, left and right, to the beginning and the end of the array, respectively.</p>
  <h1>While left is less than right:</h1>
  <p>If the element at left is 0, then swap it with the element at right and decrement right.</p>
  <p>Otherwise, increment left.</p>
  <p>Return the array.</p>
  </div>
`;


function separate0sAnd1s(array) {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    // with array[left] === 0 we will 
    // get 1's first in array but 
    // with array[left] === 1 
    // we will get 0' first
    if (array[left] === 0) {
      let temp = array[left];
      array[left] = array[right];
      array[right] = temp;
      // [array[left], array[right]] = [array[right], array[left]];
      right--;
    } else {
      left++;
    }
    console.log(array);
  }

  return array;
}

const array = [0, 1, 0, 1, 0, 1, 0, 1];

const separatedArray = separate0sAnd1s(array);

console.log(separatedArray); // [1, 1, 1, 1, 0, 0, 0, 0]