define(['jquery', 'Module', 'submitform', 'dialog', 'datepicker', 'selectcity'], function($, M) {
	M('personal', {
		init: function() {
			$('.setaddress').citySelect();
			$('#btnSubmit').click(function(e) {
				var t = this,
					err = $(t).next('em');
				err.text('');
				if ($('#provinceCode').val() == '') {
					err.text('省份不能为空');
					return;
				}
				if ($('#cityCode').val() == '') {
					err.text('市不能为空');
					return;
				}
				if ($('#areaCode').val() == '') {
					err.text('区/县不能为空');
					return;
				}
				if ($.trim($('#name').val()) == '') {
					err.text('姓名不能为空');
					return;
				}
				if ($.trim($('#birthday').val()) == '') {
					err.text('出生日期不能为空');
					return;
				}
				if ($.trim($('#phoneNumber').val()) == '') {
					err.text('手机号码不能为空');
					return;
				}
				if ($.trim($('#phoneNumber').val()).length > 11) {
					err.text('手机号码不能大于11位');
					return;
				}
				if ($.trim($('#code').val()) == '') {
					err.text('验证码不能为空');
					return;
				}
				if ($.trim($('#password').val()) == '') {
					err.text('密码不能为空');
					return;
				}
				if ($.trim($('#passwordOk').val()) == '') {
					err.text('确认密码不能为空');
					return;
				}
				if ($.trim($('#password').val()) != $.trim($('#passwordOk').val())) {
					err.text('密码和确认密码不同');
					return;
				}
				M('submitForm').start({
					form: $('#reg_form'),
					callback: function(ret) {
						var tpl = '';
						tpl += '<h4>温馨提示</h4>';
						tpl += '<article>' + ret.message + '</article>';
						tpl += '<div class="submit">';
						tpl += '  <i class="i_btn"><a href="javascript:void(0);">确认</a></i>';
						tpl += '</div>';
						if (ret.status == 200) {
							$.Dialog({
								"id": "diglog_wrapper",
								"overlay": true,
								"cls": "dialog_wrapper",
								//"closebtn": ".submit .i_btn,span.close",
								"closebtn": ".submit .i_btn",
								"auto": false,
								"msg": tpl,
								"openfun": function() {
									$('#diglog_wrapper').find('i.i_btn').click(function(event) {
										window.location.href = '/';
									});
								}
							});
						} else {
							$.Dialog({
								"id": "diglog_wrapper",
								"overlay": true,
								"cls": "dialog_wrapper",
								//"closebtn": ".submit .i_btn,span.close",
								"closebtn": ".submit .i_btn",
								"auto": false,
								"msg": tpl
							});
						}
					}
				});
			});
			$('#getCode').click(function(event) {
				// $.post('/nnc/sendMessage.json',function(ret){

				// });
			});
		}
	});
});