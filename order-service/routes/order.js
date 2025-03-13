const express = require('express');
const Order = require('../models/Order');
const redisClient = require('../config/redis');

const router = express.Router();

// Create an order
router.post('/', async (req, res) => {
    try {
        const { userId, products, totalAmount } = req.body;
        const order = await Order.create({ userId, products, totalAmount });

        // Invalidate cache
        await redisClient.del('orders');

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all orders with Redis caching
router.get('/', async (req, res) => {
    try {
        // Check cache first
        const cachedOrders = await redisClient.get('orders');
        if (cachedOrders) return res.json(JSON.parse(cachedOrders));

        // Fetch from DB
        const orders = await Order.find();

        // Store in Redis
        await redisClient.set('orders', JSON.stringify(orders), { EX: 60 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an order
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!order) return res.status(404).json({ error: 'Order not found' });

        // Invalidate cache
        await redisClient.del('orders');

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        // Invalidate cache
        await redisClient.del('orders');

        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;