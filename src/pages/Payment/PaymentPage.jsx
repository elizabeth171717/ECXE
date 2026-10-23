import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe";
import axios from "axios";
import CheckoutForm from "../../components/checkout/CheckoutForm/CheckoutForm"
import { BACKEND_URL } from "../../constants/constants";
import { useContext } from "react";
import CartContext from "../../pages/contex/CartContext/CartContext";
import "./PaymentPage.css";


console.log("📦 Backend URL:", BACKEND_URL);
const client = import.meta.env.VITE_CLIENT;
console.log("🏷️ Client tenant:", client); // should say "rricura"
console.log(
  "📬 Final POST URL:",
  `${BACKEND_URL}/api/exce/${client}/create-payment-intent`
);

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
 const { clearCart } = useContext(CartContext);
  const orderData = location.state?.orderData;

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderData) {
      navigate("/checkout");
      return;
    }

    const createPaymentIntent = async () => {
      try {
        console.log("💳 Creating PaymentIntent...");

        const response = await axios.post(
          `${BACKEND_URL}/api/exce/${client}/create-payment-intent`,
          {
            orderTotal: orderData.orderTotal,
            customerInfo: orderData.customerInfo,
          }
        );


        console.log("✅ PaymentIntent created");

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error(
          "❌ Error creating PaymentIntent:",
          error
        );

        setError(
          "Unable to start payment. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

console.log("📦 Order data being sent:", orderData);
console.log("💵 Total being sent:", orderData?.orderTotal);
console.log("📧 Customer email:", orderData?.customerInfo?.email);


  if (loading) {
    return (
      <main className="payment-page">
        <h1>Loading Payment...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="payment-page">
        <h1>Payment Error</h1>
        <p>{error}</p>

        <button onClick={() => navigate("/checkout")}>
          Back to Checkout
        </button>
      </main>
    );
  }

  return (
    <main className="payment-page">

      <div className="payment-container">

        <h1>
          Payment
        </h1>

        <div className="payment-order-total">
          <strong>
            Total: ${orderData.orderTotal.toFixed(2)}
          </strong>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <CheckoutForm
            orderData={orderData}
            navigate={navigate}
            clearCart={clearCart}
          />
        </Elements>

      </div>

    </main>
  );
}

export default Payment;