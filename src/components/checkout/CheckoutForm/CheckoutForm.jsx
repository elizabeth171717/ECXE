import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BACKEND_URL } from "../../../constants/constants"
import "./CheckoutForm.css"
const CLIENT = import.meta.env.VITE_CLIENT;

function CheckoutForm({ orderData, navigate, clearCart  }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      console.log("💳 Confirming Stripe payment...");

      const { error, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });

      if (error) {
        console.error("❌ Payment failed:", error);

        setMessage(error.message);

        setLoading(false);

        return;
      }

      if (
        paymentIntent &&
        paymentIntent.status === "succeeded"
      ) {
        console.log(
          "✅ Stripe payment succeeded:",
          paymentIntent.id
        );

        // Send successful payment to backend
        // Backend will verify the payment with Stripe
        // and save the order.
        await axios.post(
          `${BACKEND_URL}/api/exce/${CLIENT}/payment`,
          {
            paymentIntentId: paymentIntent.id,
            orderData,
          }
        );

        console.log("✅ Order saved successfully");
clearCart();
        navigate("/thank-you", {
          state: {
            orderData,
          },
        });
      }
    } catch (error) {
      console.error(
        "❌ Error processing payment:",
        error
      );

      setMessage(
        "Payment succeeded, but there was a problem saving your order. Please contact us."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <PaymentElement />

      {message && (
        <p className="payment-error">
          {message}
        </p>
      )}

      <button
      className="pay-btn"
        type="submit"
        disabled={!stripe || !elements || loading}
      >
        {loading
          ? "Processing..."
          : "Pay Now"}
      </button>

    </form>
  );
}

export default CheckoutForm;