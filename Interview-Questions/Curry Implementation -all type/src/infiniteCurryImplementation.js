// sum(1)(2)(3)(4)(5)(6)(7)()

const infinteCurry = (a) => {
  return (b) => {
    if (b) return infinteCurry(a + b);
    else return a; // this contains commulative sum of all arguments
  };
};

// console.log("infinteCurry -->>>", infinteCurry(1)(2)(3)(4)());

//  version 2
// add(1,2..n)(3,4...n)()
function addInfinite(...args) {
  let a = args.reduce((acc, cur) => acc + cur, 0);
  return (...args) => {
    let b = args.reduce((acc, cur) => acc + cur, 0);
    if (b) return addInfinite(a + b);
    else return a;
  };
}

// console.log("infinteCurry add --->>", addInfinite(1, 2, 3)(4, 5)(6)());
