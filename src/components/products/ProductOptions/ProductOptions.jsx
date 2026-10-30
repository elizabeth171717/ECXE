
import "./ProductOptions.css";

const productOptions = {
  colors: ["Black", "White"],
  sizes: ["1 y/o", "2 y/o", "3 y/o", "4 y/o", "5 y/o", "6 y/o", "7 y/o", "8 y/o", "9 y/o", "10 y/o", "XS", "S", "M", "L", "XL", "XXL"],
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
