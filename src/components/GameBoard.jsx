import { useState } from 'react';

export const GameBoard = ({ onInsertLog, board }) => {
	return (
		<ol id='game-board'>
			{board.map((row, rowIndex) => (
				<ol key={rowIndex}>
					{row.map((col, colIndex) => (
						<li key={colIndex}>
							<button
								disabled={col !== null}
								onClick={() => {
									onInsertLog(rowIndex, colIndex);
								}}>
								{col}
							</button>
						</li>
					))}
				</ol>
			))}
		</ol>
	);
};
