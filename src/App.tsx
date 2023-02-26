import { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	return (
		<main className='max-w-6xl mx-auto mt-24'>
			<h1 className='text-4xl font-bold'>What is Gungi?</h1>
			<p className='text-lg my-6'>
				Gungi is a two-player strategy board game created by Yoshihiro Togashi and is featured in the in the popular
				manga Hunter × Hunter.
			</p>

			<p className='text-lg my-6'>
				It is played on a non-checkered gameboard with 81 squares arranged in a 9x9 grid. At the beginning of the game,
				players can choose how their pieces will be arranged on their side of the board.
			</p>

			<p className='text-lg my-6'>
				Additionally, unlike its spiritual brethren, chess, shogi, and go, in Gungi pieces can be stacked on top of each
				other, adding a third dimension to the game leading to billions and billions of possibilities. As in chess and
				shogi, the goal is to trap the king.
			</p>
		</main>
	);
}

export default App;
