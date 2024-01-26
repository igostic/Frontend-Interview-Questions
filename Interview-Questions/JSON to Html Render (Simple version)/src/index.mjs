function JSONtoHTML(arr, parentEl) {
  // Iterate over each 
  //object in the array
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    // Create an HTML element 
    //of the specified type
    const elm = 
    document.createElement(obj.type);

    // Set attributes for the 
    //HTML element based on 
    //the properties, if any
    if ('props' in obj) {
      Object.keys(obj.props).forEach(key => {
        elm.setAttribute(key, obj.props[key]);
      })
    }
    // Set the text content of 
    //the HTML element, if any
    if ('textContent' in obj) {
      elm.textContent = obj.textContent;
    }
    // If the object has children 
    // and the children are an  
    // array, recursively call the 
    //JSONtoHTML function
    // to process the children 
    // and append them to the 
    // current HTML element
    if ('children' in obj && Array.isArray(obj.children)) {
      JSONtoHTML(obj.children, elm)
    }

    // Append the HTML element to 
    // the specified parent element
    parentEl.appendChild(elm);
  }
}

// Example JSON-like structure 
// representing HTML elements
const JSONStructure = [
  {
    type: 'div',
    textContent: 'Hello World',
    props: { id: 'hello', class: "foo" },
    children: [
      { type: 'h1', children: 'HELLO', textContent: 'h1 tag here!' },
      { type: 'p', textContent: 'first p tag!', children: [{ type: 'span', props: { class: "bar" }, children: 'World' }] }
    ]
  },
  {
    type: 'section',
    props: { id: 'hello-2', class: "foo-2" },
    children: [
      { type: 'h1', children: 'HELLO-2' },
      { type: 'p', children: [{ type: 'span', textContent: 'p tag!', props: { class: "bar-2" }, children: 'World' }] }
    ]
  }];

// Get the HTML element with the ID 'output' to append the generated HTML
const output = document.getElementById('output');

// Call the JSONtoHTML function to convert the JSON structure and append it to the 'output' element
JSONtoHTML(JSONStructure, output);


// alternate sol
// function JSONtoHTML(arr, parentEl) {
//   arr.forEach(obj => {
//     const { type, props, textContent, children } = obj;

//     const elm = document.createElement(type);

//     if (props) {
//       Object.entries(props).forEach(([key, value]) => {
//         elm.setAttribute(key, value);
//       });
//     }

//     if (textContent) {
//       elm.textContent = textContent;
//     }

//     if (children && Array.isArray(children)) {
//       JSONtoHTML(children, elm);
//     }

//     parentEl.appendChild(elm);
//   });
// }

// // Example usage remains the same
// JSONtoHTML(JSONStructure, output);
