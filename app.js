const
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin'),
  shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem
});
Product.belongsToMany(Cart, {
  through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem
});

sequelize.sync()
  .then(result => {
    return User
      .findById(1)
  })
  .then(user => {
    if (!user) {
      return User.create({
        name: 'User',
        email: 'user@user.com'
      })
    }
    return user;
  })
  .then(user => {
    return user.getCart()
      .then(cart => {
        if (!cart) {
          return user.createCart();
        }
        return;
      })
  })
  .then(() => app.listen(3000))
  .catch(err => console.log(err));