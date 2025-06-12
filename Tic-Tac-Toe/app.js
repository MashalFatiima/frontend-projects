let boxes = document.querySelectorAll(".box");
let turnX = true;
let newGameButton = document.querySelector("#newGame-btn");
let resetButton = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");;
let msg = document.querySelector("#msg");
let xCounter = document.querySelector("#X-win");
let oCounter = document.querySelector("#O-win");
const winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
count = 0
oWin = 0
xWin = 0
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count=count+1;
        console.log(count);
        if (turnX === true) {
            box.innerText = "X"; }
        else {
            box.innerText = "O"; }
        turnX = !turnX;
        box.disabled = true;
        checkWinner();
        if(count===9) {
           msg.innerText = "Game Draw!";
           msgContainer.classList.remove("hide");
        };
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    boxes.forEach(box => box.disabled = true);
    if(winner==="X") {
        xWin=xWin+1;
        xCounter.innerText = xWin;
    }
    else {
        oWin=oWin+1;
        oCounter.innerText = oWin;
    }
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val!= "" && pos2Val!= "" && pos3Val!= "") {
             if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
             }
        }
    }
};

resetButton.addEventListener("click", () => {
    resetGame();
 });
newGameButton.addEventListener("click", () => {
    newGame();
});

const resetGame = () => {
    xCounter.innerText = 0;
    oCounter.innerText = 0;
    newGame();
};

const newGame = () => {
    turnX = true;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    count=0;
    msgContainer.classList.add("hide");
}
