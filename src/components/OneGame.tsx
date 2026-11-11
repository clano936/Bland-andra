import { Link } from 'react-router';

import type { GameProps } from '../types/game';
import styles from './OneGame.module.css';

// Komponenten tar emot ett helt spelobjekt.
interface OneGameProps {
  game: GameProps;
}

export default function Game({ game }: OneGameProps) {
  return (
    <Link to={`/game/${game.id}`} className={styles.demoCard}>
      <h3>{game.name}</h3>
      <p className={styles.demoHint}>{game.description}</p>
      <p>Speltid: {game.time} minuter</p>
      <p>Antal spelare: {game.people}</p>
    </Link>
  );
}
