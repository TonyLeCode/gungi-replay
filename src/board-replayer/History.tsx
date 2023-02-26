import { useEffect, useRef } from 'react';

function History(props) {
	const ref = useRef(null);
	useEffect(() => {
		if (ref) {
			ref.current.scrollTop = (props.turnNumber - 1) * 32;
		}
	}, [props.turnNumber]);
	return (
		<div className='bg-slate-300 rounded px-2 py-2 w-96 flex flex-col h-[36rem] overflow-auto' ref={ref}>
			{/* <div className='px-6 py-1'>W Turn 1: stockpile 帥 &gt; 7-e-1 (place)</div>
			<div className='px-6 py-1'>B Turn 2: 1-h-4 砲 &gt; 7-h-1 (move)</div>
			<div className='px-6 py-1'>W Turn 3: 8-c-3 馬 &gt; 9-a-1 (b兵) (attack)</div> */}
			{props.turnList.map((turn) => {
				return (
					<button
						key={turn.moveNum}
						className={`text-left px-6 py-1 tracking-wider hover:bg-amber-400 active:bg-amber-600 ${
							turn.moveNum === props.turnNumber ? 'bg-amber-500' : ''
						}`}
						onClick={() => {
							props.setTurnNumber(turn.moveNum);
						}}
					>
						<span className='inline-block w-4 text-right'>{turn.moveNum}</span>{' '}
						<span className='inline-block w-5 ml-1'>{turn.color.toUpperCase()}</span>:{' '}
						<span className='ml-2'>
							{turn.movement} ({turn.moveType})
						</span>
					</button>
				);
			})}
		</div>
	);
}

export default History;
