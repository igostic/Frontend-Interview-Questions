import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

class StreamStats {
  constructor() {
      this.sum = 0;
      this.count = 0;
  }

  addNumbers(num) {
      if (Array.isArray(num)) {
          for (const n of num) {
              this.sum += n;
              this.count++;
          }
      } else {
          this.sum += num;
          this.count++;
      }
      // toFixed() convert to string
      // const average = (this.sum / this.count).toFixed(2);

      // solution 1 parseFloat
      // const average = parseFloat((this.sum / this.count).toFixed(2));

      // solution 2
      const average = Math.round((this.sum / this.count) * 100) / 100;
      return { sum: this.sum, average: average };
  }
}

const streamStats = new StreamStats();

// Add numbers using addNumber with both single values and arrays
console.log(streamStats.addNumbers(10));        // Output: { sum: 10, average: 10 }
console.log(streamStats.addNumbers([20, 30]));   // Output: { sum: 60, average: 20 }
console.log(streamStats.addNumbers([40]));       // Output: { sum: 100, average: 25 }
console.log(streamStats.addNumbers([40,30,20,40]));       // Output: { sum: 100, average: 25 }
console.log(streamStats.addNumbers([10, 20, 30])); // Output: { sum: 60, average: 20 }


// Add an array of numbers to the stream
// console.log(streamStats.addNumbers([40, 50]));    // Output: { sum: 150, average: 30 }
// console.log(streamStats.addNumber(10)); // Output: { sum: 10, average: 10 }
// console.log(streamStats.addNumber(20)); // Output: { sum: 30, average: 15 }
// console.log(streamStats.addNumber(30)); // Output: { sum: 60, average: 20 }
// console.log(streamStats.addNumber(40));