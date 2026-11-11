import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { db } from '../firebase';
import type { GameProps } from '../types/game';

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

  return (
    <div>
      <Link to="/">← Tillbaka</Link>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      <p>Speltid: {game.time} minuter</p>
      <p>Antal spelare: {game.people}</p>
      {game.imageUrl && <img src={game.imageUrl} alt={game.name} />}
    </div>
  );
}
