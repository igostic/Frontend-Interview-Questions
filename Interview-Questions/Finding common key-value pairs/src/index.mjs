function findCommonKeyValuePairs(obj1, obj2) {
  const commonPairs = {};

  for (const key in obj1) {
      if (obj2.hasOwnProperty(key)) {
          const val1 = obj1[key];
          const val2 = obj2[key];

          if (typeof val1 === 'object' && typeof val2 === 'object') {
              commonPairs[key] = findCommonKeyValuePairs(val1, val2);
          } else if (val1 === val2) {
              commonPairs[key] = val1;
          }
      }
  }

  return commonPairs;
}

const obj1 = { a: 1, b: { x: 2, y: 3 }, c: [4, 5, 6] };
const obj2 = { b: { x: 2, y: 3 }, d: [7, 8, 9], a: 1 };

const commonPairs = findCommonKeyValuePairs(obj1, obj2);

console.log(commonPairs);
