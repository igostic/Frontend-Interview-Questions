import "./styles.css";

// o(nlogn)
Array.prototype.mySort = function(compareFunction) {
  if (this.length <= 1) {
    return this;
  }

  const pivot = this[Math.floor(this.length / 2)];
  const left = [];
  const right = [];

  for (const element of this) {
    if (compareFunction(element, pivot) < 0) {
      left.push(element);
    } else if (compareFunction(element, pivot) > 0) {
      right.push(element);
    }
  }

  return [...left.mySort(compareFunction), pivot, ...right.mySort(compareFunction)];
}

// o(n^2)
Array.prototype.customSort = function (compareFunction) {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - i - 1; j++) {
      if (compareFunction ? compareFunction(this[j], this[j + 1]) > 0 : this[j] > this[j + 1]) {
        const temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
  return this;
};

// example 1
const compareNumbers = (a, b) => a - b;

const numbers = [10, 1, 3, 15];
const sortedNumbers = numbers.mySort(compareNumbers);
console.log(sortedNumbers); // Output: [ 1, 3, 10, 15 ]

// example 2
const customers = [
  { id: 1, orders: ['a-1000', 'x-2000', 'c-8000'] },
  { id: 2, orders: ['a-1010'] },
  { id: 3, orders: ['a-1040', 'c-8050'] },
]

const compareOrderLength = (a, b) => a.orders.length - b.orders.length

console.log(customers.mySort(compareOrderLength));

/**
 * [
 *   { id: 2, orders: [ 'a-1010' ] }, 
 *   { id: 3, orders: [ 'a-1040', 'c-8050' ] }, 
 *   { id: 1, orders: [ 'a-1000', 'x-2000', 'c-8000' ] }
 * ]
 */

// example 3
// API Response
let apiRes = ["1", "10", "2", "BLA", "BLA2", "3"]

const isNumeric = (num) => !isNaN(num)

const customCompare = (a, b) => {
    if (isNumeric(a) && !isNumeric(b)) return -1
    if (!isNumeric(a) && isNumeric(b)) return 1
    if (isNumeric(a) && isNumeric(b)) return a - b
    return a < b ? -1 : 1
}

console.log(apiRes.mySort(customCompare));

// [ '1', '2', '3', '10', 'BLA', 'BLA2' ]
