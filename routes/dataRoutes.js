const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  res.send(`You sent: ${JSON.stringify(data)}`);
});

module.exports = router;
