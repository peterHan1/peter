require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
var _td 		= 	require('util/td.js');
var _tips	 	= 	require('util/tips/index.js');
var _apiInvest 	= 	require('api/ucInListAuto-api.js');
var setInp 		= 	require('./setInp.string');
var autoSum 	= 	require('./autoSum.string');
var autoRank 	= 	require('./autoRank.string');
var autoList 	= 	require('./autoList.string');

var ucInvest = {
	init : function(){
		this.eventFn();
		this.urlEach();
		this.trColor();
		this.page();
		this.getAutoSum();
	},
	urlEach : function(){
		$('.auto_switchTab a').each(function () {
			if (location.href.indexOf($(this).attr('href')) > -1&&$(this).attr('href')!="") {
				var types = $(this).attr('type');
				var index = $(this).parent().index();
				$(this).addClass('on');
				$(".auto_com").eq(index).show().siblings(".auto_com").hide();
				if(types == "1"){
					ucInvest.getAutoList();
				}
			} else {
				$(this).removeClass('on');
			};

		});
	},
	eventFn : function(){
		// 自动投标点击
		$("#switch").on("click",function(){
			if($(this).is('.switch_off')){
				ucInvest.getBank($(this));
			}else{
				ucInvest.closAuto($(this));
			}
		});
	},
	// 开启自动投标总人数
	getAutoSum : function(){
		_apiInvest.closeAuto(function(res){
			autoSum = _td.renderHtml(autoSum,{
				content:res.content,
			});
			$('.auto_tips').html(autoSum);
		},function(){
			console.log("请求失败");
		});
	},
	// 是否开通存管
	getBank : function(el){
		_apiInvest.getAutoBank(function(res){
			if(res.code == 100000){
				el.attr("class","switch_on");
				$(".auto_ranking").show();
				$(".auto_setForm").show();
				var flag = res.content;
				if(flag == true){
					var banlHtml = '<div class="auto_deposit"><div class="auto_deposit_bg"></div><p>为了保障您的资金安全,请在充值、投资、提现前开通存管</p><a href="">立即激活存管用户</a></div>';
					$(".auto_setBox").html(banlHtml);
				}else{
					ucInvest.setInpForm();
				}
			}
		},function(){
			console.log("请求失败");
		});
	},
	setInpForm : function(){
		_apiInvest.getInpForm(function(res){
			inpSet = _td.renderHtml(setInp,{
				content:res.content,
			});
			$('.auto_setBox').html(inpSet);
			ranking = _td.renderHtml(autoRank,{
				content:res.content,
			});
			$(".auto_tips").html(ranking);
			ucInvest.customInput();
			ucInvest.setForm();
			ucInvest.tipsHover();
		},function(){
			console.log("请求失败");
		});
	},
	getAutoList : function(){
		_apiInvest.getautoList(function(res){
			list = _td.renderHtml(autoList,{
				list:res.content.list,
			});
			$('#tbody_list').html(list);
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvest.getautoList(function(res){
					list = _td.renderHtml(autoList,{
						list:res.content.list,
					});
					$('#tbody_list').html(list);
				},function(){
					console.log("分页请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
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
	closAuto : function(el){
		_apiInvest.getAutoBank(function(res){
			if(res.code == 100000){
				el.attr("class","switch_off");
				$(".auto_ranking").hide();
				$(".auto_setForm").hide();
				ucInvest.getAutoSum();
			}else{
				alert("关闭失败");
			}
		},function(){
			console.log("请求失败");
		});
	},
	setForm : function(){
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
