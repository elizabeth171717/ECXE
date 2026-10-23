import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../contex/CartContext/CartContext";
import "./Cart.css";

function Cart({ isOpen, onClose }) {
  const navigate = useNavigate();
const {
  cart,
  removeFromCart,
  clearCart
} = useContext(CartContext);

  return (
    <div>
      {isOpen && (
        <div
          className="cart-drawer__overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`cart-drawer ${
          isOpen ? "cart-drawer--open" : ""
        }`}
      >

        {/* Header */}
        <div className="cart-drawer__header">
          <h1>Your Cart</h1>

          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-drawer__content">

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div
                className="cart-drawer__item"
                key={`${item.id}-${index}`}
              ><img
  src={item.image}
  alt={item.name}
  className="cart-drawer__item-image"
/>
                <h2>{item.name}</h2>

                <p>Price: ${item.price}</p>
                <p>Color: {item.color}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                  <button
    type="button"
    className="cart-drawer__remove"
    onClick={() => removeFromCart(index)}
  >
    Remove
  </button>

              </div>
            ))
          )}

        </div>

        {/* Bottom Buttons */}
        {cart.length > 0 && (
          <div className="cart-drawer__actions">

            <button
              type="button"
              className="cart-drawer__checkout"
              onClick={() => {
                navigate("/checkout");
                onClose();
              }}
            >
              Checkout
            </button>

            <button
              type="button"
              className="cart-drawer__continue"
              onClick={onClose}
            >
              Continue Shopping
            </button>
 <button
      type="button"
      className="cart-drawer__clear"
      onClick={clearCart}
    >
      Clear Cart
    </button>
          </div>
        )}

      </aside>
    </div>
  );
}

export default Cart;