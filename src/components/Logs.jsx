export const Logs = ({ turns }) => {
	return (
		<ol id='log'>
			{turns.map((turn) => (
				<li key={turn.square.row + ':' + turn.square.col}>
					{turn.player} marcó el {turn.square.row + ':' + turn.square.col}
				</li>
			))}
		</ol>
	);
};
