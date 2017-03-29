var register = require('../models/register'),
	helpers = require('../helpers'),
	common = require('../models');
//注册选择页面
exports.choose = function(req, res, next) {
	res.render('register/choose', {
		title: '注册-拉拉培训网'
	});
};
//个人注册页面展示
exports.personalIndex = function(req, res, next) {
	common.provinces('0', function(err, result) { //获取省份
		if (err) {
			return next(err);
		}
		res.render('register/personal', {
			title: '个人注册-拉拉培训网',
			provinces: result
		});
	});
};
//个人注册页面提交
exports.personalCreate = function(req, res, next) {
	res.set('Content-Type', "application/json");
	register.personalCreate(req.body, function(err, result) {
		if (err) {
			return next(err);
		}
		res.json({
			status: 200,
			message: '恭喜您注册成功！'
		});
	});
};