import express from 'express'
import { login, registerUser } from '../contrllers/userController.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', login);

export default userRoute