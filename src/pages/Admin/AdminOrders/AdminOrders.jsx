
import React, { useEffect, useState, useRef } from "react";
import "./AdminOrders.css";

import { BACKEND_URL } from "../../../constants/constants";

console.log("📦 Backend URL:", BACKEND_URL);

const client = import.meta.env.VITE_CLIENT;

console.log("🏷️ Client tenant:", client);

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchOrderNumber, setSearchOrderNumber] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const receiptRef = useRef(null);

  // Fetch Exce orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/exce/${client}/orders`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch Exce orders");
        }

        const data = await res.json();

        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error("Failed to fetch Exce orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // Search orders locally using actual Exce fields
  const fetchFilteredOrders = () => {
    const name = searchName.trim().toLowerCase();
    const email = searchEmail.trim().toLowerCase();
    const orderNumber = searchOrderNumber.trim().toLowerCase();

    const results = orders.filter((order) => {
      const customerName = order.customerInfo?.name || "";
      const customerEmail = order.customerInfo?.email || "";

      return (
        customerName.toLowerCase().includes(name) &&
        customerEmail.toLowerCase().includes(email) &&
        order._id.toLowerCase().includes(orderNumber)
      );
    });

    setFilteredOrders(results);
  };

  const isSearching =
    searchName.trim() !== "" ||
    searchEmail.trim() !== "" ||
    searchOrderNumber.trim() !== "";

  const displayedOrders = isSearching
    ? filteredOrders
    : orders;

  // Reset search
  const resetSearch = () => {
    setSearchName("");
    setSearchEmail("");
    setSearchOrderNumber("");
    setFilteredOrders([]);
  };

  // Mark order as delivered
  const markAsDelivered = async (orderId) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/exce/${client}/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Delivered" }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      const updatedOrder = await res.json();

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? updatedOrder : o
        )
      );

      setFilteredOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? updatedOrder : o
        )
      );
    } catch (err) {
      console.error("Error updating Exce order:", err);
    }
  };

  // Customer name
  const getCustomerName = (order) =>
    order.customerInfo?.name || "Customer";

  // Item price
  const getItemPrice = (item) =>
    Number(item.salePrice ?? item.price ?? 0);

  // Format delivery address
  const getDeliveryAddress = (address) => {
    if (!address) return "-";

    if (typeof address === "string") return address;

    if (typeof address === "object") {
      return [
        address.fullAddress,
        address.address,
        address.street,
        address.city,
        address.state,
        address.zip,
        address.zipCode,
      ]
        .filter(Boolean)
        .filter((value, index, array) => array.indexOf(value) === index)
        .join(", ") || "-";
    }

    return "-";
  };

  // Print receipt
  const handlePrint = (order) => {
    setSelectedOrderId(order._id);

    setTimeout(() => {
      if (!receiptRef.current) {
        console.error("Receipt not found");
        return;
      }

      const printWindow = window.open("", "_blank");

      if (!printWindow) {
        alert("Please allow pop-ups to print the receipt.");
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Exce Order Receipt</title>

            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 25px;
                color: #222;
              }

              .receipt {
                max-width: 500px;
                margin: auto;
              }

              h2, h3 {
                text-align: center;
              }

              .center {
                text-align: center;
              }

              .item {
                border-bottom: 1px dashed #aaa;
                padding: 10px 0;
              }

              .total {
                font-weight: bold;
                font-size: 18px;
              }

              .design-link {
                overflow-wrap: anywhere;
              }

              img {
                max-width: 150px;
                max-height: 150px;
                object-fit: contain;
              }

              @media print {
                body {
                  padding: 0;
                }
              }
            </style>
          </head>

          <body>
            ${receiptRef.current.innerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    }, 100);
  };

  const selectedOrder =
    orders.find((order) => order._id === selectedOrderId) ||
    filteredOrders.find((order) => order._id === selectedOrderId);

  return (
    <div className="dashboard-container">

      <a href="/admin/dashboard">
        ← Back to Dashboard
      </a>

      <h2 className="dashboard-title">
        Exce Store Orders
      </h2>

      {/* Search Filters */}

      <div className="search-filters">

        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by order #"
          value={searchOrderNumber}
          onChange={(e) =>
            setSearchOrderNumber(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />

        <div className="action-btns">

          <button onClick={fetchFilteredOrders}>
            Search
          </button>

          <button onClick={resetSearch}>
            Reset
          </button>

        </div>

      </div>

      {/* Order Table */}

      <div className="table-wrapper">

        <table className="orders-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Order #</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {displayedOrders.map((order) => {

              const isExpanded =
                selectedOrderId === order._id;

              return (

                <React.Fragment key={order._id}>

                  <tr
                    className="order-row"
                    onClick={() =>
                      setSelectedOrderId(
                        isExpanded ? null : order._id
                      )
                    }
                  >

                    <td>{getCustomerName(order)}</td>

                    <td>{order._id}</td>

                    <td>
                      {order.customerInfo?.email || "-"}
                    </td>

                    <td>
                      ${Number(order.orderTotal || 0).toFixed(2)}
                    </td>

                    <td>

                      {order.status || "Pending"}

                      {order.fulfillment === "delivery" &&
                        order.status === "Pending" && (

                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsDelivered(order._id);
                          }}
                          className="status-btn"
                        >
                          Mark as Delivered
                        </span>

                      )}

                    </td>

                    <td>

                      <button
                        className="print-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrint(order);
                        }}
                      >
                        🖨️ Print
                      </button>

                    </td>

                  </tr>

                  {isExpanded && (

                    <tr className="expanded-row">

                      <td colSpan="6">

                        <div className="expanded-content">

                          <p>
                            <strong>Phone:</strong>{" "}
                            {order.customerInfo?.phone || "-"}
                          </p>

                          <p>
                            <strong>Fulfillment:</strong>{" "}
                            {order.fulfillment || "-"}
                          </p>

                          <p>
                            <strong>Payment Status:</strong>{" "}
                            {order.paymentStatus || "-"}
                          </p>

                          <p>
                            <strong>Items:</strong>
                          </p>

                          <ul>

                            {order.items?.map((item, idx) => {

                              const quantity =
                                Number(item.quantity || 1);

                              const price = getItemPrice(item);

                              return (

                                <li key={idx}>

                                  <strong>
                                    {item.name || "Store item"}
                                  </strong>

                                  <br />

                                  Size: {item.size || "-"}

                                  <br />

                                  Color: {item.color || "-"}

                                  <br />

                                  Quantity: {quantity}

                                  <br />

                                  Unit Price: ${price.toFixed(2)}

                                  <br />

                                  Item Total: $
                                  {(price * quantity).toFixed(2)}

                                  {item.image || item.img ? (
                                    <p>
                                      <img
                                        src={item.image || item.img}
                                        alt={item.name || "Product"}
                                        style={{
                                          maxWidth: "100px",
                                        }}
                                      />
                                    </p>
                                  ) : null}

                                  {item.designType === "customer-upload" && (

                                    <div>
                                      <strong>
                                        Customer Uploaded Design
                                      </strong>

                                      <br />

                                      {item.designUrl && (
                                        <a
                                          href={item.designUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View Uploaded Design
                                        </a>
                                      )}

                                      <p>
                                        {item.designFileName || ""}
                                      </p>
                                    </div>

                                  )}

                                  {item.customProperties?.length > 0 && (
                                    <div>
                                      <strong>Custom Options:</strong>

                                      {item.customProperties.map(
                                        (property, propertyIndex) => (
                                          <p key={propertyIndex}>
                                            {property.key}: {property.value}
                                          </p>
                                        )
                                      )}
                                    </div>
                                  )}

                                </li>

                              );
                            })}

                          </ul>

                          <p>
                            <strong>Shirt Quantity:</strong>{" "}
                            {Number(order.shirtQuantity || 0)}
                          </p>

                          <p>
                            <strong>Subtotal:</strong> $
                            {Number(order.itemsTotal || 0).toFixed(2)}
                          </p>

                          <p>
                            <strong>Shirt Discount:</strong> -$
                            {Number(order.shirtDiscount || 0).toFixed(2)}
                          </p>

                          <p>
                            <strong>Discounted Subtotal:</strong> $
                            {Number(
                              order.discountedItemsTotal ??
                              order.itemsTotal ?? 0
                            ).toFixed(2)}
                          </p>

                          <p>
                            <strong>Tax:</strong> $
                            {Number(order.tax || 0).toFixed(2)}
                          </p>

                          <p>
                            <strong>Delivery Fee:</strong> $
                            {Number(order.deliveryFee || 0).toFixed(2)}
                          </p>

                          <p>
                            <strong>Order Total:</strong> $
                            {Number(order.orderTotal || 0).toFixed(2)}
                          </p>

                          {order.fulfillment === "delivery" && (

                            <p>
                              <strong>Delivery Address:</strong>{" "}
                              {getDeliveryAddress(order.deliveryAddress)}
                            </p>

                          )}

                          {order.createdAt && (

                            <p>
                              <strong>Ordered:</strong>{" "}
                              {new Date(
                                order.createdAt
                              ).toLocaleString("en-US")}
                            </p>

                          )}

                        </div>

                      </td>

                    </tr>

                  )}

                </React.Fragment>

              );
            })}

            {displayedOrders.length === 0 && (

              <tr>
                <td colSpan="6">
                  No orders found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Hidden Receipt for Printing */}

      {selectedOrder && (

        <div
          ref={receiptRef}
          style={{ display: "none" }}
        >

          <div className="receipt">

            <h2>Elizabeth's World</h2>

            <h3>Order Receipt</h3>

            <p className="center">
              Order #: {selectedOrder._id}
            </p>

            <p className="center">
              {selectedOrder.createdAt
                ? new Date(selectedOrder.createdAt).toLocaleString("en-US")
                : ""}
            </p>

            <hr />

            <p>
              <strong>Customer:</strong>{" "}
              {getCustomerName(selectedOrder)}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedOrder.customerInfo?.email || "-"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedOrder.customerInfo?.phone || "-"}
            </p>

            <p>
              <strong>Fulfillment:</strong>{" "}
              {selectedOrder.fulfillment || "-"}
            </p>

            {selectedOrder.fulfillment === "delivery" && (

              <p>
                <strong>Delivery Address:</strong>{" "}
                {getDeliveryAddress(selectedOrder.deliveryAddress)}
              </p>

            )}

            <hr />

            <h3>Order Items</h3>

            {selectedOrder.items?.map((item, idx) => (

              <div className="item" key={idx}>

                <strong>
                  {item.name || "Store item"}
                </strong>

                <p>Size: {item.size || "-"}</p>

                <p>Color: {item.color || "-"}</p>

                <p>Quantity: {item.quantity || 1}</p>

                <p>
                  Unit Price: $
                  {getItemPrice(item).toFixed(2)}
                </p>

                <p>
                  Total: $
                  {(
                    getItemPrice(item) *
                    Number(item.quantity || 1)
                  ).toFixed(2)}
                </p>

                {item.image || item.img ? (

                  <p>
                    <img
                      src={item.image || item.img}
                      alt={item.name || "Product"}
                    />
                  </p>

                ) : null}

                {item.designType === "customer-upload" && (

                  <div className="design-link">

                    <strong>
                      Customer Uploaded Design:
                    </strong>

                    <p>
                      {item.designFileName || ""}
                    </p>

                    <p>
                      {item.designUrl || "Design URL unavailable"}
                    </p>

                  </div>

                )}

                {item.customProperties?.length > 0 && (

                  <div>
                    <strong>Custom Options:</strong>

                    {item.customProperties.map((property, index) => (
                      <p key={index}>
                        {property.key}: {property.value}
                      </p>
                    ))}

                  </div>

                )}

              </div>

            ))}

            <hr />

            <p>
              Subtotal: $
              {Number(selectedOrder.itemsTotal || 0).toFixed(2)}
            </p>

            <p>
              Shirt Quantity:{" "}
              {Number(selectedOrder.shirtQuantity || 0)}
            </p>

            <p>
              Shirt Discount: -$
              {Number(selectedOrder.shirtDiscount || 0).toFixed(2)}
            </p>

            <p>
              Discounted Subtotal: $
              {Number(
                selectedOrder.discountedItemsTotal ??
                selectedOrder.itemsTotal ?? 0
              ).toFixed(2)}
            </p>

            <p>
              Tax: $
              {Number(selectedOrder.tax || 0).toFixed(2)}
            </p>

            <p>
              Delivery Fee: $
              {Number(selectedOrder.deliveryFee || 0).toFixed(2)}
            </p>

            <p className="total">
              Order Total: $
              {Number(selectedOrder.orderTotal || 0).toFixed(2)}
            </p>

            <hr />

            <p className="center">
              Thank you for shopping with Elizabeth's World!
            </p>

          </div>

        </div>

      )}

    </div>
  );
};

export default OrdersPage;
