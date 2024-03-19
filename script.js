document.addEventListener('DOMContentLoaded', function() {
    let operators = ["+", "-", "*"];
    const startBtn = document.getElementById("start-btn");
    const question = document.getElementById("question");
    const controls = document.querySelector(".controls-container");
    const result = document.getElementById("result");
    const submitBtn = document.getElementById("submit-btn");
    const errorMessage = document.getElementById("error-msg");
    const scoreDisplay = document.getElementById("score"); // Score display element
    const timerDisplay = document.getElementById("timer");
    let answerValue;
    let operatorQuestion;
    let currentScore = 0; // Initialize score

    // Initialize and start the game timer
    let startGameTimer=(duration) =>{
        let timer = duration, minutes, seconds;
        function updateTimer() {
            minutes = parseInt(timer / 60, 10);
            seconds = timer % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (--timer < 0) {
                stopGame("Game Over! Time's up."); // End game when timer reaches 0
            } else {
                setTimeout(updateTimer, 1000);
            }
        }
        updateTimer();
    }

    // Random Value Generator
    const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    // Recursively increment score
    function incrementScore(score) {
        if (score < 25) {
            return score + 1; // Increment score by 1
        } else {
            // If score reaches 25, the user wins
            alert("Congratulations! You've won the game!");
            stopGame("Congratulations! You've won the game!");
            return 25; // Return 25 to prevent further increments
        }
    }

    const questionGenerator = () => {
        let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
        let randomOperator = operators[Math.floor(Math.random() * operators.length)];

        if (randomOperator === "-" && num2 > num1) {
            [num1, num2] = [num2, num1];
        }

        let solution = eval(`${num1}${randomOperator}${num2}`);
        let randomVar = randomValue(1, 5);

        if (randomVar === 1) {
            answerValue = num1;
            question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
        } else if (randomVar === 2) {
            answerValue = num2;
            question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
        } else if (randomVar === 3) {
            answerValue = randomOperator;
            operatorQuestion = true;
            question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
        } else {
            answerValue = solution;
            question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
        }

        submitBtn.onclick = checkAnswer;
    };

    let checkAnswer=()=> {
        const userInput = document.getElementById("inputValue").value;
        if (userInput) {
            let correct = operatorQuestion ? userInput === answerValue.toString() : parseInt(userInput, 10) === answerValue;
            if (correct) {
                errorMessage.textContent = "Yippie!! Correct Answer"; // Show correct answer message
                errorMessage.classList.remove("error");
                errorMessage.classList.add("success");
                currentScore = incrementScore(currentScore); // Increment score recursively
                scoreDisplay.textContent = `Score: ${currentScore}`; // Update score display
                if (currentScore < 25) { // Check if the game should continue
                    questionGenerator(); // Generate new question
                }
            } else {
                errorMessage.textContent = "Oops!! Wrong Answer. Try Again!";
                errorMessage.classList.add("error");
                errorMessage.classList.remove("success");
            }
        } else {
            errorMessage.textContent = "Input Cannot Be Empty";
            errorMessage.classList.add("error");
            errorMessage.classList.remove("success");
        }
    };

    startBtn.addEventListener("click", () => {
        currentScore = 0; // Reset score to 0
        scoreDisplay.textContent = "Score: 0"; // Reset score display
        operatorQuestion = false;
        controls.classList.add("hide");
        startBtn.classList.add("hide");
        errorMessage.textContent = "";
        errorMessage.classList.remove("error", "success");
        startGameTimer(180); // Start the timer with 3 minutes
        questionGenerator();
    });

    // Function to stop the game and show results
    const stopGame = (resultText) => {
        result.innerHTML = resultText;
        startBtn.innerText = "Restart";
        controls.classList.remove("hide");
        startBtn.classList.remove("hide");
    };
});

























// document.addEventListener('DOMContentLoaded', function() {
//     let operators = ["+", "-", "*"];
//     const startBtn = document.getElementById("start-btn");
//     const question = document.getElementById("question");
//     const controls = document.querySelector(".controls-container");
//     const result = document.getElementById("result");
//     const submitBtn = document.getElementById("submit-btn");
//     const errorMessage = document.getElementById("error-msg");
//     let answerValue;
//     let operatorQuestion;

//     // Random Value Generator
//     const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//     const questionGenerator = () => {
//         let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
//         let randomOperator = operators[Math.floor(Math.random() * operators.length)];

//         if (randomOperator === "-" && num2 > num1) {
//             [num1, num2] = [num2, num1];
//         }

//         let solution = eval(`${num1}${randomOperator}${num2}`);
//         let randomVar = randomValue(1, 5);

//         if (randomVar === 1) {
//             answerValue = num1;
//             question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
//         } else if (randomVar === 2) {
//             answerValue = num2;
//             question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
//         } else if (randomVar === 3) {
//             answerValue = randomOperator;
//             operatorQuestion = true;
//             question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
//         } else {
//             answerValue = solution;
//             question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
//         }

//         submitBtn.onclick = checkAnswer;
//     };

//     function checkAnswer() {
//         const userInput = document.getElementById("inputValue").value;
//         if (userInput) {
//             let correct = operatorQuestion ? userInput === answerValue.toString() : parseInt(userInput, 10) === answerValue;
//             if (correct) {
//                 errorMessage.textContent = "Yippie!! Correct Answer"; // Display correct answer message
//                 errorMessage.classList.remove("error"); // Optional: Remove error class if present
//                 errorMessage.classList.add("success"); // Optional: Add success class for styling
//                 questionGenerator(); // Generate new question
//             } else {
//                 errorMessage.textContent = "Oops!! Wrong Answer. Try Again!"; // Display wrong answer message
//                 errorMessage.classList.add("error"); // Optional: Add error class for styling
//                 errorMessage.classList.remove("success"); // Optional: Remove success class if present
//             }
//         } else {
//             errorMessage.textContent = "Input Cannot Be Empty"; // Display input empty error message
//             errorMessage.classList.add("error"); // Ensure error styling is applied
//             errorMessage.classList.remove("success"); // Ensure success styling is removed
//         }
//     };

//     startBtn.addEventListener("click", () => {
//         operatorQuestion = false;
//         controls.classList.add("hide");
//         startBtn.classList.add("hide");
//         errorMessage.textContent = ""; // Clear any previous message
//         errorMessage.classList.remove("error", "success"); // Clean up any styling classes
//         questionGenerator(); // Generate the first question
//     });

//     // The stopGame function remains for potential future use
//     const stopGame = (resultText) => {
//         result.innerHTML = resultText;
//         startBtn.innerText = "Restart";
//         controls.classList.remove("hide");
//         startBtn.classList.remove("hide");
//     };
// });
