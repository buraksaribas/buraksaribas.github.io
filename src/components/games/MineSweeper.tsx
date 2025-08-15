import { useState, useEffect } from "react";
import Button from "../ui/Button";

type Cell = {
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

const ROWS = 8;
const COLS = 8;
const MINES = 10;

const generateBoard = (): Cell[][] => {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      hasMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (!board[row][col].hasMine) {
      board[row][col].hasMine = true;
      minesPlaced++;
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].hasMine) continue;
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nr = r + i;
          const nc = c + j;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].hasMine) {
            count++;
          }
        }
      }
      board[r][c].neighborMines = count;
    }
  }

  return board;
};

function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(generateBoard());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const revealCell = (row: number, col: number) => {
    if (gameOver || board[row][col].isRevealed || board[row][col].isFlagged) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));

    const reveal = (r: number, c: number) => {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
      const cell = newBoard[r][c];
      if (cell.isRevealed || cell.isFlagged) return;
      cell.isRevealed = true;
      if (cell.neighborMines === 0 && !cell.hasMine) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i !== 0 || j !== 0) reveal(r + i, c + j);
          }
        }
      }
    };

    if (newBoard[row][col].hasMine) {
      setGameOver(true);
      newBoard.forEach(r =>
        r.forEach(c => {
          if (c.hasMine) c.isRevealed = true;
        })
      );
    } else {
      reveal(row, col);
    }

    setBoard(newBoard);
  };

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || board[row][col].isRevealed) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  useEffect(() => {
    if (!gameOver) {
      const allCells = board.flat();
      const hiddenCells = allCells.filter(c => !c.isRevealed);
      const minesLeft = allCells.filter(c => c.hasMine && !c.isRevealed);
      if (hiddenCells.length === minesLeft.length) {
        setWon(true);
        setGameOver(true);
      }
    }
  }, [board, gameOver]);

  const resetGame = () => {
    setBoard(generateBoard());
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="text-cyan-100 font-mono p-4 text-center">
      <h2 className="text-xl mb-2">Minesweeper</h2>
      {gameOver && (
        <div className={`mb-2 font-bold ${won ? "text-green-400" : "text-red-400"}`}>
          {won ? "You won 🎉" : "Game over 💥"}
        </div>
      )}
      <div className="inline-block border border-cyan-500/50 bg-cyan-900/20 p-2 rounded-md">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="flex">
            {row.map((cell, cIdx) => (
              <button
                key={cIdx}
                onClick={() => revealCell(rIdx, cIdx)}
                onContextMenu={(e) => toggleFlag(e, rIdx, cIdx)}
                className={`w-8 h-8 border border-cyan-500/30 m-[1px] flex items-center justify-center
                  ${cell.isRevealed ? (cell.hasMine ? "bg-red-600" : "bg-cyan-700") : "bg-cyan-900"}
                  ${cell.isFlagged ? "text-yellow-400 font-bold" : ""}
                `}
              >
                {cell.isRevealed && cell.hasMine && "💣"}
                {cell.isRevealed && !cell.hasMine && cell.neighborMines > 0 && cell.neighborMines}
                {!cell.isRevealed && cell.isFlagged && "🚩"}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button variant="secondary" onClick={resetGame}>Restart</Button>
      </div>
      <p className="mt-2 text-sm text-cyan-300">Right click: 🚩</p>
    </div>
  );
};

export default Minesweeper;
