const { User } = require('../db.js');

module.exports = {
  get_login: (req, res) => {
    return res.render('user/login', {
      success: req.flash('success'),
      error: req.flash('error')
    });
  },
  post_login: (req, res) => {
    // if successful create a session and direct to dash
    req.flash('error', 'Incorrect credentials');
    return res.redirect('login');
  },
  get_signup: (req, res) => {
    return res.render('user/signup', {
      success: req.flash('success'),
      error: req.flash('error')
    });
  },
  post_signup: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // TODO: Encrypt password
    return User.create({
      email,
      password
    }).then((user) => {
      req.flash('success', 'Account created!');
      res.redirect('login');
    }, (error) => {
      req.flash('error', error.errors[0].message);
      res.redirect('signup');
    });
  },
  get_show: (req, res) => {
    let id = req.params.id;
    return User.findByPk(id).then((user) => {
      if (user) {
        return res.render('user/show', { user });
      } else {
        req.flash('error', "User #" + id + " not found");
        return res.redirect('login');
      }
    });
  }
}
