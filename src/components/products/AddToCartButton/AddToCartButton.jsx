import "./AddToCartButton.css";

function AddToCartButton({ onAddToCart }) {
  return (
    <button
      type="button"
      className="add-to-cart-button"
      onClick={onAddToCart}
      
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;