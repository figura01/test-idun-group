import { Product } from "@/types";
import ProductCard from "./product-card";

const ProductList = ({ products }: { products: Product[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p: Product) => (
            <div
              key={p.id}
              className="border rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              <ProductCard p={p} />
            </div>
          ))}
        </div>
    );
}
 
export default ProductList;