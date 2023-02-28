import { useState } from "react";
import { Square, getTopPiece, reverseList } from "../helpers/board";

interface BoardProps {
  board: Square[][];
}

function Board({board}:BoardProps) {
  const boardUI:Square[] = []
  board.forEach((row) => {
    row.forEach((col) => {
      boardUI.push(col)
    })
  })

  function tierToString(square: Square){
    const topPiece = getTopPiece(square);
    if (topPiece === 'tier3') {
      return square.stack.tier3;
    } else if (topPiece === 'tier2') {
      return square.stack.tier2;
    } else if (topPiece === 'tier1') {
      return square.stack.tier1;
    } else {
      return null
    }
  }

  const fileCoords = [1,2,3,4,5,6,7,8,9]
  const rankCoords = ['a','b','c','d','e','f','g','h','i']

  const baseUrl = 'gungi-replay'
	return (
		<div className='grid grid-cols-9 gap-0.5 bg-amber-500 p-0.5 relative'>
      {boardUI.map((square) => {
        return <div className='w-20 h-20 bg-orange-200'>
          {/* <img src="src/assets/pieces/b1中.svg" alt="piece" className='p-1.5' /> */}
          {tierToString(square) ? <img src={`/pieces/${tierToString(square)}.svg`} alt="piece" className='p-1.5' /> : null}
        </div>
      })}
      <div className="grid grid-flow-row-dense absolute h-full -ml-4 items-center">
        {reverseList(fileCoords).map((file) => {
          return <div className=''>{file}</div>
        })}
      </div>
      <div className="grid grid-flow-col absolute w-full -bottom-6">
        {rankCoords.map((file) => {
          return <div className='text-center'>{file}</div>
        })}
      </div>
		</div>
	);
}

export default Board;
