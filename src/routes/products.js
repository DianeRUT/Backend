import express from "express"
import { getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
    getNewProducts,} from "../controllers/productController.js"
import { protect, admin } from "../middleware/auth.js" 

const ProductRouter = express.Router()

ProductRouter.route("/").get(getProducts).post(protect, admin, createProduct)
ProductRouter.route("/top").get(getTopProducts)
ProductRouter.route("/new").get(getNewProducts)
ProductRouter.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
ProductRouter.route("/:id/reviews").post(protect, createProductReview)

export default ProductRouter;
