define('Module', ['jquery'], function($) {
	function M(key, module, options) {
		if (arguments.length === 1) {
			if (typeof key === 'object') { // 设置options
				options = key;
				$.extend(Module.opts, options);
				return;
			} else if (typeof key === 'string') { // 获取模块
				return M.List[key];
			}
		} else { // 增加新模块
			if (typeof key === 'string' && typeof module === 'object') {
				if (M.List[key]) { //存在此模块则合并
					module = $.extend(M.List[key], module);
				}
				M.List[key] = module;
				typeof options === 'object' && $.extend(Module.opts, options);
				//页面加载前自动调用的方法-用公共方法的时候再用
				if (M.List[key] && M.List[key].Init) {
					M.List[key].Init(Module.opts);
				}
			}
		}
	}
	M.List = {}; //初始化模块集合
	M.opts = {}; //全局参数	
	window.M = M;
	return window.M;
});