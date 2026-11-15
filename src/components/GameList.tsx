import type { GameProps } from '../types/game';
import OneGame from './OneGame';

interface GameListProps {
  games: GameProps[];
  loading: boolean;
}

export default function GameList({ games, loading }: GameListProps) {
  if (loading) {
    return <p> sHämtar spel från databasen...</p>;
  }
  if (games.length === 0) {
    return <p> Inga spel matchade din sökning.</p>;
  }
  return (
    <div>
      {games.map((game) => (
        <OneGame key={game.id} game={game} />
      ))}
    </div>
  );
}
