define(['jquery', 'Module'], function($, M) {
	M('course', {
		init: function() {
			var curLi = '';
			$('div.courseClassify').find('.txt,i').click(function(event) {
				curLi = this;
			});
			$('body').click(function(event) {
				var src = event.srcElement ? event.srcElement : event.target;
				$('ul.c_list').hide();
				if (src.className.indexOf('txt') != -1) {
					$(curLi).nextAll('ul').show();
				}
			});
			$('.c_list').find('a').click(function(event) {
				event.stopPropagation();
				$(this).parents('div.courseClassify').find('span').text(this.innerHTML)
					.end().end().parents('ul.c_list').find('a').removeClass('cur')
					.end().end().addClass('cur').parent().parent().hide();
			});
			$('div.b_list').find('li').hover(function() {
				$(this).addClass('b_list_li');
			}, function() {
				$(this).removeClass('b_list_li');
			}).click(function(event) {
				window.location.href = '/course/detail';
			});
		}
	});
});