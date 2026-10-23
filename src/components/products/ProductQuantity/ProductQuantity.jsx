import "./ProductQuantity.css";

function ProductQuantity({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="product-quantity">
      <button
        type="button"
        className="product-quantity__button"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        −
      </button>

      <span className="product-quantity__value">
        {quantity}
      </span>

      <button
        type="button"
        className="product-quantity__button"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}

export default ProductQuantity;