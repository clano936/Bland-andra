import type { GameProps } from '../types/game';
import OneGame from './OneGame';
import styles from './GameList.module.css';

interface GameListProps {
  games: GameProps[];
  loading: boolean;
}

export default function GameList({ games, loading }: GameListProps) {
  if (loading) {
    return (
      <section className={styles.gameSection}>
        <p className={styles.message}>Hämtar spel från databasen...</p>
      </section>
    );
  }

  if (games.length === 0) {
    return (
      <section className={styles.gameSection}>
        <p className={styles.message}>Inga spel matchade din sökning.</p>
      </section>
    );
  }

  return (
    <main className={styles.gameSection}>
      <h2 className={styles.heading}>Rekommenderat</h2>

      <div className={styles.gameGrid}>
        {games.map((game) => (
          <OneGame key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}