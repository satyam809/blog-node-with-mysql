const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
//const bodyParser = require('body-parser');
const app = express();
const port = 7000;
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  }
}));
app.use(flash());

const siteUrl = `http://localhost:${port}/`;
const adminUrl = `http://localhost:${port}/admin`;

app.use((req, res, next) => {
  res.locals.siteUrl = siteUrl;
  res.locals.adminUrl = adminUrl;
  next();
});



const webRouter = require('./routes/web');
app.use('/', webRouter);

app.listen(port, () => {
  console.log('Server is running on port 7000');
});