import "./styles.css";
// https://medium.com/@awwfrontend/promise-with-cancel-method-cancellable-promise-b2ca8d7c154
// https://www.youtube.com/watch?v=uYof9JSPpkc&ab_channel=Awwfrontend

const promise = new Promise((res, rej) => setTimeout(rej, 500, 'data'))

function cancellablePromise(promise) {
  let isCancelled = false;

  const promiseObject = new Promise((res, rej) => {
    promise.then(data=> {

      if (!isCancelled) {
        res(data);
      }
    }).catch(err => {

      if (!isCancelled) {
        rej(err);
      }
    })
  })

  promiseObject.cancel = function() {
    isCancelled = true;
  }
  return promiseObject;
}

const newPromise = cancellablePromise(promise);

newPromise.then(console.log);
newPromise.catch(console.log);
// Calling this before promise settlement will stop execution of callbacks passed to then and catch
newPromise.cancel()
