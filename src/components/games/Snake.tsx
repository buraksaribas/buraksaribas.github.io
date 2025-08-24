import { useEffect, useState, useRef } from "react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

type Position = { x: number; y: number };

const getRandomFoodPosition = (snake: Position[]): Position => {
  let newPos: Position;
  do {
    newPos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((s) => s.x === newPos.x && s.y === newPos.y));
  return newPos;
};

function Snake() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(
    getRandomFoodPosition(INITIAL_SNAKE),
  );
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const moveRef = useRef(direction);
  moveRef.current = direction;

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    // Minimum swipe distance
    if (Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30) return;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0 && moveRef.current.x === 0) {
        setDirection({ x: 1, y: 0 }); // Right
      } else if (deltaX < 0 && moveRef.current.x === 0) {
        setDirection({ x: -1, y: 0 }); // Left
      }
    } else {
      // Vertical swipe
      if (deltaY > 0 && moveRef.current.y === 0) {
        setDirection({ x: 0, y: 1 }); // Down
      } else if (deltaY < 0 && moveRef.current.y === 0) {
        setDirection({ x: 0, y: -1 }); // Up
      }
    }

    setTouchStart(null);
  };

  // Direction control functions for buttons
  const changeDirection = (newDirection: Position) => {
    if (newDirection.x !== 0 && moveRef.current.x === 0) {
      setDirection(newDirection);
    } else if (newDirection.y !== 0 && moveRef.current.y === 0) {
      setDirection(newDirection);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          changeDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          changeDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          changeDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          changeDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Game logic
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: prev[0].x + moveRef.current.x,
          y: prev[0].y + moveRef.current.y,
        };
        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE ||
          prev.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomFoodPosition(newSnake));
          setScore((prev) => prev + 10);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [food, gameOver]);

  const restart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFoodPosition(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
  };

  // Responsive cell size calculation
  const cellSize = "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5";

  // Update grid style for responsive sizing
  const getGridStyle = () => {
    return {
      gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(12px, 1fr))`,
      gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(12px, 1fr))`,
    };
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Header */}
      <div className="text-center mb-2 sm:mb-4">
        <h2 className="text-cyan-100 text-lg sm:text-xl mb-2">Snake Game</h2>
        <div className="text-cyan-300 text-sm sm:text-base font-mono">
          Score: {score} • Length: {snake.length}
        </div>
      </div>

      {/* Game Board */}
      <div
        className="grid bg-black border border-cyan-500 mb-3 sm:mb-4 touch-none select-none"
        style={getGridStyle()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
          const x = i % BOARD_SIZE;
          const y = Math.floor(i / BOARD_SIZE);
          const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
          const isHead = snake[0]?.x === x && snake[0]?.y === y;
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={`${cellSize} border border-cyan-800/50 ${
                isHead
                  ? "bg-cyan-200"
                  : isSnake
                    ? "bg-cyan-400"
                    : isFood
                      ? "bg-red-500"
                      : "bg-black"
              }`}
            />
          );
        })}
      </div>

      {/* Mobile Controls */}
      <div className="block sm:hidden mb-4">
        <div className="grid grid-cols-3 gap-2 w-32">
          <div></div>
          <button
            onClick={() => changeDirection({ x: 0, y: -1 })}
            className="w-10 h-10 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white rounded-md flex items-center justify-center text-lg font-bold touch-manipulation"
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => changeDirection({ x: -1, y: 0 })}
            className="w-10 h-10 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white rounded-md flex items-center justify-center text-lg font-bold touch-manipulation"
          >
            ←
          </button>
          <div></div>
          <button
            onClick={() => changeDirection({ x: 1, y: 0 })}
            className="w-10 h-10 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white rounded-md flex items-center justify-center text-lg font-bold touch-manipulation"
          >
            →
          </button>
          <div></div>
          <button
            onClick={() => changeDirection({ x: 0, y: 1 })}
            className="w-10 h-10 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white rounded-md flex items-center justify-center text-lg font-bold touch-manipulation"
          >
            ↓
          </button>
          <div></div>
        </div>
        <div className="text-center mt-2 text-xs text-cyan-300/70">
          Swipe on board or use buttons
        </div>
      </div>

      {/* Desktop Instructions */}
      <div className="hidden sm:block text-center text-sm text-cyan-300/70 mb-4">
        Use arrow keys to control the snake
      </div>

      {/* Game Over / Restart */}
      {gameOver && (
        <div className="text-center">
          <p className="text-red-500 font-bold mb-2 text-sm sm:text-base">
            Game Over!
          </p>
          <p className="text-cyan-300 mb-3 text-sm">Final Score: {score}</p>
          <button
            onClick={restart}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white rounded-md text-sm sm:text-base touch-manipulation"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game Running Controls */}
      {!gameOver && (
        <div className="text-center">
          <button
            onClick={restart}
            className="px-3 py-1.5 border border-cyan-500 text-cyan-200 hover:bg-cyan-500/20 active:bg-cyan-500/30 rounded-md text-xs sm:text-sm touch-manipulation"
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default Snake;
