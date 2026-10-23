import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import CartContext from "../../../pages/contex/CartContext/CartContext";

function Navbar({ onCartOpen }) {
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="logo-container">
      <Link to="/" className="navbar__logo">
       ECXE
      </Link>
</div>
      <div className="navbar__tagline">
        Your Favorite Gift Store
      </div>

      <div className="navbar__actions">
        <Link to="/" className="navbar__home" aria-label="Home">
          🏠
        </Link>

       <button
  type="button"
  className="navbar__cart"
  onClick={onCartOpen}
  aria-label="Shopping cart"
>
  🛒

  {cartCount > 0 && (
    <span className="navbar__cart-count">
      {cartCount}
    </span>
  )}
</button>
      </div>
    </nav>
  );
}

export default Navbar;