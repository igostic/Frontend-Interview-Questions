import "./styles.css";

// https://learnersbucket.com/examples/interview/cached-api-call-with-expiry-time/
// https://www.youtube.com/watch?v=3jrfDk9k8rY&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=6&ab_channel=Learnersbucket

const cachedApiCall = (time) => {
  // to cache data
  const cache = {};
  // return a new function
  return async (url, config = {}) => {
    const key = `${url}${JSON.stringify(config)}`; // Generate a unique cache key
    // get the value of the key
    const entry = cache[key]; 
    // if there is no cached data
    // or the value is expired
    // make a new API call
    if(!entry || Date.now() > entry.expiry){
      console.log("Making a fresh api call");
      try {
        // Make the API call
        let resp = await fetch(url, config);
        resp = await resp.json();
        
        // Cache the response with expiration timestamp
        cache[key] = {value: resp, expiry: Date.now() + time};
      } catch(e) {
        console.log("error while making api call", e);
      }
    }
    // Return the cached or fresh response
    return cache[key].value; 
  }  
}

// Example usage:
const call = cachedApiCall(1500);

call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log("1", a));
setTimeout(() => {
  call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log("2", a));
}, 800);
setTimeout(() => {
  call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log("3", a));
}, 1700);
