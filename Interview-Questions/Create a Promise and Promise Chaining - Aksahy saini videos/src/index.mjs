// example from Akshay Saini

const cart = ["shoes", "pants", "kurta"];

createOrder(cart) // orderId
.then(function (orderId) {
  console.log (orderId);
  return orderId;
})
.catch(err => console.log(err.message))
.then(function (orderId) {
  // we can write like this too
  // but this way we get into promise hell
  // return proceedToPayment (orderId).then(function (paymentInfo) {
  //   console.log(paymentInfo);
  // })

  // bettwe way is 
  return proceedToPayment (orderId);
  })
.then(function (paymentInfo) {
    console.log(paymentInfo);
})
// .then(function(){
//   console.log("it will be called no matter what happens")
// })
.catch(err => console.log(err.message))


// Producer
function createOrder (cart) {
  return new Promise(function (resolve, reject) {
    // createOrder 
    // validateCart
    // orderId
    if (!validateCart (cart)) {
      const err = new Error("Cart is not valid");
      reject (err);
    }
    // logic for createOrder
    const orderId = "123";
    if (orderId) {
      setTimeout(function () {
        resolve (orderId);
      }, 2000);
    }
  });
}

function proceedToPayment(orderId) {
  return new Promise( function(resolve, reject) {
    if(orderId){
      resolve("Payment Successful");
    }else {
      reject(new Error("Payment Unsuccessful"));
    }
    // const err = new Error("Payment Unsuccessful")
    // reject(err);
  })
}
function validateCart(cart) {
  return false;
}

// If I want to enter into my subsequent .then() methods even their is reject in any promise
// in current scenario our catch is at last, so if any reject occurs that means it
// will catch it
// but if I don't want that then i can put my catch like this

// createOrder(cart) // orderId
// .then(function (orderId) {
//   console.log (orderId);
//   return orderId;
// })
// .catch(err => console.log(err.message))
// .then(function (orderId) {
//   // we can write like this too
//   // but this way we get into promise hell
//   // return proceedToPayment (orderId).then(function (paymentInfo) {
//   //   console.log(paymentInfo);
//   // })

//   // bettwe way is 
//   return proceedToPayment (orderId);
//   }).then(function (paymentInfo) {
//     console.log(paymentInfo);
// })


// this means that where .catch() method defined it will catch the errors in the upward 
// direction means only catch the errors from .then() methods behind above to it
// and below .then() methods will be called no matter if it resolves or rejects
