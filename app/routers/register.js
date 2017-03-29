var express = require('express'),
	register_router = express.Router(),
	register = require('../controllers/register');
register_router.get('/register/choose', register.choose);
register_router.get('/register/personal', register.personalIndex);
register_router.post('/nnc/register/personal/create.:format', register.personalCreate);
exports.register = register_router;