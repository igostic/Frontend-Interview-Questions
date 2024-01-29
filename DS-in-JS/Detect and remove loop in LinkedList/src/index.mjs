/* We can also use the Floyd Cycle Detection 
algorithm to detect and remove the loop. 
In Floyd’s algo, the slow and fast pointers 
meet at a loop node. We can use this loop 
node to remove the cycle. There are following 
two different ways of removing the loop when 
Floyd’s algorithm is used for loop detection. */

//https://afteracademy.com/blog/detect-and-remove-loop-in-a-linked-list/

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
}

function detectAndRemoveLoop(linkedList) {
  let slow = linkedList.head;
  let fast = linkedList.head;

  while (fast !== null && fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      console.log(slow.data, fast.data);
      removeLoop(linkedList, slow);
      return true;
    }
  }
  return false;
}

function removeLoop(linkedList, loopNode) {
  // Assign head to ptr1.
  let ptr1 = linkedList.head;
  let ptr2 = loopNode;
  // Loop until next of ptr1
  // and ptr2 are not equal.
  while (ptr1.next !== ptr2.next) {
    ptr1 = ptr1.next;
    ptr2 = ptr2.next;
  }
  // Make next of ptr2 that
  // is last node of Linked
  // List NULL.
  ptr2.next = null;
}

function push(linkedList, data) {
  let newNode = new Node(data);
  newNode.next = linkedList.head;
  linkedList.head = newNode;
}

// Example Usage:
let linkedList = new LinkedList();
push(linkedList, 1);
push(linkedList, 2);
push(linkedList, 3);
push(linkedList, 4);
push(linkedList, 5);

// Creating a loop for testing purposes
// here 5 node pointning
// to 2rd node
linkedList.head.next.next.next.next.next = linkedList.head.next;

let loopDetected = detectAndRemoveLoop(linkedList);

if (loopDetected) {
  console.log("Loop detected and removed");
} else {
  console.log("No loop detected");
}
