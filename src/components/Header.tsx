import styles from '../App.module.css';
import heroImg from '../assets/hero.png';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import FilterPanel, { type FilterValues } from './FilterPanel';
import SearchBar from './SearchBar';

interface HeaderProps {
  value: string;
  onChange: (value: string) => void;
  onFilterChange?: (filters: FilterValues) => void;
}

export default function Header({ value, onChange }: HeaderProps) {
  return (
    <section>
      <div className={styles.hero}>
        <img src={heroImg} className={styles.base} width="170" height="179" alt="" />
        <img src={reactLogo} className={styles.framework} alt="React logo" />
        <img src={viteLogo} className={styles.vite} alt="Vite logo" />
      </div>
      <div>
        <FilterPanel
          onClose={() => {
            console.warn('one close');
          }}
          onApply={(filters: FilterValues) => {
            console.warn('Filter valda:', filters);
          }}
        />
      </div>
      <div>
        <SearchBar value={value} onChange={onChange} />
      </div>
    </section>
  );
}
