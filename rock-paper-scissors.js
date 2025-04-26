const maxChoice = 3;

function getComputerChoice() {
    let choiceNum = Math.floor(Math.random() * maxChoice);

    switch (choiceNum) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
} 

function toggleVisibility(element, displayType) {
    const computedStyle = window.getComputedStyle(element).display;
    if (computedStyle === "none") {
        element.style.display = displayType;
    } 
    else {
        element.style.display = "none";
    }
}

let buttons = document.querySelectorAll('.selection-buttons > button');
let buttonsDiv = document.querySelector('.selection-buttons');

let humanHand = document.querySelector('div .human > img');
let computerHand = document.querySelector('div .computer > img');

let results = document.querySelector('.results > p');
let resultsHeader = document.querySelector('.results + h1');

let humanPointsElement = document.querySelector('#humanPoints');
let computerPointsElement = document.querySelector('#computerPoints');

let humanPoints = 0;
let computerPoints = 0;

let playAgainButton = document.createElement("button");
playAgainButton.setAttribute("class", "game-choice");
playAgainButton.innerHTML = "<h2>Yes</h2>";

function gameOver(winner) {
    buttons.forEach((button) => toggleVisibility(button, "flex"));

    if (winner === "Human") {
        humanHand.setAttribute("src", "thumbs.png");
        humanHand.setAttribute("style", "transform: scaleY(-1)");
    }
    else if (winner === "Computer") {
        humanHand.setAttribute("src", "thumbs.png");
    }

    results.textContent = "Game over! " + winner + " wins!";
    resultsHeader.textContent = "Play again?";

    buttonsDiv.appendChild(playAgainButton);

    playAgainButton.addEventListener("click", (event) => {
        // simply refresh the page to reset data
        window.location.reload();
    });
}

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // add a lil cooldown so players dont click too fast
        buttons.forEach((button) => button.disabled = true); // Disable the buttons

        let humanChoice = button.id;
        let computerChoice = getComputerChoice();

        // set human hand to choice
        humanHand.setAttribute("src", humanChoice+".png")
        
        // set computer hand to its choice
        computerHand.setAttribute("src", computerChoice+".png")

        playRound(humanChoice, computerChoice);

        if (humanPoints === 5) {
            gameOver("Human");
        }

        else if (computerPoints === 5) {
            gameOver("Computer");
        }

        else if (humanPoints < 5 && computerPoints < 5) {
            // after 1/2 second set hands back to deciding animation
            setTimeout(() => {
                humanHand.setAttribute("src", "rpshand.gif");
                computerHand.setAttribute("src", "rpshand.gif");
            }, 500);
        }

        setTimeout(() => {
            buttons.forEach((button) => button.disabled = false); // Re-enable after cooldown
        }, 500);
    });
});

function playRound(humanChoice, computerChoice) {
    console.log("Human: " + humanChoice);
    console.log("Computer: " + computerChoice);

    if (humanChoice === computerChoice) {
        results.textContent = "You have tied in this round!";
    }
    else if ((humanChoice === "Rock" && computerChoice === "Scissors") ||
             (humanChoice === "Paper" && computerChoice === "Rock") ||
             (humanChoice === "Scissors" && computerChoice === "Paper")) {
        results.textContent = "You won this round! " + humanChoice + " beats " + computerChoice + ".";
        humanPoints++;
        humanPointsElement.textContent = humanPoints+" points";
    }
    else {
        results.textContent = "You lose this round! " + computerChoice + " beats " + humanChoice + ".";
        computerPoints++;
        computerPointsElement.textContent = computerPoints+" points";
    }
}