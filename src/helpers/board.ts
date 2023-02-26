import { produce } from 'immer';
type Color = 'b' | 'w' | null;

type Piece = string;

interface Stack {
	tier1: null | Piece;
	tier2: null | Piece;
	tier3: null | Piece;
}

interface Square {
	stack: Stack;
}

interface Move {
	type: moveType;
	color: Color;
	from?: string;
	fromPiece: string;
	to: string;
	toPiece?: string;
}

function createNewBoard() {
	const board = [];
	for (let i = 0; i < 9; i++) {
		const row = [];
		for (let i = 0; i < 9; i++) {
			const square: Square = {
				stack: {
					tier1: null,
					tier2: null,
					tier3: null,
				},
			};
			row.push(square);
		}
		board.push(row);
	}
	return board;
}

type moveType = 'place' | 'move' | 'attack' | 'stack' | 'ready';

function parse(moveType: moveType, movement: string) {
	switch (moveType) {
		case 'place': {
			// const regexp = /(?<=stockpile\s)./;
			const regexp = /(?<=stockpile\s)(.)[\s→]+(\d)-(\w)-(\d)/;
			const match = movement.match(regexp);
			// console.log('place');
			if (match) {
				console.log(match);
				return { type: 'place', fromPiece: `${match[1]}`, to: `${match[2]}${match[3]}` };
			}
			return null;
		}
		case 'move': {
			const regexp = /[^-\s→]/g;
			const match = movement.match(regexp);
			// console.log('move');
			if (match) {
				console.log(match);
				return { type: 'move', from: `${match[0]}${match[1]}`, fromPiece: `${match[3]}`, to: `${match[4]}${match[5]}` };
			}
			return null;
		}
		case 'attack': {
			const regexp = /[^-\s→()]/g;
			const match = movement.match(regexp);
			// console.log('attack');
			if (match) {
				// console.log(match);
				return {
					type: 'attack',
					from: `${match[0]}${match[1]}`,
					fromPiece: `${match[3]}`,
					to: `${match[4]}${match[5]}`,
					toPiece: `${match[7]}${match[8]}`,
				};
			}
			return null;
		}
		case 'stack': {
			const regexp = /[^-\s→()]/g;
			const match = movement.match(regexp);
			// console.log('stack');
			if (match) {
				// console.log(match);
				return {
					type: 'stack',
					from: `${match[0]}${match[1]}`,
					fromPiece: `${match[3]}`,
					to: `${match[4]}${match[5]}`,
					toPiece: `${match[7]},${match[8]}`,
				};
			}
		}
		case 'ready': {
			// console.log('ready');
			return null;
		}
		default:
			console.log('error');
			return null;
	}
}

function makeMove(board: Square[][], move: Move, color: Color) {
	// console.log(move)
	// console.log(move.type)
	if (move == null) {
		return null;
	}
	if (move.type === 'place') {
		// console.log('placing')
		const coords = [coordToArrayIndex(Number(move.to[0])), coordToArrayIndex(move.to[1])];
    const square = produce(board[coords[0]][coords[1]], (draft) => {

      const topPiece = getTopPiece(board[coords[0]][coords[1]]);
      if (topPiece === null) {
        draft.stack.tier1 = `${color}1${move.fromPiece}`;
      } else if (topPiece === 'tier1') {
        draft.stack.tier2 = `${color}2${move.fromPiece}`;
      } else if (topPiece === 'tier2') {
        draft.stack.tier3 = `${color}3${move.fromPiece}`;
      } else {
        console.log('stack error');
      }
    })
		return { coords: coords, newSquare: square };
    // return null
	}
	// attack
	// remove piece from origin square
	// remove attacked piece
	// add moved piece
	// stack
	// remove piece from origin
	// add moved piece
	// move
	// remove piece from origin
	// add moved piece
	// place
	// *remove from stockpile
	// add piece
	return null;
}

function getTopPiece(square: Square): string | null {
  // console.log('getTopPiece', square)
	if (square.stack.tier3 !== null) {
		return 'tier3';
	} else if (square.stack.tier2 !== null) {
		return 'tier2';
	} else if (square.stack.tier1 !== null) {
		return 'tier1';
	} else {
		return null;
	}
}

function numToLetter(num: number) {
	switch (num) {
		case 1:
			return 'a';
		case 2:
			return 'b';
		case 3:
			return 'c';
		case 4:
			return 'd';
		case 5:
			return 'e';
		case 6:
			return 'f';
		case 7:
			return 'g';
		case 8:
			return 'h';
		case 9:
			return 'i';
		default:
			return '';
	}
}

function letterToNum(letter: string) {
	switch (letter) {
		case 'a':
			return 1;
		case 'b':
			return 2;
		case 'c':
			return 3;
		case 'd':
			return 4;
		case 'e':
			return 5;
		case 'f':
			return 6;
		case 'g':
			return 7;
		case 'h':
			return 8;
		case 'i':
			return 9;
		default:
			return 0;
	}
}

function reverseList<T>(arr: T[]): T[] {
	const reversed: T[] = [];
	for (let i = arr.length - 1; i >= 0; i--) {
		reversed.push(arr[i]);
	}
	return reversed;
}

function coordToArrayIndex(coord: number | string): number | null {
	if (typeof coord === 'number') {
		return 9 - coord;
	} else if (typeof coord === 'string') {
		return letterToNum(coord) - 1;
	}
	return null;
}

export { createNewBoard, parse, letterToNum, numToLetter, makeMove, reverseList, coordToArrayIndex, getTopPiece };
