define(["jquery", "jqextend"], function($) {
	$.fn.Dialog = $.Dialog = function(opts) {
		if (this instanceof $) {
			return this.each(function() {
				opts.$d = $(this);
				new Dialog.M(opts);
			});
		} else {
			return new Dialog.M(opts);
		}
	};

	var Dialog = {
		ver: "3.0"
	};
	Dialog.M = function(opts) {
		var d = this;
		d.$ = opts.$d || false;
		d.$window = $(window);
		d.$document = $(document);
		d.$body = $(document.body);
		//打开的页面高
		d.docHeight = d.$document.height();
		d.scrollHeight = d.$document.scrollTop();
		d.bodyHeight = d.$body.height();
		//自动关闭
		d.auto = $.type(opts.auto) == "boolean" ? opts.auto : true;
		d.times = $.type(opts.times) == "number" ? opts.times : 5;

		/*打开、关闭时的事件*/
		d.openfun = opts.openfun || new Function
		d.closefun = opts.closefun || new Function
		d.parameter = opts.parameter || [];
		//位置
		//d.offset = (d.$ && !opts.offset) ? d.$.offset() : $.type(opts.offset) == "object" ? opts.offset : false;
		d.offset = opts.offset || false;
		d.lock = $.type(opts.lock) == "boolean" ? opts.lock : (d.$) ? true : false;
		d.closebtn = opts.closebtn;
		d.closeAll = $.type(opts.classAll) == "boolean" ? opts.classAll : false;
		//弹窗id
		d.id = opts.id || "dialog_wrapper";
		//弹窗外部样式
		d.cls = opts.cls || "dialog_wrapper";
		d.css = opts.css || {};
		d.diglogWrapper = '<div id="' + d.id + '"></div>';
		//遮罩背景
		d.overlay = $.type(opts.overlay) === 'boolean' ? opts.overlay : $.type(opts.overlay) === "object" ? opts.overlay : false;
		//弹窗内容
		d.msgbody = opts.msbbody || '{{#close}}<div class="diginfo">{{#msg}}</div>';
		d.tpl = opts.tpl || {};
		d.msg = opts.msg || "";
		d.close = ($.type(opts.close) == "boolean" ? opts.close : true) ? '<a href="javascript:void(0)" title="关闭窗口"><span class="close"></span></a>' : '';
		d.diginfo = $.ParseTpl(d.msgbody, $.extend({},
			d.tpl, {
				close: d.close,
				msg: d.msg
			}));
		d.openRet = false;
		d.closeRet = false;

		d.Init(opts);
		d.Overlay();
		d.autoClose();
		//this.DialogAutoClose(opts)
		//this.DialogClose(opts);
	}

	Dialog.M.prototype = {
		fixIeH5: function(h, u) {
			if (window.html5 && !!!html5.supportsUnknownElements) {
				return html5.fix(h, u);
			}
			return h;
		},
		Init: function() { // 弹窗
			var d = this;
			//清理
			if ($("#" + d.id).length > 0) {
				$("#" + d.id).remove();
			}

			$(d.diglogWrapper).html(d.fixIeH5(d.diginfo)).appendTo(d.$body);
			//$(d.$body).append(d.fixIeH5($(d.diglogWrapper).addClass(d.cls).html(d.diginfo)));
			//弹窗jQuery对象
			d.$d = $("#" + d.id);

			//添加外部样式 .addClass(d.cls)
			d.$d.addClass(d.cls);
			d.$d.css(d.css);
			//解决在没有遮罩时的穿透
			if (!d.overlay && $.browser.name == "msie" && $.browser.version == '6.0') {
				var _overifm = $('<iframe frameborder="0"></iframe>');
				_overifm.css({
					"width": "100%",
					"visibility": "inherit",
					"height": d.$d.find(".diginfo").height() - 10,
					"position": "absolute",
					"overflow": "hidden",
					"left": 0,
					"top": 0,
					"z-index": -1
				}).prependTo(d.$d);
			}

			try {
				d.openRet = d.openfun.apply(this, (d.parameter));
			} catch (e) {
				console.info(e)
			}
			//关闭按钮
			d.closeBtn = $.type(d.closebtn) == "boolean" && d.closebtn == false ? d.$d.find("a .close").hide() : d.$d.find($.type(d.closebtn) === "string" ? d.closebtn : "a .close");

			d.closeBtn.bind("click", function() {
				try {
					d.closeRet = d.closefun.apply(this, (d.parameter));
				} catch (e) {
					if (window.console) {
						console.info(e)
					}
				}

				if (d.$d.length != 0) {
					d.$d.addClass('dialog_close');
					if ($.browser.msie && $.browser.version <= 9) {
						d.$d.remove();
					} else {
						var clearDia = setTimeout(function() {
							d.$d.remove();
							clearTimeout(clearDia);
						}, 300);
					}
				}
				if (d.closeAll) {
					$(".dialog-overlay").remove();
					$.each(d.cls.split(" "), function(i, j) {
						$("." + j).remove();
					})
				}
				if ($(".dialog-overlay").length !== 0) {
					if (d.$d.prop("overlay") == "yes") {
						$(".dialog-overlay").remove();
					}
				}
				//清除掉全局window事件。
				$(window).unbind("resize.dialog" + d.id);
				return false;
			});
			//确认位置
			d.Position();
		},
		Overlay: function(opts) {
			var d = this;
			if (d.overlay && $(".dialog-overlay").length == 0) {
				var css = {
					"background": "#000",
					"width": "100%",
					"height": d.docHeight,
					"opacity": 0.5,
					"position": "absolute",
					"overflow": "hidden",
					"left": 0,
					"top": 0
				};
				var _overlay = $('<div class="dialog-overlay"></div>');

				if (d.overlay.cls) {
					_overlay.addClass(d.overlay.cls);
				}
				if (d.overlay.css) {
					css = $.extend(css, d.overlay.css);
				}

				_overlay.css(css).css("z-index", d.$d.css("zIndex") - 1);

				d.$body.append(_overlay);
				d.$d.prop("overlay", "yes");

				//解决ie6下一些遮罩不住的东西 select flash
				if ($.browser.name == "msie" && $.browser.version == '6.0') {
					var _overifm = $('<iframe frameborder="0"></iframe>');
					_overifm.css({
						"width": "100%",
						"visibility": "inherit",
						"height": d.docHeight,
						"position": "absolute",
						"overflow": "hidden",
						"left": 0,
						"top": 0
					}).css("z-index", d.$d.css("zIndex") - 2);
					_overlay.append(_overifm);
				}
			}
		},
		Position: function(opts) {
			var d = this;
			//弹窗大小
			d.w = d.offset.width || d.$d.width();
			d.h = d.offset.height || d.$d.height();

			/* 位置 */
			//垂直居中top left值
			var offset = function() {
				var ret = {};
				if (d.$) {
					//console.log(d.offset.top, d.$.offset().top)
					ret.top = d.offset.top ? (d.$.offset().top + d.offset.top) : (d.$.offset().top + d.$.height());
					ret.left = d.offset.left ? d.$.offset().left + d.offset.left : d.$.offset().left;
				} else {
					ret.top = parseInt(d.$window.height() - d.h) / 2 + d.scrollHeight;
					ret.top = ret.top > 0 ? ret.top : 0;
					ret.left = parseInt(d.$window.width() - d.w) / 2;
				}
				//其它关于弹窗的样式
				if (d.offset) {
					ret = $.extend(true, {},
						d.offset, ret);
				}
				return ret;
			}
			var cls = offset();

			if (d.lock) {
				$(window).bind("resize.dialog" + d.id, function() {
					d.$d.css(offset());
				});
			}

			d.$d.css(cls);

		},
		autoClose: function(times, auto) {
			var d = this,
				times = times || d.times,
				auto = auto || d.auto;

			if (auto) {
				//window.clearTimeout($.getTime.countTimer[d.id]);
				$.getTime.countTimer[d.id] = window.setTimeout(function() {
						d.$d.fadeOut("slow", function() {
							//window.clearTimeout($.getTime.countTimer[d.id]);
							$(this).find("span.close").trigger('click');
						});
					},
					times * 1000);
			}
		}
	};
});