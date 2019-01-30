const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct = (req, res) => {
  const title = req.body.title,
    price = +req.body.price,
    imageUrl = req.body.imageUrl,
    description = req.body.description;

  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  Product.findById(productId, product => {
    if (!product) return res.redirect('/');
    res.render('admin/edit-product', {
      pageTitle: 'Add product',
      path: '/admin/add-product',
      editing: true,
      product: product
    })
  })
}

exports.postEditProduct = (req, res) => {
  const
    productId = req.body.productId,
    updatedTitle = req.body.title,
    updatedPrice = req.body.pric,
    updatedImageUrl = req.body.imageUrl,
    updatedDescription = req.body.description;

  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );

  updatedProduct.save();
  res.redirect('/admin/products');
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

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect('/admin/products');
}