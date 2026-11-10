// ==============================
// DNA WORLD — JAVASCRIPT
// ==============================

// 1. ТЕСТ ПО ДНК

const questions = [
  {
    question: "ДНҚ дегеніміз нені білдіреді?",
    answers: [
      "Дезоксирибонуклеин қышқылы",
      "Динамикалық нуклеин қышқылы",
      "Домалақ нуклеин қышқылы",
    ],
    correct: 0,
  },

  {
    question: "ДНҚ молекуласы қандай формада болады?",
    answers: ["Бір тізбекті", "Қос тізбекті", "Домалақ"],
    correct: 1,
  },

  {
    question: "ДНҚ-ның ішінде неше азотты негіз бар?",
    answers: ["2", "3", "4"],
    correct: 2,
  },

  {
    question: "Аденин қандай азотты негізбен қосылады?",
    answers: ["Гуанин", "Тимин", "Цитозин"],
    correct: 1,
  },

  {
    question: "ДНҚ адамның қай жерінде орналасқан?",
    answers: ["Ядрода", "Мембранада", "Цитоплазмада"],
    correct: 0,
  },

  {
    question: "Ақпаратты тасымалдайтын ДНҚ бөлімі қалай аталады?",
    answers: ["Ген", "Орган", "Ми"],
    correct: 0,
  },

  {
    question: "Гуанин қандай азотты негізбен қосылады?",
    answers: ["Аденин", "Тимин", "Цитозин"],
    correct: 2,
  },

  {
    question: "ДНҚ-ны кім ашқан?",
    answers: ["Ньютон", "Уотсон және Крик", "Дарвин"],
    correct: 1,
  },

  {
    question: "ДНҚ нені сақтайды?",
    answers: ["Энергияны", "Тұқымқуалаушы ақпаратты", "Қоректі"],
    correct: 1,
  },

  {
    question: "ДНҚ неден тұрады?",
    answers: ["Нуклеотидтерден", "Аминқышқылдарынан", "Майлардан"],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const quiz = document.querySelector(".quiz");

  quiz.innerHTML = `
        <h2>ДНҚ бойынша тест 🧬</h2>

        <div class="progress">
            Сұрақ ${currentQuestion + 1} из ${questions.length}
        </div>

        <h3 id="question">
            ${questions[currentQuestion].question}
        </h3>

        <div id="answers"></div>

        <p id="result"></p>
    `;

  const answersBox = document.getElementById("answers");

  questions[currentQuestion].answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent = answer;

    button.onclick = () => checkQuizAnswer(index);

    answersBox.appendChild(button);
  });
}

function checkQuizAnswer(index) {
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach((button) => {
    button.disabled = true;
  });

  const correct = questions[currentQuestion].correct;

  if (index === correct) {
    score++;

    buttons[index].style.background = "#00c853";
    buttons[index].style.color = "white";
  } else {
    buttons[index].style.background = "#e53935";
    buttons[index].style.color = "white";

    buttons[correct].style.background = "#00c853";
    buttons[correct].style.color = "white";
  }

  const result = document.getElementById("result");

  result.textContent =
    index === correct ? "Дұрыс! Жарайсың! 🎉" : "Тупойсыңба? Дұрыс емес.";

  const next = document.createElement("button");

  next.textContent =
    currentQuestion === questions.length - 1
      ? "Нәтижені қарау"
      : "Келесі сұрақ →";

  next.onclick = nextQuestion;

  document.querySelector("#answers").appendChild(next);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  const quiz = document.querySelector(".quiz");

  let message = "";

  if (score >= 9) {
    message = "Өте жақсы! 100 балл 🧬";
  } else if (score >= 6) {
    message = "Жақсы! Жетерліктей білесің!";
  } else if (score >= 4) {
    message = "Жаман емес! Тағы оқу керек!";
  } else {
    message = "полный 0, 50 балл!";
  }

  quiz.innerHTML = `
        <h2>Тест аяқталды! 🎉</h2>

        <div class="final-score">
            ${score} / ${questions.length}
        </div>

        <p>${message}</p>

        <button onclick="restartQuiz()">
            Қайта өту ↻
        </button>
    `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  showQuestion();
}

// 2. АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document
  .querySelectorAll(".about, .structure, .facts, .quiz, .card, .fact-box")
  .forEach((element) => {
    element.classList.add("hidden");

    observer.observe(element);
  });

// 3. ЗАПУСК ТЕСТА

showQuestion();
