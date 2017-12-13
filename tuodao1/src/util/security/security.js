var _yzm = {
	check: function(box, cls) {
		var wrap = document.getElementById(box);
		var txts = wrap.getElementsByTagName("input");
		for (var i = 0; i < txts.length; i++) {
			var t = txts[i];
			t.index = i;
			t.setAttribute("readonly", "readonly");
			t.onkeyup = function(event) {
				this.value = this.value.replace(/\D/g, '');
				var event = event || window.event;
				if (event.keyCode == 8) {
					this.value = "";
					var next = this.index - 1;
					var last = this.index;
					if (next < 0) return;
					txts[next].removeAttribute("readonly");
					txts[next].focus();
					txts[last].setAttribute("readonly", "readonly");
					txts[next].className = cls;
					txts[last].classList.remove(cls);
				} else {
					if (this.value == "") {
						return false;
					}
					var next = this.index + 1;
					var last = this.index;
					if (next > txts.length - 1) return;
					txts[next].removeAttribute("readonly");
					txts[next].focus();
					txts[last].setAttribute("readonly", "readonly");
					txts[next].className = cls;
					txts[last].classList.remove(cls);
				}
			};
		}
		txts[0].removeAttribute("readonly");
	}
};
module.exports = _yzm;