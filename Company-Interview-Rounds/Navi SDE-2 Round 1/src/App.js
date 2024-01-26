// import Todos from "./components/todos";
// import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {/* <Todos/> */}
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const promise1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("1");
      resolve("1");
    }, 3000);
  });
};

const promise2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("2");
      resolve("2");
    }, 3000);
  });
};

const promise3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("3");
      resolve("3");
    }, 3000);
  });
};

const promise4 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("4");
      resolve("4");
    }, 3000);
  });
};

const promise5 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("5");
      resolve("5");
    }, 3000);
  });
};

//make many many requests
// server has a rate limit
// it should work exactly as promise.all except it should take one more argument
// batchlimit and process only batchlimit promises at once

const promiseBatch = (promises, batchlimit) => {
  const res = [];
  const batchByLimit = (batchlimitSize) => {
    return Promise.all(batchlimitSize.map((pr) => pr()));
  };
  // defininig a func to executive it
  let idx = 0;
  const executeBatch = () => {
    const batchlimitSize = promises.slice(idx, idx + batchlimit);
    // incrementing the index by batchlimit
    idx += batchlimit;
    if (batchlimitSize.length > 0) {
      // execute the batch promises
      return batchByLimit(batchlimitSize).then((batches) => {
        res.push(...batches);
        // call recursively
        return executeBatch();
      });
    }

    return Promise.resolve(res);
  };
  executeBatch();
};

promiseBatch([promise1, promise2, promise3, promise4, promise5], 2);

// // 15-20 minutes

// // Function.prototype.batchAll
// const batchAll = () => {
//   console.log("hello");
// };

// Object.setPrototypeOf(Promise, batchAll);

// Promise.batchAll();
