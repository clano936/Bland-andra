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
        <div className={styles.emoji}>{game.name}</div>
        <h1 className={styles.title}>{game.name}</h1>
        <p>{game.name}</p>
      </header>

      {/* Snabbfakta i 3 kolumner */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div>👥</div>
          <strong>{game.name}</strong>
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
      <div className={styles.imageWrapper}>
        <img src={'/' + game.imageUrl} className={styles.gameImage} />
      </div>
      {/* Regler */}
    </main>
  );
}

/**<section className={styles.rulesSection}>
        <h2>Så spelar ni</h2>
        <ol className={styles.ruleList}>
          {game.rules.map((rule, index) => (
            <li key={index} className={styles.ruleItem}>
              <span className={styles.ruleNumber}>{index + 1}</span>
              <p>{rule}</p>
            </li>
          ))}
        </ol>
      </section> */
