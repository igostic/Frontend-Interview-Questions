import "./styles.css";

const promises = [
    { status: 'resolve', priority: 4 },
    { status: 'reject', priority: 1 },
    { status: 'resolve', priority: 2 },
    { status: 'reject', priority: 3 }
];

function promiseWithPriprity(promises) {
    promises = promises.sort((a, b) => a.priority - b.priority)
    console.log(promises);
    return new Promise((resolve, reject) => {
        promises.forEach(element => {
            if (element.status === 'resolve')
                resolve(element)
        });
        reject('All promises rejected');
    })
}

promiseWithPriprity(promises)
    .then(res => console.log(res))
    .catch(err => console.log(err))