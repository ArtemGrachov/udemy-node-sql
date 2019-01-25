const path = require('path'),
  express = require('express'),
  router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
});

module.exports = router;