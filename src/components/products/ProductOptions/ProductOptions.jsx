
import "./ProductOptions.css";

const productOptions = {
  colors: ["Black", "White"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
};

function ProductOptions({
  selectedColor,
  onColorChange,
  selectedSize,
  onSizeChange,
}) {
  return (
    <div className="product-options">
      <div className="product-option">
        <label
          className="product-option__name"
          htmlFor="product-color"
        >
          Color
        </label>

        <select
          id="product-color"
          className="product-option__select"
          value={selectedColor}
          onChange={(event) =>
            onColorChange(event.target.value)
          }
        >
          <option value="" disabled>
            Select a color
          </option>

          {productOptions.colors.map((color) => (
            <option key={color} value={color.toLowerCase()}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="product-option">
        <label
          className="product-option__name"
          htmlFor="product-size"
        >
          Size
        </label>

        <select
          id="product-size"
          className="product-option__select"
          value={selectedSize}
          onChange={(event) =>
            onSizeChange(event.target.value)
          }
          required
        >
          <option value="" disabled>
            Select a size
          </option>

          {productOptions.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ProductOptions;
