import { Metadata } from "next";
import Catalogue from "@/components/product/catalogue";

export const metadata: Metadata = {
  title: "Catalogue",
};

export default function ProduitsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Catalogue Produits</h1>
        <Catalogue />
    </div>
  );
}