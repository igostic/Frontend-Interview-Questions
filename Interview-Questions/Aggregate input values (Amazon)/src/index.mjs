// https://learnersbucket.com/examples/interview/aggregate-the-input-values/
// https://www.youtube.com/watch?v=tvvCFeBr1bY&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=34&ab_channel=Learnersbucket

// Aggregate the Input values

// Given multiple input elements with different names and values inside a wrapper. Aggregate the values of the input on the names.

// Input:
{/* <form id="parent">
	<input type="text" name="a.c" value="1"/>
	<input type="text" name="a.b.d" value="2"/>
  <input type="text" name="a.b.e" value="3"/>
</form>  */}

// Output:
// {
//   "a": {
//     "c": "1",
//     "b": {
//       "d": "2",
//       "e": "3"
//     }
//   }
// }

const solution = (id) => {
  // Get the parent element containing the form
  const parent = document.getElementById(id);

  // Get all input elements within the form
  const inputs = parent.querySelectorAll("input");

  // Initialize an empty object to hold the aggregated values
  const output = {};
  
  // Loop through each input element
  inputs.forEach((e) => {
    const { name, value } = e; // Get the name and value of the input
    
    const pathsArr = name.split("."); // Split the name into an array of keys
    
    let temp = output; // Initialize a temporary variable to traverse the output object
    
    pathsArr.forEach((p, index) => {
      if (!(p in temp)) {
        temp[p] = {};
      }

      if (index === pathsArr.length - 1) {
        temp[p] = value;
      }

      temp = temp[p]; // Move deeper into the object
    });
  });
  
  return output; // Return the aggregated object
}

// Example usage: Call the solution function with the ID "parent"
console.log(solution("parent"));

