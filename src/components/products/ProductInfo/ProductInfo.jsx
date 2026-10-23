import "./ProductInfo.css";

function ProductInfo({ name, description }) {
  return (
    <div className="product-info">
      <h3 className="product-info__name">{name}</h3>

      {description && (
        <p className="product-info__description">
          {description}
        </p>
      )}
    </div>
  );
}

export default ProductInfo;