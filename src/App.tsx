import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

import styles from './App.module.css';
//import FilterPanel from './components/FilterPanel';
import GameList from './components/GameList';
import Header from './components/Header';
import { db } from './firebase';
import type { FilterValues } from './types/filterValues';
import type { GameProps } from './types/game';

const initialFilters: FilterValues = {
  players: 2,
  minTime: 5,
  maxTime: 120,
  categories: {
    spicy: false,
    family: false,
    drinking: false,
    love: false,
    deep: false,
    flexible: false,
    saved: false
  }
};

function App() {
  // State som innehåller alla spel som hämtas från Firebase.
  // Börjar som en tom lista.
  const [games, setGames] = useState<GameProps[]>([]);
  // State som sparar ett eventuellt felmeddelande från Firebase.
  // null betyder att det inte finns något fel.
  const [error, setError] = useState<string | null>(null);
  // useEffect körs när komponenten monteras.
  // Den tomma beroendelistan [] gör att den inte körs vid varje rendering.
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
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
        setLoading(false);
      },
      // Körs om Firebase inte kan hämta eller läsa datan.
      (err) => {
        // Sparar felmeddelandet så att det kan visas på sidan.
        setError(err.message);
        setLoading(false);
      }
    );
    // Avslutar lyssnaren när komponenten inte längre används.
    return unsubscribe;
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>Hämtar spel från databasen...</p>;
  }

  if (games.length === 0) {
    return <p>Inga spel hittades.</p>;
  }

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    const selectedCategories = Object.entries(filters.categories)
      .filter(([category, selected]) => selected && category !== 'saved')
      .map(([category]) => category as keyof typeof game.categories);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) => game.categories[cat]);

    return matchesCategory;
  });

  return (
    <section className={styles.center}>
      <Header
        search={search}
        onSearchChange={setSearch}
        onFilterChange={setFilters}
        filters={filters}
      />
      <GameList games={filteredGames} loading={loading} />
    </section>
  );
}

export default App;
