import "./styles.css";

var intToRoman = function(num) {
  // Define a dictionary that maps Roman numeral 
  // symbols to their corresponding values
  const romanNumerals = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
  };
  // Initialize an empty string to store 
  // the resulting Roman numeral
  let result = ''; 

  // Iterate through the symbols in 
  // descending order of their values
  for (let symbol in romanNumerals) {
      // While the input number is greater 
      // than or equal to the value of the current symbol
      while (num >= romanNumerals[symbol]) {
          // Append the symbol to the result
          result += symbol;
          // Subtract the value of the symbol 
          // from the input number
          num -= romanNumerals[symbol];
      }
  }

  return result;
};
// Example usage:
console.log(intToRoman(3)); // Output: III
console.log(intToRoman(58)); // Output: "LVIII"
console.log(intToRoman(1994)); // Output: "MCMXCIV"


function romanToInt(s) {
  const romanValues = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
  };
  // Initialize the result to 0
  let result = 0; 
  // Initialize previous numeral's value to 0
  let prevValue = 0; 

  for (let i = s.length - 1; i >= 0; i--) {
    // Get current numeral's value
      const currentValue = romanValues[s[i]]; 

      if (currentValue >= prevValue) {
          // If current value is greater than or equal 
          // to previous value, add it to result
          result += currentValue;
      } else {
          // If current value is smaller than previous 
          // value, subtract it from result
          result -= currentValue;
      }
      // Update previous value for next iteration
      prevValue = currentValue; 
  }

  return result;
}


console.log(romanToInt("III")); // Output: 3
console.log(romanToInt("IX")); // Output: 9
console.log(romanToInt("XXIV")); // Output: 24
console.log(romanToInt("MCMXCIV")); // Output: 444
