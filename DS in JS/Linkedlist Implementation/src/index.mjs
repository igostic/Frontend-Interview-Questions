// Definition of a Node for the linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Reference to the next node
  }
}

// Definition of the LinkedList class
class LinkedList {
  constructor() {
    this.size = 0; // Initialize the size of the linked list
    this.head = null; // Initialize the head (start) of the list
  }

  // Method to add a new value to the end of the linked list
  add(value) {
    const newNode = new Node(value); // Create a new node

    if (this.size === 0) {
      this.head = newNode; // If the list is empty, set the new node as the head
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next; // Traverse to the last node
      }

      currentNode.next = newNode; // Set the new node as the next node of the last node
    }

    this.size++; // Increase the size of the list
  }

  // Method to get a node at a specific index
  getByIndex(index) {
    let position = 0;
    let currentNode = this.head;

    while (position < index) {
      currentNode = currentNode.next; // Traverse to the specified position
      position++;
    }

    return currentNode; // Return the node at the specified index
  }

  // Method to add a new value at a specific index
  addByIndex(index, value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = newNode;
      return;
    }

    const previousNode = this.getByIndex(index - 1); // Get the node before the specified index
    newNode.next = previousNode.next; // Set the next node of the new node
    previousNode.next = newNode; // Set the new node as the next node of the previous node
    this.size++; // Increase the size of the list
  }

  // Method to remove a value at a specific index
  removeByIndex(index) {
    let currentNode = this.head;
    if (this.size === 0) {
      this.head = currentNode.next;
    } else {
      const previousNode = this.getByIndex(index - 1);
      previousNode.next = previousNode.next.next; // Skip the node to be removed
    }
  }
}

// Create a new linked list and perform operations on it
const linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.addByIndex(1, 5);
linkedList.removeByIndex(1);
console.log(linkedList.getByIndex(1));
console.log(linkedList);
