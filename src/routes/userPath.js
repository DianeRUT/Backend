import express from "express"
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const UserRouter = express.Router()

UserRouter.route("/").post(registerUser).get(protect, admin, getUsers)
UserRouter.post("/login", authUser)
UserRouter.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
UserRouter.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default UserRouter;

