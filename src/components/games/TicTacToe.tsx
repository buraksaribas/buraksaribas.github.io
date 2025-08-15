import { useState, useEffect } from "react";

function TicTacToeAI() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // X = Player, O = AI
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const w = calculateWinner(board);
    if (w) {
      setWinner(w);
    } else if (!board.includes(null)) {
      setWinner("Draw");
    } else if (!isXNext) {
      const aiMove = makeAIMove(board);
      setTimeout(() => {
        setBoard(prev => {
          const newBoard = [...prev];
          newBoard[aiMove] = "O";
          return newBoard;
        });
        setIsXNext(true);
      }, 300);
    }
  }, [board, isXNext]);

  const handleClick = (i: number) => {
    if (board[i] || winner || !isXNext) return;
    const newBoard = board.slice();
    newBoard[i] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  const renderSquare = (i: number) => (
    <button
      onClick={() => handleClick(i)}
      className="w-16 h-16 border text-2xl font-bold hover:bg-cyan-900/20"
    >
      {board[i]}
    </button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-1">{board.map((_, i) => renderSquare(i))}</div>
      {winner ? (
        <p className="text-green-400 font-bold text-lg">
          {winner === "Draw" ? "It's a Draw!" : `${winner} wins!`}
        </p>
      ) : (
        <p className="text-cyan-300 font-semibold">Your turn: X</p>
      )}
      <button
        onClick={resetGame}
        className="px-4 py-2 bg-cyan-700 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
};

function makeAIMove(board: (string | null)[]) {
  const emptyIndices = board.map((v, i) => (v === null ? i : null)).filter(v => v !== null) as number[];
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

function calculateWinner(board: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

export default TicTacToeAI;

