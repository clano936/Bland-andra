import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.searchWrapper}>
      <span className={styles.searchIcon} aria-hidden="true" />

      <input
        className={styles.searchInput}
        type="search"
        placeholder="Sök på spel"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Sök efter spel"
      />
    </div>
  );
}
