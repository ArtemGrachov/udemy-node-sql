const
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser');

const app = express();
const sequelize = require('./util/database');

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin'),
  shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()
  .catch(err => console.log(err));

app.listen(3000);