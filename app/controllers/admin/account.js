var account = require('../../models/admin/account'),
	helpers = require('../../helpers');
//公司账号管理页面
exports.companyshow = function(req, res, next) {
	res.render('admin/account/company_show', {
		title: '企业账号管理'
	});
};
//公司账号新增页面
exports.companynew = function(req, res, next) {
	res.render('admin/account/company_new', {
		title: '新增企业账号'
	});
};
//用户账号管理页面
exports.usershow = function(req, res, next) {
	res.render('admin/account/user_show', {
		title: '用户账号管理'
	});
};
//用户账号新增页面
exports.usernew = function(req, res, next) {
	res.render('admin/account/user_new', {
		title: '新增用户账号'
	});
};