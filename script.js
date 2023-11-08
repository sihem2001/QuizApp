const questions = [
  {
    question: "How long is a marathon?",
    answers: [
      { text: "42.195 kilometres", correct: true },
      { text: "43.195 kilometres", correct: false },
      { text: "44.195 kilometres", correct: false },
      { text: "46.120 kilometres", correct: false },
    ],
  },

  {
    question: "How many players are there on a baseball team?",
    answers: [
      { text: "10 players", correct: false },
      { text: "13 players", correct: false },
      { text: "8 players", correct: false },
      { text: "9 players", correct: true },
    ],
  },

  {
    question: "which country won the world cup 2022?",
    answers: [
      { text: "Qatar", correct: false },
      { text: "France", correct: false },
      { text: "Argentina", correct: true },
      { text: "Germany", correct: false },
    ],
  },

  {
    question: "What are the two national sports of Canada?",
    answers: [
      { text: "polo and basketball", correct: false },
      { text: "Lacrosse and ice hockey", correct: true },
      { text: "football and basketball", correct: false },
      { text: " polo and ice hockey", correct: false },
    ],
  },

  {
    question: "In which year did Amir Khan win his Olympic boxing medal?",
    answers: [
      { text: "2004", correct: true },
      { text: "2022", correct: false },
      { text: "2003", correct: false },
      { text: "2002", correct: false },
    ],
  },

  {
    question: "What is Muhammad Ali real name?",
    answers: [
      { text: "The Salty Spittoon", correct: false },
      { text: "The S.S. Anne", correct: false },
      { text: "SS Guppy", correct: true },
      { text: "The Invisible Boatmobile", correct: false },
    ],
  },

  {
    question:
      "For which team did Michael Jordan spend most of his career playing?",
    answers: [
      { text: "Los Angeles Lakers", correct: false },
      { text: "Chicago Bulls", correct: true },
      { text: " Indiana Pacers", correct: false },
      { text: "cleveland cavaliers", correct: false },
    ],
  },

  {
    question: "Which swimming style is not allowed in the Olympics?",
    answers: [
      { text: "Dog paddle", correct: true },
      { text: "Butterfly", correct: false },
      { text: "Backstroke", correct: false },
      { text: "Freestyle", correct: false },
    ],
  },

  {
    question: "Which of the following is not a water sport?",
    answers: [
      { text: "Windsurfing", correct: false },
      { text: "Paragliding", correct: true },
      { text: "Cliff diving", correct: false },
      { text: "Rowing", correct: false },
    ],
  },
  {
    question: "Which country has the most Olympic gold medals in swimming?",
    answers: [
      { text: "China", correct: false },
      { text: "The USA", correct: true },
      { text: "The UK", correct: false },
      { text: "Australia", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Try Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
