"use client"

import { useFavorites } from "@/hooks/useFavorites";

import FavoritesTable from "@/components/favorites/favorites-table";

const FavoritesPage = () => {
    const { favorites, countFavorites } = useFavorites();
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">
            Mes favoris ({ countFavorites() })
            </h2>
            {favorites.length > 0 ? (
            <FavoritesTable/>
            ) : (
            <p className="text-gray-500">Aucun produit en favoris</p>
            )}
        </div>
    );
}             

export default FavoritesPage;