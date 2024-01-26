// Create a function in javascript which will take a 
// nested object and a filter function as input and 
// return the filtered object.

// https://learnersbucket.com/examples/interview/filter-nested-object-in-javascript/
// https://www.youtube.com/watch?v=XMEYVsxelxk&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=22&ab_channel=Learnersbucket

// Input:
const obj1 = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
     f: {
       g: -4,
      },
    },
    h: "Good Night Moon",
  }
};

const obj2 = {
  x: undefined,
  a: 1,
  b: {
    c: 2,
    d: -3,
    w: undefined,
    e: {
     f: {
       g: -4,
      },
    },
    h: {
      i: 5,
      j: 6
    },
  },
  l: [1, -2, 3, -0]
};

// Filter functions
const filter1 = (s) => typeof s === "string";
const filter2 = (n) => n > 0;


// Define the filteredObj function
const filteredObj = (obj, filter) => {
  for(let key in obj){
    const val = obj[key];
    // If the value is an object, recursively call filteredObj
    if(val && typeof val === 'object'){
      if (Array.isArray(val)) {
        obj[key] = val.filter(filter);
      } else {
        filteredObj(val, filter);
      }
    } else {
      if(!filter(val))
        delete obj[key]
    }
    // Check if the value is an empty object after deletion
    if (JSON.stringify(val) === "{}") {
      delete obj[key];
    }
  }
}

// Apply filters to the objects
filteredObj(obj1, filter1);
filteredObj(obj2, filter2);

// Output:

console.log("obj1-->>",obj1);
// Output:
// {
//   b: {
//     c: "Hello World",
//     h: "Good Night Moon",
//   }
// };

console.log("obj2-->>",obj2);
// Output:
// {
//   a : 1,
//   b: {
//     c: 2,
//     h : {
//       i : 5,
//       j: 6
//     }
//   }
// }
