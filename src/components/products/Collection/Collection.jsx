import ProductGrid from "../ProductGrid/ProductGrid";
import "./Collection.css";

function Collection({ name, products, storeType }) {
  return (
    <section className="collection">
        <h2 className="collection-name">{name}</h2>
 <ProductGrid 
 products={products}   
 storeType={storeType}/>
    
    </section>
  );
}

export default Collection;