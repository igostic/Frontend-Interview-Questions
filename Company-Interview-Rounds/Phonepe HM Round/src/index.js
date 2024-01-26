import "./styles.css";

function uniqueRandomAry(start, end) {
  let range = end - start + 1;
  console.log(range);
  let res = [];
  let mp = {};
  let counter = 0;
  while (range > 0) {
    counter++;
    let generateNumber = Math.floor(Math.random() * (end - start + 1) + start);
    if (!mp[generateNumber]) {
      mp[generateNumber] = 1;
      res.push(generateNumber);
      range--;
    }
  }
  return { res, counter };
}

console.log(uniqueRandomAry(2, 9));

// function uniqueRandomAry(start, end){
//     let range = end - start + 1;
//     console.log(range)
//     let res = [];
//     let mp = {};
//     while(range > 0){
//         while(true){
//             let generateNumber = Math.floor(Math.random() * (end - start + 1) + start)
//             if(mp[generateNumber])
//                 continue;
//             else{
//                 mp[generateNumber] = 1;
//                 res.push(generateNumber);
//                 range--;
//                 break;
//             }
//         }
//     }
//     return res;
// }

// console.log(uniqueRandomAry(1,6));
