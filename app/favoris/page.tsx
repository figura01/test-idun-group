"use client"

import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

const FavoritesPage = () => {
    const { favorites, countFavorites } = useFavorites();
    return (
        <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Mes favoris ({ countFavorites() })
        </h2>
        {favorites.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6">
            {favorites.map((fav) => (
              <li
                key={fav.id}
                className="shadow-sm p-4 flex flex-row items-center w-full gap-4"
              >
                <Image
                  src={fav.image}
                  alt={fav.name}
                  className="w-24 h-24 object-cover rounded-md mb-2"
                  width={96}
                  height={96}
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
    );
}

export default FavoritesPage;