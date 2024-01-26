import "./styles.css";

// function dnsImplementation(args) {
//   let obj = {}
//   let res = []
//   args.forEach((ele) => {
//       if(ele[0].toUpperCase() === 'PUT'){
//         obj[ele[1]] = ele[2];
//       }else if(ele[0].toUpperCase() === 'GET'){
//         if(obj[ele[1]])
//           res.push(obj[ele[1]])
//         else
//           res.push('404');
//       }else if(ele[0].toUpperCase() === 'COUNT'){
//         let cnt = 0;
//         for(let key in obj){
//           if(key.includes(ele[1]))
//             cnt++;
//         }
//         res.push(cnt.toString())
//       }
//   })
//   console.log(res);
// }

// dnsImplementation([
//   ["PUT", "phonepe.com", "1.1.1.1"],
//   ["PUT", "www.phonepe.com", "1.1.1.2"],
//   ["PUT", "google.com", "10.10.10.10"],
//   ["COUNT", "com"],
//   ["COUNT", "phonepe.com"],
//   ["COUNT", "www.phonepe.com"],
// ])

function formatter(input) {
  // Your code here
  const parents = input.filter((arr) => arr.parent === -1);
  const findChild = (id) => input.find((arr) => arr.id === id);
  console.log(parents, findChild);
  const output = parents.map((parent) => {
    parent.children.forEach((child) => {
      parent.children = [...parent.children, ...findChild(child).children];
    });
    return {
      id: parent.id,
      children: parent.children
    };
  });
  console.log("hetre", output);
}

let input = [
  {
    title: "Engineering",
    id: 1,
    children: [2, 3],
    parent: -1
  },
  {
    title: "Dev",
    id: 2,
    children: [4, 5],
    parent: 1
  },
  {
    title: "QA",
    id: 3,
    children: [],
    parent: 1
  },
  {
    title: "FE",
    id: 4,
    children: [],
    parent: 2
  },
  {
    title: "BE",
    id: 5,
    children: [6],
    parent: 2
  }
];

console.log(formatter(input));
