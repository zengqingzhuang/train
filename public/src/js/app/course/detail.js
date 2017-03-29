define(['jquery', 'Module', 'dialog'], function($, M) {
	M('course', {
		init: function() {
			$('.tabs').find('hgroup span').click(function(event) {
				$(this).parent().find('span').removeClass('cur');
				$(this).addClass('cur');
				$('.gonav').nextAll('div').hide();
				$('#' + $(this).data('id')).show();
			});
			$('#care,#think').click(function(event) {
				var tpl = '';
				tpl += '<div class="login">亲：请留下您的电话吧，培训机构会立即与您取得联系。为您节省了电话费哦</div>';
				tpl += '<div class="cen_ipt">';
				tpl += '	<ul>'
				tpl += '		<li><input class="ipt" type="text" id="name" placeholder="请输入您的姓名" /></li>';
				tpl += '		<li><input class="ipt" type="text" id="mobile" placeholder="请输入您的手机号码" /></li>';
				tpl += '		<li><input class="ipt" type="text" id="phone" placeholder="请输入您的座机号码" /></li>';
				tpl += '		<li><input type="button" id="diaLogin" class="diaLogin" value="联系我" /></li>';
				tpl += '		<li class="err_li"><span id="errInfo" class="red l errInfo"></span></li>';
				tpl += '	</ul>';
				tpl += '</div>';
				$.Dialog({
					"id": "dialog_wrapper",
					"overlay": true,
					"cls": "dialog_wrapper",
					"closebtn": ".submit .i_btn,span.close",
					"auto": false,
					"msg": tpl
				});
			});
			$('#nocare').click(function(event) {
				var tpl = '';
				tpl += '<div class="login">亲：您的宝贵意见，是我们前进的动力，开始吐槽吧</div>';
				tpl += '<div class="cen_ipt">';
				tpl += '	<ul>'
				tpl += '		<li><textarea class="ipt" id="messageInfo"></textarea></li>';
				tpl += '		<li><input type="button" id="diaLogin" class="diaLogin submitMsg" value="提交" /></li>';
				tpl += '		<li class="err_li"><span id="errInfo" class="red l errInfo"></span></li>';
				tpl += '	</ul>';
				tpl += '</div>';
				$.Dialog({
					"id": "dialog_wrapper",
					"overlay": true,
					"cls": "dialog_wrapper",
					"closebtn": ".submit .i_btn,span.close",
					"auto": false,
					"msg": tpl
				});
			});
		}
	});
});