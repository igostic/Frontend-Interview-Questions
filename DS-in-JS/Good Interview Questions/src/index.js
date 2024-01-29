import "./styles.css";

// Q.1
// Given a string containing ‘0’, ‘1’ and ‘?’
// wildcard characters, generate all binary strings
// that can be formed by replacing each wildcard
// character with ‘0’ or ‘1’.
// Method1:

function genString(str, i) {
  if (i === str.length) {
    console.log("str-->>", str);
    // Base case: If we reach the end of the string,
    // return to stop recursion
    return;
  }

  if (str[i] === "?") {
    // If the current character is a '?',
    // generate variations with '0' and '1'
    let newStr = str.slice(0, i) + "0" + str.slice(i + 1); // Replace '?' with '0'
    // Recursively call genString with the modified string
    genString(newStr, i + 1);
    // Replace '?' with '1'
    newStr = str.slice(0, i) + "1" + str.slice(i + 1);
    // Recursively call genString with the modified string
    genString(newStr, i + 1);
  } else {
    // If the character is not '?', move to the next character
    genString(str, i + 1);
  }
}

let str = "1??0?101";
genString(str, 0); // Start the recursion with the original string

console.log("str-->>", str); // This will log the original string, which remains unchanged

// Method 2;
// Algorithm
// Step 1: Convert the string to an array of characters.
// Step 2: Loop through each character and if the character
// is a "?", then  replace it with "0" and recursively call
// the function for the next character.
// Step 3: Now replace it with "1" and recursively call the
// fuction for the next character.
// Step 4: If the character is not a "?" , then just proceed
// with the next character.
// Step 5: When the last character is reached, log the result.

// First, let's create a new prototype function for STRING as we will need this utility method to solve our problem.

// String.prototype.replaceAt = function (index, replacement) {
//   return this.substr(0, index) + replacement + this.substr(index + replacement.length);
// }

// Now let's write the actual function that prints binary strings.

// function printBinaryStrings(str, i) {
//   if (i === str.length) {
//     console.log(str)
//     return;
//   }
//   if (str[i] === '?') {
//     str = str.replaceAt(i, '0');
//     printBinaryStrings(str, i + 1)
//     str = str.replaceAt(i, '1');
//     printBinaryStrings(str, i + 1)
//     str.replaceAt(i, '?');
//   } else {
//     printBinaryStrings(str, i + 1)
//   }
// }

// printBinaryStrings('1??0?101', 0);

// Q.2 BST Program
// function Node(data) {
//   this.data = data;
// }
// function BST() {
//   let root = null;
//   // Helper method
//   let findNodeHeight = (node) => {
//     return (function findHeight(node) {
//       if (!node) {
//         return -1;
//       } else {
//         return Math.max(findHeight(node.left), findHeight(node.right)) + 1;
//       }
//     })(node);
//   };
//   return {
//     add: (data) => {
//       const node = new Node(data);
//       if (!root) {
//         root = node;
//         return;
//       }

//       (function insert(node) {
//         if (data < node.data) {
//           if (!node.left) {
//             node.left = new Node(data);
//             return;
//           } else {
//             insert(node.left);
//           }
//         } else {
//           if (!node.right) {
//             node.right = new Node(data);
//             return;
//           } else {
//             insert(node.right);
//           }
//         }
//       })(root);
//     },

//     findMin: () => {
//       let currentNode = root;
//       while (currentNode.left) {
//         currentNode = currentNode.left;
//       }
//       return currentNode.data;
//     },

//     findMax: () => {
//       let currentNode = root;
//       while (currentNode.right) {
//         currentNode = currentNode.right;
//       }
//       return currentNode.data;
//     },

//     findTreeHeight: () => {
//       return findNodeHeight(root);
//     },

//     findMaximumDepth: () => {
//       return findTreeHeightFn();
//     },

//     findMinimumDepth: () => {
//       return (function findMinDepth(node) {
//         if (!node) {
//           return 0;
//         }
//         if (!node.left && !node.right) {
//           return 1;
//         }
//         if (!node.left) {
//           return findMinDepth(node.right) + 1;
//         }
//         if (!node.right) {
//           return findMinDepth(node.left) + 1;
//         }

//         return Math.min(findMinDepth(node.left), findMinDepth(node.right)) + 1;
//       })(root);
//     }
//   };
// }

// // Now we can construct the BST

// let bst = new BST();
// bst.add(10);
// bst.add(20);
// bst.add(5);
// bst.add(15);
// bst.add(3);
// bst.add(30);
// console.log(bst.findMax());

// Q.3 Giving an array and a string ‘str’, find the longest
// string in array which can be formed by deleting some characters
// of the given ‘str’.
// Examples:
// Input :
// arr = ["ale", "apple", "monkey", "plea"]
// str = "abpcplea"
// Output : apple
function isItemPresent(item, str) {
  const itemArray = item.slice("");
  for (let i = 0; i < itemArray.length; i++) {
    if (!str.includes(itemArray[i])) {
      return false;
    }
  }
  return true;
}

function findString(arr, str) {
  let longestStr = null;

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (isItemPresent(item, str)) {
      if (longestStr) {
        if (longestStr.length < item.length) {
          longestStr = item;
        }
      } else {
        longestStr = item;
      }
    }
  }

  return longestStr;
}

console.log(findString(["ale", "apple", "monkey", "plea"], "abpcplea"));
console.log(
  findString(["pintu", "geeksfor", "geeksgeeks", " forgeek"], "geeksforgeeks")
);
