require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');
var infoJoin = {
	init : function(){
		this.evenFn();
	},
	evenFn : function(){
		var _this = this;
		$(".job_tab a").on("click",function(){
			if($(this).siblings(".job_intro").is(':hidden')){
				$(this).css("color","#ff7400");
				$(this).find('i').css("color","#ff7400");
				$(this).siblings(".job_intro").show();
				$(this).find('i').html("&#xe69c;");
				$(this).parent("li").siblings('li').find(".job_intro").hide();
				$(this).parent("li").siblings('li').find('i').html("&#xe69a;").css("color","#d6d6d6");
				$(this).parent("li").siblings('li').find("a").css("color","#333");;
			}else{
				$(this).siblings(".job_intro").hide();
				$(this).find('i').html("&#xe69a;").css("color","#d6d6d6");
				$(this).css("color","#333");
			}
			var hei = $(".job_tab").outerHeight();
			$(".job_nav").height(hei);
		});
		$(".job_nav li").on("click",function(){
			$(".job_tab a").css("color","#333");
			$(".job_tab a i").html("&#xe69a;").css("color","#d6d6d6");
			$(".job_intro").hide();
			$(this).addClass("on").siblings("li").removeClass('on');
			var inde = $(this).index();
			$(".jos_tabCom").eq(inde).show().siblings(".jos_tabCom").hide();
			$(".job_nav").height("540px");
		});
	}
};
$(function(){
	infoJoin.init();
});