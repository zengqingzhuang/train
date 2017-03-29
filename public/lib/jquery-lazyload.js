(function(c, b, a, e) {
	var d = c(b);
	c.fn.lazyload = function(f) {
		var h = this;
		var i;
		var g = {
			threshold : 0,
			failure_limit : 0,
			event : "scroll",
			effect : "show",
			container : b,
			data_attribute : "original",
			skip_invisible : true,
			appear : null,
			load : null
		};
		function j() {
			var k = 0;
			h.each(function() {
				var l = c(this);
				if (g.skip_invisible && !l.is(":visible")) {
					return
				}
				if (c.abovethetop(this, g) || c.leftofbegin(this, g)) {
				} else {
					if (!c.belowthefold(this, g) && !c.rightoffold(this, g)) {
						l.trigger("appear");
						k = 0
					} else {
						if (++k > g.failure_limit) {
							return false
						}
					}
				}
			})
		}

		if (f) {
			if (e !== f.failurelimit) {
				f.failure_limit = f.failurelimit;
				delete f.failurelimit
			}
			if (e !== f.effectspeed) {
				f.effect_speed = f.effectspeed;
				delete f.effectspeed
			}
			c.extend(g, f)
		}
		i = (g.container === e || g.container === b) ? d : c(g.container);
		if (0 === g.event.indexOf("scroll")) {
			i.bind(g.event, function(k) {
				return j()
			})
		}
		this.each(function() {
			var k = this;
			var l = c(k);
			k.loaded = false;
			l.one("appear", function() {
				if (!this.loaded) {
					if (g.appear) {
						var m = h.length;
						g.appear.call(k, m, g)
					}
					c("<img />").bind("load", function() {
						l.hide().attr("src",l.data(g.data_attribute))[g.effect](g.effect_speed);
						k.loaded = true;
						var n = c.grep(h, function(p) {
							return !p.loaded
						});
						h = c(n);
						if (g.load) {
							var o = h.length;
							g.load.call(k, o, g)
						}
					}).attr("src", l.data(g.data_attribute))
				}
			});
			if (0 !== g.event.indexOf("scroll")) {
				l.bind(g.event, function(m) {
					if (!k.loaded) {
						l.trigger("appear")
					}
				})
			}
		});
		d.bind("resize", function(k) {
			j()
		});
		if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
			d.bind("pageshow", function(k) {
				if (k.originalEvent.persisted) {
					h.each(function() {
						c(this).trigger("appear")
					})
				}
			})
		}
		c(b).load(function() {
			j()
		});
		return this
	};
	c.belowthefold = function(h, i) {
		var f, g = c(b).height();
		if (i.container === e || i.container === b) {
			f = d.height() + d.scrollTop()
		} else {
			f = c(i.container).offset().top + c(i.container).height()
		}
		return f <= c(h).offset().top - i.threshold - g
	};
	c.rightoffold = function(g, h) {
		var f;
		if (h.container === e || h.container === b) {
			f = d.width() + d.scrollLeft()
		} else {
			f = c(h.container).offset().left + c(h.container).width()
		}
		return f <= c(g).offset().left - h.threshold
	};
	c.abovethetop = function(g, h) {
		var f;
		if (h.container === e || h.container === b) {
			f = d.scrollTop()
		} else {
			f = c(h.container).offset().top
		}
		return f >= c(g).offset().top + h.threshold + c(g).height()
	};
	c.leftofbegin = function(g, h) {
		var f;
		if (h.container === e || h.container === b) {
			f = d.scrollLeft()
		} else {
			f = c(h.container).offset().left
		}
		return f >= c(g).offset().left + h.threshold + c(g).width()
	};
	c.inviewport = function(f, g) {
		return !c.rightoffold(f, g) && !c.leftofbegin(f, g) && !c.belowthefold(f, g) && !c.abovethetop(f, g)
	};
	c.extend(c.expr[":"], {
		"below-the-fold" : function(f) {
			return c.belowthefold(f, {
				threshold : 0
			})
		},
		"above-the-top" : function(f) {
			return !c.belowthefold(f, {
				threshold : 0
			})
		},
		"right-of-screen" : function(f) {
			return c.rightoffold(f, {
				threshold : 0
			})
		},
		"left-of-screen" : function(f) {
			return !c.rightoffold(f, {
				threshold : 0
			})
		},
		"in-viewport" : function(f) {
			return c.inviewport(f, {
				threshold : 0
			})
		},
		"above-the-fold" : function(f) {
			return !c.belowthefold(f, {
				threshold : 0
			})
		},
		"right-of-fold" : function(f) {
			return c.rightoffold(f, {
				threshold : 0
			})
		},
		"left-of-fold" : function(f) {
			return !c.rightoffold(f, {
				threshold : 0
			})
		}
	})
})(jQuery, window, document);
