import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Add item to cart
// @route   POST /api/cart
export const addToCart = async (req, res) => {
  const { productId, variationIndex, size, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const selectedVariation = product.variations[variationIndex];
    const sizeStock = selectedVariation.sizes.find(s => s.size === size);
    
    if (sizeStock.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      cart = new Cart({ user: req.user?._id, items: [] });
    }

    const existingItem = cart.items.find(item => 
      item.product.equals(productId) && 
      item.variationIndex === variationIndex && 
      item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        variationIndex,
        size,
        quantity,
        priceAtAddition: product.price
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};