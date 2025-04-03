// import Product from '../models/Product.js';
// import APIFeatures from '../utils/APIFeatures.js';
// import cloudinary from "../Utils/Cloudinary.js";

// export const addProduct = async (req, res) => {
//   try {
//     console.log("CreateProduct controller reached");

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//   }

//    // Upload image to Cloudinary
//    const result = await cloudinary.uploader.upload(req.file.path);
//    console.log("File received:", req.file);
//    console.log("Cloudinary URL:", result.secure_url);

//    const {name, price, category, type, subType, sportType, sizes, colors, Image, brand, discount, ratingsAverage, status}=req.body
//     const newProduct=new Product ({name, price, category, type, subType, sportType, sizes, colors, Image:result.secure_url, brand, discount, ratingsAverage, status})
   
//     await newProduct.save();
     
//     res.status(201).json({success: true, message: "Product created succefully", Product:newProduct})
//   }
    
//   catch(error){
//     res.status(500).json({success: false, message: "server error", error: error.message})
// }
  
// };

// export const getAllProduct=async(req,res)=>{
//   try{

//       const products= await Product.find()
//       res.status(200).json({success:true, products})
//   }
//   catch(error){
// res.status(500).json({success: false, message: "server error", error: error.message})
//   }
// }


// export const getFilteredProducts = async (req, res) => {
//   try {
//     const features = new APIFeatures(Product.find(), req.query)
//       .filter()
//       .sort()
//       .limitFields()
//       .paginate();

//     const products = await features.query;

//     res.status(200).json({
//       status: 'success',
//       results: products.length,
//       data: products
//     });
//   } catch (err) {
//     res.status(400).json({ message: 'Error fetching products' });
//   }
// };



// // Special endpoint for new arrivals
// export const getNewArrivals = async (req, res) => {
//   try {
//     const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
//     const products = await Product.find({
//       createdAt: { $gte: thirtyDaysAgo }
//     }).sort('-createdAt');

//     res.status(200).json({
//       status: 'success',
//       results: products.length,
//       data: products
//     });
//   } catch (err) {
//     res.status(400).json({ message: 'Error fetching new arrivals' });
//   }
// };

// export const getProductById = async (req, res) => {
//   try {
//       const { id } = req.params;
//     const products = await Product.findById(id);

//     if (!products) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// }

// export const deleteProductById = async (req, res) => {
//   try {
    
//     const id = req.params.id; 

//     if (!id) {
//       return res.status(400).json({ success: false, message: "Invalid ID" });
//     }

//     const deletedProduct = await Product.findByIdAndDelete(id);

//     if (!deletedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.status(200).json({ success: true, message: "Product deleted successfully" });
//   } catch (error) {

//     console.error("Error deleting product:", error); 
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// }

// export const updateProductById = async (req, res) => {
//   try {
//     console.log("Received request params:", req.params); 
//     console.log("Received request body:", req.body); 

//     const { id } = req.params; 
//     const updatedData = req.body; 

//     if (!id) {
//       return res.status(400).json({ success: false, message: "Invalid ID" });
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
//   } catch (error) {
//     console.error("Error updating product:", error); 
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };



import expressAsyncHandler from "express-async-handler"
import Product from "../models/Product.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}

  const category = req.query.category ? { category: req.query.category } : {}
  const type = req.query.type ? { type: req.query.type } : {}
  const brand = req.query.brand ? { brand: req.query.brand } : {}
  const gender = req.query.gender ? { gender: req.query.gender } : {}
  const isNew = req.query.isNew ? { isNew: true } : {}

  const minPrice = req.query.minPrice ? { price: { $gte: Number(req.query.minPrice) } } : {}
  const maxPrice = req.query.maxPrice ? { price: { $lte: Number(req.query.maxPrice) } } : {}

  // Combine all filters
  const filters = {
    ...keyword,
    ...category,
    ...type,
    ...brand,
    ...gender,
    ...isNew,
    ...minPrice,
    ...maxPrice,
  }

  const count = await Product.countDocuments(filters)
  const products = await Product.find(filters)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    type,
    image,
    description,
    price,
    originalPrice,
    discount,
    isNew,
    gender,
    countInStock,
  } = req.body

  const product = new Product({
    name,
    brand,
    category,
    type,
    image,
    description,
    price,
    originalPrice,
    discount,
    isNew,
    gender,
    countInStock,
    user: req.user._id,
    rating: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    type,
    image,
    description,
    price,
    originalPrice,
    discount,
    isNew,
    gender,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name || product.name
    product.brand = brand || product.brand
    product.category = category || product.category
    product.type = type || product.type
    product.image = image || product.image
    product.description = description || product.description
    product.price = price || product.price
    product.originalPrice = originalPrice || product.originalPrice
    product.discount = discount !== undefined ? discount : product.discount
    product.isNew = isNew !== undefined ? isNew : product.isNew
    product.gender = gender || product.gender
    product.countInStock = countInStock || product.countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

// @desc    Get new arrival products
// @route   GET /api/products/new
// @access  Public
const getNewProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({ isNew: true }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getNewProducts,
};