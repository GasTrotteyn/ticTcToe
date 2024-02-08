import { useState } from 'react';

import { Player } from './components/Player';
import { GameBoard } from './components/GameBoard';
import { Logs } from './components/Logs';
import { GameOver } from './components/GameOver';

const INITIAL_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

const INITIAL_PLAYERS = {
	X: { name: 'Player 1', symbol: 'X' },
	O: { name: 'Player 2', symbol: 'O' },
};

const derivedCurrentPlayer = (turnsArray) => {
	let currentSymbol = 'X';
	if (turnsArray.length > 0 && turnsArray[0].player === 'X') {
		currentSymbol = 'O';
	}
	return currentSymbol;
};

const winnerType = (boardList, turnslength, players) => {
	let winner = false;
	//corroborar si hay ganador por fila
	for (const row of boardList) {
		if (row[0] && row[0] === row[1] && row[0] === row[2]) {
			winner = {
				type: 'fila',
				symbol: row[0],
				player: players[row[0]].name,
			};
		}
	}
	//corroborar si hay ganador por columna
	const firstRow = boardList[0];
	for (let i = 0; i < 3; i++) {
		if (firstRow[i] && firstRow[i] === boardList[1][i] && firstRow[i] === boardList[2][i]) {
			winner = { type: 'columna', symbol: firstRow[i], player: players[firstRow[i]].name };
		}
	}

	//corrobaorar si hay ganador por diagonales
	if (
		boardList[0][0] &&
		boardList[0][0] === boardList[1][1] &&
		boardList[0][0] === boardList[2][2]
	) {
		winner = { type: 'diagonal 1', symbol: boardList[0][0], player: players[boardList[0][0]].name };
	}
	if (
		boardList[0][2] &&
		boardList[0][2] === boardList[1][1] &&
		boardList[0][2] === boardList[2][0]
	) {
		winner = { type: 'diagonal 2', symbol: boardList[0][2], player: players[boardList[0][2]].name };
	}

	//corroborar si es empate

	if (turnslength === 9 && !winner) {
		winner = { type: `It is a draw!`, symbol: 'Nobody' };
	}
	return winner;
};

const derivedBoard = (turns) => {
	const currentBoard = [...INITIAL_BOARD.map((arr) => [...arr])];

	for (const turn of turns) {
		currentBoard[turn.square.row][turn.square.col] = turn.player;
	}
	return currentBoard;
};

function App() {
	const [turns, setTurns] = useState([]);
	const [playerNames, setPlayerNames] = useState(INITIAL_PLAYERS);

	const currentBoard = derivedBoard(turns);

	const hasWinner = winnerType(currentBoard, turns.length, playerNames);

	const currentSymbol = derivedCurrentPlayer(turns);

	const handleInsertLog = (rowIndex, colIndex) => {
		setTurns((prevTruns) => {
			let player = derivedCurrentPlayer(prevTruns);

			const updatedTruns = [
				{ square: { row: rowIndex, col: colIndex }, player: player },
				...prevTruns,
			];
			return updatedTruns;
		});
	};

	const handleReMatch = () => {
		setTurns([]);
	};

	const handleChangePlayerNames = (updatedPlayer) => {
		setPlayerNames((prev) => {
			const newPlayers = { ...prev };
			newPlayers[updatedPlayer.symbol].name = updatedPlayer.name;
			return newPlayers;
		});
	};

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initialPlayer={INITIAL_PLAYERS.X}
						selected={currentSymbol === 'X'}
						onChangeNames={handleChangePlayerNames}
					/>
					<Player
						initialPlayer={INITIAL_PLAYERS.O}
						selected={currentSymbol === 'O'}
						onChangeNames={handleChangePlayerNames}
					/>
				</ol>
				{hasWinner && <GameOver winner={hasWinner} onRematch={handleReMatch} />}
				<GameBoard onInsertLog={handleInsertLog} board={currentBoard} />
			</div>
			<Logs turns={turns} />
		</main>
	);
}

export default App;
