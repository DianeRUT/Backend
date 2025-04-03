import express from "express"
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const CategoryRouter = express.Router()

CategoryRouter.route("/").get(getCategories).post(protect, admin, createCategory)
CategoryRouter.route("/:id").get(getCategoryById).put(protect, admin, updateCategory).delete(protect, admin, deleteCategory)

export default CategoryRouter

