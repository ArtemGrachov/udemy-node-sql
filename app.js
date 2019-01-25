const express = require('express'),
  bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin'),
  shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);