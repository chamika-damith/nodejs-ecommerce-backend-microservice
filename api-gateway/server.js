const express = require('express');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();
const app = express();

//enables cors
app.use(require('cors')());
app.use(express.json());

//service urls
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL;
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL;
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL;

//routes
app.use('/auth',createProxyMiddleware({target:AUTH_SERVICE,changeOrigin:true}));
app.use('/products',createProxyMiddleware({target:PRODUCT_SERVICE,changeOrigin:true}));
app.use('/orders',createProxyMiddleware({target:ORDER_SERVICE,changeOrigin:true}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('API GATEWAY running on port '+PORT));