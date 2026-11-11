import styles from '../App.module.css';
import heroImg from '../assets/hero.png';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';

export default function Header() {
  return (
    <div className={styles.hero}>
      <img src={heroImg} className={styles.base} width="170" height="179" alt="" />
      <img src={reactLogo} className={styles.framework} alt="React logo" />
      <img src={viteLogo} className={styles.vite} alt="Vite logo" />
    </div>
  );
}
