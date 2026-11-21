export interface GameProps {
  id: string;
  name: string;
  description: string;
  time: number;
  maxPeople: number;
  minPeople: number;
  imageUrl: string;
  categories: {
    spicy: boolean;
    family: boolean;
    drinking: boolean;
    love: boolean;
    deep: boolean;
    flexible: boolean;
    saved: boolean;
  };
  rules: string[];
  hasCards?: boolean;
  cards?: string[];
}
