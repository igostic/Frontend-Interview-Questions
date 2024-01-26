function randomBool() {
  return Math.random() < 0.5
}

const LATENCY = 1000;

function mockServer(data) {
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY

    setTimeout(() => {
      if (randomBool()) {
        resolve(data);
      } else {
        reject('Error!')
      }
    }, randomTimeout)
  })
}

mockServer('test').then(res => {
  console.log('res!', res)
}).catch(err => {
  console.log('error!', err)
})