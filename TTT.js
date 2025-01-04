let boxes = document.querySelectorAll(".clickers");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let main = document.querySelector("main");
let turnO = true; //playerX, playerO
let count = 0; //To Track Draw
let reset = document.querySelector(".reset");
let newg = document.querySelector(".new");
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.classList.add("color");
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.classList.remove("color");
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  main.classList.add("hide");

  disableBoxes();
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  main.classList.add("hide");
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

reset.addEventListener("click", () => {
  turnO = true;
  count = 0;
  msgContainer.classList.add("hide");
  main.classList.remove("hide");
  enableBoxes();
});

newg.addEventListener("click", () => {
  turnO = true;
  count = 0;

  enableBoxes();
});
