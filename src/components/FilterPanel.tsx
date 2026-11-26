import type { FilterValues } from '../types/filterValues';

interface FilterPanelProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onClose: () => void;
}

function FilterPanel({ filters, onChange, onClose }: FilterPanelProps) {
  function handleCategoryChange(category: keyof FilterValues['categories']) {
    onChange({
      ...filters,
      categories: {
        ...filters.categories,
        [category]: !filters.categories[category]
      }
    });
  }
  function handleReset() {
    onChange({
      players: 2,
      minTime: 5,
      maxTime: 15,
      categories: {
        spicy: false,
        family: false,
        drinking: false,
        love: false,
        deep: false,
        flexible: false,
        saved: false
      }
    });
  }
  const categoryNames = [
    'spicy',
    'family',
    'drinking',
    'love',
    'deep',
    'flexible'
  ] as const;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-panel" onClick={(e) => e.stopPropagation()}>
        <div className="filter-header">
          <h2>Filter games</h2>

          <button onClick={onClose}>Back</button>
        </div>

        {/* Number of players */}
        <h3>Number of players</h3>

        <p>{filters.players} players</p>

        <div className="range-slider">
          <input
            type="range"
            min="2"
            max="20"
            value={filters.players}
            onChange={(e) => onChange({ ...filters, players: Number(e.target.value) })}
          />
        </div>

        {/* Game duration */}
        <h3>Game duration</h3>

        <p>
          {filters.minTime} - {filters.maxTime} minutes
        </p>

        <div className="range-slider">
          <input
            type="range"
            min="5"
            max="15"
            value={filters.minTime}
            onChange={(e) => onChange({ ...filters, minTime: Number(e.target.value) })}
          />
        </div>
        <div className="range-slider">
          <input
            type="range"
            min="5"
            max="15"
            value={filters.maxTime}
            onChange={(e) => onChange({ ...filters, maxTime: Number(e.target.value) })}
          />
        </div>

        {/* Categories */}
        <h3>Categories</h3>

        <div className="category-list">
          {categoryNames.map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={filters.categories[cat]}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="filter-buttons">
          <button onClick={handleReset}>Reset</button>
          <button onClick={onClose}>Klar</button>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
