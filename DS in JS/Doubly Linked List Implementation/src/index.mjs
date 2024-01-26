import "./styles.css";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Add a node to the end of the list (tail)
  addToTail(value) {
    const newNode = new Node(value);
    if (!this.head) {
      // If the list is empty, set both head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If the list is not empty, update tail pointers
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  // Remove a node from the end of the list (tail)
  removeFromTail() {
    if (!this.tail) {
      // If the list is empty, return null
      return null;
    }
    const removedValue = this.tail.value;
    if (this.head === this.tail) {
      // If there's only one node, set head and tail to null
      this.head = null;
      this.tail = null;
    } else {
      // If there are multiple nodes, update tail pointers
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    return removedValue;
  }

  // Add a node to the beginning of the list (head)
  addToHead(value) {
    const newNode = new Node(value);
    if (!this.head) {
      // If the list is empty, set both head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If the list is not empty, update head pointers
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  // Remove a node from the beginning of the list (head)
  removeFromHead() {
    if (!this.head) {
      // If the list is empty, return null
      return null;
    }
    const removedValue = this.head.value;
    if (this.head === this.tail) {
      // If there's only one node, set head and tail to null
      this.head = null;
      this.tail = null;
    } else {
      // If there are multiple nodes, update head pointers
      this.head = this.head.next;
      this.head.prev = null;
    }
    return removedValue;
  }

  // Print the elements of the list
  printList() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

// Example usage
const list = new DoublyLinkedList();
list.addToTail(1);
list.addToTail(2);
list.addToTail(3);

console.log("List after adding nodes to the tail:");
list.printList();

list.removeFromTail();

console.log("\nList after removing from the tail:");
list.printList();

list.addToHead(0);

console.log("\nList after adding to the head:");
list.printList();

list.removeFromHead();

console.log("\nList after removing from the head:");
list.printList();

