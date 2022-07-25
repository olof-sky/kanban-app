const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.headers.authorization;
    if (token) { token.replace('Bearer ', '') };
    if(!token) {
        return res.status(401).json('Access Denided');
    }
    console.log(jwt.verify(token, process.env.TOKEN_KEY))
    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
    } catch (error) {
        res.status(400).json('Invalid Token');
    }
};