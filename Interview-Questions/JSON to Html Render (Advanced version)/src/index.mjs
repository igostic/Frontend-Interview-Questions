import "./styles.css";

/*
<div class="category">
  <h2>HTML</h2>
  <div class="question">
    <h3>Stopwatch</h3>
  </div>
  <div class="question">
    <h3>Tic Tac Toe</h3>
  </div>
</div>
*/

const QUESTIONS_API_BASE_URL = `https://www.algoexpert.io/api/fe/questions`;
const SUBMISSIONS_API_BASE_URL = `https://www.algoexpert.io/api/fe/submissions`;


fetchAndAppendQuestions();
async function fetchAndAppendQuestions () {
  const [questions, submissions ]= await fetchQuestionsAndSubmissions();
  const questionsByCategory = getQuestionsByCategory(questions);
  const submissiosById = getSubmissionsById(submissions);
  const app = document.getElementById('app');
  for (const [category, questions] of Object.entries(questionsByCategory)) {
    const categoryDiv = createCategory(category, questions, submissiosById);
    app.append(categoryDiv);
  }
}

function createCategory(category, questions,submissiosById ) {
  const categoryDiv = document.createElement ('div');
  categoryDiv.classList.add('category');
  const h2 = document.createElement ('h2');
  h2.textContent = category;
  categoryDiv.append(h2);
  let correctCount = 0;
  questions.forEach(question => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    const status = document.createElement('div');
    status.classList.add('status');
    // not needed as we are not putting css fro now
    let statusClass;
    if(submissiosById && submissiosById[question.id])
      statusClass = submissiosById[question.id].toLowerCase().replace("_", "-");
    else {
      statusClass = "unattemepted";
    }
    status.classList.add(statusClass);
    questionDiv.append(status);
    if(submissiosById && submissiosById[question.id] === "CORRECT")
      correctCount++;
    const h3 = document.createElement('h3');
    h3.textContent = question.name;
    questionDiv.append(h3);
    categoryDiv.append(questionDiv);
  });
  h2.textContent = `${category} - ${correctCount}/${questions.length}`;
  return categoryDiv;
}

async function fetchQuestionsAndSubmissions(){
  const [questionsRes, submissionsRes] = await Promise.all([
    fetch(QUESTIONS_API_BASE_URL),
    fetch(SUBMISSIONS_API_BASE_URL)]);
  return await Promise.all([questionsRes.json(), submissionsRes.json()]);
}


function getQuestionsByCategory (questions) {
  const questionsByCategory = {};
  questions.forEach(question => {
    if (questionsByCategory.hasOwnProperty (question.category)) {
      questionsByCategory[question.category].push(question);
    } else {
      questionsByCategory[question.category] = [question];
    }
  });
  return questionsByCategory;
}

function getSubmissionsById(submissions) {
  const submissionsById = {};
  submissions.forEach(submission => {
    submissionsById[submission.questionId] = submission.status;
  });
  return submissionsById;
}