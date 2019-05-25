var express = require('express');
var controller = require('../controllers/testController.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/show', controller.show);

module.exports = router;
