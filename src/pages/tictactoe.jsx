import { useState } from 'react';
import { IoSparklesSharp } from 'react-icons/io5';
import { ImFire } from 'react-icons/im';

const Tictactoe = () => {
    const initialBoard = Array(9).fill(null)
    const [board, setBoard] = useState(initialBoard)
    const [isXNext, setIsXNext] = useState(true)
    const winner = winCondition(board)

    const handleClick = (index) => {
        if (board[index] || winner) {
            return
        }

        const newBoard = [...board]
        newBoard[index] = isXNext ? 'X' : 'O'
        setBoard(newBoard)
        setIsXNext(!isXNext)
    }

    const handleRestart = () => {
        setBoard(initialBoard)
        setIsXNext(true)
    }

    const renderSquare = (index) => (
        <button
            className={`w-[80px] h-[80px] square ${board[index] === 'X' ? 'bg-blue-500' : board[index] === 'O' ? 'bg-yellow-400' : 'bg-gray-200'
                } ${!board[index] ? 'hover:bg-gray-300' : 'cursor-default'} text-xl font-bold focus:outline-none`}
            onClick={() => handleClick(index)}
        >
            {board[index]}
        </button>
    )

    const getStatus = () => {
        if (winner) {
            return (
                <div className="text-xl font-semibold flex gap-2 items-center">
                    Winner: {winner} <IoSparklesSharp className="text-yellow-400" />
                </div>
            )
        } else if (board.every((square) => square !== null)) {
            return (
                <div className="text-xl font-semibold flex gap-2 items-center">
                    It's a draw! <ImFire className="text-orange-500" />
                </div>
            )
        } else {
            return <div className="text-xl font-semibold">Next player: {isXNext ? 'X' : 'O'}</div>
        }
    }

    return (
        <div className="md:w-[80vw] h-[100vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Tic Tac Toe</h1>
            <p className="mb-4">{getStatus()}</p>

            <div className="grid grid-cols-3 gap-1">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>

            <button
                className="w-[200px] bg-blue-500 mt-5 rounded-2xl text-white font-semibold py-1 hover:bg-white hover:text-blue-500 hover:shadow-lg transition-all duration-500 ease-in-out"
                onClick={handleRestart}
            >
                Restart
            </button>
        </div>
    );
}

const winCondition = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}

export default Tictactoe;