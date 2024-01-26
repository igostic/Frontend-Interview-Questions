// with apply
Function.prototype.myBind = function (...args) {
  // 'this' refers to the function
  // on which myBind is called
  // 'callback' will hold the
  // original function
  let callback = this;

  // 'params' will hold any additional
  // arguments passed to myBind
  // Using slice instead of splice to create a copy
  let params = args.slice(1);

  // Return a new function
  return function (...args2) {
    // 'args2' will hold arguments passed
    // when the bound function is called

    // 'callback.apply()' sets 'this'
    // context and passes arguments
    callback.apply(args[0], [...params, ...args2]);
  };
};

Function.prototype.myBind1 = function (scope, ...args) {
  scope.fn = this;
  return function (...args2) {
    return scope.fn(...args, ...args2);
  };
};

Function.prototype.myCall = function (scope, ...args) {
  if (typeof this !== "function") {
    new Error(this + "not callable");
  }
  // Temporarily associates the original function
  // with the fn property on the scope object.
  scope.fn = this;
  // Invokes the function with the ...args as
  // arguments, and since it is accessed
  // through the fn property, the this
  // context is set to scope.
  scope.fn(...args);
};

Function.prototype.myApply = function (scope, args) {
  if (typeof this !== "function") {
    new Error(this + "not callable");
  }
  if (Array.isArray(args)) new TypeError("not an array....");

  scope.fn = this;
  scope.fn(...args);
};

function greet(greeting) {
  console.log(`${greeting} ${this.name}`);
}

let person = {
  name: "John",
};

// greet.myApply(person, ["Hello"]); // Output: "Hello John"
greet.myCall(person, "Hello");
