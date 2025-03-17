import express from "express";
import userRouter from "./authRoutes.js";
import productRouter from "./products.js";

const mainRouter=express.Router();

mainRouter.use("/user", userRouter)
mainRouter.use("/product", productRouter)
export default mainRouter;