import "./styles.css";

class LRU {
  constructor(max) {
    this.max = max;
    this.cache = new Map();
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size === this.max) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  get(key) {
    let item = this.cache.get(key);
    if (item) {
      // need to delete and add again
      // to refresh make it MRU
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }
}

let lru = new LRU(4);

lru.set(1, "one");
lru.set(2, "two");
lru.set(3, "three");
lru.set(4, "four");
console.log(lru.get(1));
console.log(lru);
lru.set(5, "five");
console.log(lru);
