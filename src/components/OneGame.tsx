import styles from './OneGame.module.css';

interface GameProps {
  id: string;
  name: string;
  description: string;
  time: number;
  people: number;
  imageUrl: string;
  spicy: boolean;
  family: boolean;
  drinking: boolean;
  love: boolean;
  deep: boolean;
  flexible: boolean;
  saved: boolean;
}

export default function OneGame({ name, description }: GameProps) {
  return (
    <div className={styles.demoCard}>
      <p className={styles.demoHint}>{description}</p>

      <div className={styles.gameDemo}>
        <h3>{name}</h3>
      </div>
    </div>
  );
}
