import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 gap-16 sm:p-10">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold text-center space-y-2 sm:text-left md:text-4xl md:text-center">
          Bienvenue sur {APP_NAME}
        </h1>
        <p className="text-left space-y-2">
          Nous sommes fiers de présenter une nouvelle mini-application web construite avec Next.js, offrant une expérience moderne et fluide pour découvrir, rechercher et gérer vos produits préférés.
        </p>
        <p className="text-1xl font-bold">Fonctionnalités principales :</p>
        <ol className="text-md space-y-2 list-disc list-inside">
          <li>Catalogue interactif : parcourez une sélection de produits affichés sous forme de cartes élégantes.</li>
          <li>Recherche intelligente : trouvez instantanément vos produits grâce à une barre de recherche optimisée avec un debounce.</li>
          <li>Filtrage par catégorie : concentrez-vous uniquement sur les produits qui vous intéressent.</li>
          <li>Tri avancé : classez les produits par prix (croissant/décroissant) ou par note (meilleure/moins bonne).</li>
          <li>Favoris persistants : ajoutez vos produits préférés à une liste personnelle, stockée directement dans votre navigateur via localStorage, pour ne jamais les perdre même après un rafraîchissement.</li>
          <li>Page détail produit : accédez à une fiche complète pour chaque produit avec images, informations, et une gestion automatique du chargement et des erreurs.</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-8">
        <Link href="/produits" className="btn rounded-full px-3 py-1 border border-gray-300 hover:cursor-pointer hover:text-white hover:bg-gray-800">
          Voir tous les produits
        </Link>
      </footer>
    </div>
  );
}
