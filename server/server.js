import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/UserRoutes.js';
import productRoute from './routes/ProductRouter.js';
import demoRoute from './routes/DemoRoute.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 2000;
const URL = process.env.MONGOURL;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URL);
    console.log(`mongodb is connected now at host ${conn.connection.host}`);
    app.listen(PORT, () => {
      console.log(`server is litening at port: ${PORT}`);
    });
  } catch (error) {
    console.log(`something went wrong with server or db connection`);
    console.log(error);
  }
};
mongoose.set('strictQuery', true);
connectDb();
app.use('/api', route);
app.use('/product', productRoute);
app.use('/demo', demoRoute);
