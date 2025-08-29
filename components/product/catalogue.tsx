"use client";
import { useState, useMemo, useEffect } from "react";
import { getProducts } from "@/lib/actions/product.actions";
import { useDebounce } from "@/hooks/useDebounce";
import { Product, SortOption } from '@/types';
import Searchbar from "@/components/product/serchbar";
import ProductList from "@/components/product/product-list";

const Catalogue = () => {
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
    <div className="max-w-6xl mx-auto">


      <Searchbar
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        resetSearch={resetSearch}
        categories={categories}
      />

      {/* Loader */} 
      {loading && (
        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span>Recherche en cours...</span>
        </div>
      )}
      
      {/* Liste produits */} 
      {!loading && filtered.length > 0 ? (
        <ProductList products={filtered} />
      ) : (
        !loading && <p className="text-gray-500">Aucun produit trouvé</p>
      )} 
    </div>
  );
}

export default Catalogue;