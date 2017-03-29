define(["jquery", 'Module', "jqextend"], function($, M) {
    M('submitForm', {
        start: function(arg) {
            var t = this,
                now = $.rdStr(1, true),
                $form = arg.form,
                iframebody = "iframebody" + now;
            //创建提交容器
            $("<div/>").appendTo("body").css({
                top: "-5000px",
                left: "-1000px",
                position: "absolute"
            }).attr("id", "divtarget").append('<iframe name="' + iframebody + '" id="' + iframebody + '" />');
            $form.attr('target', iframebody);
            //表单提交
            $form.submit();
            //iframe的LOAD事件，取返回值
            $("#" + iframebody + "").bind("load", function() {
                //取值
                var ret;
                try {
                    var ret_str = $(window.frames[iframebody].document).contents().find('body').text();
                    if (ret_str && ret_str[0].toString() !== '{') {
                        var start = ret_str.indexOf("{"),
                            end = ret_str.indexOf("}");
                        ret_str = ret_str.substr(start, end - start + 1);
                    }
                    ret = $.parseJSON(ret_str) || {};
                } catch (e) {
                    ret = {
                        code: 1,
                        msg: "上传服务异常"
                    };
                }
                //回调
                arg.callback(ret);
                //清理iframe
                return t.clean($(this));
            });
        },
        clean: function($ifm) {
            /**
             * 清理异步上传的iframe
             * 释放不必要的内存
             */
            $ifm.unbind();
            var frame = $ifm[0];
            frame.src = "about:blank";
            frame.contentWindow.document.write('');
            $.browser.msie && CollectGarbage();
            $form.attr('target', '');
            $("#divtarget").remove();
        }
    });
})