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
      res.user = user;
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

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product);


sequelize.sync()
  .then(result => {
    User
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
  .then(() => app.listen(3000))
  .catch(err => console.log(err));