require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/paging/page.scss');
require('util/paging/page.js');
var _tips = require('util/tips/index.js');
var _td = require('util/td.js');
var _apiInvest = require('api/ucInListScaDet-api.js');
var scatterTlt = require('./scatter_tlt.string');
var scatterList = require('./scatter_list.string');

var ucInvest = {
	init : function(){
		this.addTlt(1);
		this.addList(1,1,5);
	},
	addTlt : function(id){
		_apiInvest.getScstter(id,function(res){
			tltHtml = _td.renderHtml(scatterTlt,{
				content:res.content,
			});
			$(".sift_detailsT").html(tltHtml);
			ucInvest.setShow("coupon_con");
			ucInvest.setType("refundWay");
			ucInvest.setApr("apr");
			ucInvest.tipsHover();
		},function(){
			console.log("请求失败");
		});
	},
	addList : function(id,current,page){
		_apiInvest.getScstterList(id,current,page,function(res){
			console.log(res);
			listHtml = _td.renderHtml(scatterList,{
				list:res.content.list,
			});
			$("#tbody_list").html(listHtml);
			ucInvest.setStatus("returnSta");
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvest.getScstterList(id,e.current,5,function(res){
					listHtml = _td.renderHtml(scatterList,{
						list:res.content.list,
					});
					$("#tbody_list").html(listHtml);
					ucInvest.setStatus("returnSta");
					ucInvest.trColor();
				},function(){
					console.log(请求失败);
				});
			});
			ucInvest.trColor();
		},function(){
			console.log(请求失败);
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
	setType : function(el){
		var _this = $("."+el);
		if(_this.html() == 0){
			_this.html("等额本息");
		}else if(_this.html() == 1){
			_this.html("按月付息，到期还本");
		}else if(_this.html() == 2){
			_this.html("按天计息");
		}
	},
	setApr : function(el){
		var _this = $("."+el);
		if(_this.attr("status") == 0){
			_this.remove();
		}
	},
	setStatus : function(el){
		var _this = $("."+el);
		if(_this.html() == 0){
			_this.html("未回款");
		}else if(_this.html() == 1){
			_this.html("已回款");
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