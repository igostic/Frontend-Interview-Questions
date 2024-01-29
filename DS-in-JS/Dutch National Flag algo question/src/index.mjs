function dutchNationalFlag(arr) {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;

  while (mid <= high) {
      if (arr[mid] === 0) {
        let temp = arr[low];
        arr[low] = arr[mid];
        arr[mid] = temp;
        low++;
        // [arr[low], arr[mid]] = [arr[mid], arr[low]];
        mid++;
      } else if (arr[mid] === 1) {
          mid++;
      } else {
        let temp = arr[high];
        arr[high] = arr[mid];
        arr[mid] = temp;
        // [arr[mid], arr[high]] = [arr[high], arr[mid]];
        high--;
      }
  }
  return arr;
}

let myArray = [2, 0, 1, 2, 1, 0];
let sortedArray = dutchNationalFlag(myArray);

console.log(sortedArray); // Output: [0, 0, 1, 1, 2, 2]
