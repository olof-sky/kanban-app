require('dotenv').config()
const router = require('express').Router();
const verify = require('./verifyToken');
const cors = require('cors');

router.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }))

router.get('/', verify, (req, res) => {
  res.json({ "Secured": true });
});

module.exports = router;