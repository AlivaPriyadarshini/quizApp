protectPage();

const totalQuestions = localStorage.getItem("totalQuestions") || 0;
const quizScore = localStorage.getItem("quizScore") || 0;

document.getElementById("totalQuestions").textContent = totalQuestions;
document.getElementById("correctAnswers").textContent = quizScore;
document.getElementById("scoreText").textContent = `${quizScore} / ${totalQuestions}`;