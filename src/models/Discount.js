import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  applicableCategories: [String],
  minPurchase: Number,
  validUntil: Date,
  maxUses: Number,
  usedCount: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Discount', discountSchema);