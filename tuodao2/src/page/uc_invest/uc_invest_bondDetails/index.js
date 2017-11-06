require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/paging/page.scss');
require('util/paging/page.js');
var _tips = require('util/tips/index.js');
var _td = require('util/td.js');
var _apiInvest = require('api/ucInListBondDet-api.js');
var bondDel = require('./bondDel.string');
var bondDelRet = require('./bondDelRet.string');

var ucInvest = {
	init : function(){
		this.eventFn();
		this.urlEach();
		this.detailTopHtml();
		this.detailRetHtml();
	},
	urlEach : function(){
		$('.bond_tab a').each(function () {
			if (location.href.indexOf('uc_invest_bondDetails.html') > -1) {
				if($(this).html() == "已受让"){
					$(this).addClass('on');
				}
			} else {
				$('.bond_tab a').removeClass('on');
			};

		});
	},
	detailTopHtml : function(){
		_apiInvest.getBondTop(1,function(res){
			ucInvest.setType(res);
			res.content.repayLastTime = ucInvest.setData(res.content.repayLastTime);
			res.content.tenderTime = ucInvest.setData(res.content.tenderTime);
			listBondTopHtml = _td.renderHtml(bondDel,{
				content:res.content,
			});
			$(".sift_detailsT").html(listBondTopHtml);
			var sta = $(".return_satus").attr("status");
			if(sta == 1){
				$(".return_satus").html("[募集中]");
			}else if(sta == 2){
				$(".return_satus").html("[回款中]");
			}else if(sta == 3){
				$(".return_satus").html("[回款中]");
			}
			ucInvest.tipsHover();
		},function(){
			console.log("请求失败");
		});
	},
	detailRetHtml : function(){
		_apiInvest.getBondRet(1,1,5,function(res){
			res.content.preCollectionTime = ucInvest.setData(res.content.preCollectionTime);
			listBondRetHtml = _td.renderHtml(bondDelRet,{
				list:res.content.list,
			});
			$("#tbody_list").html(listBondRetHtml);
			ucInvest.trColor();
			ucInvest.setStatus();
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				listBondRetHtml = _td.renderHtml(bondDelRet,{
					list:res.content.list,
				});
				$("#tbody_list").html(listBondRetHtml);
				ucInvest.trColor();
				ucInvest.setStatus();
			});
		},function(){
			console.log("请求失败");
		});
	},
	setType : function(res){
		var type = res.content.styleType;
		if(type == 0){
			res.content.styleType = "等额本息";
		}else if(type == 1){
			res.content.styleType = "按月付息，到期还本";
		}
	},
	setStatus : function(){
		$(".return_status").each(function(){
			var con = $(this).html();
			if(con == "回款中"){
				$(this).addClass("underway_money");
			}else if(con == "已回款"){
				$(this).addClass("return_money");
			}
		});
	},
	setData : function(time) {
		var now = new Date(time*1000);
		var yy = now.getFullYear();
		var mm = now.getMonth() + 1;
		var dd = now.getDate();
		var hh = now.getHours();
		var ii = now.getMinutes();
		var ss = now.getSeconds();
		var clock = yy + "-";
		if (mm < 10) clock += "0";
		clock += mm + "-";
		if (dd < 10) clock += "0";
		clock += dd + " ";
		if (hh < 10) clock += "0";
		clock += hh + ":";
		if (ii < 10) clock += "0";
		clock += ii + ":";
		if (ss < 10) clock += "0";
		clock += ss + " ";
		return clock;
	},
	eventFn : function(){
		$(".sift_detailsBTit li").on('click',function(){
			var ind = $(this).index();
			$(this).addClass('on').siblings('li').removeClass('on');
			$(".sift_detailsTab").eq(ind).show().siblings().hide();
		});
	},
	tipsHover : function(){
		$(".hint").mouseover(function(){
			_tips.getTipsRight($(this),0);
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
	}
};
$(function(){
	ucInvest.init();
});