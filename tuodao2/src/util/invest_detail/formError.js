var formError = {
	show : function(id,errMsg){
		$(id).addClass('err-input');
		var el = '<p class="form-error-info">&nbsp;<i class="iconfont">&#xe671;</i>&nbsp;<span>'+errMsg+'</span></p>';
		$(".invest_money p").remove();
		return $(id).parent().append(el);
	},
	hide : function(el){
		el.removeClass('err-input');
		el.parent("div").find('p').remove();
	},
	allShow : function(cla,errMsg){
		var txt = "<span class='mess'><i class='iconfont'>&#xe671;</i>"+ errMsg +"</span>";
		$(".current_money").addClass("cur_money");
		if($(".mess").length > 0){
			$(".mess").remove();
		}
		$(".current_money").append(txt);
		$(cla).addClass('err-input');
	},
	allHide : function(el,els){
		$(".current_money").removeClass("cur_money");
		el.removeClass('err-input');
		els.removeClass('err-input');
		$(".mess").remove();
	}
};
module.exports = formError;