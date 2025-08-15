import { gamesRegistry } from '../games';
import type { GameWindowProps } from '../../types';


function GameWindow({ gameId }: GameWindowProps) {
  const GameComponent = gamesRegistry[gameId as keyof typeof gamesRegistry];

  if (!GameComponent) {
    return (
      <div className="p-4 text-cyan-100">
        <p>Game not found: {gameId}</p>
      </div>
    );
  }

  return <GameComponent />;
};

export default GameWindow;
