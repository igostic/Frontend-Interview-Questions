// https://learnersbucket.com/examples/interview/localstorage-with-expiry/
// https://www.youtube.com/watch?v=ENTl51PsLM8&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=31&ab_channel=Learnersbucket

// Extend the local storage to accept an expiry 
// time and expire the entry after that time.


window.myLocalStorage = {
  // Custom method to set an item with an expiry time
  setItem: (key, value, expiryTime) => {
    // Calculate the expiry timestamp
    let res = {
      value,
      expiryTime: Date.now() + expiryTime
    };
    // Store the item in localStorage after converting it to a JSON string
    localStorage.setItem(key, JSON.stringify(res));
  },
  // Custom method to get an item and check its expiry time
  getItem: (key) => {
    // Retrieve the item from localStorage
    let data = localStorage.getItem(key);
    // Parse the JSON data
    data = JSON.parse(data);
    // Check if the item has expired
    if (data.expiryTime <= Date.now()) {
      // If expired, remove the item from localStorage
      localStorage.removeItem(key);
      return null; // Return null to indicate the item has expired
    }
    // If not expired, return the value of the item
    return data.value;
  },
  // Custom method to remove an item from localStorage
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  // Custom method to clear all items from localStorage
  clear: () => {
    localStorage.clear();
  }
}

// Set 'bar' on 'foo' that will expire after 1000 milliseconds
myLocalStorage.setItem('foo', 'bar', 1000);

// Retrieve and log the value of 'foo'
console.log(myLocalStorage.getItem('foo'));

// After a delay of 1001 milliseconds...
setTimeout(() => {
  // Try to retrieve 'foo' again (which should now be expired)
  console.log(myLocalStorage.getItem('foo'));
}, 1001);

