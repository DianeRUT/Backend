import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites
} from '../controllers/favoriteController.js';

const router = express.Router();

router.use(protect);

router.post('/:productId', addToFavorites);
router.delete('/:productId', removeFromFavorites);
router.get('/', getUserFavorites);

export default router;