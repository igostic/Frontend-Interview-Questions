import "./styles.css";
// https://medium.com/@awwfrontend/latest-data-fetcher-promise-javascript-67425d774ed3
// https://www.youtube.com/watch?v=x3ACDYAzGqI&ab_channel=Awwfrontend


// Consider a use case where you have been asked to 
// design a search bar that should always fetch and 
// show the latest search results to the user. 
// This becomes a problem because we do not have 
// control over API response time.

// Let’s say a user wants to type abcd and you have 
// a key-down event handler that fires an API call 
// on each keystroke.

// So, an API call will be fired when the user hits a .
// Another API call will be fired when the user hits ab .
// Another API call will be fired when the user hits abc .
// Similarly for each keystroke.

// It is possible that the response to the API call for 
// data ab may resolve after abc . And thus we will 
// end up showing stale search results to the user.

// const getRandomTime = () => Math.floor(Math.random() * 1000)

// const getRandomData = (data) => {
//   return new Promise((res, rej) => {
//       setTimeout(res, getRandomTime(), data)
//   })
// }

// getRandomData('a').then(console.log)
// getRandomData('ab').then(console.log)
// getRandomData('abc').then(console.log)
// getRandomData('abcd').then(console.log)

// output
  // abc
  // abcda
  // ab
  // a

  // order of print is not the same as the original 
  // order of function call and if we this function 
  // as it is, we will end up showing the wrong data 
  // to the user.

  const getRandomTime = () => Math.floor(Math.random() * 1000)

  const getRandomData = (data) => {
    return new Promise((res, rej) => {
        setTimeout(res, getRandomTime(), data)
    })
  }
  
  const latestDataFetcher = (dataFetcher) => {
    let lastRequestData;
  
    return (data) => {
      lastRequestData = data;
  
      return new Promise((res, rej) => {
        dataFetcher(data).then(result => {
          if (data === lastRequestData) {
            res(result)
          }
        }).catch(error => {
          if (data === lastRequestData) {
            rej(error)
          }
        })
      })
    }
  }
  
  const dataFetcher = latestDataFetcher(getRandomData);
  
  dataFetcher('a').then(console.log)
  dataFetcher('ab').then(console.log)
  dataFetcher('abc').then(console.log)
  dataFetcher('abcd').then(console.log)