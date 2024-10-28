import express from 'express';
import ensureAuthenticated from '../middleware/Auth.js';

const productRoute = express.Router();

productRoute.get('/', ensureAuthenticated, (req, res) => {
  console.log('value get from middleware', req.user);
  res.status(200).json([
    {
      name: 'mobile',
      price: 20000,
    },
    {
      name: 'tv',
      price: 40000,
    },
  ]);
});
export default productRoute;
