let user = document.querySelector("#Human-Score");
let comp = document.querySelector("#Computer-Score");
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const resetBtn = document.querySelector("#reset");
let userScore = 0;
let compScore = 0;

const msgPlay = () => {
    setTimeout(() => {
        enableChoices(true);
        msg.innerText= "Play Your Move";
        msg.style.backgroundColor= "#c05299";
    }, 2000);
};

const enableChoices = (enable) => {
    choices.forEach( (choice) => {
        choice.style.opacity = enable ? "1" : "0.6";
        choice.style.cursor = enable ? "pointer" : "not-allowed";
        choice.style.pointerEvents = enable ? "auto" : "none";
    });
};

const generateCompChoice = () => {
    const options = ["Rock","Paper","Scissor"];
    const randIndex = Math.floor(Math.random() * 3);
    return options[randIndex];
};

const drawGame = () => {
    msg.innerText = "Game Draw! Play Again."
    msg.style.backgroundColor = "#ffa62b";
    msgPlay();
};

const userWin = (userChoice,compChoice) => {
    userScore+=1;
    user.innerText = userScore;
    msg.innerText = `You Win! ${userChoice} beats ${compChoice}.`;
    msg.style.backgroundColor = "#6a994e";
    msgPlay();
};

const compWin = (compChoice,userChoice) => {
    compScore+=1;
    comp.innerText = compScore;
    msg.innerText = `You Lose! ${compChoice} beats ${userChoice}.`;
    msg.style.backgroundColor = "#e63946";
    msgPlay();
};

const playGame = (userChoice) => {
    enableChoices(false);
    const compChoice = generateCompChoice();
    if(userChoice === compChoice) {
        drawGame();
    }
    else{
        if( (userChoice === "Paper" && compChoice === "Rock") ||
            (userChoice === "Rock" && compChoice === "Scissor") ||
           (userChoice === "Scissor" && compChoice === "Paper")
          ) {
            userWin(userChoice,compChoice);
        }
        else {
            compWin(compChoice,userChoice);
        }
    }
};

choices.forEach( (choice) => {
    choice.addEventListener("click", () => {
        const  userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", () => {
     comp.innerText = 0;
     user.innerText = 0;
});