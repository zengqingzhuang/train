var db = require('../database'),
	_ = require('lodash');

function common() {}
//登录
common.login = function(condition, callback) {
	var error = {
		status: 101,
		message: ''
	}
	if (!condition.password) error.message = '密码不能为空';
	if (!condition.phoneNumber) error.message = '电话号码不能为空';
	if (error.message) return callback(error);
	db.createConnection('Call procLoginSelect(' + condition.phoneNumber + ',' + condition.password + ')', condition, function(err, result) {
		if (err) {
			return callback(err);
		}
		if (result && result[0].length <= 0) {
			error.message = '您输入的帐号或密码有误';
			return callback(error);
		}
		callback(null, result[0][0]);
	});
};
//获取省市区
common.provinces = function(parentCode, callback) {
	var procName = 'Call procProvinceSelect(' + parentCode + ')';
	db.createConnection(procName, parentCode, function(err, result) {
		if (err) {
			return callback(err);
		}
		var arry = [];
		if (result && result[0] && result[0].length > 0) {
			_.forEach(result[0], function(item) {
				var obj = {};
				obj.value = item.Code;
				obj.text = item.Name;
				arry.push(obj);
			});
		}
		callback(null, arry);
	});
};
module.exports = common;