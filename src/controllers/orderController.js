import Order from "../models/Order.js";
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import mongoose from 'mongoose';

const processOrder = async (userId, orderData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    console.log('Processing order with items:', orderData.items);
    
    // 1. Verify product availability and calculate total
    let totalAmount = 0;
    const itemsWithDetails = await Promise.all(
      orderData.items.map(async item => {
        const product = await Product.findById(item.product).session(session);
        console.log('Product Document:', product);  // Add this line
        console.log('Product Sizes:', product?.sizes);
        // Find the size inventory
        const sizeInventory = product.sizes.find(s => String(s.size) === String(item.size));
        if (!sizeInventory || sizeInventory.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name} size ${item.size}`);
        }

        // Update stock
        sizeInventory.stock -= item.quantity;
        await product.save({ session });

        return {
          product: product._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          priceAtPurchase: product.price
        };
      })
    );

    // Calculate total amount
    totalAmount = itemsWithDetails.reduce(
      (sum, item) => sum + (item.priceAtPurchase * item.quantity),
      0
    );

    // 2. Create order
    const order = await Order.create([{
      user: userId,
      items: itemsWithDetails,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      totalAmount,
      paymentStatus: 'pending'
    }], { session });

    // 3. Clear user's cart if logged in
    if (userId) {
      await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { items: [], total: 0 } },
        { session }
      );
    }

    await session.commitTransaction();
    return order[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = await processOrder(req.user?._id, req.body);
    
    // Simulate payment success
    order.paymentStatus = 'completed';
    order.orderStatus = 'processing';
    await order.save();

    res.status(201).json({
      status: 'success',
      data: order
    });
  } catch (err) {
    res.status(400).json({
      message: 'Order processing failed',
      error: err.message
    });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort('-createdAt')
      .populate('items.product');

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(400).json({ message: 'Error fetching orders' });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
    try {
      const filters = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit'];
      excludedFields.forEach(el => delete filters[el]);
  
      const orders = await Order.find(filters)
        .sort('-createdAt')
        .populate('user', 'email')
        .populate('items.product');
  
      res.status(200).json({
        status: 'success',
        results: orders.length,
        data: orders
      });
    } catch (err) {
      res.status(400).json({ message: 'Error fetching orders' });
    }
  };
  
  // Update order status (admin)
  export const updateOrderStatus = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { orderStatus: req.body.status },
        { new: true, runValidators: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({
        status: 'success',
        data: order
      });
    } catch (err) {
      res.status(400).json({ message: 'Error updating order status' });
    }
  };
  
  // Update payment status (admin)
  export const updatePaymentStatus = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { paymentStatus: req.body.status },
        { new: true, runValidators: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({
        status: 'success',
        data: order
      });
    } catch (err) {
      res.status(400).json({ message: 'Error updating payment status' });
    }
  };
  
  // Cancel order (admin)
  export const cancelOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const order = await Order.findById(req.params.id).session(session);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Restock products
      await Promise.all(order.items.map(async item => {
        const product = await Product.findById(item.product).session(session);
        const size = product.sizes.find(s => s.size === item.size);
        if (size) size.stock += item.quantity;
        await product.save({ session });
      }));
  
      // Update order status
      order.orderStatus = 'cancelled';
      await order.save({ session });
  
      await session.commitTransaction();
      res.status(200).json({
        status: 'success',
        data: order
      });
    } catch (err) {
      await session.abortTransaction();
      res.status(400).json({ message: 'Error cancelling order' });
    } finally {
      session.endSession();
    }
  };