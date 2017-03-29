define(['jquery', 'Module'], function($, M) {
    M('sidebar', {
        OnLoad: function() {
            var cur = $('[data-currentPage]').attr('data-currentPage');
            $('aside.left li[data-type=' + cur + ']').addClass('cur');
        }
    })
});