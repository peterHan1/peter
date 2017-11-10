var _inp = {
	focus: function(el) {
		$(el).on("focus", function() {
			var _this=this;
			var type = $(this).attr("type");
			_this.check();
			$(el).removeClass("border-color");
			$(this).addClass("border-color");
		});
	},
	blur: function(el) {
		$(el).on("blur", function() {
			$(this).removeClass("border-color");
		});
	},
	mouseover: function(el) {
		$(el).on("mouseover", function() {
			var _this=this;
			var type = $(this).attr("type");
			_this.check();
			$(this).css("border-color", "#707070");
		});
	},
	mouseleave: function(el) {
		var _this=this;
		$(el).on("mouseleave", function() {
			var type = $(this).attr("type");
			_this.check();
			$(this).css("border-color", "#DDDDDD");
		});
	},
	check: function() {
		if (type == "button" || type == "submit" || $(this).attr("readonly") == "readonly" || $(this).attr("disabled") == "disabled" || $(this).attr("jz") == "jz") {
			return false;
		}
	}
};

module.exports = _inp;