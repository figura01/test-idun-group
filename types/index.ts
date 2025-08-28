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
