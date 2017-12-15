require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _tips 		= require('util/tips/index.js');
var _td 		= require('util/td.js');
var _paging 	= require('util/paging/index.js');
var _apiInvest 	= require('api/trade-api.js');
var scatterTlt 	= require('./scatter_tlt.string');
var scatterList = require('./scatter_list.string');

var ucInvest = {
	init : function(){
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		console.log(headerData.accessId)
		console.log(headerData.accessKey)
		var tender = _td.getUrlParam("tender");
		this.addTlt(headerData,tender);
		this.addList(headerData,tender,1,5);
	},
	addTlt : function(headerData,id){
		_apiInvest.getScstterDet(headerData,id,function(res){
			ucInvest.scatterDetReturnWay(res);
			tltHtml = _td.renderHtml(scatterTlt,{
				content:res.content,
			});
			$(".sift_detailsT").html(tltHtml);
			ucInvest.setShow("coupon_con");
			ucInvest.setTiltStatus();
			ucInvest.setApr("apr");
			ucInvest.tipsHover();
			ucInvest.getStatus();
		},function(err){
			console.log(err);
		});
	},
	addList : function(headerData,id,current,page){
		_apiInvest.getScstterList(headerData,id,current,page,function(res){
			if(res.content.list != null){
				listHtml = _td.renderHtml(scatterList,{
					list:res.content.list,
				});
				$("#tbody_list").html(listHtml);
				_paging.paging("pageList",res.content.total,5,function(e){
					_apiInvest.getScstterList(id,e.current,5,function(res){
						listHtml = _td.renderHtml(scatterList,{
							list:res.content.list,
						});
						$("#tbody_list").html(listHtml);
						ucInvest.trColor();
					},function(err){
						console.log(err);
					});
				});
				ucInvest.trColor();
			}else{
				var dataNones='<tr><td colspan="8"><div class="null_data" colspan="8"><div class="null_data_bg"></div><p>当前没有回款计划</p></div></td></tr>';
				$("#tbody_list").html(dataNones);
			}
		},function(err){
			console.log(err);
		});
	},
	setShow : function(el){
		var _this = $("."+el);
		if(_this.html() == 1){
			_this.html("抵用券");
			_this.siblings(".unit").html("元");
		}else if(_this.html() == 2){
			_this.html("加息券");
			_this.siblings(".unit").html("%");
		}else if(_this.html() == 0){
			_this.parent("td").html("-");
		}
	},
	setTiltStatus : function(){
		var sta = $(".tlt_status").attr("status");
		var status;
		switch (sta)
		{
			case "0":
				status="[投标中]";
				break;
			case "1":
				status="[募集中]";
				break;
			case "2":
				status="[回款中]";
				break;
			case "5":
				status="[已回款]";
				break;
		}
		$(".tlt_status").html(status);
	},
	getStatus : function(){
		var sta = $(".tlt_status").attr("status");
		var t = $(".ac").attr("type");
		if(sta == 2 || sta == 5){
			$(".prot").show();
		}else{
			$(".prot").remove();
		}
		if(t == "" || t == null){
			$(".ac").remove();
		}
	},
	scatterDetReturnWay : function(res){
		var refundWay = res.content.refundWay;
		var htm;
		switch (refundWay)
		{
			case 0:
				htm="等额本息";
				break;
			case 1:
				htm="按月付息，到期还本";
				break;
			case 2:
				htm="按天付息";
				break;
		}
		res.content.refundWay = htm;
	},
	setApr : function(el){
		var _this = $("."+el);
		if(_this.attr("status") == 0){
			_this.remove();
		}
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