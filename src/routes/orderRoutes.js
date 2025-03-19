import express from 'express';
import { 
  createOrder,
  getOrderHistory,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder
} from '../controllers/orderController.js';
import { admin } from '../middleware/roleIdenrification.js';
import { auth } from "../middleware/tokenVerification.js";
import { validateOrder, validateOrderStatus, validatePaymentStatus } from '../middleware/validationMiddleware.js';

const orderRouter = express.Router();


orderRouter.get('/getAllOrders', auth, admin, getAllOrders);
orderRouter.patch('/:id/status',  auth, admin, validateOrderStatus, updateOrderStatus);
orderRouter.patch('/:id/payment-status', auth, admin, validatePaymentStatus, updatePaymentStatus);
orderRouter.delete('/:id/cancel',  auth, admin, cancelOrder);

orderRouter.post('/createOrder', auth, validateOrder, createOrder);
orderRouter.get('/getOrderHistory', auth, getOrderHistory);

export default orderRouter;