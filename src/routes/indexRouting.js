import express from "express";
import userRouter from "./authRoutes.js";
import productRouter from "./products.js";
import orderRouter from "./orderRoutes.js";

const mainRouter=express.Router();

mainRouter.use("/user", userRouter)
mainRouter.use("/product", productRouter)
mainRouter.use("/order", orderRouter)
export default mainRouter;