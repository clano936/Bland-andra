import { useState } from 'react';

import styles from '../App.module.css';
import logga from '../assets/logga.png';
import type { FilterValues } from '../types/filterValues';
import FilterPanel from './FilterPanel';
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
  // Styr om filterpanelen ska synas eller inte
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <section className="header">
      <div className="logo">
        <img src={logga} className={styles.base} width="170" height="179" alt="" />
      </div>
      <div className="serchBar">
        <SearchBar value={search} onChange={onSearchChange} />
      </div>
      <div>
        {/* Knapp som öppnar filterpanelen */}
        <button onClick={() => setIsFilterOpen(!isFilterOpen)}>Filter</button>

        {/* Visa filterpanelen endast när isFilterOpen är true */}
        {isFilterOpen && (
          <FilterPanel
            filters={filters}
            onChange={onFilterChange}
            onClose={() => setIsFilterOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
