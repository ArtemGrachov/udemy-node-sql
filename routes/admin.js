const
  path = require('path'),
  express = require('express'),
  router = express.Router();

const rootDir = require('../util/path');

router.get('/add-product', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;