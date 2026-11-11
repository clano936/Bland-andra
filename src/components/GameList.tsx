import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

import { db } from '../firebase';
import type { GameProps } from '../types/game';
import OneGame from './OneGame';

export default function GameList() {
  // State som innehåller alla spel som hämtas från Firebase.
  // Börjar som en tom lista.
  const [games, setGames] = useState<GameProps[]>([]);
  // State som sparar ett eventuellt felmeddelande från Firebase.
  // null betyder att det inte finns något fel.
  const [error, setError] = useState<string | null>(null);
  // useEffect körs när komponenten monteras.
  // Den tomma beroendelistan [] gör att den inte körs vid varje rendering.
  useEffect(() => {
    // Skapar en referens till platsen "games" i Firebase-databasen.
    const gamesRef = ref(db, 'games');
    // onValue lyssnar på förändringar i databasen.
    // Funktionen körs både när datan hämtas första gången
    // och när något ändras i databasen.
    const unsubscribe = onValue(
      gamesRef,
      // Körs när Firebase skickar tillbaka data.
      (snapshot) => {
        // Hämtar datan från Firebase.
        // Varje spel antas innehålla alla egenskaper i GameProps
        // förutom id, eftersom id skapas från Firebase-nyckeln.
        const data = snapshot.val() as Record<string, Omit<GameProps, 'id'>> | null;
        // Om det finns data:
        // Object.entries gör om objektet till en lista med [nyckel, värde].
        // map skapar ett nytt spelobjekt där Firebase-nyckeln blir id.
        // Om det inte finns någon data skapas en tom lista.
        const list = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];
        // Uppdaterar games-state med den hämtade listan.
        setGames(list);
        // Tar bort eventuella tidigare felmeddelanden.
        setError(null);
      },
      // Körs om Firebase inte kan hämta eller läsa datan.
      (err) => {
        // Sparar felmeddelandet så att det kan visas på sidan.
        setError(err.message);
      }
    );
    // Avslutar lyssnaren när komponenten inte längre används.
    return unsubscribe;
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  if (games.length === 0) {
    return <p>Inga spel hittades.</p>;
  }

  return (
    <div>
      {games.map((game) => (
        <OneGame key={game.id} game={game} />
      ))}
    </div>
  );
}
