import { SortOption } from "@/types";

const Searchbar = ({
  query,
  setQuery,
  category,
  setCategory,
  sort,
  setSort,
  resetSearch,
  categories
} : {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  resetSearch: () => void;
  categories: string[];
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded-md w-full md:flex-1"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md w-full w-full md:w-auto"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border p-2 rounded-md w-full md:w-auto"
        >
          <option value="">Aucun tri</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating-asc">Note croissante</option>
          <option value="rating-desc">Note décroissante</option>
        </select>

        {query || category || sort ? (
          <button
            onClick={resetSearch}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Annuler
          </button>
        ) : null}
      </div>
    );
}
 
export default Searchbar;