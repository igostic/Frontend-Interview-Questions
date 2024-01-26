const person = {
  name: "Neeraj",
  age: 25,
  gender: "Male"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    return obj[prop];

    // if i want to control the age, if accessed each time increament by 1
    // if (prop === "age") {
    //   Reflect.set(obj, prop, obj[prop] + 1);
    //   return Reflect.get(obj, prop);
    // } else {
    //   return Reflect.get(obj, prop);
    // }
  },
  set: (obj, prop, value) => {
    if (prop === "gender") {
      if (typeof value !== "string") {
        console.log(`The value for ${[prop]} should be a string`);
      } else {
        // Reflect.set(obj, prop, value);
        // or
        obj[prop] = value;
      }
    }

    return true;
  }
});

personProxy.gender = 3;

console.log(personProxy);

personProxy.gender = "3";

console.log(personProxy);

// correct output is this now the one you seeing in codesandbox console log
// The value for gender should be a string
// { name: 'Neeraj', age: 25, gender: 'Male' }
// { name: 'Neeraj', age: 25, gender: '3' }