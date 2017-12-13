require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
var _tips		= require('util/tips/index.js');
var _td 		= require('util/td.js');
var _paging 	= require('util/paging/index.js');
var _apiInvest 	= require('api/trade-api.js');
var siftDel 	= require('./invest_sift_detalis.string');
var siftCre 	= require('./invest_sift_cred.string');
var siftRet 	= require('./invest_sift_return.string');

var ucInvest = {
	init : function(){
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		var tender = _td.getUrlParam("tender");
		this.eventFn();
		this.trColor();
		this.siftTopHtml(headerData,tender);
		this.siftCreHtml(headerData,tender);
		this.siftRetHtml(headerData,tender);
	},
	siftTopHtml : function(headerData,tender){
		_apiInvest.getSiftDel(headerData,tender,function(res){
			ucInvest.siftDetReturnWay(res);
			siftDelHtml = _td.renderHtml(siftDel,{
				content:res.content,
			});
			$(".sift_detailsT").html(siftDelHtml);
			ucInvest.siftDetStatus();
			ucInvest.siftvouType();
			ucInvest.tipsHover();
		},function(err){
			console.log(err);
		});
	},
	siftCreHtml : function(headerData,tender){
		_apiInvest.getSiftCred(headerData,tender,5,1,function(res){
			if(res.content == null){
				ucInvest.dataNull("tbody_list","6","资产匹配成功后显示债券明细");
			}else{
				var borwA = "<a href='###'>查看借款协议</a>";
				var tranA = "<a href='###'>查看转让协议</a>";
				ucInvest.siftCreStatus(res);
				siftCreHtml = _td.renderHtml(siftCre,{
					list:res.content.list,
				});
				$("#tbody_list").html(siftCreHtml);
				ucInvest.siftAvailable();
				ucInvest.siftCreOper(borwA,tranA);
				_paging.paging("crePage",res.content.total,5,function(e){
					_apiInvest.getSiftCred(headerData,tender,5,e.current,function(res){
						ucInvest.siftCreStatus(res);
						siftCreHtml = _td.renderHtml(siftCre,{
							list:res.content.list,
						});
						$("#tbody_list").html(siftCreHtml);
						ucInvest.siftAvailable();
						ucInvest.siftCreOper(borwA,tranA);
					},function(err){
						console.log(err);
					});
				});
			}
		},function(err){
			console.log(err);
		});
	},
	siftRetHtml : function(headerData,tender){
		_apiInvest.getSiftReturn(headerData,tender,5,1,function(res){
			console.log(res);
			if(res.content == null){
				ucInvest.dataNull("tbody_list","6","当前没有回款计划");
			}else{
				siftReHtml = _td.renderHtml(siftRet,{
					list:res.content.list,
				});
				$("#tbodys_list").html(siftReHtml);
				ucInvest.siftReturnSts();
				ucInvest.siftRetStatus();
				ucInvest.trColor();
				_paging.paging("retPage",res.content.total,5,function(e){
					_apiInvest.getSiftReturn(headerData,tender,5,e.current,function(res){
						siftReHtml = _td.renderHtml(siftRet,{
							list:res.content.list,
						});
						$("#tbodys_list").html(siftReHtml);
						ucInvest.siftReturnSts();
						ucInvest.siftRetStatus();
						ucInvest.trColor();
					},function(err){
						console.log(err);
					});
				});
			}
		},function(err){
			console.log(err);
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
	siftAvailable : function(){
		var bleList = $(".discount");
		$.each(bleList,function(i){
			var sta = bleList.attr("status");
			console.log(sta)
		});
		var htm;
		switch (ble)
		{
			case 0:
				htm="匹配中";
				break;
			case 1:
				htm="投标成功";
				break;
			case 2:
				htm="还款中";
				break;
			case 3:
				htm="投标失败";
				break;
			case 4:
				htm="标的撤回";
				break;
			case 5:
				htm="还款完成";
				break;
			case 6:
				htm="转让申请";
				break;
			case 7:
				htm="转让成功";
				break;
			case 8:
				htm="撤销投标";
				break;
		}
		res.content.list.discountAvailable = htm;
	},
	siftReturnSts : function(){
		var staList = $(".returnsta");
		$.each(staList,function(i){
			var sta = staList.attr("status");
			if(sta == 0){
				staList.html("未回款");
			}else if(sta == 1){
				staList.html("已回款");
			}else if(sta == 2){
				staList.html("提前回款");
			}else if(sta == 7){
				staList.html("已转让");
			}
		});
	},
	siftDetStatus : function(){
		var status = $(".status").attr("status");
		var sta;
		switch (status)
		{
			case "0":
				sta="[匹配中]";
				break;
			case "1":
				sta="[回款中]";
				break;
			case "2":
				sta="[已撤标]";
				break;
			case "3":
				sta="[流标]";
				break;
			case "4":
				sta="[已回款]";
				break;
			case "5":
				sta="[撤销]";
				break;
		}
		$(".status").html(sta);
	},
	siftDetReturnWay : function(res){
		var repayType = res.content.repayType;
		var htm;
		switch (repayType)
		{
			case "0":
				htm="等额本息";
				break;
			case "1":
				htm="按月付息，到期还本";
				break;
			case "2":
				htm="按天付息";
				break;
		}
		res.content.repayType = htm;
	},
	siftvouType : function(){
		var typ = $(".vouType").attr("type");
		if(typ == "0"){
			$(".vouType").html("-");
		}
	},
	siftRetStatus : function(){
		// 剩余期限单位
		$.each($(".td_wid"),function(i){
			var sta = $(this).attr("status");
			if(sta == "已回款"){
				$(this).addClass("return_money");
			}else if(sta == "待回款"){
				$(this).addClass("underway_money");
			}
		});
	},
	dataNull : function(el,num,str){
		var datanull = '<tr class="null_data"><td colspan='+num+'><div class="null_data_bg"></div><p>'+str+'</p></td></tr>';
		$("#"+el).html(datanull);
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
	}
};
$(function(){
	ucInvest.init();
});