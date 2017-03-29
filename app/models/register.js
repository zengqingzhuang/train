var db = require('../database'),
	_ = require('lodash');

function register() {}
//个人注册
register.personalCreate = function(condition, callback) {
	var error = {
		status: 101,
		message: ''
	}
	if (!condition.password) error.message = '密码不能为空';
	if (!condition.phoneNumber) error.message = '手机号码不能为空';
	if (!condition.phoneNumber.length > 11) error.message = '手机号码不能大于11位';
	if (!condition.birthday) error.message = '出生日期不能为空';
	if (!condition.name) error.message = '真实姓名不能为空';
	if (!condition.areaCode) error.message = '区/县不能为空';
	if (!condition.cityCode) error.message = '市不能为空';
	if (!condition.provinceCode) error.message = '省份不能为空';
	if (error.message) {
		return callback(error);
	}
	var procName = 'Call procUserInsert(' + condition.provinceCode + ',' + condition.cityCode + ',' + condition.areaCode + ',';
	procName += '"' + condition.name + '","' + condition.birthday + '",' + condition.sex + ',';
	procName += '"' + condition.phoneNumber + '","' + condition.password + '",@IsExist)';
	db.createConnection(procName, condition, function(err, result) {
		if (err) {
			return callback(err);
		}
		if (result[0][0].IsExist) { //已存在相同手机号
			error.message = '手机号码已经存在';
			return callback(error);
		}
		callback(null, result);
	});
};
module.exports = register;