class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
}
}

function leftView(root) {
  const result = [];
  let max_level = 0;
  function traverse(node, level) {
      if (!node) return;

      if (max_level < level) {
          result.push(node.val);
          max_level = level;
      }

      traverse(node.left, level + 1);
      traverse(node.right, level + 1);
  }
  traverse(root, 1);
  return result;
}

function rightView(root) {
  const result = [];
  let max_level = 0;
  function traverse(node, level) {
      if (!node) return;

      if (max_level < level) {
          result.push(node.val);
          max_level = level;
      }

      traverse(node.right, level + 1);
      traverse(node.left, level + 1);
  }

  traverse(root, 1);
  return result;
}

function topView(root) {
    // Initialize an empty object 
    // to store the result
    const result = {};
  
    // Define a recursive traversal 
    //function with parameters: 
    // node, position, and level
    function traverse(node, position, level) {
      // Base case: If the node 
      // is null, return
      if (!node) return;
  
      // Logic to determine if the 
      // current node should be 
      // included in the result
      // If the position is not 
      // in the result or the 
      // current level is less 
      // than the stored level 
      // for this position
      if (result[position] === undefined 
        || level < result[position].level) {
        // Update the result with 
        // the current node's 
        // value and level
        result[position] = { val: node.val, level };
      }
  
      // Recursively traverse the 
      // left subtree with adjusted 
      // position and level
      traverse(node.left, position - 1, level + 1);
  
      // Recursively traverse the 
      // right subtree with adjusted 
      // position and level
      traverse(node.right, position + 1, level + 1);
    }
  
    // Start the traversal from the 
    // root with initial position 
    // and level as 0
    traverse(root, 0, 0);
  
    // Sort the positions and map 
    // them to the values to 
    // obtain the final result
    return Object.keys(result)
        .sort((a, b) => a - b)
        .map(key => result[key].val);
  }
  

function bottomView(root) {
    // Initialize an empty 
    // object to store the result
    const result = {};
  
    // Define a recursive traversal 
    // function with parameters: 
    // node, position, and level
    function traverse(node, position, level) {
      // Base case: If the node 
      // is null, return
      if (!node) return;
  
      // Update the result with the 
      // current node's value and 
      // level for the given position
      result[position] = { val: node.val, level };
  
      // Recursively traverse the left 
      // subtree with adjusted position 
      // and level
      traverse(node.left, position - 1, level + 1);
  
      // Recursively traverse the right 
      // subtree with adjusted 
      // position and level
      traverse(node.right, position + 1, level + 1);
    }
  
    // Start the traversal from the root 
    // with initial position and level as 0
    traverse(root, 0, 0);
  
    // Sort the positions and map them to 
    // the values to obtain the final result
    return Object.keys(result)
        .sort((a, b) => a - b)
        .map(key => result[key].val);
  }
  

// Example usage:

let root = new Node(10);
root.left =  new Node(20);
root.right =  new Node(30);
root.left.left =  new Node(40);
root.left.right =  new Node(50);
root.right.right =  new Node(60);

// Output the views
console.log("Left View:", leftView(root)); // Output: [10, 20, 40]
console.log("Right View:", rightView(root)); // Output: [10, 30, 60]
console.log("Top View:", topView(root)); // Output: [40, 20, 10, 30, 60]
console.log("Bottom View:", bottomView(root)); // Output: [40, 20, 50, 30, 60]