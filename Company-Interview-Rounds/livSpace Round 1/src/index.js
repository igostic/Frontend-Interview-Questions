import "./styles.css";

// sum(1)(2)(3)--->6

// let sum = function (a) {
//   return function (b) {
//     return function (c) {
//       return a + b + c;
//     };
//   };
// };


// let sum = function(a){
//   return function(b){
//     if(b){
//       return sum(a+b);
//     }else
//       return a;
//   }
// }

// console.log(sum(1)(2)(3)(4)());
// let obj={
//   name: 'kapil'
// }
// // const name = "Kapil";
//  let printMessage = function (greet) {
// 	console.log(`${greet} ${this.name}`);
// }
// // call
// printMessage.call(obj, 'Hello')

// // apply
// printMessage.call(obj, ['Hello','Namaste'])
// printMessage('Hello') //----> Hello Kapil ???

// “abc”.split(“b”) ----> [“a”, “c”]		
// 		  ---> [“a$”, “c$”]
let str = "abc"; 
String.prototype.mySplit = function(st){
  // this
  console.log(this, st);
  let res = [];
  for(let i = 0; i < this.length; i++){
    if(this[i] === st)
      continue;
    else{
      let temp = this.[i] + '$'
      res.push(temp);
    }
  }
  return res;
}
console.log(str.mySplit('b'));