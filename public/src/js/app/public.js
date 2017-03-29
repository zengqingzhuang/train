define(['jquery', 'Module', 'dialog', 'jqextend'], function($, M) {
	var lis = $('div.header').find('nav li'),
		mark = $('#header_mark').data('mark'),
		phoneNumber = $.cookie('phoneNumber');
	$(lis[mark]).addClass('active');
	if (phoneNumber) {
		return $('#btnLogin').html('您好，' + phoneNumber);
	}
	$('#btnLogin').click(function() {
		var tpl = '';
		tpl += '<div class="login">登录拉拉网，享受专属特权<a class="reg r" href="/register/choose">立即注册</a></div>'
		tpl += '<div class="cen_ipt">';
		tpl += '	<ul>'
		tpl += '		<li><input class="ipt" type="text" id="mobile" placeholder="请输入您的手机号码" /></li>';
		tpl += '		<li><input class="ipt" type="password" id="pwd" placeholder="请输入您的密码" /></li>';
		tpl += '		<li><input type="button" id="diaLogin" class="diaLogin" value="立即登录" /></li>';
		tpl += '		<li class="err_li"><span id="errInfo" class="red l errInfo"></span></li>';
		tpl += '	</ul>';
		tpl += '</div>';
		$.Dialog({
			"id": "dialog_wrapper",
			"overlay": true,
			"cls": "dialog_wrapper",
			"closebtn": ".submit .i_btn,span.close",
			"auto": false,
			"msg": tpl,
			"openfun": function() {
				$('#diaLogin').click(function(event) {
					$('#errInfo').html('');
					if ($('#mobile').val() == '') {
						$('#errInfo').html('手机号码不能为空');
						return;
					}
					if ($('#pwd').val() == '') {
						$('#errInfo').html('密码不能为空');
						return;
					}
					var data = {
						phoneNumber: $('#mobile').val(),
						password: $('#pwd').val()
					};
					$.post('/nnc/login.json', data, function(ret) {
						if (ret.status == 200) {
							$('#errInfo').html('');
							$('#dialog_wrapper').find('span.close').click();
							$('#btnLogin').html('您好，' + ret.phoneNumber);
							$.cookie('phoneNumber', ret.phoneNumber, {
								expires: 365,
								path: '/',
								domain: 'company.train.com'
							});
						} else {
							$('#errInfo').html(ret.message);
						}
					}).error(function() {
						alert('内部错误');
					});
				});
			}
		});
	});
});