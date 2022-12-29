//Displays the game status
const statusDisplay = document.querySelector('.game--status');

// is Game finished or not
let gameActive = true;

// Storing the player
let currentPlayer = 'X';

let gameTime = document.querySelector('.game--time');

// current game state easy to track played cells 
let gameState = ['', '', '', '', '', '', '', '', ''];



// creating messages dynamicly
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;



//Functions for stopwatch and duration
let startTime, endTime, running, duration = 0;

function gameStart() {
  if (running) return;
  running = true;
  startTime = new Date().getSeconds();
  displayTime = 0;
  gameTime.innerHTML = `Stopwatch started at: ${displayTime}`;
}

function gameStop() {
  if (!running) return;
  running = false;
  endTime = new Date().getSeconds();
  const seconds = endTime - startTime;
  duration += seconds;
  gameTime.innerHTML = (`Stopwatch stopped. Duration: ${duration} seconds`);
}

function gameReset() {
  startTime = null;
  endTime = null;
  running = false;
  duration = 0;
  gameTime.innerHTML = `Stopwatch reset to: ${duration}`;
}





// Message for inform whos turn is

statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Update the played cell in game and UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}


//winner check data
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if(a === '' || b === '' || c === '') {
            continue;
        }

        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        gameStop();
        return;
    }

    // Check for the draw
    let roundDraw = !gameState.includes('');
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        gameStop();
        return;
    }
    

    // If no one won or there is a cell clickable continue the game
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    // Store the clicked cell in variable
    const clickedCell = clickedCellEvent.target;

    // clicked cell index parsed to integer
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    // check the cell is clicked or game is paused or ended

    if(gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    //If everything in order we will proceed the game flow
    gameStart();
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
    gameReset();
}


// Event listeners for button and cell

document.querySelectorAll('.cell').forEach(cell => addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);