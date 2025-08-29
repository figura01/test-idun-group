"use client"

import Image from "next/image";
import Link from "next/link";
import { formatCurrency} from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { Product } from "@/types";
const ProductDetail = ({ product }: { product: Product }) => {
    const { favorites, isFavorite, toggleFavorite } = useFavorites();

    return (  
        <>
            <div className="col-span-1 order-2 md:col-span-2 md:p-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <h2 className="text-lg text-bold text-gray-900 mb-4">{formatCurrency(product.price)}</h2>
                <h3 className="text-md text-gray-500">{product.category}</h3>
                <p className="text-yellow-600 mb-4">Note: ★ {product.rating}</p>
                <div className="flex-start gap-4">
                    <button
                        className={
                            isFavorite(product.id)
                                ? "rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-red-500 hover:text-white transition"
                                : "rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-green-800 hover:text-white transition"
                        }
                        onClick={() => toggleFavorite(product)}
                    >
                        {favorites && isFavorite(product.id) ? "Retirer" : "Ajouter"}
                    </button>
                    <Link href={"/produits"} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-800 hover:text-white transition">
                        Retour Catalogue
                    </Link>
                </div>
        
                
            </div>
            <div className="col-span-1 order-1 md:col-span-3">
                <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto"
                    width={500}
                    height={500} 
                />
            </div>
        </>
    );
}
 
export default ProductDetail;
