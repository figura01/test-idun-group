"use client"

import { Product } from "@/types";
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";

const TableFavoris = () => {
    const { favorites, removeFromFavorites } = useFavorites();

    const renderTableHeader = () => {
        const headers = ['ID','IMAGE', 'NAME', 'CATEGORY', 'PRICE', 'RATING', 'ACTIONS'];

        return (
            <tr>
                {headers.map((header) => (
                    <th key={header} className="border border-gray-200 p-2">{header.toUpperCase()}</th>
                ))}
            </tr>
        );
    };  

    const renderTableRows = () => (
        favorites.length > 0 ? favorites.map((product) => (
            <tr key={product.name}>
                <td className="border border-gray-200 text-center p-2">{product.id}</td>
                <td className="border border-gray-200 flex flex-row justify-center p-2">
                    <Image src={product.image} alt={product.name} width={48} height={48} className=" object-cover" />
                </td>
                <td className="border border-gray-200 text-center p-2">{product.name}</td>
                <td className="border border-gray-200 text-center p-2">{product.category}</td>
                <td className="border border-gray-200 text-center p-2">{product.price} €</td>
                <td className="border border-gray-200 text-center p-2">{product.rating}</td>
                <td className="border border-gray-200 text-center p-2">
                    <button 
                        className="text-red-600 hover:underline"
                        onClick={() => removeFromFavorites(product)}
                    >
                        Supprimer
                    </button>
                </td>
            </tr>
        )) : (
            <tr>
                <td colSpan={7} className="border border-gray-200 text-center p-2">
                    Aucun produit favori
                </td>
            </tr>
        )
    );

  return (
    favorites.length > 0 ? (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    {renderTableHeader()}
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="border border-gray-200 p-4 text-center">
            Aucun produit dans les favoris
        </div>
    )
    );
};

export default TableFavoris;
