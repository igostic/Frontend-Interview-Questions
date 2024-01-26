import "./styles.css";

// 0, 1, 1, 2, 3, 5, 8, 13

// TC = O(2^n)
// This is because it uses the call stack 
// to keep track of the recursive calls. 
// The maximum depth of the call stack is 
// proportional to the input n.
// SC = O(n)
function fibonacci(n){
  if(n <= 1)
    return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

// TC = O(n)
// SC = O(n)
function fibonacciSequence(n, memo = {}){
  if (n <= 1) {
    return n;
  }
  if (memo[n]) {
    // console.log("from memoized", memo[n]);
    return memo[n];
  }

  memo[n] = fibonacciSequence(n - 1, memo) + 
    fibonacciSequence(n - 2, memo);
  return memo[n];
};

function fibonacciDP(n) {
  if (n <= 1) {
    return n;
  }

  // we need n + 1 bcz
  // we have numbers from
  // 0 to n
  let dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  console.log(dp);
  return dp[n];
}

console.log(fibonacci(5));
// console.log(fibonacci(6));
// console.log(fibonacci(7));
console.log(fibonacciSequence(5));
// console.log(fibonacciSequence(6));
// console.log(fibonacciSequence(7));

console.log(fibonacciDP(5));
// console.log(fibonacciDP(7));
