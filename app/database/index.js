var mysql = require('mysql'),
	config = require('../../config'),
	Log = require('log4js').getLogger('cheese'),
	util = require('util'),
	_ = require('lodash'),
	errFun = require('./error'),
	pool = null, //连接池
	connectObj = {},
	sqlstr = '', //sql语句或存储过程名
	param = '', //sql语句或存储过程传入参数--主要用于打印输出到控制台
	callback = null; //回调方法
var connect = function() {
	this.createConnection = function() { //传参顺序1.sqlstr 2.param 3.callback
		if (arguments.length < 2) return Log.error('connection database param length not less than two');
		if (!_.isString(arguments[0])) return Log.error('connection database sqlstr type should be string type');
		sqlstr = arguments[0];
		if (arguments.length == 2) {
			if (!_.isFunction(arguments[1])) return Log.error('connection database callback type should be function type');
			callback = arguments[1];
		} else { // arguments.length>=3
			if (!_.isFunction(arguments[arguments.length - 1])) return Log.error('connection database callback type should be function type');
			param = [].slice.call(arguments, 1, arguments.length - 1);
			callback = arguments[arguments.length - 1];
		}
		this.getConnection(function(err, conn) {
			if (err) {
				return callback(err);
			}
			connectObj.query(conn);
		});
	}
	this.query = function(conn) {
		try {
			if (config.outconsole.sqlstr) { //打印sql语句或存储过程名
				Log.trace('sqlstr: ' + sqlstr);
			}
			if (config.outconsole.param) { //打印参数
				Log.trace('param: ' + util.inspect(param, {
					depth: null
				}));
			}
			conn.query(sqlstr, function(err, result, fields) {
				if (err) {
					return callback(errFun(err));
				}
				if (config.outconsole.result) { //打印结果
					Log.trace('result: ' + util.inspect(result, {
						depth: null
					}));
				}
				callback(null, result, fields);
			});
		} finally {
			this.releaseConnection(conn);
		}
	}
	this.getConnection = function(callback) {
		if (!pool) {
			pool = mysql.createPool(config.database);
		}
		pool.getConnection(function(err, conn) {
			if (err) {
				return callback(errFun(err));
			}
			callback(null, conn);
		});
	}
	this.releaseConnection = function(conn) { //释放连接回连接池
		conn.release(function(err) {
			if (err) {
				return Log.error(err);
			}
		});
	}
}
connectObj = new connect();
module.exports = connectObj;