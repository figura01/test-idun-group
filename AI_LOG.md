# AI_LOG

Renseignez une entrée par usage d’IA.
Copiez votre prompt exact et expliquez ce que vous avez conservé ou modifié.

## Barre de recherche et filtre

Objectif: Récupérer une barre de recherche avec des filtre fonctionnels

Prompt:
fait moi une barre de recherche qui permettra de rechercher les produits par nom avec des filtres par catégories et des tri par prix croissant, prix décroissant, note croissante note décroissante en te basant sur les produit issu du fichier produits .json en utilisant Next.js v15

Extrait adopté:
"use client";

import { useState, useMemo } from "react";
import produitsData from "../../produits.json";

type Product = {
id: number;
name: string;
price: number;
rating: number;
category: string;
image: string;
};

type SortOption =
| "price-asc"
| "price-desc"
| "rating-asc"
| "rating-desc"
| "";

export default function ProduitsPage() {
const [query, setQuery] = useState("");
const [category, setCategory] = useState("");
const [sort, setSort] = useState<SortOption>("");

const categories = Array.from(
new Set(produitsData.map((p) => p.category))
).sort((a, b) => a.localeCompare(b, "fr"));

// produits filtrés et triés
const filtered = useMemo(() => {
let result = produitsData;

    // recherche par nom
    if (query) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // filtre par catégorie
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // tri
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

}, [query, category, sort]);

return (
<div className="p-6 max-w-6xl mx-auto">
<h1 className="text-3xl font-bold mb-6">Catalogue Produits</h1>

      {/* Barre de recherche + filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
      </div>

      {/* Liste produits */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p: Product) => (
            <div
              key={p.id}
              className="border rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="text-blue-600 font-bold">{p.price} €</p>
              <p className="text-yellow-600">★ {p.rating}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun produit trouvé</p>
      )}
    </div>

);
}
Suggestion de l'IA:
Veux-tu que j’ajoute un debounce (300ms) sur la recherche pour éviter de filtrer à chaque frappe ?
Rep: oui

Retrait des types pour les centraliser dans le repertoire type
Vérifications effectuées -> OK // Fonctionnel

## Gestion des produits en favoris

Objectif:Générer un hook pour la gestion des favoris et la mise en memoire

Prompt: Je veux que la liste des favoris soit un tableau d'objet, comme la liste des produits du fichier json en utilisant un hook useFavorites

"use client";

import { useState, useEffect, useCallback } from "react";

// Même type que tes produits du JSON
export type Product = {
id: number;
name: string;
price: number;
rating: number;
category: string;
image: string;
};

export function useFavorites() {
const [favorites, setFavorites] = useState<Product[]>([]);

// Charger favoris au montage depuis localStorage
useEffect(() => {
const saved = localStorage.getItem("favorites");
if (saved) {
try {
setFavorites(JSON.parse(saved) as Product[]);
} catch (err) {
console.error("Erreur de parsing favoris:", err);
}
}
}, []);

// Sauvegarder dans localStorage quand favoris change
useEffect(() => {
localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

// Ajouter / retirer un produit (objet complet)
const toggleFavorite = useCallback((product: Product) => {
setFavorites((prev) => {
const exists = prev.some((fav) => fav.id === product.id);
if (exists) {
return prev.filter((fav) => fav.id !== product.id);
} else {
return [...prev, product];
}
});
}, []);

// Vérifier si un produit est favori
const isFavorite = useCallback(
(id: number) => favorites.some((fav) => fav.id === id),
[favorites]
);

// Retourner le nombre de favoris
const countFavorites = useCallback(() => favorites.length, [favorites]);

return { favorites, toggleFavorite, isFavorite, countFavorites };
}

Exemple d’utilisation dans app/produits/page.tsx
"use client";

import produits from "../../produits.json";
import { useFavorites, Product } from "../../hooks/useFavorites";

export default function ProduitsPage() {
const { favorites, toggleFavorite, isFavorite, countFavorites } = useFavorites();

return (
<div className="p-6 max-w-6xl mx-auto">
<h1 className="text-3xl font-bold mb-6">
Nos Produits (Favoris : {countFavorites()})
</h1>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produits.map((p: Product) => (
          <div
            key={p.id}
            className="border rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="text-blue-600 font-bold">{p.price} €</p>
            <p className="text-yellow-600">★ {p.rating}</p>

            <button
              onClick={() => toggleFavorite(p)}
              className={`mt-3 px-3 py-1 rounded-md text-sm font-medium ${
                isFavorite(p.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isFavorite(p.id) ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
            </button>
          </div>
        ))}
      </div>

      {/* Liste des favoris */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Mes favoris ({countFavorites()})
        </h2>
        {favorites.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <li
                key={fav.id}
                className="border rounded-xl shadow-sm p-4 flex flex-col items-center"
              >
                <img
                  src={fav.image}
                  alt={fav.name}
                  className="w-24 h-24 object-cover rounded-md mb-2"
                />
                <p className="font-semibold">{fav.name}</p>
                <p className="text-sm text-gray-600">{fav.category}</p>
                <p className="text-blue-600 font-bold">{fav.price} €</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun produit en favoris</p>
        )}
      </div>
    </div>

);
}

Modifications: - Split de la parties favoris pour avoir une page dédié aux favoris, - Reprise du code suggérer, pour permettre l'ajout aux favoris également dans la page de catalogue

Vérifications effectuées:
// OK pour l'ajout / supression des favoris
// Fail sur la persistance des données dans le localStorage lors du rechargement de la page
Problème de persistance des données dans le localStorage, correction en utilisant useCallback
