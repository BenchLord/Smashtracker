var User = require('../models/user.js');


var userController = {
  get_login: (req, res) => {
    res.render('user/login', {
      success: req.flash('success'),
      error: req.flash('error')
    });
  },
  post_login: (req, res) => {
    // if successful create a session and direct to dash
    req.flash('error', 'Incorrect credentials');
    res.redirect('login');
  },
  get_signup: (req, res) => {
    res.render('user/signup');
  },
  post_signup: (req, res) => {
    var user = new User;
    user.email = req.body.email;
    // need to encrypt password before saving
    user.password = req.body.password;
    user.save((err) => {
      if (err) {
        var emailMessage;
        if (err.errors.email) {
          emailMessage = err.errors.email.message;
        }
        res.render('user/signup', {
          error: emailMessage
        });
      } else {
        req.flash('success', 'Account created!');
        res.redirect('login');
      }
    });
  }
}

module.exports = userController;
