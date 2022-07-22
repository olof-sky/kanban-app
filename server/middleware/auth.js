require('dotenv').config()
const router = require('express').Router();
const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {

  // if existing email
  const user = await db.User.scope('withHash').findOne({ where: { email: req.query.email } });
  if(!user) {
    return res.status(400).json({"Error": 'Email is not found'});
  }  
  // password correct?
  const validPassword = await bcrypt.compare(req.query.password, user.password_hash);
  if(!validPassword) {
    return res.status(400).json({"Error": 'Invalid password'});
  }  
  // create and assign token
  const token = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  res.header('auth-token', token).json({token:token, refreshToken: refreshToken, redirect:''});
});

function generateAccessToken(user) {
  return jwt.sign({user_id: user.user_id}, process.env.TOKEN_KEY, { expiresIn: '10m'});
}

function generateRefreshToken(user) {
    return jwt.sign({user_id: user.user_id}, process.env.REFRESH_TOKEN_KEY);
  }
module.exports = router;