require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/paging/page.scss');
require('util/paging/page.js');
var _tips = require('util/tips/index.js');
var _td = require('util/td.js');
var _apiInvest = require('api/ucInListSiftDet-api.js');
var siftDel = require('./invest_sift_detalis.string');
var siftCre = require('./invest_sift_cred.string');
var siftRet = require('./invest_sift_return.string');

var ucInvest = {
	init : function(){
		this.eventFn();
		this.tipsHover();
		this.trColor();
		this.siftTopHtml();
		this.siftCreHtml();
	},
	siftTopHtml : function(){
		_apiInvest.getSiftDel(1,function(res){
			siftDelHtml = _td.renderHtml(siftDel,{
				content:res.content,
			});
			$(".sift_detailsT").html(siftDelHtml);
		},function(){
			console.log("请求失败");
		});
	},
	siftCreHtml : function(){
		_apiInvest.getSiftCred(1,5,1,function(res){
			var borwA = "<a href='###'>查看借款协议</a>";
			var tranA = "<a href='###'>查看转让协议</a>";
			ucInvest.siftCreStatus(res);
			siftCreHtml = _td.renderHtml(siftCre,{
				list:res.content.list,
			});
			$("#tbody_list").html(siftCreHtml);
			ucInvest.siftCreOper(borwA,tranA);
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvest.getSiftCred(1,5,e.current,function(res){
					ucInvest.siftCreStatus(res);
					siftCreHtml = _td.renderHtml(siftCre,{
						list:res.content.list,
					});
					$("#tbody_list").html(siftCreHtml);
				},function(){
					console.log("分页请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	siftCreOper : function(a1,a2){
		var oper = $(".tb_oper");
		$.each(oper,function(i){
			var h = $(this).attr("opera");
			if(h == "待回款"){
				$(this).html(a1);
			}else if(h == "匹配中"){
				$(this).html("满标复审后生成借款协议");
			}else if(h == "转让成功"){
				$(this).html(a2);
			}
		});
		var a1 = '<a href="###">查看借款协议</a>';
		var a2 = '满标复审后生成借款协议';
		var a3 = '<a href="###">查看转让协议</a>';
	},
	siftCreStatus : function(res){
		var resList = res.content.list;
		// 剩余期限单位
		$.each(resList,function(i){
			if(resList[i].status == "0"){
				resList[i].status = "待回款";
			}else if(resList[i].status == "1"){
				resList[i].status = "匹配中";
			}else if(resList[i].status == "2"){
				resList[i].status = "转让成功";
			}
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
		trColor('tbodys_list');
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