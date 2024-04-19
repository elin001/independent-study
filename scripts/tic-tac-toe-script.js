let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        let cell = document.getElementsByClassName('cell')[index];
        cell.innerHTML = ''; // Clear existing content
        let img = document.createElement('img');
        img.src = currentPlayer === 'X' ? 'media/tic-tac.png' : 'media/toe.png';
        cell.appendChild(img);
        if (checkWin()) {
            gameActive = false;
            document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
        } else if (checkDraw()) {
            gameActive = false;
            document.getElementById('message').innerText = `It's a tie!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}


function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return board.every(cell => {
        return cell !== '';
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('message').innerText = '';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}