import { useState, useContext } from "react";
import CartContext from "../../pages/contex/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const [fulfillment, setFulfillment] = useState("pickup");

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Calculate items total
  const itemsTotal = cart.reduce((total, item) => {
    const price = item.salePrice ?? item.price;

    return total + price * item.quantity;
  }, 0);

  // Tax
  const taxRate = 0.07;
  const tax = itemsTotal * taxRate;

  // Delivery
  const deliveryFee = fulfillment === "delivery" ? 6 : 0;

  // Final total
  const orderTotal = itemsTotal + tax + deliveryFee;

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomerInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setDeliveryAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const order = {
      items: cart,

      fulfillment,

      deliveryAddress:
        fulfillment === "delivery"
          ? deliveryAddress
          : null,

      customerInfo: {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`.trim(),
        email: customerInfo.email,
        phone: customerInfo.phone,
      },

      itemsTotal,
      tax,
      deliveryFee,
      orderTotal,
    };

    console.log("Order:", order);

    // Send the completed order to the payment page
    navigate("/payment", {
      state: {
        orderData: order,
      },
    });
  };

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Your Cart Is Empty</h1>
          <p>Add some products before checking out.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">

        <h1 className="checkout-title">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>

          {/* CART */}
          <section className="checkout-section">
            <h2>Your Cart</h2>

            <div className="checkout-cart">
              {cart.map((item) => {
                const price = item.salePrice ?? item.price;
                const itemTotal = price * item.quantity;

                return (
                  <div
                    className="checkout-cart-item"
                    key={`${item.id}-${item.color}-${item.size}`}
                  >
                    <div className="checkout-cart-item__info">

                      <h3>{item.name}</h3>

                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-drawer__item-image"
                        />
                      )}

                      {item.color && (
                        <p>
                          Color: {item.color}
                        </p>
                      )}

                      {item.size && (
                        <p>
                          Size: {item.size}
                        </p>
                      )}

                      <p>
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <div className="checkout-cart-item__price">
                      ${itemTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FULFILLMENT */}
          <section className="checkout-section">

            <h2>
              How would you like to receive your order?
            </h2>

            <div className="fulfillment-options">

              <label className="fulfillment-option">

                <input
                  type="radio"
                  name="fulfillment"
                  value="pickup"
                  checked={fulfillment === "pickup"}
                  onChange={(event) =>
                    setFulfillment(event.target.value)
                  }
                />

                <span>
                  <strong>Pickup</strong>

                  <small>
                    Hillcrest at Brookhaven Apts,
                    Brookhaven, Georgia
                  </small>
                </span>

              </label>

              <label className="fulfillment-option">

                <input
                  type="radio"
                  name="fulfillment"
                  value="delivery"
                  checked={fulfillment === "delivery"}
                  onChange={(event) =>
                    setFulfillment(event.target.value)
                  }
                />

                <span>
                  <strong>Delivery</strong>

                  <small>
                    Delivery fee: $6.00
                  </small>
                </span>

              </label>

            </div>

            {/* DELIVERY ADDRESS */}
            {fulfillment === "delivery" && (
              <div className="delivery-address">

                <h3>
                  Delivery Address
                </h3>

                <div className="form-group">

                  <label htmlFor="address">
                    Street Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={deliveryAddress.address}
                    onChange={handleAddressChange}
                    required
                  />

                </div>

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="city">
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={deliveryAddress.city}
                      onChange={handleAddressChange}
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label htmlFor="state">
                      State
                    </label>

                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={deliveryAddress.state}
                      onChange={handleAddressChange}
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label htmlFor="zip">
                      ZIP Code
                    </label>

                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      value={deliveryAddress.zip}
                      onChange={handleAddressChange}
                      required
                    />

                  </div>

                </div>

              </div>
            )}

          </section>

          {/* CUSTOMER INFORMATION */}
          <section className="checkout-section">

            <h2>
              Customer Information
            </h2>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="firstName">
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={customerInfo.firstName}
                  onChange={handleCustomerChange}
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="lastName">
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={customerInfo.lastName}
                  onChange={handleCustomerChange}
                  required
                />

              </div>

            </div>

            <div className="form-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleCustomerChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="phone">
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={handleCustomerChange}
                required
              />

            </div>

          </section>

          {/* ORDER SUMMARY */}
          <section className="checkout-section checkout-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>Items</span>
              <span>
                ${itemsTotal.toFixed(2)}
              </span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>
                ${tax.toFixed(2)}
              </span>
            </div>

            <div className="summary-row">

              <span>
                {fulfillment === "delivery"
                  ? "Delivery"
                  : "Pickup"}
              </span>

              <span>
                ${deliveryFee.toFixed(2)}
              </span>

            </div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <span>
                ${orderTotal.toFixed(2)}
              </span>

            </div>

            <button
              type="submit"
              className="checkout-submit"
            >
              Proceed to Payment
            </button>

          </section>

        </form>

      </div>
    </main>
  );
}

export default CheckoutPage;