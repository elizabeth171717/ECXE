import { useState, useContext } from "react";
import CartContext from "../../../pages/contex/CartContext/CartContext";
import "./ProductCard.css";
import ProductOptions from "../ProductOptions/ProductOptions";
import ProductImage from "../ProductImage/ProductImage";
import ProductInfo from "../ProductInfo/ProductInfo"
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
const [selectedColor, setSelectedColor] = useState("");
const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useContext(CartContext);

 const handleAddToCart = () => {
  if (!selectedColor || !selectedSize) {
    alert("Please select a color and size.");
    return;
  }

  const cartItem = {
    id: product.id || product._id,
    name: product.name,
    price: product.prices?.website ?? product.basePrice,
    image: product.image || "",
    color: selectedColor,
    size: selectedSize,
    quantity,
  };

  addToCart(cartItem);
  console.log("Adding to cart:", cartItem);
};

  return (
    <article className="product-card">
      <div className="product-card__image">
        <ProductImage
          image={product.image}
          name={product.name}
        />

        <button
          type="button"
          className={`product-card__favorite ${
            isFavorite ? "product-card__favorite--active" : ""
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        <p className="product-card__stock">
          <span className="product-card__stock-dot"></span>
          In Stock
        </p>
      </div>

      <div className="product-card__content">
        <div className="product-price-name">
          <ProductPrice
            price={product.basePrice}
            salePrice={product.salePrice}
          />

          <ProductInfo name={product.name} />
        </div>
<ProductOptions
  selectedColor={selectedColor}
  onColorChange={setSelectedColor}
  selectedSize={selectedSize}
  onSizeChange={setSelectedSize}
/>
        <ProductQuantity
          quantity={quantity}
          onIncrease={() =>
            setQuantity((current) => current + 1)
          }
          onDecrease={() =>
            setQuantity((current) => Math.max(1, current - 1))
          }
        />

        <AddToCartButton onAddToCart={handleAddToCart} />
      </div>
    </article>
  );
}

export default ProductCard;