// Game Board Module
const GameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const setCell = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker;
        return true;
      }
      return false;
    };
  
    const reset = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, setCell, reset };
  })();
  
  // Game Controller Module
  const GameController = (() => {
    let currentPlayer = "X";
    let gameOver = false;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    };
  
    const getCurrentPlayer = () => currentPlayer;
  
    const checkWinner = () => {
      const b = GameBoard.getBoard();
      const wins = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diagonals
      ];
  
      for (let combo of wins) {
        const [a, b1, c] = combo;
        if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
          gameOver = true;
          return b[a];
        }
      }
  
      if (!b.includes("")) {
        gameOver = true;
        return "Draw";
      }
  
      return null;
    };
  
    const isGameOver = () => gameOver;
  
    const reset = () => {
      gameOver = false;
      currentPlayer = "X";
      GameBoard.reset();
    };
  
    return { getCurrentPlayer, switchPlayer, checkWinner, isGameOver, reset };
  })();
  
  // Display Controller Module
  const DisplayController = (() => {
    const boardElement = document.getElementById("board");
    const messageElement = document.getElementById("message");
    const restartBtn = document.getElementById("restart");
  
    const renderBoard = () => {
      boardElement.innerHTML = "";
      const board = GameBoard.getBoard();
      board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => handleMove(index));
        boardElement.appendChild(cellDiv);
      });
    };
  
    const handleMove = (index) => {
      if (GameController.isGameOver()) return;
  
      const marker = GameController.getCurrentPlayer();
      if (GameBoard.setCell(index, marker)) {
        const result = GameController.checkWinner();
        if (result) {
          messageElement.textContent = result === "Draw" ? "It's a Draw!" : `${result} wins!`;
        } else {
          GameController.switchPlayer();
          messageElement.textContent = `${GameController.getCurrentPlayer()}'s turn`;
        }
        renderBoard();
      }
    };
  
    restartBtn.addEventListener("click", () => {
      GameController.reset();
      messageElement.textContent = `${GameController.getCurrentPlayer()}'s turn`;
      renderBoard();
    });
  
    // Initial render
    renderBoard();
    messageElement.textContent = `${GameController.getCurrentPlayer()}'s turn`;
  })();
  