import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>TC = O(n)</h1>
<h1>SC = O(1)</h1>

`;

function isPangram(str) {
  // Base Case
  if(str.length < 26){
    return false;
  }
  // Define the alphabet as a string containing all lowercase letters
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
  // Convert the input string to lowercase
  const cleanStr = str.toLowerCase();

  // Initialize a set to store unique characters
  const charSet = new Set();

  // Iterate through the characters of the input string
  for (let i = 0; i < cleanStr.length; i++) {
    const char = cleanStr[i];
    
    // Check if the character is in the alphabet
    if (alphabet.includes(char)) {
      charSet.add(char); // Add it to the set of unique characters
    }
  }

  // Check if the set contains all 26 letters of the alphabet
  return charSet.size === 26;
}


const testString = "The quick brown fox jumps over the lazy dog";
const result = isPangram(testString);
console.log(result);