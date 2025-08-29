"use client";

import { useState, useMemo, useEffect, use } from "react";
import { getProducts } from "@/lib/actions/product.actions";
import { useDebounce } from "@/hooks/useDebounce";
import { useFavorites } from "@/hooks/useFavorites";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Product, SortOption } from '@/types';

export default function ProduitsPage() {
const { toggleFavorite, isFavorite } = useFavorites();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortOption>("");
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState<Product[]>([]);


  const debouncedQuery = useDebounce(query, 300);

  // Active le loading quand l’utilisateur tape
  useEffect(() => {
    if (query) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [query]);

  // Arrête le loading quand le debounce est appliqué
  useEffect(() => {
    setLoading(false);
  }, [debouncedQuery, category, sort]);

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      setTimeout(async () => {
        setProductsData(await getProducts());
        setLoading(false);
      }, 300);
    };

    fetchData();
  }, []);


  const categories = Array.from(
    new Set(productsData.map((p) => p.category))
  ).sort((a, b) => a.localeCompare(b, "fr"));

  const filtered = useMemo(() => {
    let result = productsData;

    if (debouncedQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "rating-asc") {
      result = [...result].sort((a, b) => a.rating - b.rating);
    } else if (sort === "rating-desc") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [productsData, debouncedQuery, category, sort]);

  // Bouton pour annuler la recherche
  const resetSearch = () => {
    setQuery("");
    setCategory("");
    setSort("");
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Catalogue Produits</h1>

      {/* Barre de recherche + filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md"
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
          className="border p-2 rounded-md"
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

      {/* Loader */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span>Recherche en cours...</span>
        </div>
      )}

      {/* Liste produits */}
      {!loading && filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p: Product) => (
            <div
              key={p.id}
              className="border rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              <Image
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md mb-3"
                width={400}
                height={160}
              />
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="text-blue-600 font-bold">{formatCurrency(p.price)}</p>
              <p className="text-yellow-600">★ {p.rating}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleFavorite(p)}
                  className={`text-sm font-semibold ${
                    isFavorite(p.id) ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {isFavorite(p.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                </button>

                <Link 
                    href={`/produits/${p.id}`} 
                    className="text-sm rounded-full text-gray-900 border px-3 py-2 border-gray-900 hover:bg-gray-900 hover:text-white transition"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500">Aucun produit trouvé</p>
      )}
    </div>
  );
}