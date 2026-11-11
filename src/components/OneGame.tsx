import { Link } from 'react-router';

import type { GameProps } from '../types/game';
import styles from './OneGame.module.css';

// Komponenten tar emot ett helt spelobjekt.
interface OneGameProps {
  game: GameProps;
}

export default function Game({ game }: OneGameProps) {
  return (
    <div className={styles.demoCard}>
      <h3>
        <Link to={`/game/${game.id}`}>{game.name}</Link>
      </h3>
      <p className={styles.demoHint}>{game.description}</p>
      <p>Speltid: {game.time} minuter</p>
      <p>Antal spelare: {game.people}</p>
    </div>
  );
}
