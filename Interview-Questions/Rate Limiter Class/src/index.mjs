import "./styles.css";

document.getElementById("app").innerHTML = `
<div>
    Whenever you expose a web service / api endpoint, you need 
    to implement a rate limiter to prev ent abuse of the service 
    (DOS attacks).
    Implement a Ratelimiter Class with an isAllow method. 
    Every request comes in with a unique cli entID, deny a 
    request if that client has made more than 100 requests in 
    the past second.
  </div>
  <h3>It restricts the number of requests that can be made within a specified time window. </h3
`;

class Ratelimiter {
  constructor(limit, windowInSeconds) {
    // Maximum number of requests allowed in the time window
    this.limit = limit;
    // Time window in seconds
    this.windowInSeconds = windowInSeconds;
    // Object to store requests for each client
    this.requests = {};
  }

  isAllowed(clientId) {
    // Time in seconds
    const timeInSeconds = Math.floor(Date.now() / 1000);
    // Subtract this.windowInSeconds seconds from the current time
    const requestTime = timeInSeconds - this.windowInSeconds;
    // Get all requests made by the client
    // or an empty array if none
    const allRequests = this.requests[clientId] || [];
    // Filter requests within the last time window
    const updatedRequests = allRequests.filter(
      (timestamp) => timestamp > requestTime
    );
    // Check if the client has made more than
    // limit requests in the last time window
    if (updatedRequests.length >= this.limit) return false;

    updatedRequests.push(timeInSeconds);
    this.requests[clientId] = updatedRequests;
    return true;
  }
}

const limiter = new Ratelimiter(3, 1);

// Simulate some requests with a small delay between each request
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    if (limiter.isAllowed("client123")) {
      console.log(`Request ${i + 1} allowed`);
    } else {
      console.log(`Request ${i + 1} denied`);
    }
  }, 300 * i); // Introduce a delay that increases with each iteration
}

