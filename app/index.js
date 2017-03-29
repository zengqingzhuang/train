var express = require('express'),
	app = express(),
	hbs = require('express-hbs'),
	path = require('path'),
	_ = require('lodash'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	log4js = require('log4js'),
	config = require('../config'),
	favicon = require('serve-favicon');

//express的日志配置
log4js.configure(config.log4js);
app.use(log4js.connectLogger(log4js.getLogger("http"), {
	level: 'auto' //自动调整日志级别
}));
//客户端请求的body中的内容处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
//全局变量
app.locals = {
	version: config.application.version,
	title: config.application.title,
	settings: {}
};
//设置静态资源
app.use(express.static(path.join(__dirname, '../public')));
//设置url图标
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
//web浏览器发送cookie内容--req.cookies
app.use(cookieParser());
//hbs配置
app.engine('hbs', hbs.express4({ //注册模版引擎
	viewsDir: path.join(__dirname, 'views'),
	partialsDir: path.join(__dirname, 'views/partials'),
	layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs'); // 用hbs作为模版引擎

//html模板
//app.set('view engine', 'html'); // 用html作为模版引擎

app.set('views', path.join(__dirname, 'views')); // 模版所在路径
//同步递归加载所有的路由
function readRouter(folderName) {
	var fileArry = fs.readdirSync(__dirname + '/' + folderName);
	_.forEach(fileArry, function(file) {
		var file_path = __dirname + '/' + folderName + '/' + file,
			cur_file = fs.statSync(file_path);
		if (cur_file.isDirectory()) { //是目录
			readRouter(folderName + '/' + file);
		} else {
			var routers = require(file_path);
			_.forEach(routers, function(router) {
				app.use('/', router);
			});
		}
	});
}
readRouter('routers');
//next()错误处理 catch 404
app.use(function(req, res, next) {
	var err = {
		status: 404,
		message: '404 not found'
	};
	next(err);
});
//next(err)
app.use(function(err, req, res, next) {
	if (!_.isObject(err)) {
		err = {
			status: 500,
			message: '我好像出故障了！'
		}
	} else {
		err.status = err.status ? err.status : 500;
		err.message = err.message ? err.message : '我好像出故障了！';
	}
	var format = req.url.match(/\.\w{1,5}/); //请求路由格式，.:format or 页面
	if (format) {
		format = format[0].split(".")[1].toLowerCase();
	}
	if (format === 'json' || format === 'jsonp') { //接口
		res.set('Content-Type', "application/json");
		res[format](err);
	} else { //页面
		res.render('error', {
			status: err.status,
			message: err.message
		});
	}
	log4js.getLogger().error('error:' + err.message);
});
module.exports = app;