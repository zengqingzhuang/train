define(['jquery', 'jqextend'], function($) {
	$.fn.extend({
		/*
		 * 输入字数限制--字节计算
		 */
		surpassBite: function(args) {
			var t = this,
				max = args.max,
				$tip = args.tip,
				ui = args.ui || '还能输入{{#number}}字',
				number = 0,
				evt = args.evt || {},
				len = this.val().length;

			// 非替换元素，直接返回
			if ($.nodeName(t[0], "input") && $.nodeName(t[0], "textarea")) {
				return false;
			}
			maxstrlen = 30;
			len = maxstrlen;
			myLen = getStrleng(this.val());
			if (myLen > len * 2) {
				t.val(t.val().substring(0, i - 1));
			} else {
				$tip.html($.ParseTpl(ui, {
					number: Math.floor((len * 2 - myLen) / 2)
				}));
				return false;
			}

			function getStrleng(str) {
				myLen = 0;
				i = 0;
				for (;
					(i < str.length) && (myLen <= maxstrlen * 2); i++) {

					if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
						myLen++;
					else
						myLen += 2;
				}
				return myLen;
			}

		},
		/*
		 * 输入字数限制
		 */
		surpassinput: function(args) {
			var t = this,
				max = args.max,
				$tip = args.tip || {},
				ui = args.ui || '还能输入{{#number}}字',
				number = 0,
				evt = args.evt || {};
			var str = this.val(),
				len = str.length;
			//var len = $.getStrLen(this.val());
			//this.val().length;

			// 非替换元素，直接返回
			if ($.nodeName(t[0], "input") && $.nodeName(t[0], "textarea")) {
				return false;
			}

			if (!$.browser.msie || $.browser.version > 7) {
				t.attr("maxlength", max);
			}

			if (len <= max) {
				if ($tip.html) {
					$tip.html($.ParseTpl(ui, {
						number: max - len
					}));
				}
				return false;
			} else {
				if (!evt.which || evt.which !== 8) { // 回退键 才响应
					t.val(t.val().substring(0, max));
					return false;
				}
			}
		},
		/*输入价格格式限制-数字及小数点*/
		surpassprice: function(args) {
			var t = this,
				event = args.evt || {},
				d = args.d || "",
				obj;

			// 非替换元素，直接返回
			if ($.nodeName(t[0], "input") && $.nodeName(t[0], "textarea")) {
				return false;
			}
			//响应鼠标事件，允许左右方向键移动
			event = window.event || event;
			if (event.keyCode == 37 || event.keyCode == 39) {
				return;
			}

			v = $(t).val();

			v = v - 0;

			if (!v) {
				v = 0;
			} else {
				v = v + "";

				v = v.replace(/[^\d.]/g, "");
				//验证第一个字符是数字而不是.
				v = v.replace(/^\./g, "");
				//只保留第一个. 清除多余的
				v = v.replace(/\.{2,}/g, ".");
				v = v.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				v = v.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

			}
			$(t).val(v);

			return t;
		},
		/*数量格式*/
		surpassnumber: function(args) {
			var t = this,
				event = args.evt || {},
				v, d = args.d || 0;
			// 非替换元素，直接返回
			if ($.nodeName(t[0], "input") && $.nodeName(t[0], "textarea")) {
				return false;
			}
			//响应鼠标事件，允许左右方向键移动
			event = window.event || event;
			if (event.keyCode == 37 || event.keyCode == 39) {
				return;
			}
			v = t[0].value;
			v = v - 0;

			if (!v) {
				v = d;
			} else {
				//v = v + "";
				//v = v.replace(/\.{0}/g, "");
				v = parseInt(v / 1);
				//console.log(v)
			}

			$(t).val(v);

			return t;
		}
	});
});