import { Link } from "react-router-dom";
import "./Home.css"


// Defining the component
function HomePage() {
  return (
    <div className="page-container">
      <h1>ECXE</h1>
      <h2>Your favorite Gift store</h2>
      <h3>Shop your favorite gifts, and make that special moment unforgettable!</h3>
      <p>Gifts for every occasion for everyone in the family, friends, and classmates!</p>
         <p>
        Visit <Link to="/cesia-store">Cesia'store</Link>
      </p>
          <p>
        Visit <Link to="/elizabeth-store">Elizabeth'store</Link>
      </p>
          <p>
        Visit <Link to="/efrain-store">Efrain'store</Link>
      </p>

    </div>
  );
}

export default HomePage;