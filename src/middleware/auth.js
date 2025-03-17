import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    // 1) Get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'You are not logged in! Please log in to get access'
      });
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token no longer exists'
      });
    }

    // 4) Grant access
    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// For guest users (optional)
export const guestProtect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.guestId = decoded.guestId;
    next();
  } catch (err) {
    next();
  }
};

export const restrictToAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'You do not have permission to perform this action'
    });
  }
  next();
};