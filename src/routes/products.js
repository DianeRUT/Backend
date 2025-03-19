import express from 'express';
import { validateProduct } from '../middleware/validationMiddleware.js';
import {
  getFilteredProducts,
  getNewArrivals,
  addProduct,
  getAllProduct, getProductById, deleteProductById, updateProductById
} from '../controllers/productController.js';

import upload from "../middleware/Multer.js";
import { admin } from '../middleware/roleIdenrification.js';
import { auth } from "../middleware/tokenVerification.js";

const productRouter = express.Router();


productRouter.post('/addProduct', auth, admin, upload.single('Image'), validateProduct, addProduct);
productRouter.get("/:id", admin, auth, getProductById); 
productRouter.delete("/:id", auth, admin, deleteProductById); 
productRouter.put("/:id", auth, admin, updateProductById); 

// Navbar filtering endpoints
productRouter.get("/", getAllProduct)
productRouter.get('/', getFilteredProducts);       // Main filtering endpoint
productRouter.get('/new', getNewArrivals);         // New arrivals
productRouter.get('/men/:type?', getFilteredProducts);    // Men's collection
productRouter.get('/women/:type?', getFilteredProducts);  // Women's collection
productRouter.get('/sports/:category?', getFilteredProducts); // Sports collection

export default productRouter;