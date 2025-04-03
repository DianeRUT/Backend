// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//   },
//   description: String,
//   price: {
//     type: Number,
//     required: true,
//   },
//   category: {
//     type: String,
//     enum: ["Men", "Women", "Sports"],
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ['shoes', 'accessories'],
//     required: true,
//   },
//   subType: {  // e.g., Nike, Jordan, bags, hats
//     type: String,
//     required: true,
//   },
//   sportType: {  // For sports collection
//     type: String,
//     enum: ['running', 'basketball', 'soccer', 'tennis', 'baseball', 'golf']
//   },
//   Image:{
//     type: Array,
//     required:true
//    },
   
//   sizes: [{
//     size: String,
//     stock: Number
//   }],
//   colors: [String],
 
//   brand: {
//     type: String,
//     enum: ['Nike', 'Jordan', 'Versace', 'etc...'],
//     required: true
//   },
//   discount: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Discount'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   ratingsAverage: {
//     type: Number,
//     default: 4.5
//   }
// });

// export default mongoose.model('Product', productSchema);

import mongoose from "mongoose"

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: String,
      default: null,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: [String],
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model("Product", productSchema)

export default Product

