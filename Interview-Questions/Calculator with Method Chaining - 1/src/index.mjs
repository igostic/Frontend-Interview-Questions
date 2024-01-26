// returning this is crucial because it allows you to keep 
// calling methods on the same instance of the CALC object

// calculator.add(10).subtract(2).divide(2).multiply(5);
// console.log(calculator.total);


// Define a constructor function called CALC
const CALC = function(){
  // Initialize a property called 'total' and set it to 0
  this.total = 0;

  // Define a method called 'add' which takes 
  // a 'val' as an argument
  this.add = (val) => {
    // Add the 'val' to the 'total'
    this.total += val;
    // Return 'this' to allow method chaining
    return this;
  }

  // Define a method called 'subtract' which takes 
  // a 'val' as an argument
  this.subtract = (val) => {
    // Subtract the 'val' from the 'total'
    this.total -= val;
    // Return 'this' to allow method chaining
    return this;
  }

  // Define a method called 'multiply' which takes 
  // a 'val' as an argument
  this.multiply = (val) => {
    // Multiply the 'total' by 'val'
    this.total *= val;
    // Return 'this' to allow method chaining
    return this;
  }

  // Define a method called 'divide' which takes 
  // a 'val' as an argument
  this.divide = (val) => {
    // Divide the 'total' by 'val'
    this.total /= val;
    // Return 'this' to allow method chaining
    return this;
  }

  // Define a method called 'value' which returns 
  // the current value of 'total'
  this.value = () => this.total;
}


const calculator = new CALC();
calculator.add(10).subtract(2).divide(2).multiply(5);
console.log(calculator.total); 