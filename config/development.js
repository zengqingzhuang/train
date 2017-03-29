var fs = require('fs'),
	package_json = JSON.parse(fs.readFileSync('./package.json'));
module.exports = {
	application: {
		version: package_json.version,
		name: package_json.name,
		title: "train",
		host: '127.0.0.1',
		port: 3000 //服务启动端口
	},
	outconsole: {
		result: true,
		param: true,
		sqlstr: true
	},
	log4js: {
		"appenders": [{
			"type": "console" //控制台输出
		}, {
			"type": "dateFile", //type:file
			"filename": "logs/development",
			"pattern": "_yyyy-MM-dd.log",
			"alwaysIncludePattern": true,
			"absolute": true
		}],
		"replaceConsole": false //日志显示到控制台
	}
}