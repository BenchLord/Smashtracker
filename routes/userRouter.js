'use strict';

var express = require('express');
var controller = require('../controllers/userController.js');

var router = express.Router();

router.get('/login', controller.get_login);
router.post('/login', controller.post_login);
router.get('/signup', controller.get_signup);
router.post('/signup', controller.post_signup);

module.exports = router;
