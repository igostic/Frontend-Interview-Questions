function debounceWithImmediate(func, wait, immediate) {
  let timeout;
  return function (...args) {
    // Capture the current context
    // for setTimeout func
    const context = this;
    // Determine whether to call the
    // func now? if Immediate = true
    // & not already in a timeout
    // the answer is yes
    const callNow = immediate && !timeout;
    // Clear the previous timeout
    // to start a new one
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      // Inside the cb func clear timeout
      // var which will let next execution
      // run when in immediate mode
      timeout = null;
      // If not in immediate mode,
      // call the original function now
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    // If in immediate mode, call
    // the original function now
    if (callNow) {
      func.apply(context, args);
    }
  };
}

let inpSearch = document.getElementById("search");
function handleSearch(event) {
  console.log(event.target.value);
}
let debounceSearch = debounceWithImmediate(handleSearch, 1000, false);
// inpSearch.addEventListener("keyup", handleSearch);
inpSearch.addEventListener("keyup", debounceSearch);
