const myReact = {
  createElement,
  render
};

function createElement(type, props, ...children) {
  // This function creates a virtual element object

  return {
    type, // The type of the element (e.g., "div", "span", etc.)
    props: {
      ...props, // Spread the properties (e.g., className, onClick, etc.)
      children: children.map(
        (child) =>
          // Map over the children
          typeof child === "object" // If the child is already an object (a nested element)
            ? child // Keep it as is
            : createTextElement(child) // Otherwise, create a text element for it
      )
    }
  };
}

function createTextElement(text) {
  // This function creates a virtual text element

  return {
    type: "TEXT_ELEMENT", // Indicates that this is a text element
    props: {
      nodeValue: text, // The actual text content of the element
      children: [] // Text elements do not have children, so this is an empty array
    }
  };
}

function render(element, container) {
  if (element.type === "TEXT_ELEMENT") {
    // If the element is a text node, create a text node and append it to the container
    const textNode = document.createTextNode(element.props.nodeValue);
    container.appendChild(textNode);
    return;
  }

  // Create a DOM element of the specified type
  const domElement = document.createElement(element.type);

  for (const [prop, value] of Object.entries(element.props)) {
    if (prop === "children") {
      // If the property is 'children', recursively render each child element
      for (const child of value) {
        render(child, domElement);
      }
    } else {
      // Set other properties directly on the DOM element
      domElement[prop] = value;
    }
  }

  // Append the created DOM element to the container
  container.appendChild(domElement);
}

/** @jsx Didact.createElement */
// const element = createElement(
//   "h1",
//   { className: "greeting" },
//   "Hello ",
//   createElement("i", null, "name"),
//   ". Welcome!"
// );

const element = myReact.createElement(
  "div",
  { className: "my-class" },
  "Hello ",
  myReact.createElement(
    "span",
    null,
    "World",
    myReact.createElement("p", null, "Neeraj")
  )
);
console.log("element-p-->>>", element);
// function Greeting({ name }) {
//   console.log({ name });
//   return createElement(
//     "h1",
//     { className: "greeting" },
//     "Hello ",
//     createElement("i", null, name),
//     ". Welcome!"
//   );
// }

const container = document.getElementById("root");
// const element = Greeting({ name: "Neeraj" });
myReact.render(element, container);
// Didact.render(Greeting({ name: "Neeraj" }), container);

// For more detail read this page I took help from chat-gpt and this blog
// https://pomb.us/build-your-own-react/
// https://codesandbox.io/s/didact-2-forked-whv7qh?file=/src/index.js
