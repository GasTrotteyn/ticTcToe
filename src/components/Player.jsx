import { useState } from 'react';

export const Player = ({ initialPlayer, selected, onChangeNames }) => {
	const [isEditing, setEditing] = useState(false);
	const [value, setValue] = useState(initialPlayer.name);

	const handleEditingClick = () => {
		if (isEditing) {
			onChangeNames({ symbol: initialPlayer.symbol, name: value });
		}
		setEditing((ed) => !ed);
	};

	const playerName = isEditing ? (
		<input
			type='text'
			required
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
			}}></input>
	) : (
		<span className='player-name'>{value}</span>
	);

	return (
		<li className={selected ? 'active' : undefined}>
			<span className='player'>
				{playerName}
				<span className='player-symbol'>{initialPlayer.symbol}</span>
			</span>
			<button onClick={handleEditingClick}>{isEditing ? 'save' : 'edit'}</button>
		</li>
	);
};
