const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ['Front', 'End', 'JavaScript'];

// "Ultimate <strong>JavaScript</strong> / <strong>FrontEnd</strong> Guide"

// Approach : loop through the 
// string char by char and 
// divide the word at every 
// index in prefix and suffix 
// and check if either prefix 
// or suffix present inside the 
// words if yes wrap complete 
// word in strong tag and 
// keep doing so...

function highlight(str, words) {
  // Create a set of unique 
  // words to be highlighted
  const uniqWords = new Set(words);
  // Split the input string 
  // into an array of words
  const wordsArr = str.split(' ');
  // Map through each word 
  // in the array
  const result = wordsArr.map(word => {
    let output = '';
    // Check if the current 
    // word is in the set of 
    // words to be highlighted
    if (uniqWords.has(word)) {
      // If yes, wrap the 
      // word in <strong> tags
      output += `<strong>${word}</strong>`;
    } else {
      // If not, iterate through 
      // the characters of the word
      for (let i = 0; i < word.length; i++) {
        // Divide the word into 
        // prefix and suffix at 
        // the current character
        const pre = word.slice(0, i + 1);
        const suff = word.slice(i + 1);
        // Check if both prefix and 
        // suffix are in the set 
        // of words to be highlighted
        if (uniqWords.has(pre) && uniqWords.has(suff)) {
          // If yes, wrap the combination 
          //of prefix and suffix in <strong> tags
          output += `<strong>${pre}${suff}</strong>`;
        } else if (uniqWords.has(pre) && !uniqWords.has(suff)) {
          // If only the prefix is in 
          //the set, wrap the prefix 
          // in <strong> tags
          output += `<strong>${pre}</strong>`;
        } else if (!uniqWords.has(pre) && uniqWords.has(suff)) {
          // If only the suffix is 
          // in the set, wrap the 
          // suffix in <strong> tags
          output += `<strong>${suff}</strong>`;
        }
      }
    }
    // If the output is not empty, 
    // return it; otherwise, 
    //return the original word
    return output !== '' ? output : word;
  });

  // Join the modified words 
  // array into a string and return
  return result.join(' ');
}

// Call the highlight function 
// with the provided string and words
const res = highlight(str, words);

// Output the result to the console
console.log('result!', res);


// TC = O(n*w) n = length of 
// inp string and 
// w = length of each word 
// and In the worst case, 
// the inner loop will iterate 
// over the entire word for 
// each word in the string. 
// This means that the 
// overall time complexity 
// of the function is n * w. 
// and SC = O(n)