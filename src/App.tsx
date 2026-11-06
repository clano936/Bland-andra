import styles from './App.module.css';
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import GameList from './components/GameList';

function App() {
  return (
    <>
      <section className={styles.center}>
        <div className={styles.hero}>
          <img src={heroImg} className={styles.base} width="170" height="179" alt="" />
          <img src={reactLogo} className={styles.framework} alt="React logo" />
          <img src={viteLogo} className={styles.vite} alt="Vite logo" />
        </div>
        <div>
          <h1>Jippi</h1>
          <p>
            A starter template wiring up <code>React</code> and{' '}
            <code>Firebase Realtime Database</code>, served with <code>Vite</code> for
            instant HMR.
          </p>
        </div>

        <GameList />
      </section>

      <section className={styles.nextSteps}>
        <div className={styles.social}>
          <svg className={styles.icon} role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon" />
          </svg>
          <h2>Source code</h2>
          <p>See how each part of the stack is built</p>
          <ul>
            <li>
              <a
                href="https://github.com/facebook/react"
                target="_blank"
                rel="noreferrer"
              >
                <img className={styles.buttonIcon} src={reactLogo} alt="" />
                React
              </a>
            </li>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                <img className={styles.buttonIcon} src={viteLogo} alt="" />
                Vite
              </a>
            </li>
            <li>
              <a
                href="https://github.com/firebase/firebase-js-sdk"
                target="_blank"
                rel="noreferrer"
              >
                <svg className={styles.buttonIcon} role="presentation" aria-hidden="true">
                  <use href="/icons.svg#firebase-icon" />
                </svg>
                Firebase SDK
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className={styles.ticks} />
      <section className={styles.spacer} />
    </>
  );
}

export default App;
