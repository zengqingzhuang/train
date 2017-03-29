define(['jquery', 'Module', 'validrule'], function($, M) {
	M('classify', {
		init: function() {
			$("#classifyName").bind("keyup", function(evt) {
				$(this).surpassinput({
					max: 20,
					evt: evt,
					tip: $('#classifyName').next('span')
				});
			});
			$("#remark").bind("keyup", function(evt) {
				$(this).surpassinput({
					max: 100,
					evt: evt,
					tip: $('#remark').next('span')
				});
			});
			$('input.level').click(function(event) {
				if (this.value == 1) { //一级分类
					$('#oneLvNames').hide();
					$('#classifyLv').attr('disabled', 'disabled');
				} else { //二级分类
					$('#oneLvNames').show();
					$('#classifyLv').removeAttr('disabled');
				}
			});
			$('#submitForm').click(function(event) {
				if ($.trim($('#classifyName').val()) == '') {
					$(this).next('em').text('分类名称不能为空');
					return false;
				}
				if (!$.trim($('#classifyLv').val())) {
					$(this).next('em').text('一级分类不能为空');
					return false;
				}
			});
		}
	});
});