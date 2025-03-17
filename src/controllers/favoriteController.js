import Favorite from '../models/Favorite.js';
import Product from '../models/Product.js';

export const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    const favorite = await Favorite.create({
      user: req.user._id,
      product: productId
    });
    
    res.status(201).json({
      status: 'success',
      data: favorite
    });
  } catch (err) {
    res.status(400).json({ message: 'Error adding to favorites' });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      user: req.user._id,
      product: req.params.productId
    });
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({ message: 'Error removing from favorites' });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('product');
    
    res.status(200).json({
      status: 'success',
      results: favorites.length,
      data: favorites
    });
  } catch (err) {
    res.status(400).json({ message: 'Error fetching favorites' });
  }
};