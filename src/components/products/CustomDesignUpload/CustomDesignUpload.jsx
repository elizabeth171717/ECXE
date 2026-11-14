
import { useState, useContext } from "react";
import CartContext from "../../../pages/contex/CartContext/CartContext";
import ProductOptions from "../ProductOptions/ProductOptions";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { BACKEND_URL } from "../../../constants/constants";
import Modal from "../../../components/common/Modal/Modal";
import "./CustomDesignUpload.css";

const CLIENT_ID = "exceStore";

function CustomDesignUpload() {
  const [isOpen, setIsOpen] = useState(false);
  const [designFile, setDesignFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [uploading, setUploading] = useState(false);
const [modalOpen, setModalOpen] = useState(false);
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

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setDesignFile(file);

    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleAddToCart = async () => {
    if (!designFile) {
      alert("Please upload your design.");
      return;
    }

    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("design", designFile);

      const response = await fetch(
        `${BACKEND_URL}/api/exce/${CLIENT_ID}/upload-design`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to upload your design.");
      }

      const cartItem = {
        id: `custom-design-${Date.now()}`,
        name: "Custom Design T-Shirt",
        price: 16,
        image: "",
        color: selectedColor,
        size: selectedSize,
        quantity,
        designType: "customer-upload",
        designFileName: designFile.name,
        designUrl: result.url,
      };

      addToCart(cartItem);

      setModalOpen(true);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setDesignFile(null);
      setPreviewUrl("");
      setSelectedColor("");
      setSelectedSize("");
      setQuantity(1);
      setIsOpen(false);

    } catch (error) {
      console.error("Custom design upload error:", error);
      alert(error.message || "Something went wrong uploading your design.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="custom-design">
      {!isOpen ? (
        <div className="custom-design__intro">
          <h3>Have Your Own Design?</h3>
          <p>
            Upload your artwork and let us print it on your T-shirt!
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
              disabled={uploading}
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
              disabled={uploading}
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

          <div className="steps-container">

          <ProductOptions
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />

          <ProductQuantity
            quantity={quantity}
            onIncrease={() => setQuantity(current => current + 1)}
            onDecrease={() => setQuantity(current => Math.max(1, current - 1))}
          />

          {uploading && (
            <p className="custom-design__uploading">
              Uploading your design... Please wait.
            </p>
          )}

          <AddToCartButton
            onAddToCart={handleAddToCart}
            disabled={uploading}
          />
        </div>
        
        </div>
        
      )}
      <Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
>
  <h2>ADDED TO CART!</h2>
  <p>Your custom shirt has been added to your cart.</p>
</Modal>
    </section>
  );
}

export default CustomDesignUpload;
