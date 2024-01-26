// TC and SC = O(n)
function isValidParenthesis(str){
  let stack = [];
  for(let i = 0; i < str.length; i++){
    if(str[i] === "(" || str[i] === "{" || str[i] === "[" ){
      stack.push(str[i]);
    } else{
      if(stack.length === 0)
        return false;
      else if(!isMatching(str[i], stack[stack.length - 1])){
        return false;
      } else{
        stack.pop();
      }
    }
  }
  return stack.length > 0 ? false : true;
}
function isMatching(curr, top){
  return (
    (curr === ")" && top === "(") || 
    (curr === "}" && top === "{") || 
    (curr === "]" && top === "[") 
  )
}

console.log(isValidParenthesis("()")) // true
console.log(isValidParenthesis("()[]{}")) // true
console.log(isValidParenthesis("(){")) // false
console.log(isValidParenthesis("([)]")) // false

// TC and SC = O(n)
function isValidParenthesisMap(str){
  const stack = [];
  const bracketPairs = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  for (const char of str) {
    // Check if the character is 
    // an opening bracket
    if (bracketPairs[char]) {
      stack.push(char);
    } else {
      // Check if there's a matching 
      // opening bracket for the 
      // current closing bracket
      const top = stack.pop();
      if (!top || bracketPairs[top] !== char) {
        return false;
      }
    }
  }

  // Ensure all opening brackets have a matching closing bracket
  return stack.length === 0;
}


console.log(isValidParenthesisMap("()")) // true
console.log(isValidParenthesisMap("()[]{}")) // true
console.log(isValidParenthesisMap("(){")) // false
console.log(isValidParenthesisMap("([)]")) // false
console.log(isValidParenthesisMap("((())")); // false
