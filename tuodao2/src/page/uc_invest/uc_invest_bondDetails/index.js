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
		this.page();
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
			listBondTopHtml = _td.renderHtml(bondDel,{
				content:res.content,
			});
			$(".sift_detailsT").html(listBondTopHtml);
			ucInvest.tipsHover();
		},function(){
			console.log("请求失败");
		});
	},
	detailRetHtml : function(){
		_apiInvest.getBondRet(1,1,5,function(res){
			listBondRetHtml = _td.renderHtml(bondDelRet,{
				list:res.content.list,
			});
			$("#tbody_list").html(listBondRetHtml);
			ucInvest.trColor();
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				listBondRetHtml = _td.renderHtml(bondDelRet,{
					list:res.content.list,
				});
				$("#tbody_list").html(listBondRetHtml);
				ucInvest.trColor();
			});
		},function(){
			console.log("请求失败");
		});
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