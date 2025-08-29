export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
};

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "rating-asc"
  | "rating-desc"
  | "";

export type SearchbarProps = {
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  categories: string[];
  resetSearch: () => void;
};
