import { useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import "./Collection.css";

function Collection({ name, products = [], groups = [], storeType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="collection">

      <button
        type="button"
        className="collection-toggle"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
       
        <h2 className="collection-name">{name}</h2>
        
        <span className={`collection-arrow ${isOpen ? "open" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="collection-content">

          {/* Regular section products */}
          {products.length > 0 && (
            <ProductGrid
              products={products}
              storeType={storeType}
            />
          )}

          {/* All groups and their products */}
          {groups.map((group) => (
            <div className="collection-group" key={group.id}>

              <h3>{group.name}</h3>

              <ProductGrid
                products={group.products}
                storeType={storeType}
              />

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default Collection;
