const mongoose = require("mongoose");

const checkoutSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cartData: [
    {
      cycle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cycles",
        required: true,
      },
      price: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("checkout", checkoutSchema);


