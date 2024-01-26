import "./styles.css";

// https://www.youtube.com/watch?v=0T3Qwtot9D0&ab_channel=Learnersbucket
// https://learnersbucket.com/examples/interview/create-analytics-sdk-in-javascript/
document.getElementById("app").innerHTML = `
<div>
Write an analytics SDK that exposes logEvent, it takes in analytics events and queues them
<li>pass a function sendAnalyticsEvent as a parameter(implement a stub function that resolves in 1 second and fails every n%10 times)</li>
<li>send the next event to sendAnalyticsEvent when only after it resolves</li>
<li>when the failure occurs attempt a retry</li>
</div>
`;

const SDKSystem = function () {
  this.logs = [];
  this.count = 1;

  this.log = function (event) {
    this.logs.push(event);
  };

  this.wait = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.count % 5 === 0) reject();
        resolve();
      }, 1000);
    });
  };

  this.sendAnalyticsEvent = async function () {
    //base condition
    if (this.logs.length === 0) {
      return;
    }
    // getting top log from queue
    const current = this.logs.shift();

    try {
      await this.wait();

      console.log("Logged : ", current);

      this.count++;
    } catch (e) {
      console.log("---------------");
      console.log("Failed : ", current);
      console.log("Retrying : ", current);
      console.log("---------------");

      // reset the counter
      // or ask the interviewer
      this.count = 1;
      // or below one also works
      // but can lead to over flow
      // this.count++;
      this.logs.unshift(current);
    } finally {
      // recursively call same function
      this.sendAnalyticsEvent();
    }
  };
};

const sdk = new SDKSystem();
sdk.log("Event 1");
sdk.log("Event 2");
sdk.log("Event 3");
sdk.log("Event 4");
sdk.log("Event 5");
sdk.log("Event 6");
sdk.log("Event 7");
sdk.log("Event 8");
sdk.log("Event 9");
sdk.log("Event 10");
sdk.log("Event 11");
sdk.log("Event 12");
sdk.sendAnalyticsEvent();
