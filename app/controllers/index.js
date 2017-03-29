var common = require('../models');
var http = require('http');
var querystring = require('querystring');

//登录
exports.login = function(req, res, next) {
	common.login(req.body, function(err, result) {
		if (err) {
			return next(err);
		}
		res.json({
			status: 200,
			phoneNumber: req.body.phoneNumber
		});
	});
};
//获取省市区
exports.provinces = function(req, res, next) {
	common.provinces(req.query.parentCode, function(err, result) {
		if (err) {
			return next(err);
		}
		res.json({
			status: 200,
			provinces: result
		});
	});
};
//发送邮件
exports.sendMessage = function(req, res, next) {
	var postData = {
		uid: 'hQuId9Z7YqKC', //登录微米的帐号
		pas: 'Id9Z7Y9', //密码
		mob: '手机号码',
		con: '【微米】您的验证码是：610912，3分钟内有效。如非您本人操作，可忽略本消息。',
		type: 'json'
	};
	var content = querystring.stringify(postData);
	var options = {
		host: 'api.weimi.cc',
		path: '/2/sms/send.html',
		method: 'POST',
		agent: false,
		rejectUnauthorized: false,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': content.length
		}
	};
	var req1 = http.request(options, function(res1) {
		res1.setEncoding('utf8');
		res1.on('data', function(chunk) {
			console.log(JSON.parse(chunk));
		});
		res1.on('end', function() {
			console.log('over');
		});
	});
	req1.write(content);
	req1.end();
};