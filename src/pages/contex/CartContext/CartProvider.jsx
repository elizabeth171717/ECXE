
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


// Count ONLY products with the matching productType property
const shirtQuantity = cart.reduce((total, item) => {
  const isDiscountEligible = item.customProperties?.some(
    (property) =>
      property.key === "productType" &&
      property.value === "tshirt"
  );

  return isDiscountEligible
    ? total + Number(item.quantity || 1)
    : total;
}, 0);

// Automatic $10 discount starting at 4 qualifying shirts
const shirtDiscount = shirtQuantity >= 4 ? 10 : 0;



 
function addToCart(product) {
  setCart((currentCart) => {
    const existingIndex = currentCart.findIndex((item) =>
      item.id === product.id &&
      item.color === product.color &&
      item.size === product.size &&
      item.designType === product.designType &&
      item.designUrl === product.designUrl
    );

    if (existingIndex !== -1) {
      return currentCart.map((item, index) =>
        index === existingIndex
          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) +
                Number(product.quantity || 1)
            }
          : item
      );
    }

    return [...currentCart, product];
  });
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
      value={{ cart, addToCart, removeFromCart, clearCart, shirtQuantity, shirtDiscount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;