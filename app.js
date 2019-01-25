const
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser');
  // expressHandlebars = require('express-handlebars');

const app = express();

// app.set('view engine', 'pug');

// app.engine(
//   'hbs',
//   expressHandlebars({
//     payoutsDir: 'views/layout/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
//   })
// );
// app.set('view engine', 'hbs');

app.set('view engine', 'ejs');

const adminData = require('./routes/admin'),
  shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res
    .status(404)
    .render('404', {
      pageTitle: 'Page not found'
    });
});

app.listen(3000);