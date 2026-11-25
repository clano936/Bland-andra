import { useState } from 'react';

import logga from '../assets/logga.png';
import type { FilterValues } from '../types/filterValues';
import FilterPanel from './FilterPanel';
import styles from './Header.module.css';
import SearchBar from './SearchBar';

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

export default function Header({
  search,
  onSearchChange,
  filters,
  onFilterChange
}: HeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Bland andra</h1>
      </div>

      <div className={styles.controls}>
        <div className={styles.logoButton}>
          <img
            src={logga}
            className={styles.logo}
            width="52"
            height="52"
            alt="Bland andra"
          />
        </div>

        <SearchBar value={search} onChange={onSearchChange} />

        <button
          type="button"
          className={styles.filterButton}
          onClick={() => setIsFilterOpen((current) => !current)}
          aria-label="Öppna filter"
          aria-expanded={isFilterOpen}
        >
          <span className={styles.filterText}>Filter</span>
        </button>
      </div>

      {isFilterOpen && (
        <FilterPanel
          filters={filters}
          onChange={onFilterChange}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </header>
  );
}
