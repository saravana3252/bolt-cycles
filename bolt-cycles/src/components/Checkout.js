import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51QX5XXATNE3jIpp9bvgMfJdRKu6haKZfHIxendRV9LMxzspPNsLBsZE9S9zdfhrXCY7651fuwPrC3rbD6ER6snJ800Tx1rrmhP');

const Checkout = ({ cartData }) => {
  const  loggedIndata  = useContext(UserContext);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle shipping address changes
  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle the checkout process
const handleCheckout = async () => {
  if (!loggedIndata.loggedUser || !loggedIndata.loggedUser.userid) {
    toast.error("User not found. Please log in to proceed.");
    console.log(shippingAddress)
    return;
    
  }

  setIsProcessing(true);

  // Prepare checkout data to be sent to backend
  const checkoutData = {
    userId: loggedIndata.loggedUser.userid, // Make sure the logged-in user's _id is passed
    cartData: cartData.map((item) => ({
      cycleId: item._id, // Ensure cartData uses cycleId
      name: item.name,  // Send product name
description: item.description,  // Send product description
imageUrl: item.imageUrl,  // Send product image URL
price: item.price,  // Send product price
    
    })),
    shippingAddress,
    paymentMethod,
  };

  try {
    if (paymentMethod === "Online") {
      // Call Stripe session creation endpoint for online payment
      const response = await fetch("http://localhost:8000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      if (response.ok) {
        const { sessionId } = data;
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          toast.error("Payment failed: " + error.message);
        }
      } else {
        toast.error("Failed to create Stripe checkout session: " + data.message);
      }
    } else {
      // For COD, directly save the data in the checkout collection
      const response = await fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        toast.success("Order placed successfully with Cash on Delivery!");
      } else {
        const errorData = await response.json();
        toast.error("Failed to place order: " + errorData.message);
      }
    }
  } catch (err) {
    toast.error("An error occurred while processing the checkout: " + err.message);
  } finally {
    setIsProcessing(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Shipping Address</h2>
      
      {/* Shipping Address Form */}
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={shippingAddress.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="address"
          value={shippingAddress.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="zip"
          value={shippingAddress.zip}
          onChange={handleChange}
          placeholder="ZIP Code"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="country"
          value={shippingAddress.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Payment Method Selection */}
      <div className="mt-6">
        <p className="text-lg font-medium text-gray-700 mb-3">Select Payment Method</p>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => handlePaymentMethodChange("COD")}
              className="form-radio text-blue-600"
              
            />
            <span className="ml-2 text-gray-700">Cash on Delivery</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={() => handlePaymentMethodChange("Online")}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">Online Payment</span>
          </label>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className={`w-full px-6 py-3 text-white font-semibold rounded-md ${isProcessing ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
        >
          {isProcessing ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;