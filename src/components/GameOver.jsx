export const GameOver = ({ winner, onRematch }) => {
	return (
		<div id='game-over'>
			<h2>Game over!</h2>
			<p>
				{winner.symbol} won by {winner.type}{' '}
				{winner.type !== 'It is a draw!' ? `y se llama: ${winner.player}` : null}
			</p>
			<p>
				<button onClick={onRematch}>Rematch!</button>
			</p>
		</div>
	);
};
