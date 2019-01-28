const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product'
  })
}

exports.postAddProduct = (req, res) => {
  const title = req.body.title,
    price = +req.body.price,
    imageUrl = req.body.imageUrl,
    description = req.body.description;

  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/product-list', {
      products: products,
      pageTitle: 'Admin Products',
      path: 'admin/products'
    })
  })
}