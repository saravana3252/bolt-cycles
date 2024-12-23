import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingIndex, setIsEditingIndex] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const loggedIndata = useContext(UserContext);

  useEffect(() => {
    fetch("https://bolt-cycles.onrender.com/checkout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${loggedIndata.loggedUser.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [loggedIndata.loggedUser.token]);

  function toggleEditing(index) {
    setIsEditingIndex(index);
    setPaymentStatus(orders[index].paymentStatus);
  }


  function toggleEditingCancel() {
    setIsEditingIndex(false);
    setPaymentStatus("");
    
  }

  function handleInputChange(e) {
    setPaymentStatus(e.target.value);
  }

  function handleUpdate(orderId) {
    fetch(
      `https://bolt-cycles.onrender.com/updatepaymentstatus/${orderId}/${paymentStatus}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(() => {
        toast.success("Payment status updated", {
          position: "bottom-left",
          autoClose: 3000,
        });
        setIsEditingIndex(false);
        // Optionally, refresh the order list here
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-7xl mx-auto p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Order List
        </h1>
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6 pb-10">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6"
              >
                {/* Left Section - Shipping and Payment Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                      Shipping Address
                    </h3>
                    <p className="text-gray-600">{order.shippingAddress.name}</p>
                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.zip},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                      Payment Method
                    </h3>
                    <p className="text-gray-600">{order.paymentMethod}</p>
                  </div>
                </div>

                {/* Middle Section - Payment Status and Cart Items */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                      Payment Status
                    </h3>
                    {isEditingIndex === index ? (
                      <input
                        type="text"
                        placeholder="Enter payment status"
                        className="outline-none border border-gray-400 rounded p-2 w-full"
                        value={paymentStatus}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-gray-600">{order.paymentStatus}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                      Cart Items
                    </h3>
                    <ul className="list-none pl-0 space-y-2">
                      {order.cartData.map((item) => (
                        <li
                          key={item._id}
                          className="text-gray-600 flex justify-between items-center"
                        >
                          <span>
                            <strong>product Id:</strong> {item._id}
                          </span>
                          <span>
                            <strong>Price:</strong> ${item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Section - Total Amount and Actions */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                      Total Amount
                    </h3>
                    <p className="text-gray-600 text-2xl font-bold">
                      ${order.totalAmount}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    {isEditingIndex === index ? (
                      <>
                        <button
                          className="bg-green-500 text-white p-2 rounded-md w-full"
                          onClick={() => handleUpdate(order._id)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-gray-400 text-white p-2 rounded-md w-full"
                          onClick={toggleEditingCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md w-full"
                        onClick={() => toggleEditing(index)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default OrderList;
