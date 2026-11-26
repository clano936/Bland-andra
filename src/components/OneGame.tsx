import { Link } from 'react-router';

import clock from '../assets/Exporterade/Klocka.png';
import person from '../assets/Exporterade/Personer.png';
import type { GameProps } from '../types/game';
import styles from './OneGame.module.css';

interface OneGameProps {
  game: GameProps;
}

export default function OneGame({ game }: OneGameProps) {
  return (
    <Link to={`/game/${game.id}`} className={styles.gameCard}>
      <div className={styles.imageWrapper}>
        <img
          src={`/${game.imageUrl}`}
          className={styles.gameImage}
          alt=""
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{game.name}</h3>
        <p className={styles.description}>{game.description}</p>
      </div>

      <div className={styles.metadata}>
        <span className={styles.metaBadge}>
          <img src={person} alt="" style={{ height: '18px', width: '18px' }} />{' '}
          {game.minPeople}–{game.maxPeople}
        </span>

        <span className={styles.metaBadge}>
          <img src={clock} alt="" /> {game.time} min
        </span>
      </div>
    </Link>
  );
}
