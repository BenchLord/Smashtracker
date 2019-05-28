require('dotenv').config();
let express = require('express');
let app = express();

let morgan = require('morgan');
app.use(morgan("common"));

let pug = require('pug');
app.set('view engine', 'pug');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

let cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.COOKIE_SECRET));

let session = require('express-session');
let sessionStore = new session.MemoryStore;
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: process.env.SESSION_SECRET
}));

let flash = require('connect-flash');
app.use(flash());

let { sequelize } = require('./db.js');
sequelize.authenticate().then(() => {

  app.use('/user', require('./routes/userRouter.js'));

  app.listen(process.env.PORT, () => {
    console.log("Running Server on port " + process.env.PORT + "...");
  });
});
