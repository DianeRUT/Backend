// // models/Category.js
// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const categorySchema = new Schema({
//   name: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   parent: { type: Schema.Types.ObjectId, ref: 'Category' },
//   children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
//   menuPosition: { 
//     type: String, 
//     enum: ['new', 'men', 'women', 'sports'],
//     required: true
//   }
// });

// export default mongoose.model('Category', categorySchema);


import mongoose from "mongoose"

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        name: { type: String, required: true },
        count: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Category = mongoose.model("Category", categorySchema)

export default Category;

