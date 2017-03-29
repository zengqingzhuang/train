var express = require('express'),
	common_router = express.Router(),
	common = require('../controllers');
//登录接口
common_router.post('/nnc/login.:format', common.login);
//获取省市区接口
common_router.get('/nnc/provinces.:format', common.provinces);
//发送短信
common_router.post('/nnc/sendMessage.:format', common.sendMessage);
exports.common = common_router;