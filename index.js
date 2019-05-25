var express = require('express');
var morgan = require('morgan');
var pug = require('pug');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
require('dotenv').config();

var app = express();
var sessionStore = new session.MemoryStore;

app.use(morgan("common"));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: process.env.SESSION_SECRET
}));
app.use(flash());


mongoose.connect('mongodb://brandon:abc123@ds119323.mlab.com:19323/playground',
{useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {

  app.use('/user', require('./routes/userRouter.js'));

  app.get('*', (req, res) => {
    // if logged in send to dashboard

    // otherwise send to the login screen
    res.redirect('/user/login');
  });

  app.listen(process.env.PORT, () => {
    console.log("Running Server on port " + process.env.PORT + "...");
  });

});
