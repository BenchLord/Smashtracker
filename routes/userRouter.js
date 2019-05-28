'use strict';

let express = require('express');
let controller = require('../controllers/userController.js');

let router = express.Router();

router.get('/login', controller.get_login);
router.post('/login', controller.post_login);
router.get('/signup', controller.get_signup);
router.post('/signup', controller.post_signup);
router.get('/:id', controller.get_show);

module.exports = router;
