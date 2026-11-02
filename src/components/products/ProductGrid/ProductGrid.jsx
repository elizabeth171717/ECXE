import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products, storeType }) {
  return (
      <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          storeType={storeType}
        />
      ))}
    </div>
  );
}

export default ProductGrid;