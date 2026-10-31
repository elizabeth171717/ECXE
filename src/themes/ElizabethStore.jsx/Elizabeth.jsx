import { useEffect, useState } from "react";
import Collection from "../../components/products/Collection/Collection";
import { BACKEND_URL } from "../../constants/constants";

const CLIENT_ID = "anahuac";
const STORE_SLUG = "exce-store";

function ElizabethStore() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${STORE_SLUG}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load products (${response.status})`
          );
        }

        const menu = await response.json();

        if (!menu || !Array.isArray(menu.sections)) {
          throw new Error("The store menu has an unexpected format.");
        }

        const loadedCollections = menu.sections.map(
          (section, index) => {
            const ungroupedItems = (section.items || []).filter(
              (item) => item.visible !== false
            );

            const groupedItems = (section.groups || []).flatMap(
              (group) =>
                (group.items || []).filter(
                  (item) => item.visible !== false
                )
            );

            const products = [...ungroupedItems, ...groupedItems].map(
              (item) => ({
                ...item,
                id: item.id || item._id,
                image: item.image || "",
                collectionId: section.id || section._id || index,
              })
            );

            return {
              id: section.id || section._id || index,
              name: section.section,
              products,
            };
          }
        );

        setCollections(loadedCollections);
      } catch (err) {
        console.error("Failed to fetch store products:", err);
        setError(err.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const visibleCollections = collections.filter(
    (collection) => collection.products.length > 0
  );

  if (visibleCollections.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="Store-container">
      <h2 className="Store-title">My World</h2>

      <div className="collections-container">
        {visibleCollections.map((collection) => (
          <Collection
            key={collection.id}
            name={collection.name}
            products={collection.products}
          />
        ))}
      </div>
    </div>
  );
}

export default ElizabethStore;