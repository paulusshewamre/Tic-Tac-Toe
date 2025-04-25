const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status-text');
const restartBtn = document.querySelector('#restart-btn');

const winningConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
]

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');
    if (options[cellIndex] !== "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for(let i=0;i < winningConditions.length; i++){
        const condition = winningConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if( cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if( cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
    }else if(!options.includes("")){
        statusText.textContent = "Draw!";
        running = false;
    }else{
        changePlayer();
    }
}




function restartGame(){
    currentPlayer = 'X';
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = "");
    running = true;
}