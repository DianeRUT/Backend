import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied, token missing" });
    }

    const token = authHeader.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Access denied, invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded._id);
    
    if (!user) {
      return res.status(401).json({ message: "User not found or token expired" });
    }

    // Ensure token is the latest issued
    if (user.tokens.accessToken !== token) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user; // Attach user to request
    req.token = token;
     req.user.role = decoded.role;
    next(); // Proceed to next middleware
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};