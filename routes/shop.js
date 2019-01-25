const express = require('express'),
  router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res) => {
  const products = adminData.products;
  res.render('shop', {
    products: products,
    pageTitle: 'Shop',
    path: '/',
    activeShop: true, // for hbs
    productCss: true // for hbs
  });
});

module.exports = router;