import styles from './App.module.css';
import GameList from './components/GameList';
import Header from './components/Header';

function App() {
  return (
    <section className={styles.center}>
      <Header />
      <GameList />
    </section>
  );
}

export default App;
