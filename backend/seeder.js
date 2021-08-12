import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';
import connectDB from './config/connectDB.js';
// Models
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }));

    await Product.insertMany(sampleProducts);

    console.log('Data Imported'.bgGreen.black);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed'.bgRed.black);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red);
    process.exit(1);
  }
};
