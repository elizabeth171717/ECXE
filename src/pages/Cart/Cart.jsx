
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../contex/CartContext/CartContext";
import "./Cart.css";

function Cart({ isOpen, onClose }) {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    clearCart,
    shirtQuantity,
    shirtDiscount
  } = useContext(CartContext);

  // Original cart subtotal
  const itemsTotal = cart.reduce((total, item) => {
    const price = Number(item.salePrice ?? item.price ?? 0);
    return total + price * Number(item.quantity || 1);
  }, 0);

  // Subtotal after automatic discount
  const discountedItemsTotal = Math.max(
    0,
    itemsTotal - shirtDiscount
  );

  const shirtsNeeded = Math.max(0, 4 - shirtQuantity);

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
              >
                {item.designType === "customer-upload" ? (
                  <img
                    src={item.designUrl}
                    alt="Customer's uploaded design"
                    className="cart-drawer__item-image"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-drawer__item-image"
                  />
                )}

                <h2>{item.name}</h2>

                {item.color && (
                  <p>Color: {item.color}</p>
                )}

                {item.size && (
                  <p>Size: {item.size}</p>
                )}

                <p>
                  Price per item: ${Number(item.price).toFixed(2)}
                </p>

                <p>Quantity: {item.quantity}</p>

                <p>
                  <strong>
                    Item total: ${
                      (Number(item.price) * item.quantity).toFixed(2)
                    }
                  </strong>
                </p>

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

          {/* Discount Section - ONLY for eligible shirts */}
          {cart.length > 0 && shirtQuantity > 0 && (
            <div className="cart-drawer__summary">

              {shirtDiscount > 0 ? (
                <>
                 <div className="cart-savings-banner">
  <span className="cart-savings-banner__icon">🎉</span>
  <div>
    <strong>YOU SAVED ${shirtDiscount.toFixed(2)}!</strong>
    <p>Your 4+ shirt discount has been applied!</p>
  </div>
</div>

                  <div className="cart-final-subtotal">
                    <p>
                      Original Subtotal: ${itemsTotal.toFixed(2)}
                    </p>

                    <p>
                      Discount: -${shirtDiscount.toFixed(2)}
                    </p>

                    <strong>
                      Discounted Subtotal: ${
                        discountedItemsTotal.toFixed(2)
                      }
                    </strong>
                  </div>
                </>
              ) : (
                <>
                  <div className="cart-discount-prompt">
                    <strong>Buy 4 shirts and save $10!</strong>
                    <p>
                      Add {shirtsNeeded} more {
                        shirtsNeeded === 1 ? "shirt" : "shirts"
                      } to unlock your discount.
                    </p>
                  </div>

                  <div className="cart-final-subtotal">
                    <strong>
                      Subtotal: ${itemsTotal.toFixed(2)}
                    </strong>
                  </div>
                </>
              )}

            </div>
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
