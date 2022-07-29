const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = async function(req, res, next) {
  let authHeader = req.headers.authorization;
  if(authHeader == undefined){
    authHeader = req.body.headers.Authorization;
  }
  const refreshToken = authHeader && authHeader.replace('Bearer ', '');
  if(!refreshToken) {
    return res.status(401).json('Access Denided');
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (error, user) => {
    if (error) res.status(400).json('Invalid Refresh Token');
    res.user = await db.User.scope('withAll').findByPk(user.user_id);
    if (refreshToken !== res.user.refresh_token) { res.status(400).json('Outdated Refresh Token'); }
    next();
  })
};