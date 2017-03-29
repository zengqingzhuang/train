/*
 settings 参数说明
 城市选择插件
 ------------------------------ */

(function($) {
	$.fn.citySelect = function(settings) {
		if (this.length < 1) {
			return;
		};
		// 默认值
		var settings = $.extend({
			url: {
				provinces: "/nnc/provinces.json"
			},
			prov: ".prov", //省
			city: ".city", //市
			dist: ".dist", //区/县
			d: false,
			nodata: null,
			required: false
		}, settings);
		var t = this,
			$t = $(this);
		var $prov = $t.find(settings.prov),
			$city = $t.find(settings.city),
			$dist = $t.find(settings.dist);
		$prov.bind("change", function() {
			if ($city.length == 0) {
				return false;
			}
			var _v = $(this).val();
			if (_v.length == 0) {
				var cityno1 = $city.find("option:first"),
					distno1 = $dist.find("option:first");
				if ($city.length > 0) {
					//$city[0].options.length = 0;
					$city.empty().append(cityno1);
				}
				if ($dist.length > 0) {
					//$dist[0].options.length = 0;
					$dist.empty().append(distno1);
				}
				return false;
			}
			$.getJSON(settings.url.provinces, {
				"parentCode": _v
			}, function(d) {
				if (d.status == 200) {
					selectProvince(d.provinces);
				}
			});
			//回调
			if (settings.required && settings.required.prov) {
				settings.required.prov.apply(this, ["prov", _v]);
			}
		});

		if (!!settings.d && !!settings.d[0]) {
			$prov.val(settings.d[0]);
		} else {

			if ($prov.find("option").length > 0) {
				$prov.val($prov.find("option:first").attr("value"));
			}
		}
		$prov.trigger("change");
		$city.bind("change", function() {
			if ($dist.length == 0) {
				return false;
			}
			var _v = $(this).val();
			if (_v.length == 0) {
				var distno1 = $dist.find("option:first");
				//$dist[0].options.length = 0;
				$dist.empty().append(distno1);
				return false;
			}
			$.getJSON(settings.url.provinces, {
				"parentCode": _v
			}, function(d) {
				if (d.status == 200) {
					selectCity(d.provinces);
				}
			});
		});
		var selectProvince = function(d) {
			var cityno1 = $city.find("option:first"),
				distno1 = $dist.find("option:first"),
				city = '';
			//$city[0].options.length = 0;
			$city.empty().append(cityno1);
			if ($dist.length > 0) {
				//$dist[0].options.length = 0;
				$dist.empty().append(distno1);
			}
			$.each(d, function(i, p) {
				city += '<option value="' + p.value + '">' + p.text + '</option>';
			});
			$city.append(city);
			if (settings.d[1]) {
				$city.find("option[value='" + settings.d[1] + "']").attr("selected", true).end().trigger("change");
				settings.d[1] = false;
			}
		};
		var selectCity = function(d) {
			var no1 = $dist.find("option:first"),
				area = '';
			//$prov[0].options.length = 0;
			//$dist[0].options.length = 0;
			$dist.empty().append(no1);
			$.each(d, function(i, p) {
				area += '<option value="' + p.value + '">' + p.text + '</option>';
			});
			$dist.append(area);
			if (settings.d[2]) {
				$dist.find("option[value='" + settings.d[2] + "']").attr("selected", true);
				settings.d[2] = false;
			}
		};
	};
})(jQuery);