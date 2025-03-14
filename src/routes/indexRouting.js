import express from "express";
import userRouter from "./userPath.js";

const mainRouter=express.Router();

mainRouter.use("/user", userRouter)
export default mainRouter;