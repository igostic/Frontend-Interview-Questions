// https://www.youtube.com/watch?v=3b35wf3CLeQ&list=PL_KW_uw2ITn84SjTLNQsugTU3hU4_EwLM&index=27&ab_channel=Learnersbucket
// https://learnersbucket.com/examples/interview/polyfill-for-getelementbyclassname/

// Input:
{/* <div class='a' id="root">
  <div class='b' id='b-1'>
    <div class='a' id='a-2'>
      <div class='d' id='d-1'></div>
    </div>
    <div class='c' id='c-1'>
      <div class='a' id='a-3'>
        <div class='d' id='d-2'></div>
      </div>
    </div>
  </div>
</div> */}

const root = document.getElementById('root');
function getElementByClassName(root, targetClass) {
  const search = (node) => {
    let result = [];
    if(node.classList.contains(targetClass))
      result.push(node.id);
    for(let child of node.children){
      const res = search(child);
      result = [...result, ...res]
    }
    return result;
  }
  return search(root);
}

// function getElementByClassName(root, targetClass) {
//   let result = [];
//   console.log(root.classList);
//   if(root.classList.contains(targetClass))
//     result.push(root.id);
//   for(let child of root.children){
//     const res = getElementByClassName(child, targetClass);
//     result = [...result, ...res]
//   }
//   return result;
// }
console.log(getElementByClassName(root, 'a')); // ["root", "a-2", "a-3"]