import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");

// Step 1: Understand the Requirements
// Before you start coding, it's crucial to understand what React.createElement does. It takes three arguments:

// type: The type of element (string for HTML elements, or a React component).
// props: An object containing the element's properties (or "props").
// children: The element's children
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
// const element = createElement(
//   "div",
//   { className: "my-class", id: "my-id" },
//   "Hello, ",
//   createElement("span", null, "World!")
// );

const heading = createElement(
  "h1",
  {
    id: "greeting",
    className: "title",
    style: {
      color: "red"
    },
    key: "h1"
  },
  "Radhe Radhe"
);

const heading2 = createElement(
  "h2",
  {
    id: "name",
    style: {
      color: "skyblue"
    },
    key: "h2"
  },
  "My name is Neeraj"
);
const heading3 = createElement(
  "h3",
  {
    className: "greeting",
    key: "h3"
  },
  "Hello ",
  createElement("i", { key: "i" }, "Neeraj"),
  ". Welcome!"
);
const container = createElement("div", {}, [heading, heading2, heading3]);
console.log({ container });
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// The resulting element object would look like:
// {
//   type: 'div',
//   props: {
//     className: 'my-class',
//     id: 'my-id',
//     children: [
//       {
//         type: 'TEXT_ELEMENT',
//         props: {
//           nodeValue: 'Hello, ',
//           children: [],
//         },
//       },
//       {
//         type: 'span',
//         props: {
//           children: [
//             {
//               type: 'TEXT_ELEMENT',
//               props: {
//                 nodeValue: 'World!',
//                 children: [],
//               },
//             },
//           ],
//         },
//       },
//     ],
//   },
// }
