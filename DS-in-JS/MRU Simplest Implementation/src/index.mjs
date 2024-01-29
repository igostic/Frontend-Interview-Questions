class MRU {
  constructor(max) {
    this.max = max;
    this.cache = new Map();
  }

  set(key, value) {
    if (this.cache.has(key)) {
      // Remove the key from its current position
      this.cache.delete(key);
    } else if (this.cache.size === this.max) {
      // Remove the least recently used item
      // (which is now the first in Map)
      this.cache.delete(this.first());
    }
    this.cache.set(key, value);
  }

  get(key) {
    let item = this.cache.get(key);
    return item;
  }
  first() {
    // Retrieve an iterator containing
    // all the keys in the Map.
    // TC: O(1)
    const keysIterator = this.cache.keys();
    // Advance the iterator and
    // get the current value.
    // TC: O(1)
    const firstKey = keysIterator.next().value;
    // Step 3: Return the first key.
    // TC: O(1)
    return firstKey;
  }
}

let mru = new MRU(4);

mru.set(1, "one");
mru.set(2, "two");
mru.set(3, "three");
mru.set(4, "four");
console.log(mru.get(1));
//console.log(mru)
mru.set(5, "five");
console.log(mru);

mru.set(6, "six");
console.log(mru);
