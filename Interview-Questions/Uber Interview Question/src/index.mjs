import "./styles.css";

function createTaskManager() {
    class Task {
        // Properties of a Task
        dependencies;
        job;
        currentDependencyCount;
        isCompleted;
        subscribedList;

        // Constructor to initialize a Task
        constructor(dependencies = [], job) {
            // Initialize list for subscribed callbacks
            this.subscribedList = [];

            // Filter out dependencies that are already completed
            this.dependencies = dependencies ? dependencies.filter(dependency => !dependency.isCompleted) : [];

            // Initialize dependency count and job function
            this.currentDependencyCount = this.dependencies.length;
            this.job = job;

            // Set initial completion status and process the job
            this.isCompleted = false;
            this.processJob();
        }

        // Process the job associated with the task
        processJob() {
            if (this.dependencies && this.dependencies.length) {
                // Subscribe to each dependency's trackDependency method
                for (let dependency of this.dependencies) {
                    dependency.subscribe(this.trackDependency.bind(this));
                }
            } else {
                // If no dependencies, execute the job immediately
                this.job(this.done.bind(this));
            }
        }

        // Track a dependency's completion
        trackDependency() {
            this.currentDependencyCount--;

            // If all dependencies are completed, execute the job
            if (this.currentDependencyCount === 0) {
                this.job(this.done.bind(this));
            }
        }

        // Subscribe a callback to the task's completion
        subscribe(cb) {
            this.subscribedList.push(cb);
        }

        // Mark the task as completed and trigger subscribed callbacks
        done() {
            this.isCompleted = true;
            for (const callback of this.subscribedList) {
                callback();
            }
        }
    }

    return {
        createTask: function(dependencies, job) {
            return new Task(dependencies, job);
        }
    };
}

const taskManager = createTaskManager();

const processA = taskManager.createTask(null, (done) => {
    setTimeout(() => {
        console.log('Process A');
        done();
    }, 100);
});

const processB = taskManager.createTask(null, (done) => {
    setTimeout(() => {
        console.log('Process B');
        done();
    }, 1500);
});

const processC = taskManager.createTask(null, (done) => {
    setTimeout(() => {
        console.log('Process C');
        done();
    }, 1000);
});

const processD = taskManager.createTask([processA, processB], (done) => {
    setTimeout(() => {
        console.log('Process D');
        done();
    }, 1000);
})

const processE = taskManager.createTask([processC, processD], (done) => {
    setTimeout(() => {
        console.log('Process E');
        done();
    }, 100);
});

const createAllDoneInstance = (allDoneCallback) => taskManager.createTask([processA, processB, processC, processD, processE], allDoneCallback);

createAllDoneInstance((done) => {
    console.log('All is done!');
    done();
});



document.getElementById("app").innerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager Explanation</title>
</head>
<body>
    <div>
        <h2>Explanation:</h2>
        <ol>
            <li><code>class Task { ... }</code>: Defines a class named Task to encapsulate a task with its dependencies and job.</li>
            <li><code>dependencies; job; currentDependencyCount; isCompleted; subscribedList; </code>: Declares the properties of a Task including dependencies, job function, dependency count, completion status, and a list of subscribed callbacks.</li>
            <li><code>constructor(dependencies = [], job) { ... }</code>: Constructor method to initialize a Task. It accepts an array of dependencies and a job function.</li>
            <li><code>this.dependencies = dependencies ? ... : [];</code>: Filters out completed dependencies and sets the initial list of dependencies.</li>
            <li><code>this.currentDependencyCount = this.dependencies.length;</code>: Initializes the current dependency count based on the number of dependencies.</li>
            <li><code>this.job = job;</code>: Assigns the provided job function to the task.</li>
            <li><code>this.isCompleted = false;</code>: Sets the initial completion status to false.</li>
            <li><code>this.processJob();</code>: Calls the processJob method to start processing the task.</li>
            <li><code>this.subscribedList = [];</code>: Initializes an empty list to store subscribed callbacks.</li>
            <li><code>processJob() { ... }</code>: Method to process the job associated with the task.</li>
            <li><code>if (this.dependencies && this.dependencies.length) { ... }</code>: Checks if there are dependencies.</li>
            <li><code>for (let dependency of this.dependencies) { ... }</code>: Loops through each dependency.</li>
            <li><code>dependency.subscribe(this.trackDependency.bind(this));</code>: Subscribes to each dependency's trackDependency method.</li>
            <li><code>else { ... }</code>: Executes if there are no dependencies.</li>
            <li><code>this.job(this.done.bind(this));</code>: Executes the job function immediately.</li>
            <li><code>trackDependency() { ... }</code>: Method to track a dependency's completion.</li>
            <li><code>subscribe(cb) { ... }</code>: Method to subscribe a callback to the task's completion.</li>
            <li><code>done() { ... }</code>: Method to mark the task as completed and trigger subscribed callbacks.</li>
            <li><code>const processA = new Task(...);</code>: Creates an instance of Task named processA with a job function that logs "Process A".</li>
            <li><code>const processB = new Task(...);</code>: Creates an instance of Task named processB with a job function that logs "Process B".</li>
            <li><code>const processC = new Task(...);</code>: Creates an instance of Task named processC with a job function that logs "Process C".</li>
            <li><code>const processD = new Task(...);</code>: Creates an instance of Task named processD with dependencies on processA and processB, and a job function that logs "Process D".</li>
            <li><code>const processE = new Task(...);</code>: Creates an instance of Task named processE with dependencies on processC and processD, and a job function that logs "Process E".</li>
            <li><code>const createAllDoneInstance = (allDoneCallback) => ...</code>: Defines a function that creates a task named createAllDoneInstance with dependencies on all previous tasks, and a job function that logs "All is done!".</li>
            <li><code>createAllDoneInstance((done) => { ... });</code>: Calls createAllDoneInstance with a callback function that logs "All is done!". When executed, this triggers the completion of all tasks.</li>
        </ol>
        <pre>
            <p>-----Output------</p>
            Process A 
            Process C 
            Process B 
            Process D 
            Process E 
            All is done! 
        </pre>
    </div>
</body>
</html>
`
;



