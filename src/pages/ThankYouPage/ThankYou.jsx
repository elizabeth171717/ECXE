import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="thank-you-page">
      <h1>Thank You for Your Order!</h1>
      <p>We received your order and are working on it.</p>
    </main>
  );
}

export default ThankYou;