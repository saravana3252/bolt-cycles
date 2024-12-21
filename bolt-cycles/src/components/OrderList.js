import { useState, useEffect } from "react";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bolt-cycles.onrender.com/checkout")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []); // Added empty dependency array to prevent infinite loop

  function handlePaymentStatusChange(e) {
    fetch(`https://bolt-cycles.onrender.com/checkout/${e.target.value}`, {})
      .then((response) => response.json())
      .then((data) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Order List
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6"
            >
              {/* Order Details */}
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-700">Shipping Address</h3>
                <p className="text-gray-600">{order.shippingAddress.name}</p>
                <p className="text-gray-600">{order.shippingAddress.address}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.zip}, {order.shippingAddress.country}
                </p>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-700">Payment Method</h3>
                <p className="text-gray-600">{order.paymentMethod}</p>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-700">Payment Status</h3>
                <select onChange={handlePaymentStatusChange} value={order.paymentStatus}>
                 <option value={order.paymentStatus}>{order.paymentStatus}</option>
                  {/* <option value="paid">Paid</option> */}
                </select>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-700">Total Amount</h3>
                <p className="text-gray-600">${order.totalAmount}</p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 lg:w-1/2">
                <h3 className="text-xl font-medium text-gray-700">Cart Items</h3>
                <ul className="list-none pl-0">
                  {order.cartData.map((item) => (
                    <li key={item._id} className="text-gray-600 py-2">
                      <strong className="font-semibold">Cycle Id:</strong> {item._id} -{" "}
                      <strong className="font-semibold">Price:</strong> ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;