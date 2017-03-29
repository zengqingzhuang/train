define(function(require, exports, module) {
	var $ = require("jquery");
	/**
	 *  分页及页码显示
	 * @param {Object} $
	 */
	$.fn.pageList = function() {
		var _t = this;
		/*
		 *单列表个数
		 "pageSize_s" : 10,
		 //展开列表个数
		 "pageSize" : 30,
		 //显示页码数
		 "viewNum" : 30,
		 //总页数
		 "totalNumber" : 0,
		 //当前页
		 "pageNum" : 1
		 * map_page_div
		 * */

		var args = arguments,
			_pages = args[0] || {
				totalNumber: 3,
				pageNum: 1,
				pageSize: 10,
				viewNum: 5
			};

		var totalCount = _pages.totalNumber,
			pageNum = _pages.pageNum,
			ps = _pages.pageSize;
		var pages = "",
			pager = "",
			pageStr = "",
			pageStr2 = "",
			pageNext = "",
			pageUp = "",
			pageOmit = "",
			pages_n = 0;
		var ln_1 = 0,
			ln_2 = 0,
			rn_1 = 0,
			rn_2 = 0,
			lstrn_1 = "",
			lstrn_2 = "",
			rstrn_1 = "",
			rstrn_2 = "",
			lstr = "",
			rstr = "",
			pageStr2 = "";
		//页码条数
		var viewPageNum = typeof(_pages.viewNum) == 'undefined' ? 10 : _pages.viewNum;
		//共几页
		pages = parseInt(totalCount % ps) > 0 ? parseInt(totalCount / ps) + 1 : parseInt(totalCount / ps);
		//余页
		pager = parseInt(totalCount % ps);
		//nPages-10
		nPages = pageNum > 1 ? (pageNum - 1) * ps + 1 : 1;
		//6-nPagee
		nPagee = pages - pageNum > 0 ? pageNum * ps : totalCount;
		//页码页数
		pages_n = parseInt(Math.round(pages / viewPageNum));
		//显示页码数
		pageOmit = viewPageNum;
		//起始页码
		var p = 1;
		var pagest = '<a href="javascript:void(0)" info="1">1</a>';
		var pagend = '<a href="javascript:void(0)" info="' + pages + '">' + pages + '</a>';

		if (pages < viewPageNum) {
			for (var i = 1; i <= pages; i++) {
				if (i == pageNum) {
					pageStr2 += "<span>" + i + "</span>"
				} else {
					pageStr2 += '<a href="javascript:void(0)" info="' + i + '">' + i + "</a>"
				}
			}
		} else {
			if (pageNum <= 1) {
				for (var i = 1; i <= 3; i++) {
					if (i == pageNum) {
						pageStr2 += "<span>" + i + "</span>"
					} else {
						pageStr2 += '<a href="javascript:void(0)" info="' + i + '">' + i + "</a>"
					}
				}
				pageStr2 = pageStr2 + '<span class="dd">...</span>' + pagend
			} else {
				if (pages - pageNum <= 1) {
					for (var i = pages - 3; i <= pages; i++) {
						if (i == pageNum) {
							pageStr2 += "<span>" + i + "</span>"
						} else {
							pageStr2 += '<a href="javascript:void(0)" info="' + i + '">' + i + "</a>"
						}
					}
					pageStr2 = pagest + '<span class="dd">...</span>' + pageStr2
				} else {
					//var ln_1 = 0, ln_2 = 0, rn_1= 0, rn_2 = 0, lstrn_1= "", lstrn_2= "", rstrn_1= "", rstrn_2= "", lstr= "", rstr = "", pageStr2 = "";
					ln_1 = pageNum - 1;
					ln_2 = pageNum - 2;
					rn_1 = pageNum + 1;
					rn_2 = pageNum + 2;
					lstrn_1 = ln_1 <= 1 ? "" : '<a href="javascript:void(0)" info="' + ln_1 + '">' + ln_1 + "</a>";
					lstrn_2 = ln_2 <= 1 ? "" : '<a href="javascript:void(0)" info="' + ln_2 + '">' + ln_2 + "</a>";
					rstrn_1 = rn_1 >= pages ? "" : '<a href="javascript:void(0)" info="' + rn_1 + '">' + rn_1 + "</a>";
					rstrn_2 = rn_2 >= pages ? "" : '<a href="javascript:void(0)" info="' + rn_2 + '">' + rn_2 + "</a>";
					lstr = ln_2 > 1 ? '<span class="dd">...</span>' : '';
					rstr = pages - rn_2 > 1 ? '<span class="dd">...</span>' : '';
					tpages = pageNum == 1 || pageNum == pages ? "" : "<span>" + pageNum + "</span>";
					pageStr2 = pagest + lstr + lstrn_1 + tpages + rstrn_1 + rstr + pagend;
				}
			}
		}

		var pageBuffer = new K.Buffers();
		if (pages - pageNum > 0 && pageNum == 1) {
			pageNext = pageNum + 1;
			pageBuffer.append('<span class="selected">上页</span> ' + pageStr2 + ' <a href="javascript:void(0)" info="' + pageNext + '">下页</a>')
		} else {
			if (pages - pageNum > 0 && pageNum > 1) {
				pageNext = pageNum + 1;
				pageUp = pageNum - 1;
				pageBuffer.append('<a href="javascript:void(0)" info="' + pageUp + '">上页</a> ' + pageStr2 + ' <a href="javascript:void(0)" info="' + pageNext + '">下页 </a>')
			} else {
				if (pages - pageNum == 0 && pages > 1) {
					pageUp = pageNum - 1;
					pageBuffer.append('<a href="javascript:void(0)" info="' + pageUp + '">上页</a> ' + pageStr2 + ' <span class="selected">下页</span>&nbsp;')
				} else {
					if (pages - pageNum == 0 && pages <= 1) {
						pageUp = pageNum - 1;
						pageBuffer.append('<span class="selected">上页</span> ' + pageStr2 + ' <span class="selected">下页</span>&nbsp;')
					}
				}
			}
		}
		if (_t.size() > 0) {
			_t.empty().append(pageBuffer.toString());
		} else {
			return pageBuffer.toString() || "";
		}

	};

	/**
	 *  分页及页码显示
	 * @param {Object} $
	 */

	$.fn.pageList = function() {
		var _t = this;
		/*
		 *单列表个数
		 "pageSize_s" : 10,
		 //展开列表个数
		 "pageSize" : 30,
		 //显示页码数
		 "viewNum" : 30,
		 //总页数
		 "totalNumber" : 0,
		 //当前页
		 "pageNum" : 1
		 * map_page_div
		 * */

		var args = arguments,
			_pages = args[0] || {
				totalNumber: 3,
				pageNum: 1,
				pageSize: 10,
				viewNum: 5
			};

		var totalCount = _pages.totalNumber,
			pageNum = _pages.pageNum,
			ps = _pages.pageSize;
		var pages = "",
			pager = "",
			pageStr = "",
			pageStr2 = "",
			pageNext = "",
			pageUp = "",
			pageOmit = "",
			pages_n = 0;
		var ln_1 = 0,
			ln_2 = 0,
			rn_1 = 0,
			rn_2 = 0,
			lstrn_1 = "",
			lstrn_2 = "",
			rstrn_1 = "",
			rstrn_2 = "",
			lstr = "",
			rstr = "",
			pageStr2 = "";
		//页码条数
		var viewPageNum = typeof(_pages.viewNum) == 'undefined' ? 10 : _pages.viewNum;
		//共几页
		pages = parseInt(totalCount % ps) > 0 ? parseInt(totalCount / ps) + 1 : parseInt(totalCount / ps);
		//余页
		pager = parseInt(totalCount % ps);
		//nPages-10
		nPages = pageNum > 1 ? (pageNum - 1) * ps + 1 : 1;
		//6-nPagee
		nPagee = pages - pageNum > 0 ? pageNum * ps : totalCount;
		//页码页数
		pages_n = parseInt(Math.round(pages / viewPageNum));
		//显示页码数
		pageOmit = viewPageNum;
		//起始页码
		var p = 1;
		var pagest = '<a href="javascript:void(0)" info="1">1</a>';
		var pagend = '<a href="javascript:void(0)" info="' + pages + '">' + pages + '</a>';

		if (pages < viewPageNum) {
			for (var i = 1; i <= pages; i++) {
				if (i == pageNum) {
					pageStr2 += "<span>" + i + "</span>"
				} else {
					pageStr2 += '<a href="javascript:void(0)" info="' + i + '">' + i + "</a>"
				}
			}
		} else {
			if (pageNum <= 1) {
				for (var i = 1; i <= 3; i++) {
					if (i == pageNum) {
						pageStr2 += "<span>" + i + "</span>"
					} else {
						pageStr2 += '<a href="javascript:void(0)" info="' + i + '">' + i + "</a>"
					}
				}
				pageStr2 = pageStr2 + '<span class="dd">...</span>' + pagend
			} else {
				if (pages - pageNum <= 1) {
					for (var i = pages - 3; i <= pages; i++) {
						if (i == pageNum) {
							pageStr2 += "<span>" + i + "</span>"
						} else {
							pageStr2 += '<a href="javascript:void(0)" info="' + i + '">' + i + "</a>"
						}
					}
					pageStr2 = pagest + '<span class="dd">...</span>' + pageStr2
				} else {
					//var ln_1 = 0, ln_2 = 0, rn_1= 0, rn_2 = 0, lstrn_1= "", lstrn_2= "", rstrn_1= "", rstrn_2= "", lstr= "", rstr = "", pageStr2 = "";
					ln_1 = pageNum - 1;
					ln_2 = pageNum - 2;
					rn_1 = pageNum + 1;
					rn_2 = pageNum + 2;
					lstrn_1 = ln_1 <= 1 ? "" : '<a href="javascript:void(0)" info="' + ln_1 + '">' + ln_1 + "</a>";
					lstrn_2 = ln_2 <= 1 ? "" : '<a href="javascript:void(0)" info="' + ln_2 + '">' + ln_2 + "</a>";
					rstrn_1 = rn_1 >= pages ? "" : '<a href="javascript:void(0)" info="' + rn_1 + '">' + rn_1 + "</a>";
					rstrn_2 = rn_2 >= pages ? "" : '<a href="javascript:void(0)" info="' + rn_2 + '">' + rn_2 + "</a>";
					lstr = ln_2 > 1 ? '<span class="dd">...</span>' : '';
					rstr = pages - rn_2 > 1 ? '<span class="dd">...</span>' : '';
					tpages = pageNum == 1 || pageNum == pages ? "" : "<span>" + pageNum + "</span>";
					pageStr2 = pagest + lstr + lstrn_1 + tpages + rstrn_1 + rstr + pagend;
				}
			}
		}

		var pageBuffer = new K.Buffers();
		if (pages - pageNum > 0 && pageNum == 1) {
			pageNext = pageNum + 1;
			pageBuffer.append('<span class="selected">上页</span> ' + pageStr2 + ' <a href="javascript:void(0)" info="' + pageNext + '">下页</a>')
		} else {
			if (pages - pageNum > 0 && pageNum > 1) {
				pageNext = pageNum + 1;
				pageUp = pageNum - 1;
				pageBuffer.append('<a href="javascript:void(0)" info="' + pageUp + '">上页</a> ' + pageStr2 + ' <a href="javascript:void(0)" info="' + pageNext + '">下页 </a>')
			} else {
				if (pages - pageNum == 0 && pages > 1) {
					pageUp = pageNum - 1;
					pageBuffer.append('<a href="javascript:void(0)" info="' + pageUp + '">上页</a> ' + pageStr2 + ' <span class="selected">下页</span>&nbsp;')
				} else {
					if (pages - pageNum == 0 && pages <= 1) {
						pageUp = pageNum - 1;
						pageBuffer.append('<span class="selected">上页</span> ' + pageStr2 + ' <span class="selected">下页</span>&nbsp;')
					}
				}
			}
		}
		if (_t.size() > 0) {
			_t.empty().append(pageBuffer.toString());
		} else {
			return pageBuffer.toString() || "";
		}

	};
	//})(jQuery);
});