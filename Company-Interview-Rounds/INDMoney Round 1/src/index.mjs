const firebase = {
  firestore() {
    return this
  },
  collection(args){
    return this
  },
  doc(args){
    return this
  },
  where(...args){
    return this
  },
  orderBy(...args) {
    return this
  },
  limit(...args){
    return this
  },
  get() {
    return new Promise((resolve, reject) => resolve([]))
  }
}
  
// var collection1 = firebase.collection()
// var collection2 = firebase.firestore().collection()
  
// console.log(collection1()) // TypeError
// console.log(collection2()) // TypeError
// console.log(firebase.firestore());

firebase
  .firestore()
 .collection('chat')
  .doc('123')
  .collection('sessions')
  .where('status', '==', 'open')
  .orderBy('time', 'desc')
  .limit(10)
  .get()
  .then(data => console.log(data))
  .catch(error => console.error(error));
   
//    const f1 = {
//     firestore: () => {return this;},
//     collection: () => {return this;}
//   } */