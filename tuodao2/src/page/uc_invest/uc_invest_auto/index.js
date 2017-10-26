require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
var _tips = require('util/tips/index.js');

var ucInvest = {
	init : function(){
		this.customInput();
		this.eventFn();
		this.tipsHover();
		this.urlEach();
		this.trColor();
		this.page();
	},
	customInput : function(){
		// 自定义radio
		$(".redios").on("click",function(){
			$(this).addClass("checked");
			$(this).find("i").html("&#xe61e;");
			$(this).siblings(".redios").find("i").html("&#xe622;");
			$(this).siblings().removeClass('checked');
		});
		// 自定义select
		$(".option li").click(function(){
			$(".option li").removeClass("on");
			$(this).addClass("on");
			var value=$(this).text();
			$(this).parent().siblings("p").find(".month").text(value);
		});
	},
	eventFn : function(){
		$(".layer_date").on("click",function(event){
			if(event.target==this){
				laydate({
					format: 'YYYY-MM-DD',
					// 选择时间后回调
				 	choose: function(dates){
				 		console.log(dates);
				  	}
				});
			}
		});
		// 自动投标点击
		$("#switch").on("click",function(){
			if($(this).is('.switch_off')){
				$(this).attr("class","switch_on");
				$(".auto_tips").hide();
				$(".auto_ranking").show();
				$(".auto_setForm").show();
			}else{
				$(this).attr("class","switch_off");
				$(".auto_tips").show();
				$(".auto_ranking").hide();
				$(".auto_setForm").hide();
			}
		});
		// 点击修改
		$(".set_btn").on("click",function(){
			$(".select_com").addClass("select");
			$(".auto_setInp input").removeAttr("disabled");
			$(".set_btn").hide();
			$(".reminder").hide();
			$(".sub_btn").show();
			$(".redios_inp").show();
		});
		$(".callOff").on("click",function(){
			$(".select_com").removeClass("select");
			$(".auto_setInp input").attr("disabled","disabled");
			$(".set_btn").show();
			$(".reminder").show();
			$(".sub_btn").hide();
			$(".redios_inp").hide();
		});
		$(document).on("click",".select",function(event){
			event.stopPropagation();
			$(this).find(".option").toggle();
			$(this).siblings().find(".option").hide();
		});
		$(document).click(function(event){
			var eo=$(event.target);
			if($(".select").is(":visible") && eo.attr("class")!="option" && !eo.parent(".option").length){
				$('.option').hide();
			}
		});
	},
	tipsHover : function(){
		$(".hint").mouseover(function(){
			_tips.getTipsRight($(this),0);
		});
		$(".hints").mouseover(function(){
			_tips.getTipsRight($(this),-10);
		});
		$(".hint").mouseout(function(){
			$(this).find('.tips').hide();
		});
	},
	urlEach : function(){
		$('.auto_switchTab a').each(function () {
			if (location.href.indexOf($(this).attr('href')) > -1&&$(this).attr('href')!="") {
				$(this).addClass('on');
				var index = $(this).parent().index();
				$(".auto_com").eq(index).show().siblings(".auto_com").hide();
			} else {
				$(this).removeClass('on');
			};

		});
	},
	trColor : function(){
		trColor('tbody_list');
		// 各行变色
		function trColor(id){
			var trs=document.getElementById(id).getElementsByTagName("tr");
			for(var i=0;i<trs.length;i++){
				if(i%2==0){
					trs[i].className +=" trColor";
				}
			};
		}
	},
	page : function(){
		// 得到总页数
		$(".zxf_pagediv").createPage({
			// 页数
			pageNum: 10,
			// 当前页
			current: 1,
			// 显示条数
			shownum: 10,
			backfun: function(e) {
				console.log(e.current);
				// $("#data-container").html(thisDate(e.current));
			}
		});
	}
};
$(function(){
	ucInvest.init();
});
