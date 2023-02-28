import { useState } from 'react';
import { createNewBoard } from '../helpers/board';

interface Turn {
	color: 'b' | 'w';
	moveNum: number;
	moveType: string | null;
	movement: string | null;
}

function HistoryInput(props) {
	const [value, setValue] = useState('');

	function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setValue(e.target.value);
	}
	function onClick() {
		const split = value.split('\n').map((turn) => {
			const regexp = /(.)\s+turn\s+(\d+):\s+(.+)/;
			const match = turn.match(regexp);

			if (match == null) {
				return null;
			}
			if (match[1] !== 'b' && match[1] !== 'w') {
				return null;
			}

			const obj: Turn = { color: match[1], moveNum: Number(match[2]), moveType: null, movement: null };

			const regexp2 = /.+(?=\()/;

			if (match[3].includes('place')) {
				obj.moveType = 'place';
				obj.movement = match[3].match(regexp2)[0].trim();
			} else if (match[3].includes('ready')) {
				obj.moveType = 'ready';
			} else if (match[3].includes('stack')) {
				obj.moveType = 'stack';
				obj.movement = match[3].match(regexp2)[0].trim();
			} else if (match[3].includes('move')) {
				obj.moveType = 'move';
				obj.movement = match[3].match(regexp2)[0].trim();
			} else if (match[3].includes('attack')) {
				obj.moveType = 'attack';
				obj.movement = match[3].match(regexp2)[0].trim();
			}
			// console.log(match)
			return obj;
		});
		if (split == null) {
			console.log('nulled: ', split);
			props.setBoard(createNewBoard())
			props.setTurnNumber(0)
			props.setTurnList([]);
		} else if (
			split.every((turn) => {
				return turn != null && turn.moveNum != null && turn.color != null && turn.moveType != null;
			})
		) {
			console.log('yep');
			props.setBoard(createNewBoard())
			props.setTurnNumber(0)
			props.setTurnList(split);
		} else {
			console.log(split);
			console.log('nup');
		}
	}

	return (
		<div className='flex flex-col items-center gap-4'>
			<textarea
				className='bg-slate-300 px-8 py-2 leading-8'
				cols={35}
				rows={10}
				value={value}
				onChange={(e) => {
					onChange(e);
				}}
			></textarea>
			<div className='flex gap-4 mb-[12rem]'>
				<button
					className='border-amber-500 hover:border-amber-400 border text-amber-600 hover:text-black active:text-black hover:bg-amber-400 active:bg-amber-600 px-6 py-1'
					onClick={() => {
						setValue('');
					}}
				>
					clear
				</button>
				<button className='bg-amber-500 hover:bg-amber-400 active:bg-amber-600 px-6 py-1' onClick={onClick}>
					set
				</button>
			</div>
		</div>
	);
}

export default HistoryInput;
