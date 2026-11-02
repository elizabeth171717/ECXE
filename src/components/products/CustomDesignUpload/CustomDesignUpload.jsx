
import { useState, useContext } from "react";
import CartContext from "../../../pages/contex/CartContext/CartContext";
import ProductOptions from "../ProductOptions/ProductOptions";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import "./CustomDesignUpload.css";

function CustomDesignUpload() {
  const [isOpen, setIsOpen] = useState(false);
  const [designFile, setDesignFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PNG, JPG, or PDF file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Your file must be smaller than 10MB.");
      event.target.value = "";
      return;
    }

    setDesignFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleAddToCart = () => {
    if (!designFile) {
      alert("Please upload your design.");
      return;
    }

    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size.");
      return;
    }

    const cartItem = {
      id: `custom-design-${Date.now()}`,
      name: "Custom Design T-Shirt",
      price: 0,
      image: "",
      color: selectedColor,
      size: selectedSize,
      quantity,
      designType: "customer-upload",
      designFileName: designFile.name,
      designFile: designFile,
      designUrl: null,
    };

    addToCart(cartItem);

    alert("Your custom shirt has been added to your cart!");

    setDesignFile(null);
    setPreviewUrl("");
    setSelectedColor("");
    setSelectedSize("");
    setQuantity(1);
    setIsOpen(false);
  };

  return (
    <section className="custom-design">

      {!isOpen ? (
        <div className="custom-design__intro">
          <h3>Have Your Own Design?</h3>

          <p>
            Upload your artwork and let us print it on
            your favorite T-shirt!
          </p>

          <button
            type="button"
            className="custom-design__open-button"
            onClick={() => setIsOpen(true)}
          >
            Upload Your Own Design
          </button>
        </div>
      ) : (
        <div className="custom-design__form">

          <div className="custom-design__header">
            <h3>Customize Your T-Shirt</h3>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close customization"
            >
              ✕
            </button>
          </div>

          <div className="custom-design__upload">
            <label htmlFor="custom-design-file">
              Upload Your Artwork
            </label>

            <input
              id="custom-design-file"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
            />

            {designFile && (
              <p className="custom-design__filename">
                {designFile.name}
              </p>
            )}

            {previewUrl && (
              <div className="custom-design__preview">
                <img
                  src={previewUrl}
                  alt="Your uploaded design preview"
                />
              </div>
            )}

            <p className="custom-design__notice">
              Your artwork will be printed exactly as submitted.
              No editing or modifications are included.
            </p>
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
      )}

    </section>
  );
}

export default CustomDesignUpload;
