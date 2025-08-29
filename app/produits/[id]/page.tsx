
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/actions/product.actions";
import ProductDetail from "@/components/product/product-detail";

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
    title: `${product.name}`,
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
    <section className="wrapper my-8">
        <div className="grid grid-cols-1 md:grid-cols-5">
            <ProductDetail 
                product={product} 
            />
        </div>
    </section>
  );
}