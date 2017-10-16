require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
var _tips = require('util/tips/index.js');
require('util/paging/page.scss');
require('util/paging/page.js');
$(function(){
	$(".hint").mouseover(function(){
		_tips.getTipsRight($(this),-10);
	});
	$(".hint").mouseout(function(){
		$(this).find('.tips').hide();
	});
	// 自定义select
	$(".option li").click(function(){
		var type_name = $(this).attr('name');
		$(".option li").removeClass("on");
		$(this).addClass("on");
		var value=$(this).text();
		$(this).parent().siblings("p").find(".month").text(value);
		if(type_name == "months"){
			$(".deadline").html("月");
			$(".months").show().siblings('p').hide();
		}else if(type_name == "endmonth"){
			$(".deadline").html("月");
			$(".endmonth").show().siblings('p').hide();
		}else if(type_name == "endday" ){
			$(".deadline").html("天");
			$(".endday").show().siblings('p').hide();
		}
	});
	$(document).on("click",".select_com",function(event){
		event.stopPropagation();
		$(this).find(".option").toggle();
		$(this).siblings().find(".option").hide();
	});
	$(document).click(function(event){
		var eo=$(event.target);
		if($(".select_com").is(":visible") && eo.attr("class")!="option" && !eo.parent(".option").length){
			$('.option').hide();
		}
	});
	trColor('tbody_list');
	function trColor(id){
		var trs=document.getElementById(id).getElementsByTagName("tr");
		for(var i=0;i<trs.length;i++){
			if(i%2==0){
				trs[i].className +=" trColor";
			}
		};
	}
});