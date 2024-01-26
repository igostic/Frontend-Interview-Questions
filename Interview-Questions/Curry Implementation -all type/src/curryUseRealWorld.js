// real world scenario where currying can be used
// DOM Manipulation using currying

// Step 1 => add a h1 tag in html file
{
  /* <h1 id="heading">Hi, I am Neeraj</h1> */
}

// Step 2 =>Function to update the text element

function updateElemText(id) {
  return (content) =>
    (document.querySelector(`#${id}`).textContent = `Hi, I'm ${content}`);
}

// Step 3 => we can call the fucntion updateElemText with
// given id ie Heading and call it again and again to change
// it's content

const updateHeaderText = updateElemText("heading");
updateHeaderText("Raj");
