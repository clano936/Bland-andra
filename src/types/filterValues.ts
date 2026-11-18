export interface FilterValues {
  players: number;
  minTime: number;
  maxTime: number;
  categories: {
    spicy: boolean;
    family: boolean;
    drinking: boolean;
    love: boolean;
    deep: boolean;
    flexible: boolean;
    saved: boolean;
  };
}
