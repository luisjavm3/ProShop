import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/connectDB.js';
import products from './data/products.js';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
