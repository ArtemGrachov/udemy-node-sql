const
  Product = require('../models/product'),
  Cart = require('../models/cart');

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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty
          });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your cart',
        path: 'shop/cart',
        products: cartProducts
      });
    })
  })
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: 'shop/checkout'
  });
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price);
    res.redirect('/cart');
  })
};

exports.postCartDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  })
}

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: 'shop/orders'
  });
};