protectPage();

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = "";

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  selectedAnswer = "";

  const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressFill.style.width = `${progressPercent}%`;

  currentQuestion.options.forEach(function (option) {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;

    button.addEventListener("click", function () {
      document.querySelectorAll(".option-btn").forEach(function (btn) {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
      selectedAnswer = option;
    });

    optionsContainer.appendChild(button);
  });

  if (currentQuestionIndex === quizData.length - 1) {
    nextBtn.textContent = "Submit";
  } else {
    nextBtn.textContent = "Next";
  }
}

nextBtn.addEventListener("click", function () {
  if (selectedAnswer === "") {
    alert("Please select an answer before continuing.");
    return;
  }

  if (selectedAnswer === quizData[currentQuestionIndex].correct) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    localStorage.setItem("quizScore", score);
    localStorage.setItem("totalQuestions", quizData.length);
    window.location.href = "result.html";
  }
});

loadQuestion();