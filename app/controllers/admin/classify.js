var classify = require('../../models/admin/classify'),
	helpers = require('../../helpers');
//分类新增页面
exports.new = function(req, res, next) {
	res.render('admin/classify/new', {
		title: '新增分类'
	});
};
//一级分类页面
exports.one = function(req, res, next) {
	res.render('admin/classify/one', {
		title: '一级分类'
	});
};
//二级分类页面
exports.two = function(req, res, next) {
	res.render('admin/classify/two', {
		title: '二级分类'
	});
};
//三级分类页面
exports.three = function(req, res, next) {
	res.render('admin/classify/three', {
		title: '三级分类'
	});
};