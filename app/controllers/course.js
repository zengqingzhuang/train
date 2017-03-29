var course = require('../models/course');
//课程搜索页面
exports.search = function(req, res, next) {
	console.log('angularjs调用nodejs服务成功');
	console.log(req.query, 'getgetgetgetgetgetget');
	res.render('course/search', {
		title: '课程搜索'
	});
};
//课程详情页面
exports.detail = function(req, res, next) {
	res.render('course/detail', {
		title: '课程详情'
	});
};