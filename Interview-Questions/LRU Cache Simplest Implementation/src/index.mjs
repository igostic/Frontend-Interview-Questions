import "./styles.css";

class LRUCache {
  constructor(capacity) {
    // Create a new Map to store key-value pairs
    this.cache = new Map();
    // Set the capacity of the cache
    this.capacity = capacity;
  }

  get(key) {
    // If key is not present, return -1 (cache miss)
    if (!this.cache.has(key)) return -1;

    // If key is not present, return -1 (cache miss)
    let val = this.cache.get(key);
    // Remove the key-value pair from the Map
    this.cache.delete(key);
    // Add it back to the Map (updating its access order)
    this.cache.set(key, val);

    return val; // Return the value
  }

  put(key, value) {
    // Remove existing key (if present)
    this.cache.delete(key);
    // If cache is full
    if (this.cache.size === this.capacity) {
      // Remove the least recently used item
      // this.cache.keys(): This returns an 
      // iterator containing all the keys in the Map object
      // .next(): This method is used to advance 
      // the iterator to the next item in the sequence. 
      // It returns an object with two properties: 
      // done (a boolean indicating if the iteration is complete) and 
      // value (the value of the current item).
      // this.cache.keys().next().value is used to retrieve 
      // the first key from the Map. It's a concise way to 
      // get the earliest inserted key in the Map
      this.cache.delete(this.cache.keys().next().value);
      // Add the new key-value pair
      this.cache.set(key, value);
    } else {
      // If cache is not full, simply add the key-value pair
      this.cache.set(key, value); 
    }
  }

  // Implement LRU/MRU retrieval methods
  getLeastRecent() {
    // Return the first key-value pair in the Map (least recent)
    return Array.from(this.cache)[0];
  }

  getMostRecent() {
    // Return the last key-value pair in the Map (most recent)
    return Array.from(this.cache)[this.cache.size - 1];
  }
}


const cache = new LRUCache(2); // Create a cache with a capacity of 2

cache.put(1, 1); // Cache: {1=1}
cache.put(2, 2); // Cache: {1=1, 2=2}
console.log("get-->>", cache.get(1)); // Output: 1
// Cache: {2=2, 1=1} (1 is moved to the end because it was accessed)
console.log(cache.getLeastRecent()); // Output: [2, 2]
console.log(cache.getMostRecent()); // Output: [1, 1]

cache.put(3, 3); // Cache: {1=1, 3=3} (2 is removed because the capacity is reached)
console.log("get-->>", cache.get(2)); // Output: -1 (2 is not present in the cache)
console.log(cache.getMostRecent()); // Output: [3, 3]

cache.put(4, 4); // Cache: {3=3, 4=4} (1 is removed because it was the least recently used)
console.log("get-->>", cache.get(1)); // Output: -1 (1 is not present in the cache)
console.log(cache.getMostRecent()); // Output: [4, 4]

