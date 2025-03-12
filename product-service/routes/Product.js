const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

//save product
router.post('/save', async (req, res) =>{
    try{
        const {name, description, price, stock} = req.body;
        const product = await Product.create({name,description,price,stock});
        res.status(201).json(product);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});
