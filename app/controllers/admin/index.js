var admin = require('../../models/admin/index');
//登陆页面
exports.loginIndex = function(req, res, next) {
	res.render('');
};
//首页
exports.index = function(req, res, next) {
	res.render('admin/home');
};