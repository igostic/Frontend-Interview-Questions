import "./styles.css";

let progressBarsContainer = document.getElementById("progress-bar-container");
let addBar = document.getElementById("show__btn");

let queue = [];
let maxLimit = 3;
let activeRunningBars = [];

function createProgressBar() {
  let bar = document.createElement("div");
  bar.className = "progress__bar";
  let progress = document.createElement("div");
  progress.className = "myBar";
  bar.appendChild(progress);
  progressBarsContainer.appendChild(bar);
  return progress;
}

function progressBar() {
  if(activeRunningBars.length < maxLimit && queue.length ){
    let progressBarss = queue.shift();
    progressBarss.style.width = "0%";
    activeRunningBars.push(progressBarss);
    let interval = setInterval(function(){
      let currProgress = parseInt(progressBarss.style.width);
      if(currProgress >= 100){
        clearInterval(interval);
        progressBarss.style.width = "100%";
        activeRunningBars.splice(activeRunningBars.indexOf(progressBarss), 1);
        if(queue.length > 0){
          // call progress bar recursively
          progressBar();
        }
      } else{
        // increment one percentage at a time
        currProgress += 10;
        progressBarss.style.width = `${currProgress}%`;
      }
    }, 100)
  }
}
addBar.addEventListener('click', () => {
  console.log("clicked");
  queue.push(createProgressBar());
  progressBar();
})

