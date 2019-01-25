const
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin'),
  shopRoutes = require('./routes/shop');

const rootDir = require('./util/path');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000);