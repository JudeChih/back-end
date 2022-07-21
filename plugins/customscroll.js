jQuery.fn.customscroll = function (d) {
	return this.each(function () {
		var direction = d.direction,
			bounce = typeof d.bounce === "number" ? d.bounce : 20;
		var drag = {
			d: direction,
			t: $(this).attr("rel"),
			id: $(this),
			setdimensions: function (orientation) {
				//DD added function
				if (orientation == "horizontal") {
					drag.b.css({
						width: drag.id.width(),
						left: 0,
						bottom: 0,
						position: "absolute",
						"z-index": 10
					});
					drag.c.css({
						display: "block",
						position: "absolute",
						height: drag.id.height() - drag.b.height() - 5,
						"overflow-y": "hidden"
					});
					drag.s.css({
						width: drag.b.width(),
						top: 0,
						width: 70,
						height: drag.b.height(),
						position: "absolute",
						"z-index": 100
					});
					drag.tickB = parseFloat(
						parseInt(drag.c.width() - drag.s.parent().width()) /
							parseInt(drag.s.parent().width() - drag.s.width())
					); // ratio between scrollable DIV area and scrollbar area
					drag.tickC = parseFloat(
						parseInt(drag.s.parent().width() - drag.s.width()) /
							parseInt(drag.c.width() - drag.s.parent().width())
					); // ratio between scrollable scrollbar area and DIV area
					return [
						drag.b.width() - drag.s.width() + bounce,
						drag.id.width() - drag.c.width() - bounce * drag.tickB
					];
				} else {
					drag.b.css({
						height: drag.id.height(),
						right: 0,
						top: 0,
						position: "absolute"
					});
					drag.c.css({
						display: "block",
						position: "absolute",
						width: drag.id.width() - drag.b.width() - 5
					});
					drag.s.css({
						width: drag.b.width(),
						top: 0,
						height: 70,
						position: "absolute"
					});
					drag.tickB = parseFloat(
						parseInt(drag.c.height() - drag.s.parent().height()) /
							parseInt(drag.s.parent().height() - drag.s.height())
					);
					drag.tickC = parseFloat(
						parseInt(drag.s.parent().height() - drag.s.height()) /
							parseInt(drag.c.height() - drag.s.parent().height())
					);
					return [
						drag.b.height() - drag.s.height() + bounce,
						drag.id.height() - drag.c.height() - bounce * drag.tickB
					];
				}
			},
			create: function () {
				switch (drag.d) {
					case "horizontal":
						drag.elements("horizontal");
						var maxs = drag.setdimensions("horizontal");
						drag.s.data({ click: false });
						drag.s.mouseover(function () {
							drag.s.data({ click: true });
						});
						drag.s.mouseout(function () {
							drag.s.data({ click: false });
						});
						drag.id.bind("mousewheel", function (f, delta) {
							f.preventDefault();
							clearTimeout(drag.wheeltimer);
							var initial = drag.s.position().left,
								moveby;
							drag.s.css({
								left: Math.min(
									Math.max(
										(moveby = -10 * delta + initial),
										-bounce
									),
									maxs[0]
								)
							});
							drag.c.css({
								left: Math.max(
									Math.min(
										-drag.tickB * moveby,
										drag.tickB * bounce
									),
									maxs[1]
								)
							});
							drag.wheeltimer = setTimeout(drag.redrawH, 100);
						});
						drag.s.mousedown(function (f) {
							f.preventDefault();
							drag.s.data({ hold: false });
							var initial =
								drag.s.parent().offset().left -
								(drag.s.offset().left - f.pageX);
							$(document).mousemove(function (e) {
								e.preventDefault();
								if (drag.s.data("hold") == false) {
									drag.s.css({
										left: Math.min(
											Math.max(
												e.pageX - initial,
												-bounce
											),
											maxs[0]
										)
									});
									drag.c.css({
										left: Math.max(
											Math.min(
												-drag.tickB *
													(e.pageX - initial),
												drag.tickB * bounce
											),
											maxs[1]
										)
									});
								}
							});
						});
						$(document).mouseup(function () {
							drag.redrawH();
						});
						drag.id.bind("touchstart", function (f) {
							var f =
								f.type.indexOf("touch") != "-1"
									? f.originalEvent.changedTouches[0]
									: f;
							var initial = drag.c.position().left;
							var initialx = f.pageX;
							$(document).bind("touchmove.slickscroll", function (
								f
							) {
								// cancel scroll action ontouch with single finger
								var touches =
									f.type.indexOf("touch") != "-1"
										? f.originalEvent.changedTouches.length
										: 0;
								var f =
									f.type.indexOf("touch") != "-1"
										? f.originalEvent.changedTouches[0]
										: f;
								var moveby = f.pageX - initialx;
								drag.s.css({
									left: Math.min(
										Math.max(
											-drag.tickC * (initial + moveby),
											-bounce
										),
										maxs[0]
									)
								});
								drag.c.css({
									left: Math.max(
										Math.min(
											initial + moveby,
											drag.tickB * bounce
										),
										maxs[1]
									)
								});
								if (touches == 1)
									// cancel scroll action ontouch with single finger
									return false;
							});
						});
						drag.id.bind("touchend", function (f) {
							$(document).unbind("touchmove.slickscroll");
							drag.redrawH();
						});
						drag.b.click(function (e) {
							if (drag.s.data("click") == false) {
								var initial =
									drag.s.parent().offset().left +
									drag.s.width() / 2;
								drag.s.animate({ left: e.pageX - initial });
								drag.c.animate(
									{ left: -drag.tickB * (e.pageX - initial) },
									{
										complete: function () {
											drag.redrawH();
										}
									}
								);
							}
						});
						break;
					case "vertical":
						drag.elements("vertical");
						var maxs = drag.setdimensions("vertical");
						drag.s.data({ click: false });
						drag.s.mouseover(function () {
							drag.s.data({ click: true });
						});
						drag.s.mouseout(function () {
							drag.s.data({ click: false });
						});
						drag.id.bind("mousewheel", function (f, delta) {
							f.preventDefault();
							clearTimeout(drag.wheeltimer);
							var initial = drag.s.position().top,
								moveby;
							drag.s.css({
								top: Math.min(
									Math.max(
										(moveby = -10 * delta + initial),
										-bounce
									),
									maxs[0]
								)
							});
							drag.c.css({
								top: Math.max(
									Math.min(
										-drag.tickB * moveby,
										drag.tickB * bounce
									),
									maxs[1]
								)
							});
							drag.wheeltimer = setTimeout(drag.redrawV, 100);
						});
						drag.s.bind("mousedown", function (f) {
							f.preventDefault();
							drag.s.data({ hold: false });
							var initial =
								drag.s.parent().offset().top -
								(drag.s.offset().top - f.pageY);
							$(document).bind("mousemove", function (e) {
								e.preventDefault();
								if (drag.s.data("hold") == false) {
									drag.s.css({
										top: Math.min(
											Math.max(
												e.pageY - initial,
												-bounce
											),
											maxs[0]
										)
									});
									drag.c.css({
										top: Math.max(
											Math.min(
												-drag.tickB *
													(e.pageY - initial),
												drag.tickB * bounce
											),
											maxs[1]
										)
									});
								}
							});
						});
						$(document).bind("mouseup", function () {
							drag.redrawV();
						});
						drag.id.bind("touchstart", function (f) {
							var f =
								f.type.indexOf("touch") != "-1"
									? f.originalEvent.changedTouches[0]
									: f;
							var initial = drag.c.position().top;
							var initialy = f.pageY;
							$(document).bind("touchmove.slickscroll", function (
								f
							) {
								// cancel scroll action ontouch with single finger
								var touches =
									f.type.indexOf("touch") != "-1"
										? f.originalEvent.changedTouches.length
										: 0;
								var f =
									f.type.indexOf("touch") != "-1"
										? f.originalEvent.changedTouches[0]
										: f;
								var moveby = f.pageY - initialy;
								drag.s.css({
									top: Math.min(
										Math.max(
											-drag.tickC * (initial + moveby),
											-bounce
										),
										maxs[0]
									)
								});
								drag.c.css({
									top: Math.max(
										Math.min(
											initial + moveby,
											drag.tickB * bounce
										),
										maxs[1]
									)
								});
								if (touches == 1)
									// cancel scroll action ontouch with single finger
									return false;
							});
						});
						drag.id.bind("touchend", function (f) {
							$(document).unbind("touchmove.slickscroll");
							drag.redrawV();
						});

						drag.b.click(function (e) {
							if (drag.s.data("click") == false) {
								var initial =
									drag.s.parent().offset().top +
									drag.s.height() / 2;
								drag.s.animate({ top: e.pageY - initial });
								drag.c.animate(
									{ top: -drag.tickB * (e.pageY - initial) },
									{
										complete: function () {
											drag.redrawV();
										}
									}
								);
							}
						});
						break;
				}
				$("a").click(function () {
					if ($(this).attr("rel")) {
						drag.move(
							"#" + $(this).attr("rel"),
							$(this).attr("parent")
						);
					}
				});

				$(window).resize(function () {
					//DD added event
					drag.setdimensions(drag.d);
					var resetpos =
						drag.d == "horizontal" ? { left: 0 } : { top: 0 };
					drag.c.css(resetpos);
				});

				// $(window).unload(function () {
				//     drag.destroy();
				// });
			},
			redrawV: function () {
				drag.s.data({ hold: true });
				if (
					drag.s.parent().height() <
					drag.s.position().top + drag.s.height()
				) {
					drag.s.animate(
						{ top: drag.s.parent().height() - drag.s.height() },
						250
					);
					drag.c.animate(
						{ top: drag.s.parent().height() - drag.c.height() },
						250
					);
				} else if (drag.s.position().top < 0) {
					drag.s.animate({ top: 0 }, 250);
					drag.c.animate({ top: 0 }, 250);
				}
			},
			redrawH: function () {
				drag.s.data({ hold: true });
				if (
					drag.s.parent().width() <
					drag.s.position().left + drag.s.width()
				) {
					drag.s.animate(
						{ left: drag.s.parent().width() - drag.s.width() },
						250
					);
					drag.c.animate(
						{ left: drag.s.parent().width() - drag.c.width() },
						250
					);
				} else if (drag.s.position().left < 0) {
					drag.s.animate({ left: 0 }, 250);
					drag.c.animate({ left: 0 }, 250);
				}
			},
			move: function (where, par) {
				if (drag.d == "vertical" && drag.t == par) {
					if (
						drag.tickC * $(where).position().top >
						drag.s.parent().height() - drag.s.height()
					) {
						drag.s.animate(
							{ top: drag.s.parent().height() - drag.s.height() },
							{ duration: 250 }
						);
						drag.c.animate(
							{ top: drag.s.parent().height() - drag.c.height() },
							{ duration: 250 }
						);
					} else {
						drag.s.animate(
							{ top: drag.tickC * $(where).position().top },
							{ duration: 250 }
						);
						drag.c.animate(
							{ top: -$(where).position().top },
							{ duration: 250 }
						);
					}
				} else if (drag.d == "horizontal" && drag.t == par) {
					if (
						drag.tickC * $(where).position().left >
						drag.s.parent().width() - drag.s.width()
					) {
						drag.s.animate(
							{ left: drag.s.parent().width() - drag.s.width() },
							{ duration: 250 }
						);
						drag.c.animate(
							{ left: drag.s.parent().width() - drag.c.width() },
							{ duration: 250 }
						);
					} else {
						drag.s.animate(
							{ left: drag.tickC * $(where).position().left },
							{ duration: 250 }
						);
						drag.c.animate(
							{ left: -$(where).position().left },
							{ duration: 250 }
						);
					}
				}
			},
			elements: function (where) {
				drag.id.css({ overflow: "hidden", position: "relative" });
				drag.id.wrapInner('<div class="' + drag.t + '-content"></div>');
				drag.c = $("." + drag.t + "-content");
				drag.id.append('<div class="' + drag.t + '-bar"></div>');
				drag.b = $("." + drag.t + "-bar");
				drag.b.append('<div class="' + drag.t + '-drag"></div>');
				drag.s = $("." + drag.t + "-drag");
			},
			destroy: function () {
				// What happens in DOM, stays in DOM. Unless...
				$("*").each(function () {
					$(this).remove();
				});
			}
		};
		drag.create();
	});
};
(function (a) {
	function d(b) {
		var c = b || window.event,
			d = [].slice.call(arguments, 1),
			e = 0,
			f = !0,
			g = 0,
			h = 0;
		return (
			(b = a.event.fix(c)),
			(b.type = "mousewheel"),
			c.wheelDelta && (e = c.wheelDelta / 120),
			c.detail && (e = -c.detail / 3),
			(h = e),
			c.axis !== undefined &&
				c.axis === c.HORIZONTAL_AXIS &&
				((h = 0), (g = -1 * e)),
			c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120),
			c.wheelDeltaX !== undefined && (g = (-1 * c.wheelDeltaX) / 120),
			d.unshift(b, e, g, h),
			(a.event.dispatch || a.event.handle).apply(this, d)
		);
	}
	var b = ["DOMMouseScroll", "mousewheel"];
	if (a.event.fixHooks)
		for (var c = b.length; c; )
			a.event.fixHooks[b[--c]] = a.event.mouseHooks;
	(a.event.special.mousewheel = {
		setup: function () {
			if (this.addEventListener)
				for (var a = b.length; a; )
					this.addEventListener(b[--a], d, !1);
			else this.onmousewheel = d;
		},
		teardown: function () {
			if (this.removeEventListener)
				for (var a = b.length; a; )
					this.removeEventListener(b[--a], d, !1);
			else this.onmousewheel = null;
		}
	}),
		a.fn.extend({
			mousewheel: function (a) {
				return a
					? this.bind("mousewheel", a)
					: this.trigger("mousewheel");
			},
			unmousewheel: function (a) {
				return this.unbind("mousewheel", a);
			}
		});
})(jQuery);
