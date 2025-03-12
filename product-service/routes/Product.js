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

// Get all products
router.get('/all', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update product by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update({name,description,price,stock});
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete product by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;