import { useState } from 'react';
import Board from './Board';
import HistoryInput from './HistoryInput';
import History from './History';
import { createNewBoard, makeMove, parse } from '../helpers/board';
import Pagination from './Pagination';
import { useImmer } from "use-immer";

function BoardReplayer() {
	const [board, setBoard] = useImmer(createNewBoard());
	console.log(board);
	const [turnList, setTurnList] = useState([]);
	const [turnNumber, setTurnNumber] = useState(0);
	// console.log(turnList);

	function next() {
		if (turnNumber < turnList.length) {
			setTurnNumber((state) => {
				return state + 1;
			});
			const move = parse(turnList[turnNumber].moveType, turnList[turnNumber].movement )
			// console.log(move)
			const newMove = makeMove(board, move, turnList[turnNumber].color)
			// console.log('new move', newMove)
			if (newMove != null){
				setBoard((draft) => {
					draft[newMove.coords[0]][newMove.coords[1]] = newMove.newSquare
				})
			}
		}

		//test
		// setBoard((draft) => {
		// 	draft[1][1] = {
		// 		color: 'b',
		// 		piece: {
		// 			tier1: 'lol',
		// 			tier2: null,
		// 			tier3: null,
		// 		},
		// 	};
		// })

	}
	function prev() {
		if (turnNumber > 0) {
			setTurnNumber((state) => {
				return state - 1;
			});
			const move = parse(turnList[turnNumber - 1].moveType, turnList[turnNumber - 1].movement)
			console.log(move)
		}
	}

	return (
		<main className='flex flex-col items-center'>
			<div className='flex justify-center mt-12 mb-12 gap-4'>
				<Board board={board} />
				<History turnList={turnList} turnNumber={turnNumber} setTurnNumber={setTurnNumber} />
			</div>
			<Pagination prev={prev} next={next} currentValue={turnNumber} finalValue={turnList.length} />
			<HistoryInput setTurnList={setTurnList} setBoard={setBoard} />
		</main>
	);
}

export default BoardReplayer;
