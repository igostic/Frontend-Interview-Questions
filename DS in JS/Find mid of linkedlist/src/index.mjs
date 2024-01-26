
// Find mid of linked list
// 1 -> 2 -> 3 -> null
// 2 is mid
class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Reference to the next node
  }
}

const head = new Node(1);
const node1 = new Node(2);
const node2 = new Node(3);
const node3 = new Node(4);

head.next = node1;
node1.next = node2;
node2.next = node3;

// solution 1
function midByLength(head){
  let length = 0;
  let temp = head;
  while(temp){
    length++;
    temp = temp.next;
  }
  temp = head;
  length = parseInt(length / 2);
  while(length){
    temp = temp.next;
    length--;
  }
  console.log(temp.value);
}
midByLength(head);

function midBySlowPointer(head){
  let slow = head;
  let fast = head.next;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  console.log(slow.value);
}

midBySlowPointer(head);