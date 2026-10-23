import "./ProductPrice.css";

function ProductPrice({ price, salePrice }) {
  return (
    <div className="product-price">
      {salePrice ? (
        <>
          <span className="product-price__original">
            ${price}
          </span>

          <span className="product-price__sale">
            ${salePrice}
          </span>
        </>
      ) : (
        <span className="product-price__current">
          ${price}
        </span>
      )}
    </div>
  );
}

export default ProductPrice;