var lecturer = require('../../models/admin/lecturer'),
	helpers = require('../../helpers');
//讲师展示页面
exports.show = function(req, res, next) {
	res.render('admin/lecturer/show', {
		title: '讲师管理'
	});
};
//课程新增页面
exports.new = function(req, res, next) {
	res.render('admin/lecturer/new', {
		title: '新增讲师'
	});
};