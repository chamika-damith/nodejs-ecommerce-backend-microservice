//create auth routes
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Fixed import
const User = require('../models/User');

const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;
    try {

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});

        res.status(201).json({message: 'User created successfully', user});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//User login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        //Check user exists
        const user = await User.findOne({
            where: {email: email}
        });
        if (!user) {
            return res.status(400).json({message: 'user not found'});
        }

        //Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'invalid credentials'});
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token: token});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//protected route
router.get('/me', async (req,res)=>{
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({message:'Access Denied'});
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findByPk(decode.userId);
        res.json(user);
    }catch(err){
        res.status(400).json({message:'Invalid credentials'});
    }
});

module.exports = router;
