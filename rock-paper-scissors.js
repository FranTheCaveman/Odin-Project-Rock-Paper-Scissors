const maxChoice = 3;

function getComputerChoice() {
    let choiceNum = Math.floor(Math.random() * maxChoice);

    switch (choiceNum) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
} 

function getHumanChoice() {
    return prompt("Rock, paper, or scissors?");
};

function playRound(humanChoice, computerChoice) {
    hc = humanChoice.toLowerCase();

    console.log("Human: " + humanChoice);
    console.log("Computer: " + computerChoice);

    if (hc === computerChoice) {
        console.log("You have tied!");
        return "tie";
    }
    else if ((hc === "rock" && computerChoice === "scissors") ||
             (hc === "paper" && computerChoice === "rock") ||
             (hc === "scissors" && computerChoice === "paper")) {
        console.log("You Won! " + humanChoice + " beats " + computerChoice + ".");
        return "win";
    }
    else if ((hc === "paper" && computerChoice === "scissors") ||
             (hc === "scissors" && computerChoice === "rock") ||
             (hc === "rock" && computerChoice === "paper")) {
        console.log("You Lose! " + computerChoice + " beats " + hc + ".");
        return "lose";
    }
    else {
        console.log("Invalid input.");
        return "invalid";
    }   
}

function playGame() {
    const rounds = 5;
    let roundsRemaining = rounds;
    
    let humanScore = 0;
    let computerScore = 0;

    while (roundsRemaining > 0) {
        console.log("### Round "+ (rounds+1 - roundsRemaining) +" ###");
        let result = playRound(getHumanChoice(), getComputerChoice());
        switch(result) {
            case "tie":
                roundsRemaining--;
                break;
            case "win":
                humanScore++;
                roundsRemaining--;
                break;
            case "lose":
                computerScore++;
                roundsRemaining--;
                break;
            case "invalid":
                continue;
        }
    }

    console.log("Game Over! Human: " + humanScore + " | Computer: " + computerScore); 
}

// playGame();