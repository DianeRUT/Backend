import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Men', 'Women', 'Sports'],
    required: true,
  },
  type: {
    type: String,
    enum: ['shoes', 'accessories'],
    required: true,
  },
  subType: {  // e.g., Nike, Jordan, bags, hats
    type: String,
    required: true,
  },
  sportType: {  // For sports collection
    type: String,
    enum: ['running', 'basketball', 'soccer', 'tennis', 'baseball', 'golf']
  },
  Image:{
    type: Array,
    required:true
   },
   
  sizes: [{
    size: String,
    stock: Number
  }],
  colors: [String],
 
  brand: {
    type: String,
    enum: ['Nike', 'Jordan', 'Versace', 'etc...'],
    required: true
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  }
});

export default mongoose.model('Product', productSchema);