const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = async function(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.replace('Bearer ', '');
  if(!token) {
    return res.status(401).json('Access Denided');
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (error, user) => {
    if (error) res.status(400).json('Invalid Token');
    try { res.user = await db.User.scope('withHash').findByPk(user.user_id); }
    catch (err) { res.status(400) }  
    next();
  })
};