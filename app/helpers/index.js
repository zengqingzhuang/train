var crypto = require('crypto'),
	util = require('util'),
	hbs = require('express-hbs'),
	_ = require('lodash');

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// new Date().format("yyyy-MM-dd hh:mm:ss.S") ==> 2014-08-21 15:04:00.411
// new Date().format("yyyy-M-d h:m:s.S")      ==> 2014-8-21 15:5:52.983
// new Date().format("yyyyMMddhhmmss")        ==> 20140821150450
Date.prototype.format = function(fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
// 私钥加密算法
exports.encrypt = function(str, secret) {
	if (typeof str != 'string') return '';
	var cipher = crypto.createCipher('aes128', secret);
	var enc = cipher.update(str, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
};
// 私钥解密算法
exports.decrypt = function(str, secret) {
	if (typeof str != 'string') return '';
	var decipher = crypto.createDecipher('aes128', secret);
	var dec = decipher.update(str, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
};
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
exports.float_accDiv = function(arg1, arg2) {
	var t1 = t2 = 0,
		r1, r2;
	arg1 = arg1 ? arg1.toString() : '0';
	arg2 = arg2 ? arg2.toString() : '0';
	try {
		t1 = arg1.toString().split(".")[1].length
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length
	} catch (e) {}
	r1 = Math.Number(arg1.replace(".", ""));
	r2 = Math.Number(arg2.replace(".", ""));
	return (r1 / r2) * pow(10, t2 - t1);
};

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
exports.float_accMul = function(arg1, arg2) {
	arg1 = arg1 ? arg1.toString() : '0';
	arg2 = arg2 ? arg2.toString() : '0';
	var m = 0;
	try {
		m += arg1.split(".")[1].length
	} catch (e) {}
	try {
		m += arg2.split(".")[1].length
	} catch (e) {}
	return Number(arg1.replace(".", "")) * Number(arg2.replace(".", "")) / Math.pow(10, m);
};

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
exports.float_accAdd = function(arg1, arg2) {
	arg1 = arg1 ? arg1.toString() : '0';
	arg2 = arg2 ? arg2.toString() : '0';
	var r1, r2;
	try {
		r1 = arg1.split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	var c = Math.abs(r1 - r2),
		m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		var cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.replace(".", ""));
			arg2 = Number(arg2.replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.replace(".", "")) * cm;
			arg2 = Number(arg2.replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.replace(".", ""));
		arg2 = Number(arg2.replace(".", ""));
	}
	return (arg1 + arg2) / m;
};

//减法函数，用来得到精确的减法结果
//说明：javascript的减法结果会有误差，在两个浮点数减法的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：accSub(arg1,arg2)
//返回值：arg1减arg2的精确结果
exports.float_accSub = function(arg1, arg2) {
	arg1 = arg1 ? arg1.toString() : '0';
	arg2 = arg2 ? arg2.toString() : '0';
	try {
		r1 = arg1.split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	var m = Math.pow(10, Math.max(r1, r2)),
		n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
/**
 * 保留n位小数，默认2位
 * @param  {[type]} value [description]
 * @param  {[type]} n     [description]
 * @return {[type]}       [description]
 */
exports.toFixed = function(value, n) {
	n = n || 2;
	value = parseFloat(value) || 0;
	return value.toFixed(n);
}

/**
 * 去除json数据中的空字符串
 * @param  {[type]} pa [description]
 * @return {[type]}    [description]
 */
exports.delJsonEmpty = function(pa) {
	pa = pa || {};
	for (var key in pa) {
		if (pa[key] && pa[key].trim) {
			pa[key] = pa[key].trim();
		}
		if (pa[key] === "") {
			delete pa[key];
		}
	}
	return pa;
};

/**
 * get parameters from request
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
exports.getRequestParams = function(req) {
	var condition = _.assign({}, req.params || {}, req.body || {}, req.query || {});
	return exports.delJsonEmpty(condition);
};

/**
 * proxy run method with timeout
 * @param  {[type]}   obj         [description]
 * @param  {[type]}   method      [description]
 * @param  {[type]}   params      [description]
 * @param  {Function} callback    [description]
 * @param  {[type]}   timeout     [description]
 * @return {[type]}               [description]
 */
exports.runWithTime = function(obj, method, params, callback, timeout) {
	var timeout = timeout || 3000;
	var sign = false;
	params.push(function(err, results) {
		if (!sign) {
			sign = true;
			callback(err, results);
		}
	});
	method.apply(obj, params);
	var task = setTimeout(function() {
		clearTimeout(task);
		if (!sign) {
			sign = true;
			callback(null);
		}
	}, timeout);
};
/**
 * 渲染下拉框，数据类型为数组，value，text
 */
hbs.registerHelper('options_for_select_array', function(data, options) {
	var html = '', //返回的options
		selected = '', //是否选中
		value = options.hash.value; //默认选中的值
	if (_.isArray(data)) {
		data.forEach(function(item) {
			if (!selected && value == item.value) {
				selected = 'selected="selected"';
			}
			html += util.format('<option value="%s"%s>%s</option>', item.value, selected, item.text);
		})
	}
	return new hbs.SafeString(html);
});
/**
 * 渲染下拉框，数据类型为json，value，text
 */
hbs.registerHelper('options_for_select_json', function(data, options) {
	var html = '', //返回的options
		selected = '', //是否选中
		value = options.hash.value; //默认选中的值
	for (var key in data) {
		var item = data[key];
		if (selected && value == item.value && value != "") {
			selected = 'selected="selected"';
		}
		html += util.format('<option value="%s"%s>%s</option>', item.value, selected, item.text);
	}
	return new hbs.SafeString(html);
});
/**
 * 渲染下拉框，数据类型object
 */
hbs.registerHelper('options_for_select_object', function(data, options) {
	var html = '', //返回的options
		selected = '', //是否选中
		value = options.hash.value; //默认选中的值
	if (typeof data === 'object') {
		Object.keys(data).forEach(function(key, index) {
			if (!selected && value == key) {
				selected = 'selected="selected"';
			}
			html += util.format('<option value="%s"%s>%s</option>', key, selected, data[key]);
		})
	}
	return new hbs.SafeString(html);
});
//自定义引入css、js的hbs方法（extend、block）
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    if (!blocks[name]) {
        blocks[name] = [];
    }
    blocks[name].push(context.fn(this));
});
hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
});