import { useEffect, useState } from 'react';
import Board from './Board';
import HistoryInput, { Turn } from './HistoryInput';
import History from './History';
import { Move, createNewBoard, makeMove, parse, unmakeMove } from '../helpers/board';
import Pagination from './Pagination';
import { useImmer } from 'use-immer';

function BoardReplayer() {
	const [board, setBoard] = useImmer(createNewBoard());
	// console.log(board);
	const [turnList, setTurnList] = useState<Turn[]>([]);
	const [turnNumber, setTurnNumber] = useState(0);
	const [autoplay, setAutoplay] = useState(false);
	const [intervalValue, setIntervalValue] = useState(1000);

	function next() {
		if (turnNumber < turnList.length) {
			setTurnNumber((state) => {
				return state + 1;
			});
			const moveType = turnList[turnNumber].moveType
			const movement = turnList[turnNumber].movement
			if(moveType == null){return}
			if(movement == null){return}
			const move:Move|null = parse(moveType, movement);
			if(move == null){return}
			// console.log(move)
			const newMoves = makeMove(board, move, turnList[turnNumber].color);
			// console.log('new move', newMove)
			if (newMoves != null) {
				setBoard((draft) => {
					newMoves.forEach((newMove) => {
						if(newMove.coords[0] == null || newMove.coords[1] == null){return}
						draft[newMove.coords[0]][newMove.coords[1]] = newMove.newSquare;
					});
				});
			}
		}

	}
	function prev() {
		if (turnNumber > 0) {
			setTurnNumber((state) => {
				return state - 1;
			});
			const moveType = turnList[turnNumber - 1].moveType
			const movement = turnList[turnNumber - 1].movement
			if(moveType == null){return}
			if(movement == null){return}
			const move:Move|null = parse(moveType, movement);
			if(move == null){return}
			// console.log('move', move)
			const newMoves = unmakeMove(board, move, turnList[turnNumber - 1].color);
			if (newMoves != null) {
				setBoard((draft) => {
					newMoves.forEach((newMove) => {
						if(newMove.coords[0] == null || newMove.coords[1] == null){return}
						draft[newMove.coords[0]][newMove.coords[1]] = newMove.newSquare;
					});
				});
			}
		}
	}

	useEffect(() => {
		let interval:number;
		if(autoplay){
			interval = setInterval(next, intervalValue);
		}
		if(turnNumber === turnList.length){
			setAutoplay(false)
		}

		return(() => {
			if(interval){
				clearInterval(interval)
			}
		})
	}, [turnNumber, autoplay, intervalValue]);

	return (
		<main className='flex flex-col items-center'>
			<div className='flex justify-center mt-12 mb-12 gap-4'>
				<Board board={board} />
				<History turnList={turnList} turnNumber={turnNumber} setTurnNumber={setTurnNumber} prev={prev} next={next} />
			</div>
			<div className='flex items-center mb-12 gap-8'>
				<Pagination prev={prev} next={next} currentValue={turnNumber} finalValue={turnList.length} />
				<div className='flex items-center gap-2'>
					<button className='bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded px-4 py-1' onClick={() => {setAutoplay(false)}}>stop</button>
					<button className='bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded px-4 py-1' onClick={() => {setAutoplay(true)}}>autoplay</button>
					<input className='bg-slate-300 px-3 py-1 w-24' type='number' value={intervalValue} onChange={(e) => {setIntervalValue(Number(e.target.value))}} /> ms
				</div>
			</div>
			<HistoryInput setTurnList={setTurnList} setBoard={setBoard} setTurnNumber={setTurnNumber} />
		</main>
	);
}

export default BoardReplayer;
