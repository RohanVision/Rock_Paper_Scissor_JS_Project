let userScore = 0;
let computerScore = 0;
// HTML elements and constants used in the game
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const reset = document.getElementById('reset');
const scoreboard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result");
const userButton = document.querySelectorAll(".choice");
const choices = ['rck', 'ppr', 'scr'];

// Checking and setting the highest score using localStorage
if (localStorage.getItem('highestScore') === null) {
    localStorage.setItem('highestScore', userScore);
} else {
    document.getElementById('final-score').innerHTML = localStorage.getItem('highestScore');
}

// Function to convert the choice to its corresponding word
function convertToword(letter) {
    if (letter === "rck") return "Rock";
    if (letter === "ppr") return "Paper";
    return "Scissors"
}

// Function to display the game result when the user wins, loses, or draws
function printResult(userChoice, computerChoice, result) {
    const useChoiceImage = choices[userChoice];
    const computerChoiceImage = choices[computerChoice];
    let resultText = '';
    let borderColor = '';

    if (result === "win") {
        resultText = '<span>You Chose <img id="result-image-user" src="../images/' + useChoiceImage + '.png" alt="rock_hand"> which beats  <img id="result-image-comp" src="../images/' + computerChoiceImage + '.png" alt="rock_hand"></span> <br> <span id="result-text">You Win</span>';
        borderColor = 'green-border';
    }
    else if (result === 'lose') {
        resultText = '<span>You Chose <img id="result-image-user" src="../images/' + useChoiceImage + '.png" alt="rock_hand"> which beats  <img id="result-image-comp" src="../images/' + computerChoiceImage + '.png" alt="rock_hand"></span> <br> <span id="result-text">You Lose</span>';
        borderColor = 'red-border';
    }
    else {
        resultText = '<span>You Chose <img id="result-image-user" src="../images/' + useChoiceImage + '.png" alt="rock_hand"> which is equal to  <img id="result-image-comp" src="../images/' + computerChoiceImage + '.png" alt="rock_hand"></span> <br> <span id="result-text">Draw</span>';
        borderColor = 'grey-border';
    }
    document.querySelector('.result').innerHTML = resultText;
    document.querySelector('.result').style.visibility = 'visible';

    const clickedBtnSelector = ".choice[data-attribute=" + useChoiceImage + "]";
    document.querySelector(clickedBtnSelector).classList.add(borderColor);
    setTimeout(() => document.querySelector(clickedBtnSelector).classList.remove(borderColor), 300);
}

// Function to handle the case when it's a draw
function draw(userChoice, computerChoice) {
    const smallUserWord = "User Choosed ";
    const smallCompWord = " Choosed by Computer";
    result_div.innerHTML = `${smallUserWord}${convertToword(userChoice)} equal to ${convertToword(computerChoice)}${smallCompWord} <br/> it's Draw`;
}

// Function to handle the game logic based on user's choice
function game(userChoice, computerChoice) {
    const userChoiceIndex = choices.indexOf(userChoice);

    if (userChoiceIndex > computerChoice) {
        printResult(userChoiceIndex, computerChoice, "win");
        userScore++;
        userScore_span.innerText = userScore;

        if (userScore > localStorage.getItem('highestScore')) {
            setHighestScore();
        }
    } else if (userChoiceIndex < computerChoice) {
        printResult(userChoiceIndex, computerChoice, "lose");
        computerScore++;
        computerScore_span.innerText = computerScore;
    } else {
        printResult(userChoiceIndex, computerChoice, "draw");
    }
}

// Adding event listeners to the user choices buttons
userButton.forEach(btn => {
    btn.addEventListener('click', () => {
        game(btn.getAttribute("data-attribute"), (Math.floor(Math.random() * 3)));
    });
});

// Function to update the highest score in the local storage
function setHighestScore() {
    localStorage.setItem('highestScore', userScore);
    document.getElementById('final-score').innerHTML = userScore;
}

// Event listener for resetting the game scores and result
reset.addEventListener('click', function () {
    userScore_span.innerHTML = 0;
    computerScore_span.innerHTML = 0;
    result_div.innerHTML = '';
    userScore = 0;
    computerScore = 0;
});

