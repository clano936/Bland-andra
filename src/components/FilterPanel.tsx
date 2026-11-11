
import { useState } from "react";

export interface FilterValues {
    players: number;
    minTime: number;
    maxTime: number;
    categories: string[];
};

interface FilterPanelProps {
    onClose: () => void;
    onApply: (filters: FilterValues) => void;
};

function FilterPanel({ onClose, onApply }: FilterPanelProps) {

    // Player range
    const [players, setPlayers] = useState(2);

    // Game duration
    const [minTime, setMinTime] = useState(5);
    const [maxTime, setMaxTime] = useState(30);

    // Selected categories
    const [categories, setCategories] = useState<string[]>([]);

    // Available categories
    const availableCategories = [
        "Spicy",
        "Family",
        "Drinking",
        "Love",
        "Deep",
        "Flexible"
    ];

    // Handle checkbox selection
    function handleCategoryChange(category: string) {

        if (categories.includes(category)) {
            setCategories(categories.filter(item => item !== category));
        } else {
            setCategories([...categories, category]);
        }

    }

    // Send selected filters to GameLibrary
    function handleApply() {

        onApply({
            players,
            minTime,
            maxTime,
            categories
        });

        onClose();
    }

    // Reset all filters
    function handleReset() {
        setPlayers(2);
        setMinTime(5);
        setMaxTime(30);
        setCategories([]);
    }

    return (
        <div className="filter-overlay" onClick={onClose}>

            <div
                className="filter-panel"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="filter-header">
                    <h2>Filter games</h2>

                    <button onClick={onClose}>
                        Back
                    </button>
                </div>

                {/* Number of players */}
                <h3>Number of players</h3>

                <p>{players} players</p>

                <div className="range-slider">

                    <input
                        type="range"
                        min="2"
                        max="20"
                        value={players}
                        onChange={(e) =>
                            setPlayers(Number(e.target.value))
                        }
                    />

                </div>

                {/* Game duration */}
                <h3>Game duration</h3>

                <p>{minTime} - {maxTime} minutes</p>

                <div className="range-slider">

                    <input
                        type="range"
                        min="5"
                        max="120"
                        value={minTime}
                        onChange={(e) =>
                            setMinTime(Number(e.target.value))
                        }
                    />

                    <input
                        type="range"
                        min="5"
                        max="120"
                        value={maxTime}
                        onChange={(e) =>
                            setMaxTime(Number(e.target.value))
                        }
                    />

                </div>

                {/* Categories */}
                <h3>Categories</h3>

                <div className="category-list">

                    {availableCategories.map((category) => (

                        <label key={category}>

                            <input
                                type="checkbox"
                                checked={categories.includes(category)}
                                onChange={() =>
                                    handleCategoryChange(category)
                                }
                            />

                            {category}

                        </label>

                    ))}

                </div>

                {/* Buttons */}
                <div className="filter-buttons">

                    <button onClick={handleReset}>
                        Reset
                    </button>

                    <button onClick={handleApply}>
                        Apply filters
                    </button>

                </div>

            </div>

        </div>
    );
}

export default FilterPanel;
