import "./ProductImage.css";

function ProductImage({ image, name }) {
  return (
    <div className="product-image">
      <img
        src={image}
        alt={name}
        className="product-image__img"
      />
    </div>
  );
}

export default ProductImage;