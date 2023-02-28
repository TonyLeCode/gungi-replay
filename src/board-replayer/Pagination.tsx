
interface PaginationProps {
	prev: () => void;
	next: () => void;
	currentValue: number;
	finalValue: number;
}

function Pagination({prev, next, currentValue, finalValue}:PaginationProps) {
	return (
		<div className='flex gap-4 items-center'>
			<button className='bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded px-4 py-1' onClick={() => {prev()}}>
				Prev
			</button>
			<div>
				{currentValue} / {finalValue}
			</div>
			<button className='bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded px-4 py-1' onClick={() => {next()}}>
				Next
			</button>
		</div>
	);
}

export default Pagination;
