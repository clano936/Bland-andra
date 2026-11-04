import { onValue, push, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

import { db } from '../firebase';
import styles from './FirebaseExample.module.css';

interface Game {
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

export default function FirebaseExample() {
  const [students, setStudents] = useState<Game[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 1. Write data
  async function addGame() {
    if (!name) {
      return;
    }
    try {
      await push(ref(db, 'game'), {
        name,
        description: 'description',
        time: '2h',
        people: '4p',
        imageUrl: 'bild',
        spicy: true,
        family: true,
        drinking: false,
        love: false,
        deep: true,
        flexible: true,
        saved: false
      });
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to write to the database.');
    }
  }

  // 2. Read data, live: onValue keeps `students` in sync with the database
  useEffect(() => {
    const studentsRef = ref(db, 'game');
    const unsubscribe = onValue(
      studentsRef,
      (snapshot) => {
        const data = snapshot.val() as Record<string, Omit<Game, 'id'>> | null;
        const list = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];
        setStudents(list);
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div className={styles.studentDemo}>
      <div className={styles.studentForm}>
        <label htmlFor="student-name" className={styles.visuallyHidden}>
          Student name
        </label>
        <input
          id="Game-name"
          type="text"
          placeholder="Game name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              void addGame();
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            void addGame();
          }}
        >
          Add
        </button>
      </div>

      {error && <p className={styles.studentError}>{error}</p>}

      {students.length === 0 ? (
        <p className={styles.studentEmpty}>No students yet - add one above.</p>
      ) : (
        <ul className={styles.studentList}>
          {students.map((game) => (
            <li key={game.id} className={styles.gameListItem}>
              <span>{game.name}</span>
              <span className={styles.studentGrade}>{game.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
