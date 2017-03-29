var home = require('../models/home'),
	helpers = require('../helpers'),
	path = require('path');
//首页
exports.index = function(req, res, next) {
	res.render('home', {
		title: '首页-拉拉培训网'
	});
};
//angular demo
exports.angular = function(req, res, next) {
	var html = path.normalize(__dirname + '/../views/demo.html');
	res.sendfile(html);
	//res.render('demo');
};