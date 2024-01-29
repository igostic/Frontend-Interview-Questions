import "./styles.css";

class Node {
  constructor(value){
      this.value = value;
      this.left = null;
      this.right = null;
  }
}

function dfs(root){
  let pre = [];
  let iN = [];
  let post = [];
  preOrder(root, pre);
  inOrder(root, iN);
  postOrder(root, post);
  console.log({pre, iN, post});
}

function preOrder(root, out){
  if(root === null) return;
  out.push(root.value);
  root.left &&  preOrder(root.left, out)
  root.right &&  preOrder(root.right, out)
}

function inOrder(root, out){
  if(root === null) return;
  root.left &&  inOrder(root.left, out)
  out.push(root.value);
  root.right &&  inOrder(root.right, out)
}

function postOrder(root, out){
  if(root === null) return;
  root.left &&  postOrder(root.left, out);
  root.right && postOrder(root.right, out);
  out.push(root.value);
}

let root = new Node(10);
root.left =  new Node(20);
root.right =  new Node(30);
root.left.left =  new Node(40);
root.left.right =  new Node(50);
root.right.left =  new Node(60);
root.right.right =  new Node(70);
console.log(dfs(root))

// preorder

// output: 
// [
// 10, 20, 40, 50,
// 30, 60, 70
// ]

// inorder

// output:
// [
//   40, 20, 50, 10,
//   60, 30, 70
// ]


// postorder

// output:
// [
//   40, 50, 20, 60,
//   70, 30, 10
// ]
