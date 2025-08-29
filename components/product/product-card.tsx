
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";
import { Product } from "@/types";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";


const ProductCard = ({ p }: { p: Product }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    return (
        <>
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
        </>
    );
}
 
export default ProductCard;