var _yzm = {
	check: function(box, cls) {
		var wrap = document.getElementById(box);
		var txts = wrap.getElementsByTagName("input");
		for (var i = 0; i < txts.length; i++) {
			var t = txts[i];
			t.index = i;
			t.setAttribute("readonly", "readonly");
			t.onkeyup = function() {
				this.value = this.value.replace(/\D/g, '');
				if (this.value == "") {
					return false;
				}
				var next = this.index + 1;
				var last = this.index;
				if (next > txts.length - 1) return;
				txts[next].removeAttribute("readonly");
				txts[next].focus();
				txts[next].className = cls;
				txts[last].classList.remove(cls);
			};
		}
		txts[0].removeAttribute("readonly");
	},
	del: function(box, cls) {
		console.log(111);
		var Event = window.event;
		var wrap = document.getElementById(box);
		var txts = wrap.getElementsByTagName("input");
		for (var i = txts.length; i < txts.length; i++) {
			var t = txts[i];
			t.index = i;
			t.setAttribute("readonly", "readonly");
			t.onkeyup = function() {
				if (Event.keyCode !== 8) {
					return;
				} else {
					// this.value = this.value.replace(/\D/g, '');
					// if (this.value == "") {
					// 	return false;
					// }
					var next = this.index - 1;
					var last = this.index;
					if (next <=0) return;
					txts[last].removeAttribute("readonly");
					txts[next].focus();
					txts[next].val("");
					txts[next].className = cls;
					txts[last].classList.remove(cls);
				}
			};
		}
	}
};
module.exports = _yzm;