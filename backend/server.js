import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';

import connectDB from './config/connectDB.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`.bgGreen.black);
});
