import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { db } from '../firebase';
import type { GameProps } from '../types/game';
import styles from './OneGamePage.module.css';

async function getGameById(id: string | undefined): Promise<GameProps | undefined> {
  if (!id) {
    return undefined;
  }

  const snapshot = await get(ref(db, `games/${id}`));
  if (!snapshot.exists()) {
    return undefined;
  }

  return { ...snapshot.val(), id } as GameProps;
}

const CATEGORY_INFO: Record<string, { label: string; symbol: string }> = {
  family: { label: 'Familj', symbol: ':)' },
  drinking: { label: 'Fest', symbol: ';)' },
  spicy: { label: 'Spicy', symbol: ';)' },
  love: { label: 'Kärlek', symbol: ':)' },
  deep: { label: 'Djup', symbol: ':)' },
  flexible: { label: 'Flexibel', symbol: 'F' }
};

export default function OneGamePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [game, setGame] = useState<GameProps | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchGame() {
      setLoading(true);
      setError(null);
      try {
        const result = await getGameById(id);
        if (!cancelled) {
          setGame(result);
        }
      } catch {
        if (!cancelled) {
          setError('Kunde inte hämta spelet.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchGame();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p>Laddar spel...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!game) {
    return <p>Spelet finns inte.</p>;
  }

  function onBack() {
    void navigate('/');
  }

  return (
    <main className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.navRow}>
          <button className={styles.pillButton} onClick={onBack}>
            ← Alla spel
          </button>
          <button className={styles.pillButton}>♡ Spara</button>
        </div>
        <h1 className={styles.title}>{game.name}</h1>
        <p className={styles.description}>{game.description}</p>
        {/* Filtrera ut alla aktiva kategorier (förutom "saved") */}
        <div className={styles.categoryBadges}>
          {Object.entries(game.categories)
            .filter(([key, isActive]) => isActive && key in CATEGORY_INFO)
            .map(([key]) => {
              const { label, symbol } = CATEGORY_INFO[key];
              return (
                <span key={key} className={styles.categoryBadge}>
                  <span aria-hidden="true">{symbol}</span>
                  <span>{label}</span>
                </span>
              );
            })}
        </div>
      </header>
      {/* Snabbfakta i 3 kolumner */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div>👥</div>
          <strong>
            {game.minPeople} - {game.maxPeople}
          </strong>
        </div>
        <div className={styles.statCard}>
          <div>⏱️</div>
          <strong>{game.time} min</strong>
        </div>
        <div className={styles.statCard}>
          <div>⚡</div>
          <strong>{game.time}</strong>
        </div>
      </div>
      {/*Bild */}
      {game.imageUrl !== 'bild' && ( // om bildens url inte är standard bild dvs inte fins
        <div className={styles.imageWrapper}>
          <img src={'/' + game.imageUrl} className={styles.gameImage} />
        </div>
      )}

      {/**Rules */}
      <ol className={styles.rulesList}>
        {Object.entries(game.rules).map(([ruleKey, ruleText], index) => (
          /* ruleKey är t.ex. "rule1", vilket ESLint älskar! */
          <li key={ruleKey} className={styles.ruleCard}>
            {/* index + 1 visar snyggt 1, 2, 3... för användaren */}
            <span className={styles.ruleNumber}>{index + 1}</span>
            <p className={styles.ruleText}>{ruleText.trim()}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
