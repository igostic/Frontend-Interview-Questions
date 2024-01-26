// https://www.youtube.com/watch?v=MHW8tGONRtk&ab_channel=Learnersbucket
// https://learnersbucket.com/examples/interview/remove-cycle-from-the-object-in-javascript/
// Input:
// const List = function(val){
//   this.next = null;
//   this.val = val;
// };

// const item1 = new List(10);
// const item2 = new List(20);
// const item3 = new List(30);

// item1.next = item2;
// item2.next = item3;
// item3.next = item1;

// this form a cycle, if you console.log this you will see a circular object, 
// like, item1 -> item2 -> item3 -> item1 -> so on.

// Output:
// removes cycle
// item1 -> item2 -> item3


const removeCycle = (obj) => {
  //set store
  const store = new WeakSet([obj]);
  
  //recursively detects and deletes the object references
  function helper(obj) {
      for (let key in obj) {
          // if the key is not present in prototye chain
          if (obj.hasOwnProperty(key)) {
              if (typeof obj[key] === 'object'){
                  // if the set has object reference
                  // then delete it
                  if (store.has(obj[key])){ 
                    obj[key] = null
                    // delete obj[key];
                  }
                  else {
                    //store the object reference
                      store.add(obj[key]);
                    //recursively iterate the next objects
                      helper(obj[key]);
                  }
              }
          }
      }
  }
  helper(obj)
}

const List = function(val){
  this.next = null;
  this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;

removeCycle(item1);
console.log(item1);
// this form a cycle, if you console.log this you will see a circular object, 
// like, item1 -> item2 -> item3 -> item1 -> so on.

// Output:
// removes cycle
// item1 -> item2 -> item3