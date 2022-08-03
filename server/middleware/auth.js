require('dotenv').config()
const cors = require('cors');
const express = require('express');
const verifyRefresh = require('./verifyRefreshToken');
const router = require('express').Router();
const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
router.use(express.json({
  type: 'application/json',
}));
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get('/refreshToken', verifyRefresh, async (req, res) => {
  const user = await db.User.findByPk(res.user.user_id);
  const refreshToken = generateRefreshToken(user)
  const token = generateAccessToken(user);
  setRefreshToken(user, refreshToken);
  res.header ('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
  res.header ('Access-Control-Allow-Credentials', true)
  res.header ('Access-Control-Allow-Methods', 'POST, GET')
  res.header ('Access-Control-Expose-Headers', '*')
  res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Refresh-Token')
  res.header ('Authorization', `Bearer ${token}`)
  res.header ('Refresh-Token', `Bearer ${refreshToken}`)
  .status(200).json({'Success': 'Refreshed', 'redirect': `${process.env.BACKEND_URL}`});
});

router.put('/logout', async (req, res) => {
  const user = await db.User.findByPk(JSON.parse(req.body.headers.User).user_id);
  setRefreshToken(user, null)
  res.json({'Success': 'Logged out'})
});

router.post('/login', async (req, res) => {
  //validation
  if(req.body.email === "") {
    return res.status(400).json({"EmailError": 'Email is empty'});
  }  
  if(req.body.password === "") {
    return res.status(400).json({"PasswordError": 'Password is empty'});
  }  

  //get user
  const user = await db.User.scope('withHash').findOne({ where: { email: req.body.email } })
  if (!user) return res.status(400).json({"EmailError": 'User not found'});

  // check password
  const validPassword = await bcrypt.compare(req.body.password, user.password_hash);
  if(!validPassword) {
    return res.status(400).json({"PasswordError": 'Invalid password'});
  }  

  // create and assign tokens
  const refreshToken = generateRefreshToken(user)
  const token = generateAccessToken(user)
  setRefreshToken(user, refreshToken);
  res.header ('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
  res.header ('Access-Control-Allow-Credentials', true)
  res.header ('Access-Control-Allow-Methods', 'POST, GET')
  res.header ('Access-Control-Expose-Headers', '*')
  res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header ('Authorization', `Bearer ${token}`)
  res.header ('Refresh-Token', `Bearer ${refreshToken}`)
  .status(200).json({'Success': 'Logged in', 'redirect': `${process.env.BACKEND_URL}`});
});

function generateAccessToken(user) {
  return jwt.sign({user_id: user.user_id}, process.env.TOKEN_KEY, { expiresIn: '15m'});
};

function generateRefreshToken(user) {
  return jwt.sign({user_id: user.user_id}, process.env.REFRESH_TOKEN_KEY);
};

async function setRefreshToken(user, refreshToken){
  user.update({ refresh_token: refreshToken });
  await user.save();
};

module.exports = router;