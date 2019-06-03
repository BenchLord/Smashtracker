const { User } = require('../db.js');
var bcrypt = require('bcryptjs');

module.exports = {
  get_login: (req, res) => {
    return res.render('user/login', {
      success: req.flash('success'),
      error: req.flash('error')
    });
  },
  post_login: (req, res) => {
    let email = req.body.email;
    let password = req.body.password; // Needs to be encrypted
    return User.findOne({
      where: {email}
    }).then( user => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          // TODO: create and store jwt in local storage or the session
          res.redirect(user.id);
        } else {
          req.flash('error', 'Incorrect Email/Password combination')
          res.redirect('login');
        }
      } else {
        req.flash('error', 'Incorrect Email/Password combination');
        res.redirect('login');
      }
    });
  },
  get_signup: (req, res) => {
    return res.render('user/signup', {
      success: req.flash('success'),
      error: req.flash('error')
    });
  },
  post_signup: (req, res) => {
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
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
