var _hover={
	btnHover: function(elm){
		$(elm).on("mouseover",function(){
			if($(this).hasClass("kd")){
				$(this).addClass("color");
			}
		});
		$(elm).on("mouseleave", function() {
			if ($(this).hasClass("kd")) {
				$(this).removeClass("color");
			}
		});
	}
};
module.exports=_hover;