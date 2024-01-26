/**
 * An example of JSON data
 */

// register account
const data = {
  username: "snippetzjs",
  password: "jsru1ez",
  age: 25,
  isPremium: true,
  notifications: ["subscriptions", "likes"]
};

console.log(data);

const serialized = JSON.stringify(data);
// sending to server
console.log(serialized);

// // receiving from server
console.log(JSON.parse(serialized));
