// import mongoose from 'mongoose';

// const orderItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   },
//   size: String,
//   color: String,
//   priceAtPurchase: Number
// });

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [orderItemSchema],
//   shippingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     country: String,
//     zipCode: String
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['card', 'paypal', 'cash_on_delivery'],
//     required: true
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'completed', 'failed', 'refunded'],
//     default: 'pending'
//   },
//   orderStatus: {
//     type: String,
//     enum: ['processing', 'shipped', 'delivered', 'cancelled'],
//     default: 'processing'
//   },
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   discountApplied: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Discount'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.model('Order', orderSchema);

import mongoose from "mongoose"

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const Order = mongoose.model("Order", orderSchema)

export default Order

