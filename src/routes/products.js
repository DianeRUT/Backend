import express from 'express';
import {
  getFilteredProducts,
  getNewArrivals,
  addProduct,
  getAllProduct, deleteProductById, updateProductById
} from '../controllers/productController.js';

import { protect, restrictToAdmin } from '../middleware/auth.js';
import upload from "../Middleware/Multer.js";

const productRouter = express();

// Admin protected routes
productRouter.use(protect, restrictToAdmin);
productRouter.post('/addProduct', upload.single('Image'), addProduct);
productRouter.get("/getAllProduct", getAllProduct)
productRouter.delete("/:id", deleteProductById); 
productRouter.put("/:id", updateProductById); 

// Navbar filtering endpoints
productRouter.get('/', getFilteredProducts);       // Main filtering endpoint
productRouter.get('/new', getNewArrivals);         // New arrivals
productRouter.get('/men/:type?', getFilteredProducts);    // Men's collection
productRouter.get('/women/:type?', getFilteredProducts);  // Women's collection
productRouter.get('/sports/:category?', getFilteredProducts); // Sports collection

export default productRouter;