
import { useState, useEffect } from "react";

import CartContext from "./CartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("elizabethStoreCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("elizabethStoreCart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((currentCart) => [
      ...currentCart,
      product
    ]);
  }

  function removeFromCart(indexToRemove) {
    setCart((currentCart) =>
      currentCart.filter((_, index) => index !== indexToRemove)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;