const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll(
    products => res.render('shop/product-list', {
      products: products,
      pageTitle: 'All products',
      path: '/'
    })
  );
};

exports.getIndex = (req, res) => {
  Product.fetchAll(
    products => res.render('shop/index', {
      products: products,
      pageTitle: 'Shop',
      path: '/'
    })
  );
};

exports.getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Your cart',
    path: 'shop/cart'
  });
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: 'shop/checkout'
  });
};