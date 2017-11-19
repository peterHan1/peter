! function() {
	for(var a = document.getElementsByTagName("IMG"), b = "data-yhsdimgload", c = "data-yhsdimgwait", d = "true", e = "yhsdretry=", f = function(a, b, c) {
			a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
		}, g = function(a) {
			var g = a.src,
				h = 0;
			f(a, "load", function() {
				a.setAttribute(b, d)
			});
			var i = function() {
				if(!("true" === a.getAttribute(b) || "true" === a.getAttribute(c) || h > 3)) {
					var f = "?";
					g.indexOf("?") > -1 && (f = "&");
					var i = g + f + e + (new Date).getTime();
					a.setAttribute(c, d), setTimeout(function() {
						a.setAttribute(c, "false"), h += 1, a.src = i
					}, 4e3)
				}
			};
			f(a, "error", i), setTimeout(function() {
				"undefined" == typeof a.readyState ? 0 === a.naturalWidth && 0 === a.naturalHeight && i() : "complete" != a.readyState && i()
			}, 3e3)
		}, h = 0; h < a.length; h++) try {
		g(a[h])
	} catch(i) {}
}();