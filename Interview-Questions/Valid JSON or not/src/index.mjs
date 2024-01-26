import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

const jsonString1 = '{"name":"John","age":30,"city":"New York"}';
const jsonString2 = 'invalid json string';
const jsonString3 = '{"prop_1": "val_1", "prop_2": "val_2"}';
const jsonString4 = '{"prop_1": val_1, "prop_2": "val_2"}';
const jsonString5 = 4;
function isJSON(str) {
  try {
      JSON.parse(str);
      return true;
  } catch (e) {
      return false;
  }
}


console.log(isJSON(jsonString1));
console.log(isJSON(jsonString2));
console.log(isJSON(jsonString3));
console.log(isJSON(jsonString4));
console.log(isJSON(jsonString5));