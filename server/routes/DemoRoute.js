import express from 'express';
import { create } from '../controller/AuthController.js';

const demoRoute = express.Router();

demoRoute.post('/create', create);

export default demoRoute;
