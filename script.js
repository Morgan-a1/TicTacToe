const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],

	[0, 4, 8],
	[2, 4, 6]
];

const cellElements = document.querySelectorAll(".cell");
const board = document.getElementById('board');

const winningMessageElement = document.getElementById('winning_msg');
const restartButton = document.getElementById('restart_btn');

const winningMessageTextElement =
	document.querySelector('[data-winning-message-text]');
let circleTurn = 1 & (Math.random() * 100); // one or zero

startGame();

function startGame() {
	restartButton.addEventListener('click', startGame);
	cellElements.forEach(cell => {
		cell.classList.remove(X_CLASS)
		cell.classList.remove(CIRCLE_CLASS)
		cell.removeEventListener('click', handleClick)
		cell.addEventListener('click', handleClick, { once: true })
	});
	setBoardHoverClass();
	winningMessageElement.classList.remove('show');
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	}
	else if (isDraw()) {
		endGame(true);
	}
	else {
		circleTurn = !circleTurn;
		setBoardHoverClass();
	}
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = 'Draw';
	}
	else if (circleTurn) {
		winningMessageTextElement.innerText = "O's Wins!";
	}
	else {
		winningMessageTextElement.innerText = "X's Wins";
	}
	circleTurn = !circleTurn;
	winningMessageElement.classList.add('show');
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(X_CLASS) ||
		cell.classList.contains(CIRCLE_CLASS)
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function setBoardHoverClass () {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
	}
	else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}
