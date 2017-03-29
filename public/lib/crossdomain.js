define(['jquery', 'Module'], function($, M) {
	/******************iframe跨域请求****************/
	// var ifm = document.createElement('iframe');
	// ifm.setAttribute('id', 'iframeDemo');
	// ifm.src='http://localhost:3000/kuayu?callback=demo';
	// document.body.appendChild(ifm);
	// ifm.onload = function (){
	// 	var t = $(window.frames['iframeDemo'].document).contents().find('body').text(); //后台需要返回json字符串
	// 	//var doc = ifm.contentDocument || ifm.contentWindow.document;
	// };
	// M.opts.demo = function() {
	// 	alert('跨域请求demo成功');
	// };
	/***********************************************/

	/*******************script标签跨域请求***************/
	// var scp = document.createElement('script');
	// scp.src = 'http://localhost:3000/kuayu?callback=demo';
	// document.body.appendChild(scp);
	// M.opts.demo = function() {
	// 	alert('跨域请求demo成功');
	// };
	/************************************************/

	/*****************ajax跨域请求*********************/
	$.ajax({
		url: 'http://shop.zhe800.com/my/refunds/5222760',
		type: 'get',
		dataType: 'jsonp',
		jsonp: 'callback', //相当于传入的参数 http://zapi.zhe800.com/cn/n/user_transfer/authorize?callback=jsonpFun
		jsonpCallback: 'jsonpFun', //后台返回jsonpFun() 函数即可
		success: function(data) { //后台可以返回json对象
			alert('跨域请求成功')
		},
		error: function(err) {
			alert('跨域请求失败')
		}
	});
	M.opts.demo = function() { //后台可以返回一个函数,会自动调用
		alert('跨域请求demo成功');
	};
	/*************************************************/
});