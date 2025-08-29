import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white text-center p-6">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        🚀 Bienvenue sur {APP_NAME}
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
        Découvrez une expérience moderne construite avec <strong>Next.js (App Router)</strong> : 
        catalogue interactif, recherche intelligente, filtres par catégories, tri avancé et gestion 
        de vos produits favoris persistants. Une base idéale pour tout projet e-commerce !
      </p>

      {/* CTA */}
      <Link
        href="/produits"
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
      >
        🛍️ Voir le catalogue de produits
      </Link>

      {/* Features section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl">
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-bold mb-2">🔎 Recherche intelligente</h2>
          <p className="text-gray-600">
            Trouvez vos produits en un instant grâce à une recherche optimisée avec debounce.
          </p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-bold mb-2">🏷️ Filtres & Tri</h2>
          <p className="text-gray-600">
            Affinez vos résultats par catégorie, prix ou note pour une expérience personnalisée.
          </p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-bold mb-2">❤️ Favoris persistants</h2>
          <p className="text-gray-600">
            Conservez vos produits préférés dans une liste persistante grâce au localStorage.
          </p>
        </div>
      </div>
    </div>
  );
}
