// // Object.prototype.freeze = function (obj) {
function freeze(obj) {
  // Get an array of all property names of the object
  var props = Object.getOwnPropertyNames(obj);

  // Loop through each property
  for (var i = 0; i < props.length; i++) {
    // Get the property descriptor of the current property
    var desc = Object.getOwnPropertyDescriptor(obj, props[i]);

    // If the property has a value, make it non-writable
    if ("value" in desc) {
      desc.writable = false;
    }

    // Make the property non-configurable
    desc.configurable = false;

    // Define the property with the updated descriptor
    Object.defineProperty(obj, props[i], desc);
  }

  // Prevent adding new properties to the object
  return Object.preventExtensions(obj);
}

const myObject = {
  prop1: "value1",
  prop2: {
    nestedProp1: "nestedValue1",
    nestedProp2: "nestedValue2"
  }
};

// Object.freeze(myObject);
freeze(myObject);

// myObject.prop1 = "new value"; // This change will not take effect
// myObject.prop3 = "value3"; // This will not throw an error
// delete myObject.prop2; // This will not throw an error
console.log(myObject);
// delete myObject.prop2.nestedProp1; // will be deleted as its nested property
// console.log(myObject);

var obj = {
  name: "neeraj"
};

obj.name = "John";
console.log(Object.isExtensible(obj));
// true

Object.preventExtensions(obj);

// obj.url = "https://johnresig.com/"; // Exception in strict mode

console.log(Object.isExtensible(obj));
// false

// Example Implementation:

Object.defineProperties = function (obj, props) {
  for (var prop in props) {
    Object.defineProperty(obj, prop, props[prop]);
  }
};
// // Example Usage:

obj = {};

Object.defineProperties(obj, {
  value: {
    value: true,
    writable: false
  },
  name: {
    value: "John",
    writable: false
  }
});

// Property descriptors (and their associated methods) is probably the most important new feature of ECMAScript 5. It gives developers the ability to have fine-grained control of their objects, prevent undesired tinkering, and maintaining a unified web-compatible API.

// New Features
// Building on top of these new additions some interesting new features have been introduced into the language.

// The following two methods are very useful for collecting arrays of all the properties on an object.

// Object.keys(obj);

// Returns an array of strings representing all the enumerable property names of the object. This is identical to the method included in Prototype.js.

// Example Implementation:

Object.keys = function (obj) {
  var array = new Array();
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      array.push(prop);
    }
  }
  return array;
};

// Example Usage:

obj = { name: "John", url: "https://johnresig.com/" };

console.log(Object.keys(obj).join(", "));
// // name, url
Object.getOwnPropertyNames(obj);

// Nearly identical to Object.keys but returns all property names of the object (not just the enumerable ones).

// An implementation isn’t possible with regular ECMAScript since non-enumerable properties can’t be enumerated. The output and usage is otherwise identical to Object.keys.

// Object.create( proto, props )

// Creates a new object whose prototype is equal to the value of proto and whose properties are set via Object.defineProperties( props ).

// A simple implementation would look like this (requires the new Object.defineProperties method).

// Example Implementation: (by Ben Newman)

Object.create = function (proto, props) {
  var ctor = function (ps) {
    if (ps) Object.defineProperties(this, ps);
  };
  ctor.prototype = proto;
  return new ctor(props);
};

// Other implementation:

Object.create = function (proto, props) {
  var obj = new Object();
  obj.__proto__ = proto;

  if (typeof props !== "undefined") {
    Object.defineProperties(obj, props);
  }

  return obj;
};

// Note: The above code makes use of the Mozilla-specific __proto__ property. This property gives you access to the internal prototype of an object – and allows you to set its value, as well. The ES5 method Object.getPrototypeOf allows you to access this value but not set its value – thus the above method cannot be implement in a generic, spec-compatible, manner.

// I discussed Object.getPrototypeOf previously so I won’t bother discussing it again here.

// Example Usage:

function User() {}
User.prototype.name = "Anonymous";
User.prototype.url = "http://google.com/";

var john = Object.create(new User(), {
  name: { value: "John", writable: false },
  url: { value: "http://google.com/" }
});

// console.log((john.name);
// // John

// john.name = "Ted"; // Exception if in strict mode
// Object.seal(obj);
// Object.isSealed(obj);

// Sealing an object prevents other code from deleting, or
// changing the descriptors of, any of the object’s properties
// – and from adding new properties.

// Example Implementation:

Object.seal = function (obj) {
  var props = Object.getOwnPropertyNames(obj);
  for (var i = 0; i < props.length; i++) {
    var desc = Object.getOwnPropertyDescriptor(obj, props[i]);
    desc.configurable = false;
    Object.defineProperty(obj, props[i], desc);
  }
  return Object.preventExtensions(obj);
};
