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

exports.getProduct = (req, res, next) => {
  console.log('getpr', req.params)
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

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: 'shop/orders'
  });
};