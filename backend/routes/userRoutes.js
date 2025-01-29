const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error });
  }
});

// Login User
router.post('/login', async (req,res) => {
    const { email,password} = req.body;
       try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message : "user not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message : "password not match"});

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({token});
       }catch(err){
        res.status(500).json({error:err.message});
       }
}) ;

module.exports = router;