import { Login, Register } from "../controllers/userController.js";
import express from "express";
const userRouter = express();

// User registration route
userRouter.post("/register", Register);

// User login route
userRouter.post("/login", Login);



export default userRouter;
