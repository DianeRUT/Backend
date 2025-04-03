import express from "express"
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js"
import { protect, admin } from "../middleware/auth.js" 

const OrderRouter = express.Router()

OrderRouter.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
OrderRouter.route("/myorders").get(protect, getMyOrders)
OrderRouter.route("/:id").get(protect, getOrderById)
OrderRouter.route("/:id/pay").put(protect, updateOrderToPaid)
OrderRouter.route("/:id/deliver").put(protect, admin, updateOrderToDelivered)

export default OrderRouter;

