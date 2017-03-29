var express = require('express'),
	home_router = express.Router(),
	home = require('../controllers/home');
home_router.get('/', home.index);
home_router.get('/angular', home.angular);
exports.home = home_router;
exports.home1 = home_router;