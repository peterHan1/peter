var _inp={
	focus: function(el){
		$(el).on("focus",function(){
			var type = $(this).attr("type");
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).attr("jz")=="jz") {
					return false;
				}
			$(el).removeClass("border-color");
			$(this).addClass("border-color");
		});
	},
	blur: function(el){
		$(el).on("blur", function() {
			$(this).removeClass("border-color");
		});
	},
	mouseover:function(el){
		$(el).on("mouseover", function() {
			var type = $(this).attr("type");
			if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).attr("jz")=="jz") {
				return false;
			}
			$(this).css("border-color", "#707070");
		});
	},
	mouseleave:function(el){
		$(el).on("mouseleave", function() {
			var type = $(this).attr("type");
			if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).attr("jz")=="jz") {
				return false;
			}
			$(this).css("border-color", "#DDDDDD");
		});
	}
};

module.exports = _inp;