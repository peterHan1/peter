var _del = {
	inptxtDel: function(name, el) {
		var _this=this;
		$(name).on("focus", function() {
			_this.check(name);
		});
		$(name).on("blur", function() {
			setTimeout(function() {
				$(name).siblings(".del").hide();
			}, 200);
		});
		$(name).on("keyup", function() {
			_this.check(name);
		});
		$(".del").on("click", function() {
			$(this).siblings(name).val("");
			$(el).removeClass("kd");
			$(el).on("mouseover", function() {
				$(this).removeClass('color');
			});
		});
	},
	check: function(name) {
		if ($(name).val() == "") {
			$(name).siblings(".del").hide();
		} else {
			$(name).siblings(".del").show();
		}
	}
};
module.exports = _del;