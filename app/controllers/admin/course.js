var course = require('../../models/admin/course'),
	helpers = require('../../helpers');
//课程展示页面
exports.show = function(req, res, next) {
	res.render('admin/course/show', {
		title: '课程管理'
	});
};
//课程新增页面
exports.new = function(req, res, next) {
	res.render('admin/course/new', {
		title: '新增课程'
	});
};