import express from 'express';
import { logIn, signUp } from '../controller/AuthController.js';
import {
  signUpValidation,
  loginValidation,
} from '../middleware/AuthValidation.js';

const route = express.Router();

route.post('/signup', signUpValidation, signUp);
route.post('/login', loginValidation, logIn);

export default route;
