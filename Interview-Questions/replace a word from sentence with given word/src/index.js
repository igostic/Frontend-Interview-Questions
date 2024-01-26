import "./styles.css";

// sentence = "my name is sahil, sahil, sahil"
// stringToReplace = "Sahil"
// stringToReplaceWith = "kapoor"
/**
 *
 * @param {string} string1
 * @param {string} string2
 */
function matchCase(string1, string2) {
  let startIndex = 0;
  let newStr = "";
  console.log({ string1, string2 });
  while (startIndex < string2.length) {
    if (startIndex < string1.length) {
      let charInString1 = string1.charAt(startIndex);
      console.log({ charInString1 });
      if (charInString1.toLowerCase() === charInString1) {
        // is lower case
        newStr += string2.charAt(startIndex).toLowerCase();
      } else {
        // uppercase
        newStr += string2.charAt(startIndex).toUpperCase();
      }
    } else {
      newStr += string2.charAt(startIndex);
    }
    startIndex++;
  }
  return newStr;
}

// TC = O(m*n)
// M = length of the string
// n = number of times the stringToReplace is present
/**
 *
 * @param {string} sentence
 * @param {string} stringToReplace
 * @param {string} stringToReplaceWith
 */
function replace(sentence, stringToReplace, stringToReplaceWith) {
  if (!stringToReplace) {
    return sentence;
  }

  let regEx = new RegExp(stringToReplace, "i");
  console.log({ regEx });
  while (sentence.match(regEx)) {
    console.log("check = ", sentence.match(regEx));
    sentence = sentence.replace(
      regEx,
      matchCase(sentence.match(regEx)[0], stringToReplaceWith)
    );
  }
  return sentence;
}
// let str1 = "my name is SAHIl";
// let str2 = "SAHIl";
// let str3 = "kapoor";
// let res = str1.replace(str2, str3);
// console.log(res);
console.log(replace("my name is SAHIl, sAHIL, sahil", "SAHIL", "kapoor"));
// console.log(replace("", "SAHIL", "kapoor"));
// console.log(replace("SAHIlsAHILsahilSAHILLL", "SAHIL", "kapoor"));
// console.log(replace("SAHIlsAHILsahilSAHILLL", "IL", "kapoor"));
// console.log(replace("my name is SAHIl, sAHIL, sahil", "s", "kapoor"));
// console.log()
