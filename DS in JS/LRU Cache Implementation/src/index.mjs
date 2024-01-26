class LRUCache {
  constructor(capacity) {
    // Maximum number of items the cache can hold
    this.capacity = capacity; 
    // Map for quick lookup of key-value pairs
    // SC = O(n)
    this.cache = new Map();
    //SC = O(n)
    // Array to maintain the order of key access
    this.accessOrder = [];
  }

  // Retrieve value for a given
  // key from the cache
  // TC and SC = O(1)
  get(key) {
    if (this.cache.has(key)) {
      // Update access order when key is found
      this._updateAccessOrder(key);
      // Return the value associated with the key 
      return this.cache.get(key); 
    } else {
      // Return -1 if key is not found in the cache
      return -1; 
    }
  }

  //TC and SC = O(1)
  // Add or update a key-value pair in the cache
  put(key, value) {
    if (this.cache.has(key)) {
      // Update access order when key is found
      this._updateAccessOrder(key); 
    } else {
      if (this.accessOrder.length === this.capacity) {
        // If cache is at capacity, remove 
        // the least recently used item
        // Get the oldest key
        const oldestKey = this.accessOrder.shift(); 
        // Remove the key-value pair from the cache
        this.cache.delete(oldestKey); 
      }
    }
    // Add or update the key-value 
    // pair in the cache
    this.cache.set(key, value); 
    // Add the key to the end of 
    //the access order array
    this.accessOrder.push(key); 
  }

  //TC  = O(n) and SC = O(1)
  // Helper function to update the 
  //access order when a key is accessed
  _updateAccessOrder(key) {
    // Find the index of the key
    // indexOF may need to search whole array
    // so TC = O(n)
    const index = this.accessOrder.indexOf(key);  
    // Remove the key from its current position
    this.accessOrder.splice(index, 1); 
    // Add the key to the end of the 
    // access order array
    this.accessOrder.push(key); 
  }
}

// Example usage
const lruCache = new LRUCache(3);

lruCache.put(1, 'One'); // Cache: {1: 'One'} (Access order: [1])
lruCache.put(2, 'Two'); // Cache: {1: 'One', 2: 'Two'} (Access order: [1, 2])
lruCache.put(3, 'Three'); // Cache: {1: 'One', 2: 'Two', 3: 'Three'} (Access order: [1, 2, 3])

console.log(lruCache.get(2)); // Output: 'Two' Cache: {1: 'One', 2: 'Two', 3: 'Three'} (Access order: [1, 3, 2])
lruCache.put(4, 'Four'); // Cache: { 2: 'Two', 3: 'Three', 4: 'Four'} Access Order: [3, 2, 4]
console.log(lruCache.get(3)); // Output: 'Three' Cache: {1: 'One', 2: 'Two', 3: 'Three'} (Access order: [1, 3, 2])
