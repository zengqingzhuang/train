define(['jquery'], function($) {
	$.extend({
		//除法函数，用来得到精确的除法结果
		//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
		//调用：accDiv(arg1,arg2)
		//返回值：arg1除以arg2的精确结果
		float_accDiv: function(arg1, arg2) {
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
		},
		//乘法函数，用来得到精确的乘法结果
		//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
		//调用：accMul(arg1,arg2)
		//返回值：arg1乘以arg2的精确结果
		float_accMul: function(arg1, arg2) {
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
		},
		//加法函数，用来得到精确的加法结果
		//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
		//调用：accAdd(arg1,arg2)
		//返回值：arg1加上arg2的精确结果
		float_accAdd: function(arg1, arg2) {
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
		},
		//减法函数，用来得到精确的减法结果
		//说明：javascript的减法结果会有误差，在两个浮点数减法的时候会比较明显。这个函数返回较为精确的减法结果。
		//调用：accSub(arg1,arg2)
		//返回值：arg1减arg2的精确结果
		float_accSub: function(arg1, arg2) {
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
		}
	});
});