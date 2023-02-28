function Pagination(props) {
	return (
		<div className='flex gap-4 items-center'>
			<button className='bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded px-4 py-1' onClick={props.prev}>
				Prev
			</button>
			<div>
				{props.currentValue} / {props.finalValue}
			</div>
			<button className='bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded px-4 py-1' onClick={props.next}>
				Next
			</button>
		</div>
	);
}

export default Pagination;
