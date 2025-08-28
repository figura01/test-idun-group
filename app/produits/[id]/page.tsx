
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/actions/product.actions";
import Image from "next/image";

// ✅ Génération des métadonnées dynamiques
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id));

  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Le produit demandé n'existe pas.",
    };
  }

  return {
    title: `${product.name} - Boutique`,
    description: `Découvrez ${product.name} dans la catégorie ${product.category}, au prix de ${product.price} €.`,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
   const product = await getProductById(Number(params.id));

  if (!product) {
    notFound();
  }

  // Simule un temps de chargement (ex: appel API/DB)
  await new Promise((res) => setTimeout(res, 1000));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow"
          width={384}
          height={256}
        />
        <div className="flex flex-col justify-between">
          <p className="text-lg text-gray-700 mb-2">Catégorie : {product.category}</p>
          <p className="text-2xl font-bold text-blue-600 mb-2">{product.price} €</p>
          <p className="text-yellow-600 text-lg">★ {product.rating}</p>
        </div>
      </div>
    </div>
  );
}