const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const orderRouters = require('./routes/order');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/orders',orderRouters);

const PORT = process.env.PORT || 5002;

connectDB();
app.listen(PORT,()=> console.log('Order service running on port '+PORT));