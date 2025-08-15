import { useEffect, useState, useRef } from 'react';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

type Position = { x: number; y: number };

const getRandomFoodPosition = (snake: Position[]): Position => {
  let newPos: Position;
  do {
    newPos = { x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) };
  } while (snake.some(s => s.x === newPos.x && s.y === newPos.y));
  return newPos;
};

function Snake() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(getRandomFoodPosition(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);

  const moveRef = useRef(direction);
  moveRef.current = direction;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (moveRef.current.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (moveRef.current.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (moveRef.current.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (moveRef.current.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const newHead = { x: prev[0].x + moveRef.current.x, y: prev[0].y + moveRef.current.y };

        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE ||
          prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomFoodPosition(newSnake));
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
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-cyan-100 text-xl mb-4">Snake Game</h2>
      <div
        className="grid bg-black border border-cyan-500"
        style={{
          gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
          const x = i % BOARD_SIZE;
          const y = Math.floor(i / BOARD_SIZE);

          const isSnake = snake.some(seg => seg.x === x && seg.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`w-5 h-5 border border-cyan-800 ${isSnake ? 'bg-cyan-400' : isFood ? 'bg-red-500' : 'bg-black'
                }`}
            />
          );
        })}
      </div>

      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-red-500 font-bold mb-2">Game Over!</p>
          <button
            onClick={restart}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Snake;
