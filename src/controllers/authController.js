import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Cart from '../models/Cart.js';
import { generateAccessToken } from '../utils/tokenGenerating.js';



export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // 1) Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
      // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      

    // 2) Create user
    const user = new User({
      email,
      password: hashedPassword,
      role,
      // req.body.role || 'user'
    });

    // 3) Create empty cart for user
    const newCart =  new Cart({ user: user._id });
    user.cart = newCart._id;
    await user.save();

    // Generate Access Token
          const accessToken = generateAccessToken(user);
          user.tokens = { accessToken };


          await user.save();

    res.status(201).json({
      status: 'Account created successfully!',
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        tokens: {
          accessToken
        },
      },
      
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

      

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2) Check if user exists and password is correct
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate new access token
         const accessToken = generateAccessToken(user);
         user.tokens= {accessToken};
     
         // Save token in database
         await user.save();

    res.status(200).json({
      status: 'LOgin successful!',
      user: {
        _id: user._id,
        Email: user.email,
        Role: user.role,
        token: {
          accessToken
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// For guest checkout (optional)
export const guestSession = async (req, res, next) => {
  try {
    const tempUserId = new mongoose.Types.ObjectId();
    const token = jwt.sign({ guestId: tempUserId }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.status(200).json({
      status: 'success',
      token,
      guestId: tempUserId
    });
  } catch (err) {
    next(err);
  }
};