// https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // A map for quick lookup of nodes
    this.head = new Node(); // Dummy head node
    this.tail = new Node(); // Dummy tail node
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Helper function to remove a node from the linked list
  _removeNode(node) {
    const prevNode = node.prev;
    const nextNode = node.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  // Helper function to add a node to the front of the linked list
  _addToFront(node) {
    const nextNode = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = nextNode;
    nextNode.prev = node;
  }

  get(key) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      this._removeNode(node);
      this._addToFront(node);
      return node.value;
    } else {
      return -1;
    }
  }

  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value; // Update the value
      this._removeNode(node);
      this._addToFront(node);
    } else {
      if (this.cache.size === this.capacity) {
        // Remove the least recently used node (tail.prev)
        const lruNode = this.tail.prev;
        this._removeNode(lruNode);
        this.cache.delete(lruNode.key);
      }
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this._addToFront(newNode);
    }
  }
}

// Example usage
const lruCache = new LRUCache(2); // Capacity is 2

lruCache.put(1, 'One');
lruCache.put(2, 'Two');
console.log(lruCache.get(1)); // Output: 'One'
lruCache.put(3, 'Three'); // Remove 'Two' from the cache

console.log(lruCache.get(2)); // Output: -1 (not found)
console.log(lruCache.get(3)); // Output: 'Three'


const lruCache1 = new LRUCache(3);
lruCache1.put('a', 123);
lruCache1.put('b', 456);
lruCache1.put('c', 789); // lru is 'a'
//console.log(lruCache1.get('a')); // lru is 'b'

// Now max limit 3 is reached. Let's add a new element
lruCache1.put('d', 0); // lru 'b' is removed
console.log(lruCache1);