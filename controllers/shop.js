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

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      product: product
    })
  })
}

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

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  console.log(productId);
  res.redirect('/cart');
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: 'shop/orders'
  });
};