require('dotenv').config()
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('express').Router();
const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(cookieParser());
router.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
router.use(express.json({
  type: 'application/json',
}))
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post('/login', async (req, res) => {
  // if existing email
  const user = await db.User.scope('withHash').findOne({ where: { email: req.body.email } });
  if(!user) {
    return res.status(400).json({"Error": 'Email is not found'});
  }  
  // password correct?
  const validPassword = await bcrypt.compare(req.body.password, user.password_hash);
  if(!validPassword) {
    return res.status(400).json({"Error": 'Invalid password'});
  }  
  // create and assign token
  const token = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  res.header ('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
  res.header ('Access-Control-Allow-Credentials', true)
  res.header ('Access-Control-Allow-Methods', 'POST, GET')
  res.header ('Access-Control-Expose-Headers', '*')
  res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header ('Authorization', `Bearer ${token}`)
  .status(200).json({'Success': 'Logged in', 'redirect': `${process.env.BACKEND_URL}/api/secure`});
});

function generateAccessToken(user) {
  return jwt.sign({user_id: user.user_id}, process.env.TOKEN_KEY, { expiresIn: '10m'});
}

function generateRefreshToken(user) {
    return jwt.sign({user_id: user.user_id}, process.env.REFRESH_TOKEN_KEY);
  }
module.exports = router;