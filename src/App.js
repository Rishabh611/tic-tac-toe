import {useState} from "react";

const MatrixRender = ({matrix, handleClick}) => {
	const onButtonClick = (rowIndex, cellIndex) => {
		handleClick(rowIndex, cellIndex);
	};
	const cellValue = (cell) => {
		if (cell === 1) {
			return "X";
		} else if (cell === -9) {
			return "-";
		}
		return cell;
	};
	return matrix.map((row, rowIndex) => (
		<div className="row" key={rowIndex}>
			{row.map((cell, cellIndex) => (
				<button
					className={`button-option cell-${rowIndex}-${cellIndex} ${
						cell === 0 || cell === 1 ? "clicked" : ""
					}`}
					onClick={() => onButtonClick(rowIndex, cellIndex)}
					key={`${rowIndex}-${cellIndex}`}
					disabled={cell === 0 || cell === 1 ? true : false}
				>
					{cellValue(cell)}
				</button>
			))}
		</div>
	));
};
const ShowWinner = ({winner}) => {
	return <div className="container">🎉Player {winner} wins 🥳</div>;
};
function App() {
	const [player, setPlayer] = useState(1);
	const [winner, setWinner] = useState(null);
	const [gameMatrix, setGameMatrix] = useState([
		[-9, -9, -9],
		[-9, -9, -9],
		[-9, -9, -9],
	]);
	const handleClick = (rowIndex, cellIndex) => {
		let newGameMatrix = [...gameMatrix];
		newGameMatrix[rowIndex][cellIndex] = player;
		newGameMatrix.forEach((row) => {
			let sum = 0;
			row.forEach((cell) => {
				sum += cell;
			});
			if (sum === 0) {
				setWinner("0");
				setTimeout(() => {
					setWinner(null);
					handleRestart();
				}, 5000);
			} else if (sum === 3) {
				setWinner("X");
				setTimeout(() => {
					setWinner(null);
					handleRestart();
				}, 5000);
			}
		});

		// Check columns
		for (let i = 0; i < 3; i++) {
			if (newGameMatrix[0][i] + newGameMatrix[1][i] + newGameMatrix[2][i] === 0) {
				setWinner("0");
				setTimeout(() => {
					setWinner(null);
					handleRestart();
				}, 5000);
			}
		}
		for (let i = 0; i < 3; i++) {
			if (newGameMatrix[0][i] + newGameMatrix[1][i] + newGameMatrix[2][i] === 3) {
				setWinner("X");
				setTimeout(() => {
					setWinner(null);
					handleRestart();
				}, 5000);
			}
		}
		// Check diagonals
		if (newGameMatrix[0][0] + newGameMatrix[1][1] + newGameMatrix[2][2] === 0) {
			setWinner("0");
			setTimeout(() => {
				setWinner(null);
				handleRestart();
			}, 5000);
		}
		if (newGameMatrix[0][0] + newGameMatrix[1][1] + newGameMatrix[2][2] === 3) {
			setWinner("X");
			setTimeout(() => {
				setWinner(null);
				handleRestart();
			}, 5000);
		}

		if (newGameMatrix[0][2] + newGameMatrix[1][1] + newGameMatrix[2][0] === 0) {
			setWinner("0");
			setTimeout(() => {
				setWinner(null);
				handleRestart();
			}, 5000);
		}
		if (newGameMatrix[0][2] + newGameMatrix[1][1] + newGameMatrix[2][0] === 3) {
			setWinner("X");
			setTimeout(() => {
				setWinner(null);
				handleRestart();
			}, 5000);
		}
		setGameMatrix(newGameMatrix);
		setPlayer(player === 0 ? 1 : 0);
	};
	const handleRestart = () => {
		setGameMatrix([
			[-9, -9, -9],
			[-9, -9, -9],
			[-9, -9, -9],
		]);
	};
	return (
		<>
			{winner && <ShowWinner winner={winner} />}
			<div className="wrapper">
				<MatrixRender matrix={gameMatrix} handleClick={handleClick} />
				<button id="restart" onClick={handleRestart}>
					Restart
				</button>
			</div>
		</>
	);
}

export default App;
