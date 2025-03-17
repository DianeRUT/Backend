import express from 'express';
import {
  signup,
  login,
  guestSession
} from '../controllers/authController.js';

const userRouter = express();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/guest', guestSession); // For guest checkout

export default userRouter;