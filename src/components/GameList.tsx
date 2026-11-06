import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

import { db } from '../firebase';
import OneGame from './OneGame';

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

export default function GameList() {
  const [games, setGames] = useState<GameProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const gamesRef = ref(db, 'games');

    const unsubscribe = onValue(
      gamesRef,
      (snapshot) => {
        const data = snapshot.val() as Record<string, Omit<GameProps, 'id'>> | null;

        const list = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];

        setGames(list);
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      hihi
      {games.map((game) => (
        <OneGame key={game.id} {...game} />
      ))}
    </div>
  );
}
