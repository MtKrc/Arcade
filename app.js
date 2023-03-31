
// Define two objects for players with their names and markers.
const player1 = {
    name: '',
    marker: 'X'
  };
  
  const player2 = {
    name: '',
    marker: 'O'
  };
  
  // Define variables for the current player and game status.
  let currentPlayer;
  let gameStatus;
  

  //Select all the cells in the HTML document with a ".cell"class as well as other relevant elements.

  const cells = document.querySelectorAll('.cell');
  const status = document.querySelector('.game--status');
  const restartButton = document.querySelector('.game--restart');
  const form = document.querySelector('#game--form');
  const startButton = document.querySelector('#game--start');
  const player1Input = document.querySelector('#player1--name');
  const player2Input = document.querySelector('#player2--name');
  

  //Define a function to start the game when the form is submitted with player names.
  function startGame(event) {
    event.preventDefault();
  
    const player1Name = player1Input.value;
    const player2Name = player2Input.value;
  
    if (player1Name && player2Name) {
      player1.name = player1Name;
      player2.name = player2Name;
      currentPlayer = player1;
      gameStatus = new Array(9).fill('');
  
      cells.forEach((cell, index) => {
        cell.addEventListener('click', handleClick, { once: true });
        cell.setAttribute('data-cell-index', index);
      });
  
      setStatus(`${currentPlayer.name}'s turn`);
      form.classList.add('hidden');
    } else {
      alert('Please enter both player names!');
    }
  }

  //Define a function to handle cell clicks during the game.
  function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-cell-index');
  
    if (gameStatus[index] !== '') return;
  
    cell.textContent = currentPlayer.marker;
    gameStatus[index] = currentPlayer.marker;
  
    if (checkWin()) {
      endGame(false);
    } else if (checkDraw()) {
      endGame(true);
    } else {
      switchTurn();
      setStatus(`${currentPlayer.name}'s turn`);
    }
  }
  
  //Define a function to check for a win by comparing the current player's marker with winning positions on the game board.
  function checkWin() {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    return winningPositions.some(position => {
      return position.every(index => {
        return gameStatus[index] === currentPlayer.marker;
      });
    });
  }

  //Define a function to check for a draw by verifying that all cells have been played without a win.
  function checkDraw() {
    return gameStatus.every(cell => {
      return cell !== '';
    });
  }
  
  //Define a function to switch turns between the two players.
  function switchTurn() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
  
  //Define a function to end the game if there is a win or draw.
  function endGame(draw) {
    if (draw) {
      setStatus('Game ended in a draw!');
    } else {
      setStatus(`${currentPlayer.name} wins!`);
    }
  
    cells.forEach(cell => {
      cell.removeEventListener('click', handleClick);
    });
  
    restartButton.classList.remove('hidden');
  }
  
  //Define a function to restart the game.
  function restartGame() {
    cells.forEach(cell => {
      cell.removeEventListener('click', handleClick);
      cell.textContent = '';
    });

  //Define a function to set the game status message displayed on the webpage.
    gameStatus = new Array(9).fill('');
    currentPlayer = undefined;
    restartButton.classList.add('hidden');
    form.classList.remove('hidden');
  }
  
  function setStatus(message) {
    status.textContent = message;
  }
  
  //Add event listeners for the form submission and restart button.
  form.addEventListener('submit', startGame);
  restartButton.addEventListener('click', restartGame);


  // after graded**************************************************
function restartGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
    cell.textContent = '';
  });

  currentPlayer = undefined;
  gameStatus = new Array(9).fill('');
  form.reset();
  startButton.disabled = false;
  restartButton.classList.add('hidden');
  setStatus(`Please enter both player names!`);
}
