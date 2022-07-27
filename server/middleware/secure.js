const router = require('express').Router();
const verify = require('./verifyToken');
const cors = require('cors');

router.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }))

router.get('/secure', verify, (req, res) => {
  res.json({ Secured });
});

module.exports = router;