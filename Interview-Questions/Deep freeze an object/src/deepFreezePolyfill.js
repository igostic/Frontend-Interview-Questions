import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  <h3>
    We already have freeze method on javascript objects which prevents new properties 
    from being added to it, existing properties from being removed, prevents changing 
    the enumerability, configurability, or writability of existing properties, and 
    prevents the values of existing properties from being changed.
  </h3> 
  <h3>
    But it only works on the first level. So as a challenge i was asked to implement 
    a custom implementation of freezing an object on nested level
  </h3>
</div>
`;

function deepFreeze1(obj) {
  // base condition: if obj is not an object, return immediately
  if (typeof obj !== "object") return;

  // recursively call deepFreeze on all values of obj
  for (let item of Object.values(obj)) {
    deepFreeze1(item);
  }
  console.log("obj--", obj);
  // freeze the current object so no modifications allowed
  Object.freeze(obj);
}

const obj1 = {
  a: 123,
  b: {
    c: 4334534534,
  },
};

// deepFreeze1(obj);
// obj1.b.c = 234;
// console.log(obj1);

// const obj1 = {}
// obj1.a = obj1; //  leads to infinite object

// edge cases where it can fail
// Circular References: If the object contains circular references
// (i.e., an object references itself in a loop), it can lead to
// infinite recursion and possibly a stack overflow error.
// const obj = {};
// obj.a = obj;
// deepFreeze(obj);

// Non-object Values: While the typeof obj !== 'object' check handles
// most primitive types, it doesn't handle all edge cases. For instance,
// functions are also of type 'object' in JavaScript.

// const func = function() {};
// deepFreeze(func);

function deepFreeze(obj, visited = new Set()) {
  // Check if the object has been visited before,
  // or if it's not an object (including null)
  if (visited.has(obj) || typeof obj !== "object" || obj === null) return;

  // Mark the object as visited
  // to prevent infinite recursion
  visited.add(obj);

  // Iterate over all properties of the object
  for (let prop in obj) {
    // Ensure that the property belongs
    // directly to the object (not inherited)
    if (obj.hasOwnProperty(prop)) {
      // Recursively apply deepFreeze to the property
      deepFreeze(obj[prop], visited);
    }
  }

  // Freeze the object after all
  // properties have been processed
  Object.freeze(obj);
}

const obj = {
  a: 123,
  d: [1, 2, 3],
  b: {
    c: 4334,
  },
};

deepFreeze(obj);
obj.d.push(5);
obj.b.c = 234;
console.log(obj);

const obj2 = {};
deepFreeze(obj2);
obj2.a = obj2;
console.log(obj2);
