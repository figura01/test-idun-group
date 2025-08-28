import data from "@/data/produits.json";

export const getProducts = async () => {
  return await data;
};

export const getProductById = async (id: number | string) => {
  return await data.find((produit) => produit.id === Number(id));
};
