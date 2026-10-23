import ProductGrid from "../ProductGrid/ProductGrid";
import "./Collection.css";

function Collection({ name, products }) {
  return (
    <section className="collection">
        <h2 className="collection-name">{name}</h2>
 <ProductGrid products={products} />
    
    </section>
  );
}

export default Collection;