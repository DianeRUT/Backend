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