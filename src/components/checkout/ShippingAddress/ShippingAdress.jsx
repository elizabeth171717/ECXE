import React from "react";
import "./ShippingAdress.css";

function ShippingAdress({ shippingAddress, setShippingAddress }) {
  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setShippingAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <section className="delivery-component">
      <h3>Delivery Address</h3>

      <div className="delivery-form-group">
        <label htmlFor="address">Street Address</label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          value={shippingAddress.address}
          onChange={handleAddressChange}
          placeholder="Enter your street address"
          required
        />
      </div>

      <div className="delivery-form-group">
  <label htmlFor="apartment">
    Apartment / Suite / Building (Optional)
  </label>

  <input
    id="apartment"
    name="apartment"
    type="text"
    autoComplete="address-line2"
    value={shippingAddress.apartment}
    onChange={handleAddressChange}
    placeholder="Apartment number, building, suite, etc."
  />
</div>

      <div className="delivery-form-row">
        <div className="delivery-form-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={shippingAddress.city}
            onChange={handleAddressChange}
            placeholder="City"
            required
          />
        </div>

        <div className="delivery-form-group">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            type="text"
            autoComplete="address-level1"
            value={shippingAddress.state}
            onChange={handleAddressChange}
            placeholder="State"
            required
          />
        </div>

        <div className="delivery-form-group">
          <label htmlFor="zip">ZIP Code</label>
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            pattern="[0-9]{5}"
            value={shippingAddress.zip}
            onChange={handleAddressChange}
            placeholder="ZIP"
            required
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingAdress;
