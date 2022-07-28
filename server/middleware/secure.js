const router = require('express').Router();
const verify = require('./verifyToken');
const cors = require('cors');

router.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }))

router.get('/', verify, (req, res) => {
  res.json({ "Secured": true });
});

module.exports = router;