import { Link } from "react-router-dom";
import "./Home.css"


// Defining the component
function HomePage() {
  return (
    <div className="page-container">
     
      <h3>Shop your favorite gifts, and make that special moment unforgettable!</h3>
      <p>Gifts for every occasion for everyone in the family, friends, and classmates!</p>
        
          <section className="store-grid">

        <Link to="/elizabeth-store" className="store-card elizabeth-card">
          <div className="store-card-content">
            <span className="store-number">01 · CREATE</span>
            <h2>Elizabeth's Store</h2>
            <p>Custom Apparel, Business Essentials & More!</p>
            <span className="shop-now">Shop Now <span>→</span></span>
          </div>
          <div className="store-art elizabeth-art">
            <span>👕</span>
            <span>💳</span>
            <span>✨</span>
            <span>🎨</span>
          </div>
        </Link>

        <Link to="/cesia-store" className="store-card cesia-card">
          <div className="store-card-content">
            <span className="store-number">02 · DISCOVER</span>
            <h2>Cesia's Store</h2>
            <p>Candy Bouquets, Toys, Necklaces & Keychains!</p>
            <span className="shop-now">Shop Now <span>→</span></span>
          </div>
          <div className="store-art cesia-art">
            <span>🍭</span>
            <span>🧸</span>
            <span>💖</span>
            <span>🎀</span>
          </div>
        </Link>

        <Link to="/efrain-store" className="store-card efrain-card">
          <div className="store-card-content">
            <span className="store-number">03 · TREAT YOURSELF</span>
            <h2>Efrain's Store</h2>
            <p>Candies, Snacks & Your Favorite Treats!</p>
            <span className="shop-now">Shop Now <span>→</span></span>
          </div>
          <div className="store-art efrain-art">
            <span>🍬</span>
            <span>🍫</span>
            <span>🍭</span>
            <span>🍿</span>
          </div>
        </Link>

      </section>

    </div>
  );
}

export default HomePage;